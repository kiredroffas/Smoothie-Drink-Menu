/* Erik Safford
	 CS 320
   PA2 - Drink Menu in JavaScript
   Design Phase 1: Menu
   September 2018 */

function MenuItem(type,ingredients) {  //Creates a 'class' MenuItem, w/constructor
  this.type = type;  //type is the name of the drink
  this.ingredients = ingredients;  //ingredients is an array containing the drink's ingredients
}
let s1 = new MenuItem('Bananaberry',['bananas','strawberries']); //Create instances of MenuItems
let s2 = new MenuItem('Mango Magic',['mango','strawberries','pineapple','coconut creme']);
let s3 = new MenuItem('Green Smoothie',['bananas','spinach']);
let s4 = new MenuItem('Brazilian Sunrise',['bananas','acai','blueberries','granola']);
let s5 = new MenuItem('Purple Popeye',['spinach','apples','beets','cucumbers']);
let s6 = new MenuItem('Beet Booster',['beets','oranges','apples']);

//Use console to examine instances to make sure they are represented correctly
console.log('Smoothie #1 is type: ' + s1.type + ', and has great ingredients like: ' + 	s1.ingredients);
console.log('Smoothie #2 is type: ' + s2.type + ', and has great ingredients like: ' + 	s2.ingredients);
console.log('Smoothie #3 is type: '+ s3.type +', and has great ingredients like: '+ s3.ingredients);
console.log('Smoothie #4 is type: ' + s4.type + ', and has great ingredients like: ' + s4.ingredients);
console.log('Smoothie #5 is type: ' + s5.type + ', and has great ingredients like: ' + s5.ingredients);
console.log('Smoothie #6 is type: '+ s6.type +', and has great ingredients like: '+ s6.ingredients);

let letsGo = new Menu();  //Start a new Menu() instance

function Menu() {  //provides access to MenuItem instances
  let menuArray = [];  //array that is the 'Menu'
  addMenuItem(menuArray,s1); //Adds the 6 MenuItem instances to the Menu
  addMenuItem(menuArray,s2);
  addMenuItem(menuArray,s3);
  addMenuItem(menuArray,s4);
  addMenuItem(menuArray,s5);
  addMenuItem(menuArray,s6);

  let foundItemArray = findMenuItems(menuArray,'bananas');  //Finds the items that are made with bananas
  for(let m = 0;m < foundItemArray.length;m++){
    console.log(foundItemArray[m].type); //Prints 2nd half (items containing the specified ingredient)
  }
}
//------------------------------------------------------------------------------------------------------
function addMenuItem(menuArray,sNew) {  //Adds an item to the menuArray
  menuArray.push(sNew); //pushes a MenuItem instance onto the end of the Menu array
  console.log(sNew.type + ' has been added to the Menu');
}
function findMenuItems(menuArray,ingredient) {  //Searches the passed menuArray and returns all the MenuItems containing the specified ingredient
  console.log('Searching for: '+ingredient);
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
