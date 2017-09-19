create database if not exists bamazon;
use bamazon;
create table if not exists products(
item_id int not null auto_increment,
product_name varchar(100),
department_name varchar(100),
price float(10,2) default 0,
stock_quantity int(15),
primary key(item_id)
);

insert into products(
product_name, department_name, price, stock_quantity)
values
("Red Minotaur", "Food", 4, 25),
("Lightspeed Briefs", "Clothing", 30, 30),
("Admiral Crunch", "Food", 5, 30),
("Extreme Walrus Juice", "Food", 8, 25),
("Soylent Green Beans", "Food", 5, 40),
("Mobil Dick Whale Oil", "Utility", 10, 25),
("Good News Herbal Supplement", "Medicine", 8, 30),
("Dr. FlimFlam's Miracle Cream", "Medicine", 12, 15),
("Def-Con Owl Traps", "Utility", 9, 30),
("Doomproof Platinum Vest", "Clothing", 30, 10)
;

select * from products;