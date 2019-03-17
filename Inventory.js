/* Erik Safford
	 CS 320
   PA2 - Drink Menu in JavaScript
   Design Phase 3: Inventory
   September 2018 */

function MenuItem(type,ingredients,cost,calories) {  //Creates a 'class' MenuItem, w/constructor
  this.type = type;  //type is the name of the drink
  this.ingredients = ingredients;  //ingredients is an array containing the drink's ingredients
  this.cost = cost;  //cost is an array containing the cost of a small/regular drink (based on size)
  this.calories = calories;  //calories is an array w/the number of calories the drink contains (based on size)
}
let s1 = new MenuItem('Bananaberry',['bananas','strawberries'],[3.99,4.99],[230,405]); //Create instances of MenuItems
let s2 = new MenuItem('Mango Magic',['mango','strawberries','pineapple','coconut creme'],[3.99,4.99],[250,310]);
let s3 = new MenuItem('Green Smoothie',['bananas','spinach'],[4.99,5.99],[295,530]);
let s4 = new MenuItem('Brazilian Sunrise',['bananas','acai','blueberries','granola'],[4.99,5.99],[515,780]);
let s5 = new MenuItem('Purple Popeye',['spinach','apples','beets','cucumbers'],[3.00,3.00],[130,130]); //One size
let s6 = new MenuItem('Beet Booster',['beets','oranges','apples'],[3.00,3.00],[225,225]);  //One size

//Use console to examine instances to make sure they are represented correctly
/*console.log('Smoothie #1 is type: ' + s1.type + ', and has great ingredients like: ' + 	s1.ingredients + ' with a small/regular costing ' + s1.cost[0]+'/'+s1.cost[1]+' w/ '+s1.calories[0]+'/'+s1.calories[1]+' calories');*/

let letsGo = new Menu();  //Start a new Menu() instance

function Menu() {  //provides access to MenuItem instances
  let menuArray = [];  //array that is the 'Menu'
  addMenuItem(menuArray,s1); //Adds the 6 MenuItem instances to the Menu
  addMenuItem(menuArray,s2);
  addMenuItem(menuArray,s3);
  addMenuItem(menuArray,s4);
  addMenuItem(menuArray,s5);
  addMenuItem(menuArray,s6);

  //let foundItemArray = findMenuItems(menuArray,'bananas');  //Finds the items that are made with bananas
  //for(let m = 0;m < foundItemArray.length;m++){
  //console.log(foundItemArray[m].type); //Prints 2nd half (items containing the specified ingredient)
  //}
}

let newOrder = new Order();  //Create a new Order instance

function Order(customerOrder) {  //may contain one or more drinks
  //has methods for adding a drink, calculating total cost, and calculating total calories
  let orderedDrinks = []; //array that holds the MenuItems and sizes of the ordered drinks
  orderedDrinks = addItemDrink(s1,'regular',orderedDrinks); //Adds 3 drinks to the order, orderedDrinks[] gets updated each time addItemDrink is called
  orderedDrinks = addItemDrink(s5,'small',orderedDrinks);
  orderedDrinks = addItemDrink(s3,'regular',orderedDrinks);
  //calcTotalCost(orderedDrinks); //Calculates the total cost of the drinks ordered //Total = $4.99 + $5.99 + $3.00 = $13.98
  //calcTotalCalories(orderedDrinks); //Calculates the total calories of the drinks ordered
  for(let i=0;i < orderedDrinks.length;i++){  //Prints the drinks that were ordered
    console.log(orderedDrinks[i][1]+' '+orderedDrinks[i][0].type+' ordered');
  }
  let availableDrinks = placeOrder(orderedDrinks);  //attemps to place an order with the drinks in the orderedDrinks[], returns array containing: the drinks it was able to make (based on inventory/stock list), and the inventory list w/ the items (stock) needed for the drinks removed
  for(let j=0;j < availableDrinks[0].length;j++) { //Print drinks that were able to be made
    console.log(availableDrinks[0][j][1]+' '+availableDrinks[0][j][0].type+' could be made');
  }
  printInventory(availableDrinks[1],1);  //Print inventory after drinks are made
}

