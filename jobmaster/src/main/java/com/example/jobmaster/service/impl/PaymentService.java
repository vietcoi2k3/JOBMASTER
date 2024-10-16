package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.PaymentDTO;
import com.example.jobmaster.entity.HistoryMoney;
import com.example.jobmaster.entity.UserEntity;
import com.example.jobmaster.repository.HistoryPaymentRepository;
import com.example.jobmaster.repository.UserRepository;
import com.example.jobmaster.security.config.VNPAYConfig;
import com.example.jobmaster.security.jwt.JWTUntil;
import com.example.jobmaster.until.constants.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;
import java.util.TimeZone;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final VNPAYConfig vnPayConfig;
    private final JWTUntil jwtUntil;
    private final UserRepository userRepository;
    private final HistoryPaymentRepository historyPaymentRepository;

    //tạo giao dịch vnPay
    public PaymentDTO createVnPayPayment(HttpServletRequest request) {
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = "NCB";
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", "NCB");
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        vnpParamsMap.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.MINUTE, 300);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        //Add Params of 2.1.0 Version
        vnpParamsMap.put("vnp_ExpireDate", vnp_ExpireDate);
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
        return PaymentDTO.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl).build();
    }


    public String savePayment(HttpServletRequest httpServletRequest) {
        // Tạo một đối tượng HistoryPaymentEntity mới để lưu thông tin thanh toán
        HistoryMoney historyPaymentEntity = new HistoryMoney();

        // Tìm tài khoản của người dùng dựa trên thông tin được trích xuất từ JWT trong request
        UserEntity accountEntity = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));

        // Cập nhật số tiền trong tài khoản của người dùng sau khi thanh toán
        long vnpAmount = Long.parseLong(httpServletRequest.getParameter("vnp_Amount")) / 100;
        BigDecimal amountToAdd = BigDecimal.valueOf(vnpAmount);
        BigDecimal updatedBalance = accountEntity.getBalance().add(amountToAdd);

        accountEntity.setBalance(updatedBalance);

        // Đặt ID của tài khoản cho đối tượng lịch sử thanh toán
        historyPaymentEntity.setUserId(accountEntity.getId());

        // Đặt mô tả của thanh toán từ thông tin trích xuất từ request
        historyPaymentEntity.setDescriptions(httpServletRequest.getParameter("vnp_OrderInfo"));

        // Đặt tổng số tiền thanh toán từ thông tin trích xuất từ request
        historyPaymentEntity.setAmount( BigDecimal.valueOf(Long.parseLong(httpServletRequest.getParameter("vnp_Amount"))));
        historyPaymentRepository.save(historyPaymentEntity);
        // Lưu thông tin thanh toán vào cơ sở dữ liệu và trả về đối tượng đã lưu
        return "SUCCESS";
    }
}
