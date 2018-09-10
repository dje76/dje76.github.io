$(document).ready(function(){
  $("#SearchButton").click(function() {
      window.search();
  });

  $("#flashSearchButton").click(function() {
    $("#wordList").show();
      window.flashSearch();
  });

  $("#playButton").click(function() {
    $("#aslVid")[0].play();
  });

  $("#flashPlayButton").click(function() {
    $("#flashAslVid")[0].play();
  });

  $("#SaveDeckToFile").click(function() {
      window.download();
  });

  $("#showVideoSwitch").click(function() {
      window.flashcardDeck.alwaysShowVideo = $("#showVideochk")[0].checked;
  });

  $("#showHelp").click(function() {
    if($("#landingSection:visible").length != 0)
      $("#helpText").text("This app's purpose is the help people study and learn ASL. You can search for different videos of signs and also create flashcard decks to help with studying. Although this app does work on a mobile phone it is best used on a larger screen. Check this help button in other points in the app for more help and useful tips.");
    else if($("#flashSection:visible").length != 0)
      $("#helpText").text("You can save and re-use flashcard decks you have created. if you want to use a flashcard deck again in the future, before hitting start hit the save deck button to save the deck to a file on your PC. At any point you can upload a previously saved deck to be used again. The deck is always randomized everytime start is clicked.");
    else if($("#flashcard:visible").length != 0)
      $("#helpText").text("It is possible to use the flashcard deck without using a mouse. to go to the next/previous slide hit the right/left arrow on your keyboard. To show/play the sign video hit enter.");
    $('#helpModal').modal('show');

  });

  $("#showVideo").click(function() {
    $("#flashAslVid").show();
    $("#flashPlayButton").show();
    $("#showVideo").hide();
    $("#flashAslVid")[0].play();
  });

  $("#SearchNavButton").click(function() {
    $("#searchSection").show();
    $("#backButtonSection").css("visibility", "visible");
    $("#landingSection").hide();
  });

  $("#FlashNavButton").click(function() {
    $("#flashSection").show();
    $("#backButtonSection").css("visibility", "visible");
    $("#landingSection").hide();
    if(window.flashcardDeck.cards.length != 0){
      $("#wordList").show();
    }
  });

  $("#backButton").click(function() {
    $("#flashSection").hide();
    $("#searchSection").hide();
    $("#backButtonSection").css("visibility", "hidden");
    $("#landingSection").show();
    $("#flashcard").hide();
    $("#wordList").hide();
  });

  $("#finishDeck").click(function() {
    $("#flashSection").hide();
    $("#searchSection").hide();
    $("#backButtonSection").css("visibility", "visible");
    $("#landingSection").hide();
    $("#wordList").hide();
    $("#flashcard").css("display", "inline-block");

    window.flashcardDeck.cards = window.shuffle(window.flashcardDeck.cards);
    window.flashIndex = 0;
    $("#showVideo").hide();
    window.updateCard();
  });

  $("#nextCard").click(function() {
    window.flashIndex += 1;
    window.updateCard();
  });

  $("#previousCard").click(function() {
    window.flashIndex -= 1;
    window.updateCard();
  });

  $("body").keypress(function(e) {
      if(e.which == 13) {
        if($("#flashcard:visible").length != 0){
          if($("#flashAslVid:visible").length != 0){
            $("#flashAslVid")[0].play();
          }
          else{
            $("#flashAslVid").show();
            $("#flashPlayButton").show();
            $("#showVideo").hide();
            $("#flashAslVid")[0].play();
          }
        }
      }
  });

  $(document).keydown(function(e) {
    switch(e.which) {
      case 13: // enter
        if($("#flashcard:visible").length != 0){
          if($("#flashAslVid:visible").length != 0){
            $("#flashAslVid")[0].play();
          }
          else{
            $("#flashAslVid").show();
            $("#flashPlayButton").show();
            $("#showVideo").hide();
            $("#flashAslVid")[0].play();
          }
        }
        else if($("#flashSection:visible").length != 0)
          window.flashSearch();
        else if($("#searchSection:visible").length != 0)
          window.search();
      break;
      case 37: // left
        if($("#flashcard:visible").length != 0){
          if($("#previousCard").css("visibility") != "hidden"){
            window.flashIndex -= 1;
            window.updateCard();
          }
        }
        break;
      case 39: // right
        if($("#flashcard:visible").length != 0){
          if($("#nextCard").css("visibility") != "hidden"){
            window.flashIndex += 1;
            window.updateCard();
          }
        }
        break;
      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  window.resultChosen = function(url){
    $("#optionsList").hide();
    $.get('https://allorigins.me/get?method=raw&url=' + encodeURIComponent('https://signingsavvy.com/sign/' + url), function(data){
      var re = /mp4/g;
      var indexes = [];
      while ((match = re.exec(data)) != null) {
        indexes.push(match.index);
      }

      var start = indexes[0] - 1;
      var end = indexes[1] + 3;
      var vidUrl = data.substring(start, end);
      $("#vidSection").show();
      $("#vidDiv").html('<video id="aslVid" width="320" height="240"><source src="https://www.signingsavvy.com/signs' + vidUrl + '" type="video/mp4">Your browser does not support the video tag.</video>');
    });
  }

  window.search = function(){
    $("#optionsList").html("");
    $("#optionsList").hide();
    $("#videoError").hide();
    var lookupWord = $("#searchTxt").val();
    $.get('https://allorigins.me/get?method=raw&url=' + encodeURIComponent('https://signingsavvy.com/sign/' + lookupWord), function(data){
      var re = /mp4/g;
      var indexes = [];
      while ((match = re.exec(data)) != null) {
        indexes.push(match.index);
      }

      if(indexes.length > 1){
        var start = indexes[0] - 1;
        var end = indexes[1] + 3;
        var vidUrl = data.substring(start, end);
        $("#vidSection").show();
        $("#vidDiv").html('<video id="aslVid" width="320" height="240"><source src="https://www.signingsavvy.com/signs' + vidUrl + '" type="video/mp4">Your browser does not support the video tag.</video>');
      }
      else{
        $("#optionsList").show();
        var re = new RegExp("href=\"sign/" + lookupWord,"gi");
        var indexes = [];
        while ((match = re.exec(data)) != null) {
          indexes.push(match.index);
        }

        if(indexes.length == 0){
          $("#videoError").show();
          return;
        }
        for(i=0;i<indexes.length;i++){
            var substring = ""
            if(i == indexes.length - 1){
              substring = data.substring(indexes[i], indexes[i] + 80);
            }
            else{
              substring = data.substring(indexes[i], indexes[i+1]);
            }
            var re = new RegExp("<\/a>.+<\/li>","g");
            var match = re.exec(substring)[0];
            var re2 = new RegExp(">" + lookupWord + "<","gi");
            var urlIndex = re2.exec(substring).index;
            var vidUrl = substring.substring(11, urlIndex - 1);
            $("#vidSection").hide();
            $("#optionsList").html($("#optionsList").html() + "<div><a onclick='window.resultChosen(\"" + vidUrl + "\")'>" + lookupWord + "</a>: " + match + "</div>");
        }
      }
    });
  }

  window.flashIndex = 0;
  window.flashcardDeck = {}
  window.flashcardDeck.cards = [];
  window.flashcardDeck.alwaysShowVideo = false;
  window.columnNumber = 1;
  window.flashResultChosen = function(url){
    $("#flashOptionsList").hide();
    var lookupWord = $("#flashSearchTxt").val();
    $.get('https://allorigins.me/get?method=raw&url=' + encodeURIComponent('https://signingsavvy.com/sign/' + url), function(data){
      var re = /mp4/g;
      var indexes = [];
      while ((match = re.exec(data)) != null) {
        indexes.push(match.index);
      }
      if(indexes.length == 0){
        $("#noVideoError").show();
        return;
      }
      var start = indexes[0] - 1;
      var end = indexes[1] + 3;
      var vidUrl = data.substring(start, end);
      window.flashcardDeck.cards.push({
        word: lookupWord,
        url: vidUrl
      });
      window.addWordToList(lookupWord);
    });
  }

  window.flashSearch = function(){
    $("#flashOptionsList").html("");
    $("#flashOptionsList").hide();
    $("#noVideoError").hide();
    var lookupWord = $("#flashSearchTxt").val();
    $.get('https://allorigins.me/get?method=raw&url=' + encodeURIComponent('https://signingsavvy.com/sign/' + lookupWord), function(data){
      var re = /mp4/g;
      var indexes = [];
      while ((match = re.exec(data)) != null) {
        indexes.push(match.index);
      }

      if(indexes.length > 1){
        var start = indexes[0] - 1;
        var end = indexes[1] + 3;
        var vidUrl = data.substring(start, end);
        window.flashcardDeck.cards.push({
          word: lookupWord,
          url: vidUrl
        });
        $("#wordList").show();
        window.addWordToList(lookupWord);
      }
      else{
        $("#flashOptionsList").show();
        var re = new RegExp("href=\"sign/" + lookupWord,"gi");
        var indexes = [];
        while ((match = re.exec(data)) != null) {
          indexes.push(match.index);
        }

        if(indexes.length == 0){
          $("#noVideoError").show();
          return;
        }
        for(i=0;i<indexes.length;i++){
            var substring = ""
            if(i == indexes.length - 1){
              substring = data.substring(indexes[i], indexes[i] + 80);
            }
            else{
              substring = data.substring(indexes[i], indexes[i+1]);
            }
            var re = new RegExp("<\/a>.+<\/li>","g");
            var match = re.exec(substring)[0];
            var re2 = new RegExp(">" + lookupWord + "<","gi");
            var urlIndex = re2.exec(substring).index;
            var vidUrl = substring.substring(11, urlIndex - 1);
            $("#flashOptionsList").html($("#flashOptionsList").html() + "<div><a onclick='window.flashResultChosen(\"" + vidUrl + "\")'>" + lookupWord + "</a>: " + match + "</div>");
        }
      }
    });
  }

  window.addWordToList = function(lookupWord){
    if(window.columnNumber == 1){
      $("#wordList").html($("#wordList").html() + "<div class='row'><div class='col-lg-3 col-sm-3 col-xm-3 col-md-3'>" + lookupWord + "</div>");
      window.columnNumber += 1;
    }
    else if(window.columnNumber == 4){
      $("#wordList").html($("#wordList").html().substring(0, $("#wordList").html().length - 6) + "<div class='col-lg-3 col-sm-3 col-xm-3 col-md-3'>" + lookupWord + "</div></div>");
      window.columnNumber = 1;
    }
    else{
      $("#wordList").html($("#wordList").html().substring(0, $("#wordList").html().length - 6) + "<div class='col-lg-3 col-sm-3 col-xm-3 col-md-3'>" + lookupWord + "</div>");
      window.columnNumber += 1;
    }

    $("#flashSearchTxt").val("");
  }

  window.handleFileSelect = function(evt) {
    var files = evt.target.files;
    f = files[0];

    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
          $("#wordList").show();
          window.flashcardDeck = JSON.parse( e.target.result );
          for(i=0;i<window.flashcardDeck.cards.length;i++){
              window.addWordToList(window.flashcardDeck.cards[i].word);
          }
          if(window.flashcardDeck.alwaysShowVideo)
            $("#showVideochk")[0].checked = true;
          else
            $("#showVideochk")[0].checked = false;
        };
      })(f);

      reader.readAsText(f);
  }

  window.download = function() {
      var file = new Blob([JSON.stringify(window.flashcardDeck)], {type: "txt"});
      if (window.navigator.msSaveOrOpenBlob) // IE10+
          window.navigator.msSaveOrOpenBlob(file, "aslFlashCardDeck.txt");
      else { // Others
          var a = document.createElement("a"),
                  url = URL.createObjectURL(file);
          a.href = url;
          a.download = "aslFlashCardDeck.txt";
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
          }, 0);
      }
  }

  window.shuffle = function(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

  window.updateCard = function(){
    $("#WordHeader").html(window.flashcardDeck.cards[window.flashIndex].word);
    $("#flashAslVid").html('<source src="https://www.signingsavvy.com/signs' + window.flashcardDeck.cards[window.flashIndex].url +'" type="video/mp4">Your browser does not support the video tag.');
    $("#flashAslVid")[0].load();
    $("#previousCard").css("visibility", "visible");
    $("#nextCard").css("visibility", "visible");
    if(window.flashIndex == 0)
      $("#previousCard").css("visibility", "hidden");
    if(window.flashIndex == window.flashcardDeck.cards.length-1)
      $("#nextCard").css("visibility", "hidden");
    if(!window.flashcardDeck.alwaysShowVideo){
      $("#flashAslVid").hide();
      $("#showVideo").show();
      $("#flashPlayButton").hide();
      $("#showVideo").text("Show Video");
    }
  }

  document.getElementById('fileUpload').addEventListener('change', window.handleFileSelect, false);
});
