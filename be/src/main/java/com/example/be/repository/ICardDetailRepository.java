package com.example.be.repository;

import com.example.be.dto.ICartDetailDto;
import com.example.be.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ICardDetailRepository extends JpaRepository<CartDetail, Integer> {

    @Query(value = "select ca.cart_id as cartId, c.cart_detail_id as cartDetailId, p.product_name as productName," +
            " p.price as price, p.img as img, c.amount as amount, ca.user_id as userId from product as p join cart_detail as c on c.product_id = p.product_id join cart as ca on ca.cart_id = c.cart_id where ca.user_id = :id", nativeQuery = true)
    List<ICartDetailDto> findAllCartDetail(@Param("id") Integer userId);

    @Modifying
    @Query(value = "update cart_detail set amount = :amount where cart_detail_id = :cartDetailId", nativeQuery = true)
    void updateAmount(@Param("amount") Integer amount,
                      @Param("cartDetailId") Integer cartDetailId);
}
