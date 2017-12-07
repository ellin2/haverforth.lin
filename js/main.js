// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
var words = {};

/** 
 * Your thoughtful comment here.
 */
function emptyStack(stack) {
    // ...
    stack.length = 0;
}

/* //reset button and emptyStack()
var resetButton = $("#reset"); // resetButton now references 
                               // the HTML button with ID "reset"
$("#reset").click(function() {
  $( stack ).emptyStack();
});
*/

function getTop(stack){
    return stack[stack.length -1];
}

function add(stack){
    if (stack.length >= 2) {
    var second = stack.getTop;
    stack.pop();
    var first = stack.getTop;
    stack.pop();
    stack.push(first + second);
    }
    else{
        print(terminal, "Error: Addition requires two operands.");
    } 
}

function subtract(stack){
    if (stack.length >= 2) {
    var second = stack.getTop;
    stack.pop();
    var first = stack.getTop;
    stack.pop();
    stack.push(first - second);
    }
    else{
        print(terminal, "Error: Subtraction requires two operands.");
    } 
}

function multiply(stack){
    if (stack.length >= 2) {
    var second = stack.getTop;
    stack.pop();
    var first = stack.getTop;
    stack.pop();
    stack.push(first * second);
    }
    else{
        print(terminal, "Error: Multiplication requires two operands.");
    } 
}

function divide(stack){
    if (stack.length >= 2) {
    int second = stack.getTop;
    stack.pop();
    int first = stack.getTop;
    stack.pop();
    stack.push(first / second);
    }
    else{
        print(terminal, "Error: Division requires two operands.");
    } 
}

/*
function sub(stack){
    var second = stack.getTop;
    stack.pop();
    var first = stack.getTop;
    stack.pop();
    stack.push(first + second);
}
*/

function nip(stack){
    if (stack.length == 0) {print(terminal, "Error: Nip called on an empty stack");}
    else if (stack.length == 1) {stack.pop();}
    else{
        var origTop = stack.getTop();
        stack.pop();
        stack.pop();
        stack.push(origTop);
    }
}

function swap(stack){
    if (stack.length == 1) {stack.pop(); stack.push(0);}
    else if (stack.length > 1){
        var origTop = stack.getTop();
        stack.pop();
        var second = stack.getTop();
        stack.pop();
        stack.push(origTop);
        stack.push(second);
    }
}

function over(stack){
    if (stack.length < 2) {stack.push(0);}
    else {
        var origTop = stack.getTop();
        stack.pop();
        var second = stack.getTop();
        stack.push(origTop);
        stack.push(second);
    }
}

function greaterThan(stack){
    if (stack.length == 0) {print(terminal, "Error: > called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = stack.getTop;
    stack.pop();
    var first = stack.getTop;
    stack.pop();
        if (first > second){stack.push(-1);}
        else{stack.push(0);}
    }
}

function equal(stack){
   if (stack.length == 0) {print(terminal, "Error: = called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = stack.getTop;
    stack.pop();
    var first = stack.getTop;
    stack.pop();
        if (first == second){stack.push(-1);}
        else{stack.push(0);}
    }
}

function lessThan(stack){
    if (stack.length == 0) {print(terminal, "Error: < called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = stack.getTop;
    stack.pop();
    var first = stack.getTop;
    stack.pop();
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
    stack.reverse().forEach(function(element) {
        $("#thestack").append("<tr><td>" + element + "</td></tr>");
    });
};

/** 
 * Process a user input, update the stack accordingly, write a
 * response out to some terminal.
 * @param {Array[Number]} stack - The stack to work on
 * @param {string} input - The string the user typed
 * @param {Terminal} terminal - The terminal object
 */

function process(stack, input, terminal) {
    // The user typed a number
    if (!(isNaN(Number(input)))) {
        print(terminal,"pushing " + Number(input)); //convert string into number
        stack.push(Number(input));
    } else if (input === ".s") {
        print(terminal, " <" + stack.length + "> " + stack.join(" "));
    } else if (input === "+") {
        var first = stack.pop();
        var second = stack.pop();
        stack.push(first+second);
    } else {
        print(terminal, ":-( Unrecognized input");
    }
    renderStack(stack);
};

function runRepl(terminal, stack) {
    terminal.input("Type a forth command:", function(line) {
        print(terminal, "User typed in: " + line);
        process(stack, line, terminal);
        runRepl(terminal, stack);
    });
};

// Whenever the page is finished loading, call this function. 
// See: https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {
    var terminal = new Terminal();
    terminal.setHeight("400px");
    terminal.blinkingCursor(true);
    
    // Find the "terminal" object and change it to add the HTML that
    // represents the terminal to the end of it.
    $("#terminal").append(terminal.html);

    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");

    runRepl(terminal, []);
});
