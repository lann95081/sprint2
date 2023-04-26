package com.example.be.repository;

import com.example.be.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "select * from product where product_type_id = 1", nativeQuery = true)
    List<Product> findAll();
}
