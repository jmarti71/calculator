# Adaptive Calculator
Check it out: https://jmarti71.github.io/calculator/

## Overview
Adaptive Calculator is an interactive webpage where users can operate a functional calculator. This webpage is made with HTML, CSS and JavaScript. Adaptive calculator gets its name from the feature that allows the calculator screen to extend if users enter a large number.

### Interactivity
Adaptive calulator makes use of the CSS transform property to scale up each button when the user hovers their mouse over it. It also displays a border around the button when it is clicked. These features are used to enhance the interactivity of the page and bring it to life.

### Design
This calculator works by taking strings of the entered values and converting the strings to float types immediately before doing the desired calculation. Because we are performing a calculation on float types, our resulting value will also be of type float. Due to the fact that entered values are string types and resulting values are floats (i.e. numbers), I incorporated conditional statements based on whether certain variables are of type number or string. I mainly used these conditionals to determine if I am performing an operation on an obtained result value or a value entered before a result has been obtained. With every number entered and result obtained, the calculator's "screen" is updated to give the user instant feedback on their selections. Regarding errors, there are two scenarios that will dislplay an error message. One is when a user divides by zero, because we all know what that means. The other error message will display if a user enters two operators in a row with no number between them or if the user selects the equals button without entering a second numeric value after an operator is selected.
