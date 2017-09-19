var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "an538811",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  start();
});
function start() {

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            var idArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
              idArray.push(results[i].item_id);
      
            }
            return choiceArray;
          },
          message: "What item would you like to purchase?"
        },
    
        {
      	  name:"itemQuantity",
      	  type:"input",	
      	  message:"How many units would you like to buy?"
        }  

         ])
    		.then(function(answer) {
      			quantityCheck(answer.choice, answer.itemQuantity);
      			
   		});
 	});
}   


function quantityCheck(item, quantity){

	inquirer
      .prompt([
    
        {
      	  name:"confirm",
      	  type:"confirm",	
      	  message:"Your order amount is "+quantity+". Would you like to continue?"
        }  

         ]).then(function(answer) {
         	if (answer.confirm == true){
         			connection.query("SELECT stock_quantity, item_id, price FROM products WHERE product_name=?",[item], function(err, results){
					if(err) throw err;
						var currentQuantity = results[0].stock_quantity;
						var orderQuantity = Number(quantity);
						var id = results[0].item_id;
						var price = results[0].price;

					if(isNaN(orderQuantity) == true){
						console.log("Please enter a valid number");
						start();
					}else if(orderQuantity > currentQuantity){
						console.log("Insufficient Quantity!");
						start();
					}else if(orderQuantity <= currentQuantity){
						console.log("Your order is being processed.");
						updateDB(price, currentQuantity, orderQuantity, id);
					}
				});
         	}
         	else{
         		start();
         	}
      			
   		});
    };     	


function updateDB(price, quantity, order, id){

	var updateQuantity = quantity - order;
	var total = price * order;
	connection.query("UPDATE products SET stock_quantity =?  WHERE item_id =?",[updateQuantity, id], function(err, results){
			
			 console.log("Your order has been placed. Your total is $"+total+".");
			 start();
	});
};