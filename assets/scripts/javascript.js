var currentNumber = 0;
var reachNumber = 20;
var crys1 = 0;
var crys2 = 0;
var crys3 = 0;
var crys4 = 0;

function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function reset(){
    currentNumber = 0;
    reachNumber = randomInt(20,120);
    crys1 = randomInt(4,8);
    crys2 = randomInt(8,12);
    crys3 = randomInt(12,16);
    crys4 = randomInt(16,20);
    $("#crys1").attr("value", crys1);
    $("#crys2").attr("value", crys2);
    $("#crys3").attr("value", crys3);
    $("#crys4").attr("value", crys4);
}

function crystalClick(){
    currentNumber += $(".btn").attr("value");
}

$(document).ready(function(){

    $(".btn").on("click", crystalClick;

});