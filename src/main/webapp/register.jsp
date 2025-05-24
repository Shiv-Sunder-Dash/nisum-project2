<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Register - FashionHub</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="register-form">
            <h2>Create New Account</h2>
            <c:if test="${not empty error}">
                <p class="error">${error}</p>
            </c:if>
            <form action="register" method="post">
                <div class="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" required>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" required>
                </div>
                <div class="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstName" required>
                </div>
                <div class="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" required>
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="login.jsp">Login here</a></p>
        </div>
    </div>
</body>
</html>
