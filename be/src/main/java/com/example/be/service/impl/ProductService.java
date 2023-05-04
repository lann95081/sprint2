package com.example.be.service.impl;

import com.example.be.model.Product;
import com.example.be.repository.IProductRepository;
import com.example.be.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;


    @Override
    public List<Product> findAll() {
        return iProductRepository.findAll();
    }

    @Override
    public Page<Product> findAllByName(String nameSearch, Pageable pageable) {
        return iProductRepository.findAllByName(nameSearch, pageable);
    }

    @Override
    public Page<Product> findAllByNameAndBrand(String nameSearch, int brandId, Pageable pageable) {
        return iProductRepository.findAllByNameAndBrand(nameSearch, brandId, pageable);
    }

    @Override
    public Product findById(Integer productId) {
        return iProductRepository.findById(productId).orElse(null);
    }
}
