package com.example.jobmaster.service;

import com.example.jobmaster.dto.Response.PageResponse;
import com.example.jobmaster.entity.FieldEntity;
import com.example.jobmaster.entity.PositionEntity;

import java.util.List;

public interface IAdminService {
    List<FieldEntity> getListField(String code,String name);

}
