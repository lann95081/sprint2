package com.example.be.controller;

import com.example.be.dto.ICartDetailDto;
import com.example.be.model.*;
import com.example.be.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@RestController
@CrossOrigin("*")
@RequestMapping("api/cart")
public class CartDetailRestController {
    @Autowired
    private ICartService iCartService;

    @Autowired
    private IProductService iProductService;

    @Autowired
    private IUserService iUserService;

    @Autowired
    private ICartDetailService iCartDetailService;

    @Autowired
    private IPurchaseService iPurchaseService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<ICartDetailDto>> findAllCart(@PathVariable Integer userId) {
        List<ICartDetailDto> cartDetailDtoList = iCartDetailService.findAll(userId);

        if (cartDetailDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(cartDetailDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/addCart/{userId}/{productId}/{amount}")
    public ResponseEntity<?> addToCart(@PathVariable Integer userId,
                                       @PathVariable Integer productId,
                                       @PathVariable Integer amount) {

        List<ICartDetailDto> cartDetailDtoList = iCartDetailService.findAll(userId);
        for (ICartDetailDto cartDetailDto : cartDetailDtoList) {
            if (Objects.equals(cartDetailDto.getProductId(), productId)) {
                CartDetail cartDetail = iCartDetailService.findByCartDetailId(cartDetailDto.getCartDetailId());
                Integer amount1 = cartDetail.getAmount() + amount;
                cartDetail.setAmount(amount1);
                iCartDetailService.save(cartDetail);
                return new ResponseEntity<>(cartDetail, HttpStatus.OK);
            }
        }

        User user = iUserService.findById(userId);
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String dateNow = dateFormat.format(date);
        Cart cart = new Cart();
        cart.setDate(dateNow);
        cart.setUser(user);
        iCartService.save(cart);
        CartDetail cartDetail = new CartDetail();
        cartDetail.setCart(cart);
        Product product = iProductService.findById(productId);
        cartDetail.setProduct(product);
        cartDetail.setAmount(1);
        CartDetail cartDetail1 = iCartDetailService.save(cartDetail);

        return new ResponseEntity<>(cartDetail1, HttpStatus.CREATED);
    }

    @GetMapping("/updateAmount/{amount}/{cartDetailId}")
    public ResponseEntity<?> updateAmount(@PathVariable Integer amount, @PathVariable Integer cartDetailId) {
        iCartDetailService.updateAmount(amount, cartDetailId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{cartId}/{productId}")
    public ResponseEntity<?> delete(@PathVariable Integer cartId, @PathVariable Integer productId) {
        iCartDetailService.delete(cartId, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteAll/{userId}")
    public ResponseEntity<?> deleteAll(@PathVariable Integer userId) {
        iCartDetailService.deleteAllCartDetail(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<?> getAllPurchase(@PathVariable Integer userId) {
        List<PurchaseHistory> purchaseHistoryList = iPurchaseService.findAllByUserId(userId);
        return new ResponseEntity<>(purchaseHistoryList, HttpStatus.OK);
    }

    @GetMapping("save/{userId}/{total}")
    public ResponseEntity<?> saveHistory(@PathVariable Integer userId,
                                         @PathVariable Integer total) {
        List<Integer> cart = iCartDetailService.findAllCartDetailByUserIdAndDeleteStatus(userId);
        User user = iUserService.findById(userId);
        PurchaseHistory purchaseHistory = new PurchaseHistory();
        Random random = new Random();
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        simpleDateFormat.format(date);
        purchaseHistory.setOrderDate(simpleDateFormat.format(date));
        purchaseHistory.setCodeBill(String.valueOf(random.nextInt(90000) + 10000));
        purchaseHistory.setUser(user);
        purchaseHistory.setTotal(Double.valueOf(total));
        iPurchaseService.save(purchaseHistory);
        for (Integer in : cart) {
            CartDetail cartDetail = iCartDetailService.findCartDetailByCartDetailIdAndDeleteStatus(in);
            cartDetail.setPurchaseHistory(purchaseHistory);
            iCartDetailService.save(cartDetail);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/setCart/{userId}")
    public ResponseEntity<?> setCart(@PathVariable Integer userId) {
        iCartDetailService.setCart(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
