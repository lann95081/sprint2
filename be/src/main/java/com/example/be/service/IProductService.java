package com.example.be.service;

import com.example.be.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    List<Product> findAll();

    Page<Product> findAllByName(String nameSearch, Pageable pageable);

    Page<Product> findAllByNameAndBrand(String nameSearch, Integer brandId, Pageable pageable);
}
