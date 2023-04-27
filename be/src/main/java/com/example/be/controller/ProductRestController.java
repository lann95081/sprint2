package com.example.be.controller;

import com.example.be.model.Product;
import com.example.be.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ProductRestController {
    @Autowired
    private IProductService iProductService;

    @GetMapping("/api/product")
    public ResponseEntity<List<Product>> findAll(){

        List<Product> productList = iProductService.findAll();
        if (productList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(productList,HttpStatus.OK);
        }
    }

    @GetMapping("/api/product/list")
    public ResponseEntity<Page<Product>> findAllByName(@RequestParam(defaultValue = "", required = false) String nameSearch,
                                                       @RequestParam(defaultValue = "0", required = false) String brandId,
                                                       @PageableDefault(page = 0, size = 8) Pageable pageable) {
        int brandIdS = Integer.parseInt(brandId);

        Page<Product> productPage;
        if (brandIdS == 0) {
            productPage = iProductService.findAllByName(nameSearch, pageable);
        } else {
            productPage = iProductService.findAllByNameAndBrand(nameSearch, brandIdS, pageable);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

}
