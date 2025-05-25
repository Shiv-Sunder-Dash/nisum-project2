package servlet;


import dao.ProductDAO;
import model.Product;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class SearchBrowseServlet extends HttpServlet {
    private ProductDAO productDAO = new ProductDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String productId = request.getParameter("productId");
        String categoryId = request.getParameter("categoryId");

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

        request.setAttribute("products", products);
        request.getRequestDispatcher("search-browse.jsp").forward(request, response);
    }

//    @Override
//    protected void doPost(HttpServletRequest request, HttpServletResponse response)
//            throws ServletException, IOException {
//        doGet(request, response);
//    }
}

