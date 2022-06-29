
let colours = [];
let colourSeq = [];
let flag = true;
let userClickedSeq = [];
let lvl = 0;
let isGameover = false;
let difficultyClicked="";
let currentDiffLvl="";

$(".back").on("click",function(){

    $(".back").addClass("pressed");
    setTimeout(function () {
        $(".back").removeClass("pressed");
    }, 50);

    $("h1").text("Select Difficulty");

    console.log("button clickd");

    $(".back").addClass("displayclass");
    
    console.log("curent diff lvl is="+currentDiffLvl);
    // $("."+currentDiffLvl).slideUp();
    
    $("."+currentDiffLvl).fadeOut("normal",function(){
        

        
        $("."+currentDiffLvl).removeClass(currentDiffLvl+"pattern");
        if($("btn").hasClass("lvl1pattern")){
            $("btn").removeClass("lvl1pattern")
        }
        if($("btn").hasClass("lvl2pattern")){
            $("btn").removeClass("lvl2pattern")
        }
        if($("btn").hasClass("lvl3pattern")){
            $("btn").removeClass("lvl3pattern")
        }
        $("."+currentDiffLvl).addClass("displayclass");
    });

    
    setTimeout(function () {
        $(".container2").removeClass("displayclass");
        $(".container2").slideDown();
    }, 400);

})

$(".lvlbtn").on("click",function(){

    difficultyClicked=$(this).attr("id");

    $("#" + difficultyClicked).addClass("pressed");
    setTimeout(function () {
        $("#" + difficultyClicked).removeClass("pressed");
    }, 50);

    console.log(difficultyClicked);
    // $(".back").removeClass("displayclass");
    ChooseDifficulty(difficultyClicked);
});



function ChooseDifficulty(difficultyClicked){
    switch (difficultyClicked) {
        case "beg":
            colours = ["red", "green", "yellow", "blue"];
            console.log(colours);
            currentDiffLvl="lvl1";
            
            $(".container2").slideUp("normal", function(){
                $(".container2").addClass("displayclass");
                
            });
            
            $('.lvl1').fadeOut(100, function(){
                $(this).addClass('lvl1pattern'); //or any other class
            }).fadeIn(2000);
            
            
            setTimeout(function () {
                playgame();
            }, 1000);
            $(".back").removeClass("displayclass");
            break;

        case "inter":
            colours = ["red", "green", "yellow", "blue", "orange"];
            console.log(colours);
            currentDiffLvl="lvl2";
            $(".container2").slideUp("normal", function(){
                $(".container2").addClass("displayclass");
            });
            
            $('.lvl2').fadeOut(100, function(){
                $(this).addClass('lvl2pattern'); //or any other class
            }).fadeIn(1000);
           

            
            setTimeout(function () {
                playgame();
            }, 1000);
            $(".back").removeClass("displayclass");

            break;

        case "pro":
            colours = ["red", "green", "yellow", "blue", "orange", "purple"];
            console.log(colours);
            currentDiffLvl="lvl3";
            
            $(".container2").slideUp("normal", function(){
                $(".container2").addClass("displayclass");
            });

            $('.lvl3').fadeOut(100, function(){
                $(this).addClass("lvl3pattern"); //or any other class
            }).fadeIn(2000);
           
          
            setTimeout(function () {
                playgame();
            }, 1000);
            $(".back").removeClass("displayclass");
            break;
           
        default:
            break;
    }
}



$(".btn").on("click", handler);

$(document).on('keydown', keyboardevents);

function playgame() {

    console.log(colours);
    isGameover = false;
    colourSeq = [];
    userClickedSeq = [];
    lvl = 1;

    nextsequence();

}

function keyboardevents(evt) {

    // if (isGameover == false && lvl == 0) {
    //     playgame();
    // }
     if (isGameover == true) {
        playgame();
    }



}

function handler() {

    let ClickedColor = $(this).attr("id");
    userClickedSeq.push(ClickedColor);

    clickAnimation(ClickedColor);

    console.log("userClickedSeq is=" + userClickedSeq);
    checkanswer(userClickedSeq.length - 1);


}


function nextsequence() {

    levelchange()//level change animation

    let randomChosenColour = getrandomcolor();

    //playing anim and sound
    playbuttonanimsnd(randomChosenColour);

    console.log("randomChosenColour=" + randomChosenColour);
    colourSeq.push(randomChosenColour);

    console.log("colour seque is=" + colourSeq);
}






function checkanswer(i) {

    if (userClickedSeq[i] == colourSeq[i]) {
        // console.log("userClickedSeq[i]=" + userClickedSeq[i])
        console.log("suvcess");
        if (i == (colourSeq.length - 1)) {
            userClickedSeq = [];
            lvl++;
            setTimeout(function () {
                nextsequence();
            }, 1000);
        }
    }
    else {
        console.log("fail");
        gameover();
    }

}

function getrandomcolor() {
    console.log("colour array len="+colours.length);

    let randomNo = Math.floor(Math.random() * (colours.length));
    return colours[randomNo];

}






function gameover() {
    var gameoversound = new Audio("sounds/wrong.mp3");
    gameoversound.play();

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);


    isGameover = true;

    $("h1").text("Game over Press any key to restart");
    $(document).on('keydown', keyboardevents);
}


function playbuttonanimsnd(randomChosenColour) {
    let classofclr = "." + randomChosenColour;
    $(classofclr).fadeOut(100).fadeIn(100);
    let soundtoplay = "sounds/" + randomChosenColour + ".mp3";
    var sound = new Audio(soundtoplay);
    sound.play();

    

}


function clickAnimation(ClickedColor) {
    $("." + ClickedColor).addClass("pressed");
    var sound = new Audio("sounds/" + ClickedColor + ".mp3");
    sound.play();
    setTimeout(function () {
        $("." + ClickedColor).removeClass("pressed");
    }, 100);
}

function levelchange() {

    let currentLevel = "Level " + lvl;
    $("h1").text(currentLevel);
}








