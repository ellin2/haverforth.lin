// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript

//https://stackoverflow.com/questions/25242397/initialize-array-in-javascript-constructor
// initialize array in class constructor


//Final, part 9
class Stack {
  constructor() { //creates an empty stack
    this.array = [];
    this.length = this.array.length;
    //https://solidfoundationwebdev.com/blog/posts/3-methods-to-get-the-last-element-of-an-array-in-javascript
    this.top = this.array.slice(-1)[0];
  }
  pop() {
    var top = this.top;
    this.array.pop(); //removed return
    this.length -= 1;
    this.top = this.array.slice(-1)[0];
    this.execute(this); //execute is my notify function for the observer pattern
    return top;
  }
  push(number) {
    this.array.push(number);
    this.length += 1;
    this.top = this.array.slice(-1)[0];
    this.execute(this);
  }
}

//http://www.dofactory.com/javascript/observer-design-pattern
//regarding observer function

//https://stackoverflow.com/questions/31067368/javascript-es6-class-extend-without-super
//re: super();

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
//re: classes and inheritance

//subject of my observer pattern
class ObservableStack extends Stack {
  constructor() {
    super();
    this.observers = [];}
  registerObserver(observer){
    this.observers.push(observer);
  }
  execute(arg){
    //for each observer in the list of observers, call it
    //currently, my observers must all take a stack object as an argument
    //this can easily be changed
    this.observers.forEach(function(item){
      item(arg);});
  }
}

//Each time the stack changes,
//your subclass should call observer with the current stack.

//Note that for full credit,
//you should be able to register a list of observers.

//Use registerObserver to register a function which calls renderStack
//for each change to the stack so that you don't have to continually call it.
//ObservableStack.prototype.registerObserver = function(observer) {observer(stack);};


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

//var conditional = {"if" : ifExecute}

//key/value data structure for user-defined functions
var userDict = {};

//stack is an ObservableStack
function emptyStack(stack) {
    while(stack.length > 0) { stack.pop(); }
    stack.length = 0;       //update size of stack
}

//stack is an ObservableStack
function add(stack){
    if (stack.length >= 2) {
      var second = stack.pop();
      var first = stack.pop();
      stack.push(first + second);
    }
    else{
        console.log("Error: Addition requires two operands.");
    }
}

//stack is an ObservableStack
function subtract(stack){
  if (stack.length >= 2) {
    var second = stack.pop();
    var first = stack.pop();
    stack.push(first - second);
  }
    else{
        console.log("Error: Subtraction requires two operands.");
    }
}

//stack is an ObservableStack
function multiply(stack){
  if (stack.length >= 2) {
    var second = stack.pop();
    var first = stack.pop();
    stack.push(first * second);
  }
    else{
        console.log("Error: Multiplication requires two operands.");
    }
}

//stack is an ObservableStack
function divide(stack){
  if (stack.length >= 2) {
    var second = stack.pop();
    var first = stack.pop();
    stack.push(first / second);
  }
    else{
        console.log("Error: Division requires two operands.");
    }
}

//stack is an ObservableStack
function nip(stack){
    if (stack.length == 0) {console.log("Error: Nip called on an empty stack");}
    else if (stack.length == 1) {stack.pop();}
    else{
        var origTop = stack.pop();
        stack.pop();
        stack.push(origTop);
    }
}

//stack is an ObservableStack
function swap(stack){
    if (stack.length == 1) {stack.pop(); stack.push(0);}
    else if (stack.length > 1){
        var origTop = stack.pop();
        var second = stack.pop();
        stack.push(origTop);
        stack.push(second);
    }
}

//stack is an ObservableStack
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