//--------------------------------PHASE 3 FUNCTIONS-------------------------------------------------

function Inventory() { //holds the number of servings available for each ingredient in a store
  let stockArray = [['bananas',4],['strawberries',4],['spinach',3]];
  return (stockArray);
}
function printInventory(stockArray,a) {
  if(a === 0) {  // print in placeOrder() (before drinks made)
    console.log('Inventory Before Order:');
    for(let i=0;i < stockArray.length;i++) {
      console.log(stockArray[i][0]+' = '+stockArray[i][1]);
    }
  }
  if(a === 1) {  //print in Order() (after drinks made)
    console.log('Inventory After Order:');
    for(let i=0;i < stockArray.length;i++) {
      console.log(stockArray[i][0]+' = '+stockArray[i][1]);
    }
  }
}
function placeOrder(orderedDrinks) {  //accepts arrray containing the order from Order() and attempts to fulfill it.
  let stock = new Inventory();  //Make a new Inventory instance
  printInventory(stock,0);  //Print the inventory before order is attempted to be made
  let availableDrinks = new Store(stock,orderedDrinks);  //A store is constructed with an inventory instance and the ordered drinks
  return(availableDrinks); //returns array of all the drink instances it was able to make without running out of ingredients to Order()
}

function Store(stock,orderedDrinks) {  //Store is passed array containing inventory list,and array containing the drinks ordered, determines whether or not it has sufficient ingredients to make the ordered drinks
  let finalDrinkArray = [];
  let theStock = stock;
  for(let i=0;i < orderedDrinks.length;i++){ //For as long as the ordered drinks list
    let replaceStockArray = [];  //holds what/how much was used to make a drink (to potentially be put back)
    let ingredientList = orderedDrinks[i][0].ingredients; //select a list of ingredients from a drink
    let flag = 0;  //flag check in this function down below (after ingredients are searched)

    for(let j=0;j < ingredientList.length;j++) {  //For as long as their are ingredients in the list
      let ingredient = ingredientList[j];  //let ingredient equal an ingredient from the list
      for(let m=0;m < theStock.length;m++) {  //For as long as the inventory/stock list is
        if(theStock[m][0] === ingredient) {  //If an ingredient matches item on stock list

          if(orderedDrinks[i][1] === 'small') { //If the size ordered was small
            if(theStock[m][1] != 0 && theStock[m][1] > 0) {  //If there is stock of the ingredient
              theStock[m][1] = theStock[m][1] - 1;  //subract 1 serving
              replaceStockArray.push(ingredient,1); //push ingredient and how much used (to potentially add back)
              flag++; //increment flag to note that ingredient is available
            }
          }
          if(orderedDrinks[i][1] === 'regular') { //If the size ordered was regular
            if(theStock[m][1] != 0 && theStock[m][1] > 1) {  //If there is stock of the ingredient
              theStock[m][1] = theStock[m][1] - 2;  //subtract 2 servings
              replaceStockArray.push(ingredient,2); //push ingredient and how much used (to potentially add back)
              flag++;  //increment flag to note that ingredient is available
            }
          }
        }
      }
    }
    if(flag === ingredientList.length) { //If the # ingredients available = # ingredients required to make drink
      finalDrinkArray.push(orderedDrinks[i]);  //push the drink instance to finalDrinkArray[] (drink can be made)
    }
    else {
      //error checking here to replace stock that was subtracted but was not able to make complete drink
      let ingredient = replaceStockArray[0]; //ingredient is ingredient used in drink to be put back
      for(let i=0;i < theStock.length;i++) {  //For as long as the stock list is
        let stockItem = theStock[i][0];
        if(stockItem === ingredient) {  //If the stock item equals the ingredient to put back
          theStock[i][1] = theStock[i][1] + replaceStockArray[1]; //Add back ingredients used (1 or 2 servings)
        }
      }
    }
  }
  return([finalDrinkArray,theStock]);  //Return array containing only the drinks that could be made
}

