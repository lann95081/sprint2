package com.example.be.controller;

import com.example.be.model.Brand;
import com.example.be.model.Product;
import com.example.be.service.IBrandService;
import com.example.be.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ProductRestController {
    @Autowired
    private IProductService iProductService;

    @Autowired
    private IBrandService iBrandService;

    @GetMapping("/api/product")
    public ResponseEntity<List<Product>> findAll() {
        List<Product> productList = iProductService.findAll();
        if (productList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(productList, HttpStatus.OK);
        }
    }

    @GetMapping("/api/brand")
    public ResponseEntity<List<Brand>> findAllBrand() {
        List<Brand> brandList = iBrandService.findAll();
        if (brandList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(brandList, HttpStatus.OK);
        }

    }

    @GetMapping("/api/product-detail/{productId}")
    public ResponseEntity<Product> findProductById(@PathVariable int productId) {
        Product product = iProductService.findById(productId);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
    }

    @GetMapping("/api/product/list")
    public ResponseEntity<Page<Product>> findAllByName(@RequestParam(defaultValue = "", required = false) String nameSearch,
                                                       @RequestParam(defaultValue = "0", required = false) String brandId,
                                                       int totalElement) {
        int brandIdS = Integer.parseInt(brandId);
        Page<Product> productPage;
        Pageable pageable = Pageable.ofSize(totalElement);
        if (brandIdS == 0) {
            productPage = iProductService.findAllByName(nameSearch, pageable);
        } else {
            productPage = iProductService.findAllByNameAndBrand(nameSearch, brandIdS, pageable);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

}