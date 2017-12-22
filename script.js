$(document).ready(function() {
  //animateBackground();
});

var index = 0;
var blockKeydow = false;
var size = 0;
var sizeDocument = ($(document).width() / 2) - 50;

function animateBackground(){
  setInterval(function(){
    $('body').animate({'background-position-y': '1px'}, 100, function() {
      $('body').animate({'background-position-y': '-1px'}, 100, function() {
      });
    });
  }, 200);
}

function move(){
  $('span').removeClass('position' + index);
  if(index >= 8){
    index = 0;
  }
  $('span').addClass('position' + ++index);
}

function walk(guidance){
  var tempSize = guidance === '-' ? size - 60 : size + 60;
  if(tempSize <= sizeDocument && tempSize >= -sizeDocument){
    guidance === '-' ? size -= 60 : size += 60;
    $('span').animate({left: guidance + '=60'});
  }
}

function jump(){
  $('span').animate({top: '-=80'}, 200, function() {
    $('span').animate({top: '+=80'}, 150, function() {
      blockKeydow = false;
    });
  });
}

function down(){
  $('span').animate({top: '+=5'}, 200, function() {
    $('span').animate({top: '-=5'}, 150, function() {
      blockKeydow = false;
    });
  });
}

function flip(enable){
  if(enable) {
    $('span').addClass('flip-it');
  } else {
    $('span').removeClass('flip-it');
  }
}

function handle(guidance){

  var interval = setInterval(function(){
    move();
  }, 100);

  flip(guidance === '-' ? false : true);
  walk(guidance);

  setTimeout(function(){
    clearInterval(interval);
    blockKeydow = false;
  }, 400);

}


document.onkeydown = function(e) {
  e = e || window.event;

  if(blockKeydow){
    return;
  }

  if (e.keyCode == '38') {
    blockKeydow = true;
    jump();
  } else if (e.keyCode == '40') {
    blockKeydow = true;
    down();
  } else if (e.keyCode == '37') {
    blockKeydow = true;
    handle('-');
  } else if (e.keyCode == '39') {
    blockKeydow = true;
    handle('+');
  }

}
