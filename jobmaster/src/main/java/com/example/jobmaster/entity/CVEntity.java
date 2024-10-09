package com.example.jobmaster.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CVEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String fileId;
    private String postId;
    private String description;
    private String email;
    private String phoneNumber;
    private String name;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusCVEnum status;
    private String note;

    @PrePersist
    protected void onCreate() {
        if (this.status == null) {
            this.status = StatusCVEnum.RECEIVED; // Giá trị mặc định
        }
    }
}