//stack is an ObservableStack
function greaterThan(stack){
    if (stack.length == 0) {console.log("Error: > called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = stack.pop();
    var first = stack.pop();
        if (first > second){stack.push(-1);}
        else{stack.push(0);}
    }
}

//stack is an ObservableStack
function equal(stack){
   if (stack.length == 0) {console.log("Error: = called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = stack.pop();
    var first = stack.pop();
        if (first == second){stack.push(-1);}
        else{stack.push(0);}
    }
}

//stack is an ObservableStack
function lessThan(stack){
    if (stack.length == 0) {console.log("Error: < called on empty stack.");}
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
    //changed stack.slice() to stack.array.slice()
    stack.array.slice().reverse().forEach(function(element) {
        $("#thestack").append("<tr><td>" + element + "</td></tr>");
    });
};

function ifSkip(input){
  console.log("skipping nested ifs");
  var index = 0;
  input.splice(0, 1); //remove current/first element, which is "if"
  //https://stackoverflow.com/questions/2003815/how-to-remove-element-from-an-array-in-javascript
  while (input.length > 0 && input[index] != "endif"){
    if (input[index] == "if") {ifSkip(input);}
    input.splice(0, 1); //remove current/first element
    //index += 1;
  }
}

function elseSkip(input){
  console.log("skipping nested elses");
  var index = 0;
  input.splice(0, 1); //remove current/first element, which is "else"
  while (input.length > 0 && input[index] != "endif"){
    if (input[index] == "else") {elseSkip(input);}
    input.splice(0, 1); //remove current/first element
    //index += 1;
  }
}

function ifExecute(stack, input, terminal){
  //here, input is an array!
  console.log("begin ifExecute");
  console.log(input);
  var token = input[0];
  console.log(token); //should be if
  if (stack.length == 0) {console.log("Error: stack underflow. If condition cannot be checked. Call terminated.");}
  else {
    //var token = input[0];
    if (stack.top == 0){ //condition failed
      stack.pop(); //consume flag
      input.splice(0, 1); //remove current/first element, which is "if"
      token = input[0]; //must update token
      console.log("condition failed, skipping to else");
      while (input.length > 0 && token != "else"){
        console.log(input);
        console.log(token);
        if (token == "if") {ifSkip(input);}
        input.splice(0, 1); //remove current/first element
        token = input[0]; //must update token
      }
      console.log(token); //should be else
      input.splice(0, 1); //remove current/first element, which is else
      token = input[0]; //must update token to be the one after else
      while (input.length > 0 && token != "endif"){
        if (token == "if") {ifExecute(input);}
        else {process(stack, token, terminal);}
        //https://stackoverflow.com/questions/12132178/using-join-method-to-convert-array-to-string-without-commas
        //else {process(stack, input.join(" "), terminal);}
        input.splice(0, 1); //remove current/first element
        token = input[0]; //must update token
      }
      console.log(token); //should be endif
      input.splice(0, 1); //remove current/first element, which is endif
      console.log(input); //should be everything after endif, if anything
    }
    else {          //condition passed
      stack.pop();  //consume flag
      input.splice(0, 1); //remove current/first element, which is "if"
      token = input[0]; //must update token
      console.log("condition passed, executing if");
      while (input.length > 0 && token != "else"){
        if (token == "if") {ifExecute(input);}
        else {process(stack, token, terminal);}
        //else {process(stack, input.join(" "), terminal);}
        input.splice(0, 1); //remove current/first element
        token = input[0]; //must update token
      }
      console.log(token); //should be else
      input.splice(0, 1); //remove current/first element, which is else
      token = input[0]; //must update token to be the one after else
      while (input.length > 0 && token != "endif"){
        if (token == "else") {elseSkip(input);}
        input.splice(0, 1); //remove current/first element
        token = input[0]; //must update token
      }
      console.log(token); //should be endif
      input.splice(0, 1); //remove current/first element, which is endif
      console.log(input); //should be everything after endif, if anything
    }
  }
}


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
  //forgot that input starts out as a STRING, not an array!!
  console.log(input); //added for debugging
  var input = input.trim().split(/ +/); //convert input string into an array
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

    //Final, part 8, dynamically generating buttons
    //https://codepen.io/davidcochran/pen/WbWXoa
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
  }
  //else if (current == "if"){ifExecute(stack, input, terminal);}
  else{
    input.forEach(function(token, index){
    //token is each command in the array "input"
    // The user typed a number
    if (!(isNaN(Number(token)))) {
        print(terminal, "pushing " + Number(token)); //convert string into number
        stack.push(Number(token));
        //input.splice(0, 1); //added
    }
    else if (token === "if"){
      console.log("index: " + index);
      input.splice(0, index);
      ifExecute(stack, input, terminal);
      //input.join to convert array into string
      process(stack, input.join(" "), terminal);
    }
    else if (token === ".s") { //check that this works properly
        //changed stack.slice() to stack.array.slice()
        print(terminal, " <" + stack.length + "> " + stack.array.slice().join(" "));
        //input.splice(0, 1); //added
    }
    else {
        if (token in userDict){
            print(terminal, "executing " + token + " on the stack");
            var def = userDict[token];
            process(stack, def, terminal) //tricky tricky?
            //input.splice(0, 1); //added
        }
        else if (token in predef){
            print(terminal, "executing " + token + " on the stack");
            var def = predef[token];
            def(stack);
            //input.splice(0, 1); //added
        }
        else {
            print(terminal, ":( Unrecognized input");
            //input.splice(0, 1); //added
        }
    }
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

//https://en.wikipedia.org/wiki/Observer_pattern
//re: observer pattern

$(document).ready(function() {
    var terminal = new Terminal();
    //var stack = [];
    var stack = new ObservableStack();
    var render = function(stack){renderStack(stack);};
    stack.registerObserver(render);

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
