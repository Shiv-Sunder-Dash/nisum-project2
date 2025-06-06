package com.nisum.controller;

import com.nisum.dao.ProductDAO;
import com.nisum.model.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SearchBrowseController {

    @GetMapping("/products")
    public List<Product> getProducts(@RequestParam(value = "productId", required = false) String productId,
                                     @RequestParam(value = "categoryId", required = false) String categoryId) {
        ProductDAO productDAO = new ProductDAO();
        List<Product> products;
        if (productId != null && !productId.trim().isEmpty()) {
            Product product = productDAO.getProductById(productId);
            products = product != null ? List.of(product) : List.of();
        } else if (categoryId != null && !categoryId.trim().isEmpty()) {
            try {
                int catId = Integer.parseInt(categoryId);
                products = productDAO.getProductsByCategory(catId);
            } catch (NumberFormatException e) {
                products = productDAO.getAllProducts();
            }
        } else {
            products = productDAO.getAllProducts();
        }
        return products;
    }

    @GetMapping("/product")
    public Product getProduct(@RequestParam("id") String productId) {
        ProductDAO productDAO = new ProductDAO();
        return productDAO.getProductById(productId);
    }
}
