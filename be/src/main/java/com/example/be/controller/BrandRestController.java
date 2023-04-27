package com.example.be.controller;

import com.example.be.model.Brand;
import com.example.be.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class BrandRestController {
    @Autowired
    private IBrandService iBrandService;

    @GetMapping("/api/brand")
    public ResponseEntity<List<Brand>> findAll(){
        List<Brand> brandList = iBrandService.findAll();

        if (brandList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(brandList,HttpStatus.OK);
        }
    }
}
