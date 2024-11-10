package com.example.jobmaster;

import com.example.jobmaster.entity.CityEntity;
import com.example.jobmaster.repository.CityRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@SpringBootApplication
public class JobmasterApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobmasterApplication.class, args);
    }

    @Bean
    public ModelMapper mapper(){
        return new ModelMapper();
    }

    @Autowired
    private CityRepository cityRepository;
//    @PostConstruct
//    public void Test(){
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "https://vapi.vnappmob.com/api/province/";
//
//        // Lấy phản hồi dưới dạng chuỗi JSON
//        String response = restTemplate.getForObject(url, String.class);
//
//        try {
//            // Tạo ObjectMapper để xử lý JSON
//            ObjectMapper objectMapper = new ObjectMapper();
//
//            // Đọc JSON và lấy danh sách các đối tượng từ trường "results"
//            JsonNode rootNode = objectMapper.readTree(response);
//            JsonNode resultsNode = rootNode.get("results");
//
//            // Chuyển đổi danh sách JSON thành List<CityEntity>
//            List<CityEntity> cityList = objectMapper.convertValue(resultsNode, new TypeReference<List<CityEntity>>() {});
//
//            // In kết quả ra để kiểm tra
//            for (CityEntity city : cityList) {
//                cityRepository.save(city);
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

}
