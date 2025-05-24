package servlet;

import dao.ProductDAO;
import model.Product;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ProductDetailServlet extends HttpServlet {
    private ProductDAO productDAO = new ProductDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String productId = request.getParameter("id");

        if (productId != null) {
            Product product = productDAO.getProductById(productId);
            request.setAttribute("product", product);
        }

        request.getRequestDispatcher("product-detail.jsp").forward(request, response);
    }
}

