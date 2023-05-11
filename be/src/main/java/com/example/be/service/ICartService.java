package com.example.be.service;

import com.example.be.model.Cart;

import java.util.List;

public interface ICartService {

    Cart findById(Integer userId);

    Cart save(Cart cart);

    void deleteByCartId(Integer cartId);

}
