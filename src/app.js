
var UI = require('ui');              //Default
var Vector2 = require('vector2');    //Default
var mathOperators = ['+', '-', '*']; //Math operators
var losses = 0;                      //Tracks losses, game should end on 3 losses
var correct = ['Yeah!',              //Different win messages
               'That is right!', 'Awesome!', 'Correct', '<(^-^<)', '^(^-^)^', '(>^-^)>', 'Well arent you good.'];  
var incorrect = ['No',               //Different lose messages
                 'Thats not it', 'Try harder!', 'Not quite', ':(', ':""(', 'Incorrect'];    

//returns an int in the range [min, max]
function random(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
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
    stringify : '' + a + mathOperators[o] + b + '=' + '__',
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


//MAIN - todo
var main = new UI.Card({
  title: 'Main screen',
  icon: 'images/menu_icon.png',
  subtitle: 'Small Game desc',
  body: 'Long game desc'
});

main.show();


//When user starts...
main.on('click', 'select', function(e) {
  //starting point
  //Generates a random equation
  var equation = generateEquation();
  //Generates answers to equation above, stores in array
  var answers = [equation.options.a1, equation.options.a2, equation.options.a3];
  //Shuffles above array
  shuffle(answers);
  
  //Creates new window (is displayed with equation & answers)
  var wind = new UI.Window({
    fullscreen: true,
    action: {
      //need to put images here
      up: random(0,5),
      down: random(0,5),
      select: random(0,5),
      backgroundColor: 'white'
    }
  });
  
  //Creates new window (is displayed after user answers)
  var splash = new UI.Window({
    fullscreen: true,
    background: 'white'
  });
  
  //Text for first answer
  var ansA = new UI.Text({
    position: new Vector2(0, 40),
    size: new Vector2(100, 30),
    font: 'gothic-24-bold',
    text: 'A) ' + answers[0],
    textAlign: 'left'
  });
  
  //Text for 2nd answer
    var ansB = new UI.Text({
    position: new Vector2(0, 80),
    size: new Vector2(100, 30),
    font: 'gothic-24-bold',
    text: 'B) ' + answers[1],
    textAlign: 'left'
  });
  
  //Text for 3rd answer
    var ansC = new UI.Text({
    position: new Vector2(0, 120),
    size: new Vector2(100, 30),
    font: 'gothic-24-bold',
    text: 'C) ' + answers[2],
    textAlign: 'left'
  });
  
  //Text for Equation
  var textfield = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(200, 30),
    font: 'gothic-24-bold',
    text: equation.stringify,
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

  //Adds all text elements to 'wind' and shows wind
  wind.add(textfield);
  wind.add(ansA);
  wind.add(ansB);
  wind.add(ansC);
  wind.show();
  
  //If user selects first answer 'UP'
  wind.on('click', 'up', function(e) {
    //checks to see if answers[0] = correct answer
    if(checkAns(answers, 0, equation.options.a1)){
      //sets result string from 'result' to a random congratulatory message
      result.text(correct[random(0, correct.length-1)]);
    }else{
      //sets result string from 'result' to a random failed message
      result.text(incorrect[random(0, incorrect.length-1)]);
    }
    //adds the result text to splash screen and shows splash screen
    splash.add(result);
    splash.show();
  });
  
  //If user selects first answer 'UP'
  wind.on('click', 'select', function(e) {
    //checks to see if answers[1] = correct answer
    if(checkAns(answers, 1, equation.options.a1)){
      //sets result string from 'result' to a random congratulatory message
      result.text(correct[random(0, correct.length-1)]);
    }else{
      //sets result string from 'result' to a random failed message
      result.text(incorrect[random(0, incorrect.length-1)]);
    }
    //adds the result text to splash screen and shows splash screen
    splash.add(result);
    splash.show();
  });
  
  //If user selects first answer 'UP'
  wind.on('click', 'down', function(e) {
    //checks to see if answers[2] = correct answer
    if(checkAns(answers, 2, equation.options.a1)){
      //sets result string from 'result' to a random congratulatory message
      result.text(correct[random(0, correct.length-1)]);
    }else{
      //sets result string from 'result' to a random failed message
      result.text(incorrect[random(0, incorrect.length-1)]);
    }
    //adds the result text to splash screen and shows splash screen
    splash.add(result);
    splash.show();
  });
  
  //SHOULD hide splash screen, but it doesnt
  splash.hide();



});//end main



