// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript

//https://stackoverflow.com/questions/25242397/initialize-array-in-javascript-constructor
// initialize array in class constructor

/*
//Final, part 9
class Stack {
  constructor() { //creates an empty stack
    //this.length = 0;
    this.array = [];
  }
  pop() {
    //this.length -= 1;
    return this.array.pop();
  }
  push(number) {
    this.array.push(number);
    //this.length += 1;
  }
}
*/

//key/value data structure of name-function pairs for built-in functions
var predef = {"+" : add,
              "-" : subtract,
              "*" : multiply,
              "/" : divide,
              "nip" : nip,
              "swap" : swap,
              "over" : over,
              ">" : greaterThan,
              "=" : equal,
              "<" : lessThan
             };

//key/value data structure for user-defined functions
var userDict = {};

//stack is an array
function emptyStack(stack) {
    stack.length = 0;
    //while(stack.length > 0) {  stack.pop(); }
    renderStack(stack);
}

//stack is an array
function add(stack){
    if (stack.length >= 2) {
      var second = stack.pop();
      var first = stack.pop();
      stack.push(first + second);
    }
    else{
        print(terminal, "Error: Addition requires two operands.");
    }
}

//stack is an array
function subtract(stack){
  if (stack.length >= 2) {
    var second = stack.pop();
    var first = stack.pop();
    stack.push(first - second);
  }
    else{
        print(terminal, "Error: Subtraction requires two operands.");
    }
}

//stack is an array
function multiply(stack){
  if (stack.length >= 2) {
    var second = stack.pop();
    var first = stack.pop();
    stack.push(first * second);
  }
    else{
        print(terminal, "Error: Multiplication requires two operands.");
    }
}

//stack is an array
function divide(stack){
  if (stack.length >= 2) {
    var second = stack.pop();
    var first = stack.pop();
    stack.push(first / second);
  }
    else{
        print(terminal, "Error: Division requires two operands.");
    }
}

//stack is an array
function nip(stack){
    if (stack.length == 0) {print(terminal, "Error: Nip called on an empty stack");}
    else if (stack.length == 1) {stack.pop();}
    else{
        var origTop = stack.pop();
        stack.pop();
        stack.push(origTop);
    }
}

//stack is an array
function swap(stack){
    if (stack.length == 1) {stack.pop(); stack.push(0);}
    else if (stack.length > 1){
        var origTop = stack.pop();
        var second = stack.pop();
        stack.push(origTop);
        stack.push(second);
    }
}

//stack is an array
function over(stack){
    if (stack.length < 2) {stack.push(0);}
    else {
        var origTop = stack.pop();
        var second = stack.pop();
        stack.push(second);
        stack.push(origTop);
        stack.push(second);
    }
}

//stack is an array
function greaterThan(stack){
    if (stack.length == 0) {print(terminal, "Error: > called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = stack.pop();
    var first = stack.pop();
        if (first > second){stack.push(-1);}
        else{stack.push(0);}
    }
}

//stack is an array
function equal(stack){
   if (stack.length == 0) {print(terminal, "Error: = called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = stack.pop();
    var first = stack.pop();
        if (first == second){stack.push(-1);}
        else{stack.push(0);}
    }
}

//stack is an array
function lessThan(stack){
    if (stack.length == 0) {print(terminal, "Error: < called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = stack.pop();
    var first = stack.pop();
        if (first < second){stack.push(-1);}
        else{stack.push(0);}
    }
}

/**
 * Print a string out to the terminal, and update its scroll to the
 * bottom of the screen. You should call this so the screen is
 * properly scrolled.
 * @param {Terminal} terminal - The `terminal` object to write to
 * @param {string}   msg      - The message to print to the terminal
 */
function print(terminal, msg) {
    terminal.print(msg);
    $("#terminal").scrollTop($('#terminal')[0].scrollHeight + 40);
}

/**
 * Sync up the HTML with the stack in memory
 * @param {Array[Number]} The stack to render
 */

function renderStack(stack) {
    $("#thestack").empty();
    stack.slice().reverse().forEach(function(element) {
        $("#thestack").append("<tr><td>" + element + "</td></tr>");
    });
};


//https://stackoverflow.com/questions/43295840/javascript-how-to-start-foreach-loop-at-some-index
//forEach with array indexing

//https://stackoverflow.com/questions/1418050/string-strip-for-javascript
// trim and split to make string into array of strings

/**
 * Process a user input, update the stack accordingly, write a
 * response out to some terminal.
 * @param {Array[Number]} stack - The stack to work on
 * @param {string} input - The string the user typed
 * @param {Terminal} terminal - The terminal object
 */
function process(stack, input, terminal) {
  var input = input.trim().split(/ +/); //new var "tokens" that is an array of strings
  if (input[0] === ":"){
    print(terminal, "reading in user-defined function");
    var name = input[1];
    print(terminal, "name: " + name);
    var def = "";
    input.slice(2, input.length - 1).forEach(function(input){
      def += input + " ";
    });
    print(terminal, "definition: " + def);
    userDict[name] = def;
    print(terminal, "thank you for defining the function " + name);
    
    /*
    //Final, part 8, dynamically generating buttons
    //https://codepen.io/davidcochran/pen/WbWXoa
    //the below works
    // 1. Create the button
    var button = document.createElement("button");
    button.innerHTML = name;

    // 2. Append somewhere
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);

    // 3. Add event handler
    button.addEventListener ("click", function() {
      process(stack, userDict[name], terminal);
    });
    */
  }
  else{
    input.forEach(function(input){ //(stack, tokens, terminal)); //changed "line" to "tokens"
    // The user typed a number
    if (!(isNaN(Number(input)))) {
        print(terminal, "pushing " + Number(input)); //convert string into number
        stack.push(Number(input));
    } else if (input === ".s") { //check that this works properly
        print(terminal, " <" + stack.length + "> " + stack.slice().join(" "));
    } else { //this is new:
        if (input in userDict){
            print(terminal, "executing " + input + " on the stack");
            var def = userDict[input];
            process(stack, def, terminal) //tricky tricky?
        }
        else if (input in predef){
            print(terminal, "executing " + input + " on the stack");
            var def = predef[input];
            def(stack);
        }
        else {
            print(terminal, ":( Unrecognized input");
        }
    }
  renderStack(stack);
  });}
};


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//documentation on forEach

function runRepl(terminal, stack) {
    terminal.input("Type a forth command:", function(line) {
        print(terminal, "User typed in: " + line);
        process(stack, line, terminal);
        runRepl(terminal, stack);
    });
};

//https://www.phpied.com/3-ways-to-define-a-javascript-class/
//classes and intializing a class instance

// Whenever the page is finished loading, call this function.
// See: https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {
    var terminal = new Terminal();
    var stack = [];
    //var stack = new Stack();
    var resetButton = $("#reset"); // resetButton now references
                                   // the HTML button with ID "reset"
    terminal.setHeight("400px");
    terminal.blinkingCursor(true);
    // Find the "terminal" object and change it to add the HTML that
    // represents the terminal to the end of it.
    $("#terminal").append(terminal.html);
    $("#reset").click(function() {emptyStack(stack);});

    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");

    runRepl(terminal, stack);
});
