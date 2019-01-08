(function() {
  function $(id) {
    return document.getElementById(id);
  }

  var letters = [];
  var currentLetter;
  var currentIndex = 0;
  registerLetter("letter_1");
  registerLetter("letter_2");
  registerLetter("letter_3");

  function toggleShowSign() 
  {
    x = $('signed');
    if (!x) return;
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }  

  function registerLetter(id)
  {
    var element = $(id);
    if(!element) return;
    var msg = element.innerText || element.textContent;
    var msgLen = msg.length;

    var letter = {
      element: element,
      msg: msg,
      msgLen: msgLen,
      counter: 1,
      timerId: null
    };
    element.innerText = "";
    letters.push(letter);
  }

  function printLetters()
  {
    currentLetter = letters[currentIndex++];
    if (!currentLetter) 
    {
      toggleShowSign();
      return;
    }
    currentLetter.timerId = setInterval(function(){printLetter()},300);
  }

  function printLetter()
  {
    var letter = currentLetter;
    var nextChar = letter.msg.substring(0, letter.counter);
    letter.element.innerHTML = nextChar;
    if (letter.counter++ >= letter.msgLen) 
    {
      clearInterval(letter.timerId);
      printLetters();
    }
  }

  var card = $('card'),
      openB = $('open'),
      closeB = $('close'),
      timer = null;
  console.log('wat', card);
  openB.addEventListener('click', function () {
    toggleShowSign();
    card.setAttribute('class', 'open-half');
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute('class', 'open-fully');
      timer = null;
      printLetters();
    }, 1000);

  });
/*
  closeB.addEventListener('click', function () {
    card.setAttribute('class', 'close-half');
    if (timer) clearTimerout(timer);
    timer = setTimeout(function () {
      card.setAttribute('class', '');
      timer = null;
    }, 1000);
  });
 */

  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if(!isChrome){
    $('#iframeAudio').remove()
  }
}());
