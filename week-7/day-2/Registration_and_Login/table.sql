CREATE DATABASE user_management_api;
USE user_management_api;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
);

CREATE TABLE hashpwd (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  CONSTRAINT fk_hashpwd_user
    FOREIGN KEY (username) REFERENCES users(username)
    ON DELETE CASCADE
);
s