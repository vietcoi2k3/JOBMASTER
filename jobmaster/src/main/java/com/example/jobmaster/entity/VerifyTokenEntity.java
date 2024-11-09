package com.example.jobmaster.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
public class VerifyTokenEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UserEntity user;


    private Date expiryDate;

    public VerifyTokenEntity() {
    }

    public VerifyTokenEntity(UserEntity user) {
        this.user = user;
        this.token = UUID.randomUUID().toString();
        this.expiryDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24); // 24h
    }
}
