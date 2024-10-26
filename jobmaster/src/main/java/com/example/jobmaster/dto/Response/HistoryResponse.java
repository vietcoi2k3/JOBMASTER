package com.example.jobmaster.dto.Response;

import com.example.jobmaster.entity.HistoryMoney;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HistoryResponse {
    private BigDecimal totalMoney;
    private List<HistoryMoney> historyMoneyList;
    private int totalPages;

}
