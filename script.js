var buttonColours=["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern=[];
var myClickPattern=[];
var level =0;
var started = false;
$(document).keydown(function() {
  if (!started){
   $("#level-title").text("level "+level);
 
    nextSequence(); 
  
  
  started = true;
  }
});


function nextSequence(){
  userClickedPattern=[]
  level++;
  $("#level-title").text("level "+level);
  var randomNumber= Math.floor( Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
flash("#"+randomChosenColour,200);
mySound(randomChosenColour);

//checkAnswer();//
}
//$(document).ready(nextSequence);//
function flash(selector,duration){
       
          $(selector).animate({opacity:0.5},duration).animate({opacity:1},duration); 
}
/**$(".btn").click(function () {
  nextSequence();
});**/

$(".btn").click(handler);

function handler(){                         //use this to store/set attributes
  var userChosenColor = $(this).attr("id");//this has no reference to the original element
  userClickedPattern.push(userChosenColor);
  var myClick= $(this).attr('id');
  myClickPattern.push(myClick);
  mySound(myClick);
  $(this).addClass("pressed");
setTimeout(() => {
  $(this).removeClass("pressed");
  }, 100);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
}

function mySound(name) {
  
  var audio = new Audio ("./sounds/"+ name +".mp3");
  audio.play();
}




function checkAnswer(currentLevel) {
  
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length===gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);}
      
      else{
        console.log("false");
      }
    
      
  }
  else{
    
    
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio ('./sounds/wrong.mp3');
    audio.play();
    $("h1").text( "Game Over, Press Any Key to Restart");
    $(document).keydown(function(){
    startedOver();
        });
    };

  }

function startedOver() {
  level =0;
  gamePattern =[];
  started = false;
}
