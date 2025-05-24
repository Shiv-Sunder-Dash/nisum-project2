<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${product.productName} - FashionHub</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="product-detail">
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.productName}"
                     onerror="this.src='https://via.placeholder.com/400x400'">
            </div>

            <div class="product-info">
                <h1>${product.productName}</h1>
                <p class="brand">by ${product.brand}</p>

                <div class="pricing">
                    <span class="current-price">₹${product.price}</span>
                    <c:if test="${product.originalPrice != null}">
                        <span class="original-price">₹${product.originalPrice}</span>
                        <span class="discount">(${product.discountPercent}% OFF)</span>
                    </c:if>
                </div>

                <div class="offers">
                    <h3>Available Offers</h3>
                    <ul>
                        <c:forEach var="offer" items="${product.offers}">
                            <li>${offer}</li>
                        </c:forEach>
                    </ul>
                </div>

                <div class="size-options">
                    <h3>Size:</h3>
                    <div class="sizes">
                        <c:forEach var="size" items="${product.sizes}">
                            <button class="size-btn">${size}</button>
                        </c:forEach>
                    </div>
                </div>

                <div class="quantity">
                    <label for="quantity">Quantity:</label>
                    <select id="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <div class="stock-info">
                    <p class="stock-warning">Only ${product.quantityInStock} items left in stock. Hurry up!</p>
                </div>

                <button class="add-to-cart">Add to Cart</button>

                <a href="search" class="back-link">← Back to Browse</a>
            </div>
        </div>
    </div>
</body>
</html>
