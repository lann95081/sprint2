package com.example.be.repository;

import com.example.be.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface IProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "select * from product where product_type_id = 1 and product_name like concat ('%',:nameSearch,'%') order by product.product_id desc", nativeQuery = true)
    Page<Product> findAllByName(@Param("nameSearch") String nameSearch, Pageable pageable);

    @Query(value = "select * from product p join brand b on b.brand_id = p.brand_id where product_type_id = 1 and product_name like concat ('%',:nameSearch,'%') and b.brand_id =:brandId", nativeQuery = true)
    Page<Product> findAllByNameAndBrand(@Param("nameSearch") String nameSearch, Integer brandId, Pageable pageable);

}
