
CREATE TABLE IF NOT EXISTS Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2),
    stock_quantity INT,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

CREATE TABLE IF NOT EXISTS MarketData (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    timestamp DATETIME,
    price DECIMAL(10,2),
    volume INT,
    FOREIGN KEY(product_id) REFERENCES Products(id)
);

INSERT INTO Categories(name, description)
VALUES ('Clothing', 'Pants')