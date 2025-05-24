<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>FashionHub - Search and Browse</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>FashionHub - Search and Browse</h1>
        </header>

        <div class="search-filters">
            <form action="search" method="get">
                <input type="text" name="productId" placeholder="Search by Product ID"
                       value="${param.productId}">

                <select name="categoryId">
                    <option value="">All Categories</option>
                    <option value="1" ${param.categoryId == '1' ? 'selected' : ''}>Men</option>
                    <option value="2" ${param.categoryId == '2' ? 'selected' : ''}>Women</option>
                    <option value="3" ${param.categoryId == '3' ? 'selected' : ''}>Kids</option>
                </select>

                <button type="submit">Search</button>
            </form>
        </div>

        <div class="product-grid">
            <c:forEach var="product" items="${products}">
                <div class="product-card">
                    <img src="${product.imageUrl}" alt="${product.productName}"
                         onerror="this.src='https://via.placeholder.com/200x200'">
                    <h3>${product.productName}</h3>
                    <p>ID: ${product.productId}</p>
                    <p>Category: ${product.categoryName}</p>
                    <p class="price">₹${product.price}</p>
                    <c:if test="${product.discountPercent > 0}">
                        <p class="discount">${product.discountPercent}% OFF</p>
                    </c:if>
                    <a href="product?id=${product.productId}" class="view-details">View Details</a>
                </div>
            </c:forEach>
        </div>
    </div>
</body>
</html>
