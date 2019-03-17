These scripts helped to review the concepts of object orientation, and also practice Javascript programming skills.

A drink menu is implemented through the use of Javascript classes.

The assignment was done using JSfiddle, an online Javascript IDE.

Design Phase 1: Menu

In this phase, you will design a class to represent menu items, create 6 instances and use them to define another class called Menu.

1. On JSfiddle, create a new “fiddle" for your code.
2. Create a class "MenuItem", with a constructor.
3. Create instances of MenuItems for the following items on the menu: Bananaberry, Mango Magic, Green Smoothie, Brazilian Sunrise, Purple Popeye, Beet Booster. Use the console to examine the instances, and make sure they represent their items correctly.
4. Create a class "Menu", which provides access to one or more MenuItem instances. It has: 1) an addMenuItem() method which can add a MenuItem to the menu; 2) a findMenuItems(ingredient) method which returns all the MenuItems that contain the ingredient.
5. Create an instance of the Menu class, add the 6 MenuItem instances to it, and use the find-MenuItems() method to find the items which are made with bananas.
6. Press the "Save" button (or "Update" button if you have pressed "Save" before) to create a URL to your code.

Design Phase 2: Order
In this phase, you will implement the code to support customer orders. Follow the instructions below:
1. Fork your phase 1 code, to generate a new fiddle for this phase.
2. Create a class "Drink" to represent actual drinks that the customers want to order. (Hint: The
constructor takes a MenuItem instance, and a string representing the desired size: "Small" or
"Regular").
3. Create a class "Order" to represent a customer order, which may contain one or more drinks.
The class has methods for adding a drink, calculating total cost, and calculating total calories.
4. Exercise your Order class by creating an instance, adding at least two drinks, and checking
if the total cost and calories are correct.
5. Press the "Update" button to create a URL to your code.

Design Phase 3: Inventory
In this phase, you will implement the code to support store inventory for making drinks. Follow the
instructions below:
1. Fork your phase 2 code, to generate a new fiddle for this phase.
2. Create a class "Inventory" that holds the number of servings available for each ingredient in
a store.
3. Create an instance of the Inventory class, and set the inventory for a few of the ingredients in
our menu items.
4. Create a class "Store". A store is constructed with an inventory instance which determines
whether or not it has sufficient ingredients to make a drink. (Assumption: a regular size drink
needs 2 servings of each ingredient, and a small size needs 1 serving of each ingredient.)
5. Create a "placeOrder" method which accepts an Order instance and attempts to fulfill it. It will
return an array of all the drink instances it was able to make without running out of ingredients.
6. Press the "Update" button to create a URL to your code.
