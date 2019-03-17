/* Erik Safford
	 CS 320
   PA2 - Drink Menu in JavaScript
   Design Phase 2: Order
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
  orderedDrinks = addItemDrink(s1,'small',orderedDrinks); //Adds 3 drinks to the order, orderedDrinks[] gets updated each time addItemDrink is called
  orderedDrinks = addItemDrink(s3,'regular',orderedDrinks);  //Total = $3.99 + $5.99 + $3.00 = $12.98
  orderedDrinks = addItemDrink(s5,'small',orderedDrinks);
  calcTotalCost(orderedDrinks); //Calculates the total cost of the drinks ordered
  calcTotalCalories(orderedDrinks); //Calculates the total calories of the drinks ordered
}

function Drink(menuItemInstance,size,orderedDrinks) {  //Pushes drinks that customer wants to order to orderedDrinks[], The constructor takes a MenuItem instance, and a string representing the desired size: "Small" or "Regular"
  console.log(size+' '+menuItemInstance.type+' added to the order');
  orderedDrinks.push([menuItemInstance,size]); //Adds the ordered item's instance/size to the array
  return(orderedDrinks);
}

//----------------------------PHASE 2 FUNCTIONS------------------------------------------------------
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

//-------------------------------PHASE 1 FUNCTIONS-------------------------------------------------------
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
