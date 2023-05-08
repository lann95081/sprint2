package com.example.be.controller;

import com.example.be.dto.ICartDetailDto;
import com.example.be.model.Cart;
import com.example.be.model.CartDetail;
import com.example.be.model.Product;
import com.example.be.model.User;
import com.example.be.service.ICartDetailService;
import com.example.be.service.ICartService;
import com.example.be.service.IProductService;
import com.example.be.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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

    @GetMapping("/{userId}")
    public ResponseEntity<List<ICartDetailDto>> findAllCart(@PathVariable Integer userId) {
        List<ICartDetailDto> cartDetailDtoList = iCartDetailService.findAll(userId);

        if (cartDetailDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(cartDetailDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/addCart/{userId}/{productId}")
    public ResponseEntity<?> addToCart(@PathVariable Integer userId,
                                       @PathVariable Integer productId) {

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
    public ResponseEntity<?> delete(@PathVariable Integer cartId, @PathVariable Integer productId){
        iCartDetailService.delete(cartId, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
