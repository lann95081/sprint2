package com.example.be.service.impl;

import com.example.be.dto.ICartDetailDto;
import com.example.be.model.CartDetail;
import com.example.be.repository.ICardDetailRepository;
import com.example.be.service.ICartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailService implements ICartDetailService {
    @Autowired
    private ICardDetailRepository iCardDetailRepository;

    @Override
    public CartDetail save(CartDetail cartDetail) {
        return iCardDetailRepository.save(cartDetail);
    }

    @Override
    public List<ICartDetailDto> findAll(Integer userId) {
        return iCardDetailRepository.findAllCartDetail(userId);
    }

    @Override
    public void updateAmount(Integer amount, Integer cartDetailId) {
        iCardDetailRepository.updateAmount(amount, cartDetailId);
    }

    @Override
    public CartDetail findByCartDetailId(Integer cartDetailId) {
        return iCardDetailRepository.findById(cartDetailId).orElse(null);
    }

}
