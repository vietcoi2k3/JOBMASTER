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

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.example.jobmaster.until.constants.VNPayUtil.hmacSHA512;

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

        cld.add(Calendar.MINUTE, 60*12);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnpParamsMap.put("vnp_ExpireDate", vnp_ExpireDate);

        String queryUrl = createQueryUrl(vnpParamsMap);
        String vnpSecureHash = hmacSHA512(vnPayConfig.getSecretKey(), queryUrl);
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl + "&vnp_SecureHash=" + vnpSecureHash;

        return PaymentDTO.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl).build();
    }

    public String savePayment(HttpServletRequest httpServletRequest) {
        HistoryMoney historyPaymentEntity = new HistoryMoney();
        UserEntity accountEntity = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));

        String receivedHash = httpServletRequest.getParameter("vnp_SecureHash");
        Map<String, String> fields = new TreeMap<>();
        for (Map.Entry<String, String[]> entry : httpServletRequest.getParameterMap().entrySet()) {
            if (!"vnp_SecureHash".equals(entry.getKey())) {
                fields.put(entry.getKey(), entry.getValue()[0]);
            }
        }

        String queryUrl = createQueryUrl(fields);
        String calculatedHash = hmacSHA512(vnPayConfig.getSecretKey(), queryUrl);

        if (!calculatedHash.equals(receivedHash)) {
            return "INVALID_HASH";
        }

        long vnpAmount = Long.parseLong(httpServletRequest.getParameter("vnp_Amount")) / 100;
        BigDecimal amountToAdd = BigDecimal.valueOf(vnpAmount);
        BigDecimal updatedBalance = accountEntity.getBalance().add(amountToAdd);

        accountEntity.setBalance(updatedBalance);
        userRepository.save(accountEntity);

        historyPaymentEntity.setUserId(accountEntity.getId());
        historyPaymentEntity.setDescriptions(httpServletRequest.getParameter("vnp_OrderInfo"));
        historyPaymentEntity.setAmount(BigDecimal.valueOf(Long.parseLong(httpServletRequest.getParameter("vnp_Amount"))/100));
        historyPaymentEntity.setAddMoney(true);
        historyPaymentEntity.setBalanceAfter(updatedBalance);
        historyPaymentRepository.save(historyPaymentEntity);

        return "SUCCESS";
    }

    private String createQueryUrl(Map<String, String> params) {
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    hashData.append('&');
                }
            }
        }
        return hashData.toString();
    }
}
