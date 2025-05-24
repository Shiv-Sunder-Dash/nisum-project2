package dao;

import model.Product;
import util.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {

    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT p.*, c.category_name FROM products p " +
                "LEFT JOIN categories c ON p.category_id = c.category_id";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Product product = mapResultSetToProduct(rs);
                product.setSizes(getProductSizes(product.getProductId()));
                product.setOffers(getProductOffers(product.getProductId()));
                products.add(product);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    public Product getProductById(String productId) {
        String sql = "SELECT p.*, c.category_name FROM products p " +
                "LEFT JOIN categories c ON p.category_id = c.category_id " +
                "WHERE p.product_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, productId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Product product = mapResultSetToProduct(rs);
                product.setSizes(getProductSizes(productId));
                product.setOffers(getProductOffers(productId));
                return product;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Product> getProductsByCategory(int categoryId) {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT p.*, c.category_name FROM products p " +
                "LEFT JOIN categories c ON p.category_id = c.category_id " +
                "WHERE p.category_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, categoryId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Product product = mapResultSetToProduct(rs);
                product.setSizes(getProductSizes(product.getProductId()));
                product.setOffers(getProductOffers(product.getProductId()));
                products.add(product);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    private Product mapResultSetToProduct(ResultSet rs) throws SQLException {
        Product product = new Product();
        product.setProductId(rs.getString("product_id"));
        product.setProductName(rs.getString("product_name"));
        product.setCategoryId(rs.getInt("category_id"));
        product.setCategoryName(rs.getString("category_name"));
        product.setDescription(rs.getString("description"));
        product.setPrice(rs.getBigDecimal("price"));
        product.setOriginalPrice(rs.getBigDecimal("original_price"));
        product.setDiscountPercent(rs.getInt("discount_percent"));
        product.setQuantityInStock(rs.getInt("quantity_in_stock"));
        product.setBrand(rs.getString("brand"));
        product.setImageUrl(rs.getString("image_url"));
        return product;
    }

    private List<String> getProductSizes(String productId) {
        List<String> sizes = new ArrayList<>();
        String sql = "SELECT size FROM product_sizes WHERE product_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, productId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                sizes.add(rs.getString("size"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return sizes;
    }

    private List<String> getProductOffers(String productId) {
        List<String> offers = new ArrayList<>();
        String sql = "SELECT offer_description FROM offers WHERE product_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, productId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                offers.add(rs.getString("offer_description"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return offers;
    }
}
