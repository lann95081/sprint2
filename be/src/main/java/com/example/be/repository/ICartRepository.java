package com.example.be.repository;

import com.example.be.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface ICartRepository extends JpaRepository<Cart, Integer> {
    Cart findCartByUser_UserId(Integer cartId);

    @Modifying
    void deleteCartByCartId(Integer cartId);
}
