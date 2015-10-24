/*Takes a long time to compile and infinite loops, doesnt go past main screen? *HELP**/
/*Variables**********************************************************************************************************/

var UI = require('ui');              //Default
var Vector2 = require('vector2');    //Default
var Vibe = require('ui/vibe');
var mathOperators = ['+', '-', '*']; //Math operators
var losses = 0;                      //Tracks losses, game should end on 3 losses
var lossString = '';
var correct = ['Yeah!',              //Different win messages
               'That is right!', 'Awesome!', 'Correct', '<(^-^<)', '^(^-^)^', '(>^-^)>', 'Well arent you good.'];  
var incorrect = ['No',               //Different lose messages
                 'Thats not it', 'Try harder!', 'Not quite', ':(', ':""(', 'Incorrect'];    
//Initializes random equation
var equation = '';
//Generates answers to equation above, stores in array
var answers = ['', '', ''];

//Create the background color for the main screen
var background = new UI.Text({
  position: new Vector2(0, 0),
  //size of screen?
  size: new Vector2(144, 168),
  text:'',
  backgroundColor:'chromeYellow'
});
//Create the background color for the question screen
var qBG = new UI.Text({
  position: new Vector2(0, 0),
  //size of screen?
  size: new Vector2(144, 168),
  text:'',
  backgroundColor:'cobaltBlue'
});
//Create the background color for the splash screen
var sBG = new UI.Text({
  position: new Vector2(0, 0),
  //size of screen?
  size: new Vector2(144, 168),
  text:'',
  backgroundColor:'green'
});
var circle = new UI.Circle({
  position: new Vector2(0, 0),
  radius: 75,
  backgroundColor: 'vividCerulean',
});
var circle1 = new UI.Circle({
  position: new Vector2(-25, 90),
  radius: 45,
  backgroundColor: 'vividCerulean',
});
var circle2 = new UI.Circle({
  position: new Vector2(100, -25),
  radius: 45,
  backgroundColor: 'vividCerulean',
});
var circle3 = new UI.Circle({
  position: new Vector2(-20, 160),
  radius: 25,
  backgroundColor: 'vividCerulean',
});
var circle4 = new UI.Circle({
  position: new Vector2(0, 0),
  radius: 80,
  backgroundColor: 'yellow',
});
var circle5 = new UI.Circle({
  position: new Vector2(-25, 90),
  radius: 50,
  backgroundColor: 'yellow',
});
var circle6 = new UI.Circle({
  position: new Vector2(100, -25),
  radius: 50,
  backgroundColor: 'yellow',
});
var circle7 = new UI.Circle({
  position: new Vector2(-20, 160),
  radius: 30,
  backgroundColor: 'yellow',
});

var mainText = new UI.Text({
  position: new Vector2(50, 50),
  size: new Vector2(100, 100),
  font: 'bitham-30-black',
  text: 'Cole is gey :^)',
  textAlign: 'center'
});
//MAIN - todo
var main = new UI.Window({
  fullscreen: true,
});
var gameOver = new UI.Window({
  fullscreen: true,
});

//Creates new window (is displayed with equation & answers)
var wind = new UI.Window({
  fullscreen: true,
  action: {
    //need to put images here
    up: '',
    down: '',
    select: '',
    backgroundColor: 'white'
  }
});

//Creates new window (is displayed after user answers)
var splash = new UI.Window({
  fullscreen: true,
  action: {
    select: '',
    backgroundColor: 'white'
    }
});

var lossText = new UI.Text({
  position: new Vector2(0, 120),
  size: new Vector2(100, 30),
  font: 'gothic-24-bold',
  text: '',
  textAlign: 'center'
});
//Text for first answer
var ansA = new UI.Text({
  position: new Vector2(0, 40),
  size: new Vector2(100, 30),
  font: 'gothic-24-bold',
  text: '',
  textAlign: 'left'
});

//Text for 2nd answer
var ansB = new UI.Text({
  position: new Vector2(0, 80),
  size: new Vector2(100, 30),
  font: 'gothic-24-bold',
  text: '',
  textAlign: 'left'
});

//Text for 3rd answer
var ansC = new UI.Text({
  position: new Vector2(0, 120),
  size: new Vector2(100, 30),
  font: 'gothic-24-bold',
  text: '',
  textAlign: 'left'
});

//Text for Equation
var textfield = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(200, 30),
  font: 'gothic-24-bold',
  text: '',
  textAlign: 'left'
});

//Text containing the correct/incorrect string (displayed on splash screen)
var result = new UI.Text({
  position: new Vector2(0, 65),
  size: new Vector2(200, 30),
  font: 'gothic-24-bold',
  text: '',
  textAlign: 'center'
});

/*Functions********************************************************************************/

