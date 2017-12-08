// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
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
/*
predef["-"] = subtract;
predef["*"] = multiply;
predef["/"] = divide;
predef["nip"] = nip;
predef["swap"] = swap;
predef["over"] = over;
predef[">"] = greaterThan;
predef["="] = equal;
predef["<"] = lessThan;
*/

var userDict = {};

/** 
 * Your thoughtful comment here.
 */
function emptyStack(stack) {
    // ...
    stack.length = 0;
}

var resetButton = $("#reset"); // resetButton now references 
                               // the HTML button with ID "reset"
$("#reset").click(function() {stack.length = 0;}

function getTop(stack){
    return stack[stack.length -1];
}

function add(stack){
    if (stack.length >= 2) {
    var second = getTop(stack);
    stack.pop();
    var first = getTop(stack);
    stack.pop();
    stack.push(first + second);
    }
    else{
        print(terminal, "Error: Addition requires two operands.");
    } 
}

function subtract(stack){
    if (stack.length >= 2) {
    var second = getTop(stack);
    stack.pop();
    var first = getTop(stack);
    stack.pop();
    stack.push(first - second);
    }
    else{
        print(terminal, "Error: Subtraction requires two operands.");
    } 
}

function multiply(stack){
    if (stack.length >= 2) {
    var second = getTop(stack);
    stack.pop();
    var first = getTop(stack);
    stack.pop();
    stack.push(first * second);
    }
    else{
        print(terminal, "Error: Multiplication requires two operands.");
    } 
}

function divide(stack){
    if (stack.length >= 2) {
    int second = getTop(stack);
    stack.pop();
    int first = getTop(stack);
    stack.pop();
    stack.push(first / second);
    }
    else{
        print(terminal, "Error: Division requires two operands.");
    } 
}

function nip(stack){
    if (stack.length == 0) {print(terminal, "Error: Nip called on an empty stack");}
    else if (stack.length == 1) {stack.pop();}
    else{
        var origTop = getTop(stack);
        stack.pop();
        stack.pop();
        stack.push(origTop);
    }
}

function swap(stack){
    if (stack.length == 1) {stack.pop(); stack.push(0);}
    else if (stack.length > 1){
        var origTop = getTop(stack);
        stack.pop();
        var second = getTop(stack);
        stack.pop();
        stack.push(origTop);
        stack.push(second);
    }
}

function over(stack){
    if (stack.length < 2) {stack.push(0);}
    else {
        var origTop = getTop(stack);
        stack.pop();
        var second = getTop(stack);
        stack.push(origTop);
        stack.push(second);
    }
}

function greaterThan(stack){
    if (stack.length == 0) {print(terminal, "Error: > called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = getTop(stack);
    stack.pop();
    var first = getTop(stack);
    stack.pop();
        if (first > second){stack.push(-1);}
        else{stack.push(0);}
    }
}

function equal(stack){
   if (stack.length == 0) {print(terminal, "Error: = called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = getTop(stack);
    stack.pop();
    var first = getTop(stack);
    stack.pop();
        if (first == second){stack.push(-1);}
        else{stack.push(0);}
    }
}

function lessThan(stack){
    if (stack.length == 0) {print(terminal, "Error: < called on empty stack.");}
    else if (stack.length == 1) {stack.pop();}
    else{
    var second = getTop(stack);
    stack.pop();
    var first = getTop(stack);
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
    print(terminal, input);
    
    if (!(isNaN(Number(input)))) {
        print(terminal, "pushing " + Number(input)); //convert string into number
        stack.push(Number(input));
    } else if (input === ".s") { //check that this works properly
        print(terminal, " <" + stack.length + "> " + stack.reverse().join(" "));
    } else { //this is new: 
        if (input in userDict){
            print(terminal, "executing " + input + "on the stack");
            var def = userDict[input];
            process(stack, def, terminal) //tricky tricky?
        }
        else if (input in predef){
            print(terminal, "executing " + input + "on the stack"); 
            var def = predef[input];
            stack = def(stack);
        }
        else if (input === ":") { //this is new:
            print(terminal, "reading in user-defined function definition"); 
            var name = ;
            print(terminal, "name: " + name); 
            var def = ;
            print(terminal, "definition: " + def); 
            userDict["name"] = def;
            print(terminal, "thank you for defining the function " + name); 
        }
        else {
            print(terminal, ":( Unrecognized input");
        }
    }
    /*
    } else if (input === "+") { //this can probably be deleted:
        var first = stack.pop();
        var second = stack.pop();
        stack.push(first+second);
    */
    renderStack(stack);
};

function runRepl(terminal, stack) {
    terminal.input("Type a forth command:", function(line) {
        print(terminal, "User typed in: " + line);
        var tokens = line.trim().split(/ +/); //new var "tokens" that is an array of strings
        process(stack, tokens, terminal); //changed "line" to "tokens"
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
