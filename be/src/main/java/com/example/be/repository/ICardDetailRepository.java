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

    @Query(value = "select ca.cart_id as cartId, c.cart_detail_id as cartDetailId, p.product_name as productName, p.product_id as productId," +
            " p.price as price, p.img as img, c.amount as amount, ca.user_id as userId from product as p join cart_detail as c on c.product_id = p.product_id join cart as ca on ca.cart_id = c.cart_id where ca.user_id = :id and c.delete_status = false ", nativeQuery = true)
    List<ICartDetailDto> findAllCartDetail(@Param("id") Integer userId);

    @Modifying
    @Query(value = "update cart_detail set amount = :amount where cart_detail_id = :cartDetailId", nativeQuery = true)
    void updateAmount(@Param("amount") Integer amount,
                      @Param("cartDetailId") Integer cartDetailId);

    void deleteCartDetailByCart_CartIdAndProduct_ProductId(Integer cartId, Integer productId);

    @Query(value = "select cd.cart_detail_id as cartDetailId from cart_detail cd " +
            "join cart c on cd.cart_id = c.cart_id " +
            "left join purchase_history ph on ph.purchase_history_id = cd.purchase_history_id " +
            "where c.user_id = :userId and cd.delete_status = 0 and cd.purchase_history_id is null", nativeQuery = true)
    List<Integer> findAllCartDetailByUserIdAndDeleteStatus(@Param("userId") Integer userId);

    @Query(value = "select * from cart_detail cd where cd.cart_detail_id = :id and cd.delete_status = 0",nativeQuery = true)
    CartDetail findCartDetailByCartDetailIdAndDeleteStatus(@Param("id") Integer cartDetailId);

    @Modifying
    @Query(value = "update cart_detail cd join cart c on c.cart_id = cd.cart_id join user u on c.user_id = u.user_id " +
            "set cd.delete_status = true,c.pay_status = true,c.date = current_timestamp() where u.user_id = :userId",nativeQuery = true)
    void setCart(@Param("userId") Integer userId);

    @Modifying
    @Query(value = "update cart_detail cd " +
            "join cart c on cd.cart_id = c.cart_id " +
            "set cd.delete_status = 0 " +
            "where c.userId = :userId",nativeQuery = true)
    void deleteAllCartDetail( @Param("id") Integer userId);
}
