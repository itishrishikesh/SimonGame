var simonSound1 = new buzz.sound("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",{volume:100});
var simonSound2 = new buzz.sound("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",{volume:100});
var simonSound3 = new buzz.sound("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",{volume:100});
var simonSound4  = new buzz.sound("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",{volume:100});

var list = ['playRed', 'playBlue', 'playGreen', 'playYellow'];
var level = [];

function playRed(){
  $('#red').effect("highlight", {color:'red'}, 500);
  simonSound1.play();
  //simonSound1.stop();
}
function playBlue(){
  $('#blue').effect("highlight", {color:'blue'}, 500);
  simonSound2.play();
  //simonSound2.stop();
}
function playGreen(){
  $('#green').effect("highlight", {color:'green'}, 500);
  simonSound3.play();
  //simonSound3.stop();
}
function playYellow(){
  $('#yellow').effect("highlight", {color:'yellow'}, 500);
  simonSound4.play();
  //simonSound4.stop();
}
var i = 0;
function play(level){
  if(i < level.length)
  setTimeout(function(){
    window[level[i]]();
    i++;
    play(level);
  },500);
}
function start(){
  levelUp();
  i = 0;
  play(level);
}
$(document).ready(function(){
  var clickCount = 0, isStart = false;
  $('#replay').click(function(){
    $('#won').slideUp(500, function(){
          $('#main').slideDown(1000);
     });
    level = [];
    $('#start').text('START');
  });
  $('#start').click(function(){
    if(isStart){
      isStart = false;
      $(this).text('START');
      level = [];
    }
    else{
      isStart = true;
      $(this).text('RESET');
      start();
    }
  });
  $('#red, #blue, #green, #yellow').click(function(){
      $('#counter').text('level : ' + (level.length - 1));
      if(level.length > clickCount){
        if(this.id === 'red' && level[clickCount] === 'playRed'){clickCount++;}
        else if(this.id == 'blue' && level[clickCount] === 'playBlue'){clickCount++;}
        else if(this.id === 'green' && level[clickCount] === 'playGreen'){clickCount++;}
        else if(this.id === 'yellow' && level[clickCount] === 'playYellow'){clickCount++;}
        else{
          $('#modala').slideDown(1000, function(){
            $('#modala').delay(1000).slideUp(500, function(){
              if($('#strict_m').is(':checked')){
            //alert('Wrong!');
            clickCount = 0;
            i = 0;
            level = [];
            levelUp();
            play(level);
          }
          else{
            //alert('Wrong!' + level[clickCount]);
            clickCount = 0;
            i = 0;
            play(level);
          }
            });
          });
          
        } 
      }
      
      if(level.length <= clickCount)
      {
        if(level.length >= 20){
        $('#main').slideUp(500, function(){
          $('#won').slideDown(1000);
        });
        }
        levelUp();
        clickCount = 0;
        i = 0;
        play(level);
      } 
  });
});
function levelUp()
{
  var i = Math.floor(Math.random() * 4);
  level.push(list[i]);
}