package com.example.be.service;

import com.example.be.dto.ICartDetailDto;
import com.example.be.model.CartDetail;

import java.util.List;

public interface ICartDetailService {
    CartDetail save (CartDetail cartDetail);

    List<ICartDetailDto> findAll(Integer userId);
}
