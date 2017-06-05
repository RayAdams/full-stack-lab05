//show the current sentence array at the top of the screen
var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
var currentLetterIndex;
var currentSentenceIndex;

// starting values
var numberOfWords = 0;
var numberOfMistakes;
var startTime;
var stopTime;
var runningPadding = 0;
initializeGame();

//runs all functions to play game
function initializeGame() {
    currentLetterIndex = 0;
    currentSentenceIndex = 0;
    numberOfWords = getNumberOfWords(sentences[currentSentenceIndex]);
    numberOfMistakes = 0;
    runningPadding = 0;
    displayExpectedletter();
    showCurrentSentence();
    $('#feedback').text('');
    highlightCurrentKey();
    
}

//when page loads, display only lowercase keyboard
$('#keyboard-upper-container').hide();

//while shift key is held down, hide lowercase keyboard and SHOW uppercase
$(document).keydown (function(e){
      if (event.which === 16){
          $('#keyboard-lower-container').hide();
          $('#keyboard-upper-container').show();
      } 
});

//show lowercase when the shift key is released and hide uppercase
$(document).keyup (function(e){
      if (event.which === 16){
          $('#keyboard-lower-container').show();
          $('#keyboard-upper-container').hide();
      } 
});

//functions initialized by keypress
$(document).keypress(function(e){
    event.preventDefault();
    var pressedKeyCode = e.which;
    var pressedKey = String.fromCharCode(pressedKeyCode);
    if(currentLetterIndex === 0 && currentSentenceIndex === 0)
        startTime = Date.now();

    highlightPressedKey(pressedKeyCode);
    addAppropriateIcon(pressedKey);
    goToNextCharacter();
    displayExpectedletter();
    showCurrentSentence();
    highlightCurrentKey();
});

//highlight the current key that's pressed down
function highlightPressedKey(pressedKeyCode) {
    $('#' + pressedKeyCode).css('background-color','yellow');
    $(document).keyup(function(e){
        $('#' + pressedKeyCode).css('background-color','');      
    });  
}

//feedback div: for each array sentence, show a "log" of right/wrong per char by inserting either green check or red X
function addAppropriateIcon(pressedKey) {
   if (pressedKey === sentences[currentSentenceIndex][currentLetterIndex]) {
        //add correct glyphicon
        $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');    
   }
   else {
        //add incorrect glyphicon
        $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
        numberOfMistakes ++;       
   }
}

function goToNextCharacter() {
    if (currentLetterIndex < sentences[currentSentenceIndex].length - 1)
        currentLetterIndex ++;
    else {
        if (currentSentenceIndex < sentences.length - 1) {
            currentSentenceIndex ++;
            currentLetterIndex = 0;
            numberOfWords += getNumberOfWords(sentences[currentSentenceIndex]);
            //at the end of each array sentence, clear feedback div
            $('#feedback').text('');
            runningPadding = 0;
        } else {
            //at the end of whole array, display WPM & ask to replay
            alert("Your words per minute: " + getWPM());
            //respond to play again prompt
            restartGame();
        }
    }
}


//display the current expected letter
function displayExpectedletter() {
    $('#target-letter').text(sentences[currentSentenceIndex][currentLetterIndex]);
}

//display the current sentence
function showCurrentSentence() {
    $('#sentence').text(sentences[currentSentenceIndex]);
}
f

//display words per minute at the end of all array sentences
function getNumberOfWords(sentence){
    return sentence.split(" ").length;
}

function getWPM() {
    //get time passed in milliseconds
    stopTime = Date.now();
    var timeElapsed = stopTime - startTime;
    //convert from milliseconds to minutes
    var minutes = timeElapsed * 1.66667e-5;
    return  numberOfWords / minutes - 2 * numberOfMistakes;
}

//have a delayed display asking if they want to play again, if yes, reset to start, if no, leave as if
function restartGame (){
    var answer = prompt("Want to play again?");
    if (answer.toLowerCase() === "yes")
        initializeGame();
}

//highlight with div id=yellow-block the expected letter in the array
function highlightCurrentKey() {
    runningPadding += 16;
    $('#yellow-block').css('padding-left', runningPadding+'px');
}

//currentSentence.charAt(letterIndex)  could be used