package com.example.be.service;

import com.example.be.model.Cart;

public interface ICartService {

    Cart findById(Integer cartId);

    Cart save (Cart cart);
}
