package com.nisum.controller;

import com.nisum.dao.ProductDAO;
import com.nisum.model.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProductDetailController {

    @GetMapping("/product-detail")
    public String productDetail(@RequestParam("id") String productId, Model model) {
        ProductDAO productDAO = new ProductDAO();
        Product product = productDAO.getProductById(productId);
        model.addAttribute("product", product);
        return "product-detail";
    }
}

