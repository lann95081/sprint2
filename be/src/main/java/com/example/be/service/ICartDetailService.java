package com.example.be.service;

import com.example.be.dto.ICartDetailDto;
import com.example.be.model.CartDetail;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartDetailService {
    CartDetail save(CartDetail cartDetail);

    List<ICartDetailDto> findAll(Integer userId);

    void updateAmount(Integer amount, Integer cartDetailId);

    CartDetail findByCartDetailId(Integer cartDetailId);

    void delete(Integer cartId, Integer productId);

    List<Integer> findAllCartDetailByUserIdAndDeleteStatus(Integer userId);

    CartDetail findCartDetailByCartDetailIdAndDeleteStatus(Integer cartDetailId);

    void setCart(Integer userId);

    void deleteAllCartDetail( Integer userId);

}
