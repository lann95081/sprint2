drop database if exists `cat_shop`;
create database `cat_shop`;
use `cat_shop`;

create table `role` (
role_id int primary key auto_increment,
user_name varchar(25)
);

create table `account`(
account_id int primary key auto_increment,
`password` varchar(50)
);

create table `account_role` (
id bigint  primary key auto_increment,
role_id int,
account_id int ,
foreign key (role_id) references `role`(role_id),
foreign key (account_id) references `account`(account_id)
);

create table `admin`(
id int auto_increment primary key,
`name` varchar(50),
gender bit(1),
phone varchar(50) unique,
id_card varchar(50) unique,
email varchar(50) unique,
address varchar(50),
account_id int,
foreign key(account_id) references `account`(account_id)
);

create table `position`(
position_id int primary key auto_increment,
position_name varchar(50)
);

create table `employee`(
employee_id int primary key auto_increment,
employee_name varchar(50),
employee_gender bit(1),
employee_birthday varchar(50),
employee_id_card varchar(50) unique,
employee_phone varchar(50) unique,
employee_email varchar(50) unique,
employee_address varchar(50),
delete_status bit default 0,
position_id int,
account_id int,
foreign key (position_id) references `position`(position_id),
foreign key (account_id) references `account`(account_id)
);

create table `customer`(
customer_id int primary key auto_increment,
customer_name varchar(50),
customer_gender bit(1),
customer_birthday varchar(50),
customer_id_card varchar(50) unique,
customer_phone varchar(50) unique,
customer_email varchar(50) unique,
customer_address varchar(50),
account_id int,
foreign key(account_id) references `account`(account_id)
);

create table `product_type`(
product_type_id int primary key auto_increment,
product_type_name varchar(50)
);

create table `origin`(
origin_id int primary key auto_increment,
origin_name varchar(50)
);

create table `product`(
product_id int primary key auto_increment,
product_name varchar(50),
product_price double,
descriptions text,
product_image text,
quantity int,
delete_status bit default 0,
product_type_id int,
origin_id int,
foreign key(product_type_id) references`product_type`(product_type_id),
foreign key(origin_id) references`origin`(origin_id)
);

create table `order`(
order_id int primary key auto_increment,
order_code varchar(50) unique,
order_date date,
total double,
product_id int,
customer_id int,
foreign key(product_id) references `product`(product_id),
foreign key(customer_id) references `customer`(customer_id)
);