//returns an int in the range [min, max]
function random(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//Displays losses as strikes 'X'
function lossToString(losses){
  for(var i = 0; i < losses; i++){
  lossString += 'X';
  }
}
//returns an int in the range [min, max] excluding 0
function randomNonZero(min, max){
  var val = Math.floor(Math.random() * (max - min + 1) + min);
  while(val === 0){
    val = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return val;
}

//checks if the users answer is correct
function checkAns(answers,    //array of possible answers 
                  btn,        //button pressed by user 0, 1, 2
                  correct)    //Correct answer 
                          {  
  return answers[btn] === correct;
}

//Generates a random equation of the form a (+ - *) b = c
function generateEquation(){
  var a, b, c, o;
  a = random(1, 10);
  b = random(1, 10);
  
  //generates random number corrresponding to operator
  o = random(0, 2);
  if(o===0){
    c = a+b;
  }else if(o===1){
    c = a-b;
  }else if(o===2){
    c = a*b;
  }
  var equation = {
    //Creates a string out of the equation
    stringify : '' + a + mathOperators[o] + b + '=' + '___',
    first : a,
    second : b,
    operator: o,
    result : c,
    //Possible "options" that the user can pick
    options : {
      a1 : c,                           //The correct answer
      a2 : c + randomNonZero(-3, 3),    // c +- 3
      //Add a check to make sure a3 != a2
      a3 : c + randomNonZero(-3, 3)     //c +- 3 & != a2
      }
  };
  return equation;
}

//function that randomizes an array of n elements
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  //returns shuffled array
  return array;
}

//recursively loops program until 3 losses
function loadEQ(losses){
  //Generates a random equation
  equation = generateEquation();
  //Generates answers to equation above, stores in array
  answers = [equation.options.a1, equation.options.a2, equation.options.a3];
  //Shuffles above array
  shuffle(answers);
  
  //populates choices
  ansA.text('A) ' + answers[0]);
  ansB.text('B) ' + answers[1]);
  ansC.text('C) ' + answers[2]);
  //turns equation into string and outputs it
  textfield.text(equation.stringify);
  
  //Adds all text elements to 'wind' and shows wind
  wind.add(textfield);
  wind.add(ansA);
  wind.add(ansB);
  wind.add(ansC);
  wind.show();

  //should make this an if/else because it assumes the buttons will be pressed regardless******************
  //If user selects first answer 'UP'
  wind.on('click', 'up', function(e) {
    //checks to see if answers[0] = correct answer
    if(checkAns(answers, 0, equation.options.a1)){
      //sets result string from 'result' to a random congratulatory message
      result.text(correct[random(0, correct.length-1)]);
      sBG.backgroundColor('green');
    }else{
      //sets result string from 'result' to a random failed message
      Vibe.vibrate('short');
      losses++;
      lossText.text(lossToString(losses));
      result.text(incorrect[random(0, incorrect.length-1)]);
    }
    //adds the result text to splash screen and shows splash screen
    splash.add(sBG);
    splash.add(result);
    splash.add(lossText);
    splash.show();
  });

  //If user selects 2nd answer 'SELECT'
  wind.on('click', 'select', function(e) {
    //checks to see if answers[1] = correct answer
    if(checkAns(answers, 1, equation.options.a1)){
      //sets result string from 'result' to a random congratulatory message
      result.text(correct[random(0, correct.length-1)]);
    }else{
      //sets result string from 'result' to a random failed message
      Vibe.vibrate('short');
      losses++;
      lossText.text(lossToString(losses));
      result.text(incorrect[random(0, incorrect.length-1)]);
    }
    //adds the result text to splash screen and shows splash screen
    splash.add(result);
    splash.add(lossText);
    splash.show();
  });

  //If user selects 3rd answer 'dOWN'
  wind.on('click', 'down', function(e) {
    //checks to see if answers[2] = correct answer
    if(checkAns(answers, 2, equation.options.a1)){
      //sets result string from 'result' to a random congratulatory message
      result.text(correct[random(0, correct.length-1)]);
    }else{
      //sets result string from 'result' to a random failed message
      Vibe.vibrate('short');
      losses++;
      lossText.text(lossToString(losses));
      result.text(incorrect[random(0, incorrect.length-1)]);
    }splash.add(lossText);
    //adds the result text to splash screen and shows splash screen
    splash.add(result);
    splash.add(lossText);
    splash.show();
  });
  
  //SHOULD remove splash window when select is pressed
  wind.on('click', 'select', function(e) {
    splash.hide();
  });
  
  if(losses >= 3){
  //go to gameover screen TBC
    gameOver.add(sBG);
    mainText.text('u lose lOL!!1');
    gameOver.add(mainText);
  }
  loadEQ(losses);
  
}


/*Main Program*************************************************************************************************************/
//User greeted with start screen
wind.add(qBG);
main.add(background);
main.add(mainText);
main.add(circle4);
main.add(circle5);
main.add(circle6);
main.add(circle7);
main.add(circle);
main.add(circle1);
main.add(circle2);
main.add(circle3);
main.show();

//When user starts...
main.on('click', 'select', function(e) {
//Sets losses to 0  
losses = 0;
loadEQ(losses);
  
});//end main



