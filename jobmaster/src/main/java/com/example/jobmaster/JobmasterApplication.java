package com.example.jobmaster;

import com.example.jobmaster.entity.CityEntity;
import com.example.jobmaster.repository.CityRepository;
import jakarta.annotation.PostConstruct;
import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
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
//        String url = "https://vapi.vnappmob.com/api/province";
//
//        // Sử dụng ParameterizedTypeReference để định nghĩa kiểu dữ liệu trả về
//        List<CityEntity> city = restTemplate.exchange(
//                url,                       // URL của API
//                HttpMethod.GET,            // Phương thức HTTP (GET)
//                null,                      // Request entity (null nếu không cần gửi body)
//                new ParameterizedTypeReference<List<CityEntity>>() {}  // Định nghĩa kiểu trả về
//        ).getBody();  // Lấy body từ response
//
//        System.out.println(city.get(0));
//    }
}