//---------------------------PHASE 2 FUNCTIONS------------------------------------------------------
function Drink(menuItemInstance,size,orderedDrinks) {  //Pushes drinks that customer wants to order to orderedDrinks[], The constructor takes a MenuItem instance, and a string representing the desired size: "Small" or "Regular"
  //console.log(size+' '+menuItemInstance.type+' added to the order');
  orderedDrinks.push([menuItemInstance,size]); //Adds the ordered item's instance/size to the array
  return(orderedDrinks);
}
function addItemDrink(menuItemInstance,size,orderedDrinks) {  //Passes the MenuItem instance/size/orderedDrinks[] of an ordered drink to Drink()
  let drinkOrder = Drink(menuItemInstance,size,orderedDrinks);
  return(drinkOrder);
}
function calcTotalCost(orderedDrinks) {  //Calculates the total cost of the ordered drinks
  console.log('The item costs are: ');
  let totalCost = 0;
  for(let i=0;i < orderedDrinks.length;i++) { //For the length of items in the orderedDrinks[]
    if(orderedDrinks[i][1] === 'small') {  //If the drink ordered is small
      console.log('$'+orderedDrinks[i][0].cost[0]);
      totalCost = totalCost + orderedDrinks[i][0].cost[0];  //Add the small cost to the totalCost
    }
    if(orderedDrinks[i][1] === 'regular') {  //If the drink ordered is regular
      console.log('$'+orderedDrinks[i][0].cost[1]);
      totalCost = totalCost + orderedDrinks[i][0].cost[1];  //Add the regular cost to the totalCost
    }
  }
  console.log('Making the total cost: $' + totalCost);
}
function calcTotalCalories(orderedDrinks) {  //Calculates the total calories of the ordered drinks
  console.log('The item calories are: ');
  let totalCals = 0;
  for(let i=0;i < orderedDrinks.length;i++) { //For the length of items in the orderedDrinks[]
    if(orderedDrinks[i][1] === 'small') {  //If the drink ordered is small
      console.log(orderedDrinks[i][0].calories[0]+' cal');
      totalCals = totalCals + orderedDrinks[i][0].calories[0];  //Add the small calories to totalCals
    }
    if(orderedDrinks[i][1] === 'regular') {  //If the drink ordered is regular
      console.log(orderedDrinks[i][0].calories[1]+' cal');
      totalCals = totalCals + orderedDrinks[i][0].calories[1];  //Add the regular calories to totalCals
    }
  }
  console.log('Making the total calories: '+totalCals+' cal');
}

//-------------------------PHASE 1 FUNCTIONS-------------------------------------------------------------
function addMenuItem(menuArray,sNew) {  //Adds an item to the menuArray
  menuArray.push(sNew); //pushes a MenuItem instance onto the end of the Menu array
  //console.log(sNew.type + ' has been added to the Menu');
}
function findMenuItems(menuArray,ingredient) {  //Searches the passed menuArray and returns all the MenuItems containing the specified ingredient
  let containingItemArray = [];
  let k = 0;
  for(let i = 0;i < menuArray.length;i++) {  //For as long as the menuArray is
    let ingredientList = menuArray[i].ingredients;
    for(let j = 0;j < ingredientList.length;j++) { //For as long as each individual ingredientList is
      if(menuArray[i].ingredients[j] === ingredient) { //If an item has the specified ingredient
        containingItemArray[k] = menuArray[i]; //Assign the item's MenuItem to an array to be return
        k++;
      }
    }
  }
  console.log('The Menu items containing ' + ingredient + ' are:'); //Prints 1st half here to access ingredient searched for
  return(containingItemArray); //Returns array of MenuItem's containing the ingredient
}
