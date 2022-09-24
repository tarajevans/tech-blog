DROP DATABASE IF EXISTS tech_blog;
CREATE DATABASE tech_blog;
Use tech_blog;

CREATE TABLE users (
 id int(11) NOT NULL AUTO_INCREMENT,
 username varchar(100) NOT NULL,
 email varchar(255) NOT NULL,
  password varchar(100) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE posts (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content_txt varchar(255) NOT NULL,
    user_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
); 
 CREATE TABLE comments(
     id int NOT NULL AUTO_INCREMENT,
     comment_text varchar(277) Not Null,
     user_id int,
     post_id int,
     PRIMARY KEY(id),
     FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN Key (user_id) REFERENCES users(id)
);