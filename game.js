// alert("welcome!");

var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var level=0;
var userClickedPattern=[];
var started=false;
$(document).keypress(function(){

    if(!started )
    {
        console.log("Initial level="+level);
        $("#level-title").text("LEVEL "+level);
        console.log("after initial level="+level);

        nextSequence();
        started=true;
    }

})

$(".btn").click(function(){
    var userChosenColour =$(this).attr("id");
     userClickedPattern.push(userChosenColour);
     playSounds(userChosenColour);
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length-1);
})

function playSounds(n){
    var audio=new Audio("sounds/"+n+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")},100)
}


function nextSequence()
{
    console.log("Inside nextSequence()");

    userClickedPattern=[];


    var randomNumber=Math.floor(Math.random()*4);
     level=level+1;
     $("#level-title").text("LEVEL "+level);

     var randomChoosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChoosenColor);
    console.log(randomChoosenColor);


    $("div #"+randomChoosenColor).click(function(){
        var audio=new Audio("sounds/"+randomChoosenColor+".mp3");
        audio.play();

        level=level+1;
        $("#level-title").text("LEVEL "+level);

    })

}


function checkAnswer(currentLevel)
{
console.log("Inside checkAnswer()");

    console.log( "userClickedPattern[currentLevel]="+userClickedPattern[currentLevel]);
    console.log("gamePattern[currentLevel]="+gamePattern[currentLevel]);

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
      {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
          setTimeout(nextSequence,1000);
        }

      }
    else{
        console.log("wrong");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
  
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200)
       $("#level-title").text("Game Over, Press Any Key to Restart");

       $(document).keypress(function(){
        startOver();
       })
    }


}
    function startOver(){
        console.log("Inside Startover Function");
       level=0;
       gamePattern=[];
       started=false;
    }



