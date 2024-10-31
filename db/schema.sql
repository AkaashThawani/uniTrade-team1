
CREATE TABLE IF NOT EXISTS Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL UNIQUE,
    attribute1 VARCHAR(255),
    attribute2 VARCHAR(255),
    attribute3 VARCHAR(255),
    attribute4 VARCHAR(255),
    attribute5 VARCHAR(255),
    attribute6 VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL UNIQUE,
    category_id INT,
    description TEXT,
    attribute1 VARCHAR(255),
    attribute2 VARCHAR(255),
    attribute3 VARCHAR(255),
    attribute4 VARCHAR(255),
    attribute5 VARCHAR(255),
    attribute6 VARCHAR(255),
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS MarketData (
    market_id INT PRIMARY KEY AUTO_INCREMENT,
    best_buy_price FLOAT,
    best_sell_price FLOAT,
    best_buy_volume INT,
    best_sell_volume INT,
    type ENUM('buy', 'sell') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sold_at DATETIME,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- CREATE TABLE IF NOT EXISTS Users(
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     username VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     role ENUM('admin', 'user') NOT NULL DEFAULT 'admin',
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- )

CREATE TABLE IF NOT EXISTS Descriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key VARCHAR(255) NOT NULL UNIQUE,
    value TEXT
);


