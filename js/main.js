"use strict";
exports.__esModule = true;
//#endregion
//#region variable declaration
var prepare = {};
var time = document.getElementById('time');
prepare.card = [];
prepare.progress = 0;
prepare.fullTrack = new Audio("./audio/background.mp3");
prepare.flipAudio = new Audio("./audio/cardFlip.mp3");
prepare.goodAudio = new Audio("./audio/success.mp3");
prepare.failAudio = new Audio("./audio/fail.mp3");
prepare.gameOverAudio = new Audio("./audio/win.mp3");
prepare.fullTrack.loop = true;
var numerOfCards = JSON.parse(localStorage.getItem('number'));
var tempNumber = [];
var cardsHtmlContent = '';
//#endregion
//#region   functions decleration
function getRandomInt(min, max) {
    var result;
    min = Math.ceil(min);
    max = Math.floor(max);
    var exists = true;
    while (exists) {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!tempNumber.find(function (no) { return no === result.toString(); })) {
            exists = false;
            tempNumber.push(result.toString());
        }
    }
    return result;
}
var toggleFlip = function (index) {
    prepare.fullTrack.play();
    var card = prepare.card[index];
    if (!card.flip && card.clickable) {
        flip(card, index);
        selectCard(card, index);
    }
};
var flip = function (card, index) {
    prepare.flipAudio.play();
    if (card) {
        card.flip = card.flip === '' ? 'flip' : '';
        document.getElementById("card-flip-".concat(index)).classList.toggle('flip');
    }
};
var selectCard = function (card, index) {
    if (!prepare.selectedCard1) {
        prepare.selectedCard1 = card;
        prepare.selectedIndex1 = index;
    }
    else if (!prepare.selectedCard2) {
        prepare.selectedCard2 = card;
        prepare.selectedIndex2 = index;
    }
    if (prepare.selectedCard1 && prepare.selectedCard2) {
        if (prepare.selectedCard1.image == prepare.selectedCard2.image) {
            prepare.selectedCard1.clickable = false;
            prepare.selectedCard2.clickable = false;
            prepare.selectedCard1 = null;
            prepare.selectedCard2 = null;
            stopAudio(prepare.goodAudio);
            stopAudio(prepare.failAudio);
            prepare.goodAudio.play();
            changeProgress();
            checkFinsh();
        }
        else {
            setTimeout(function () {
                stopAudio(prepare.failAudio);
                stopAudio(prepare.goodAudio);
                prepare.failAudio.play();
                flip(prepare.selectedCard1, prepare.selectedIndex1);
                flip(prepare.selectedCard2, prepare.selectedIndex2);
                prepare.selectedCard1 = null;
                prepare.selectedCard2 = null;
            }, 1000);
        }
    }
};
var changeProgress = function () {
    var progress = Math.round((prepare.card.filter(function (ele) { return !ele.clickable; }).length / numerOfCards) * 100);
    var progressElement = document.getElementById('progress');
    progressElement.style.width = "".concat(progress, "%");
    progressElement.innerText = "".concat(progress, "%");
    console.log(progress);
};
var checkFinsh = function () {
    if (prepare.card.filter(function (ele) { return !ele.clickable; }).length === numerOfCards) {
        stopAudio(prepare.fullTrack);
        stopAudio(prepare.failAudio);
        stopAudio(prepare.goodAudio);
        prepare.gameOverAudio.play();
        setTimeout(function () { return location.assign('index.html'); }, 2000);
        clearInterval(timeIntarvel);
    }
};
var stopAudio = function (audio) {
    if (audio && audio.played) {
        audio.pause;
        audio.loop = false;
        audio.currentTime = 0;
    }
};
//#endregion
//#region game logic
for (var i = 0; i < numerOfCards / 2; i++) {
    prepare.card.push({
        id: getRandomInt(0, numerOfCards),
        image: "./images/".concat(i, ".jpg"),
        clickable: true,
        flip: '',
        index: i
    });
    prepare.card.push({
        id: getRandomInt(0, numerOfCards),
        index: i,
        image: "./images/".concat(i, ".jpg"),
        clickable: true,
        flip: ''
    });
}
prepare.card.sort(function (a, b) { return a.id - b.id; });
prepare.card.forEach(function (item, index) {
    cardsHtmlContent += "\n      <div class=\"col-lg-2 col-sm-3 col-4 cards\" id=\"card-flip-".concat(index, "\" onclick=\"toggleFlip(").concat(index, ")\">\n            <img src=\"images/back.jpg\" alt=\"card\" width=\"100%\" height=\"100%\">\n                <div class=\"back\">\n                <img src=\"images/").concat(item.index, ".jpg\" alt=\"\">\n                </div>        \n        </div>\n        ");
});
var cardBox = document.getElementById('card');
cardBox.innerHTML = cardsHtmlContent;
//#region  varibales
var startTime = new Date().getTime() / 100;
var timeIntarvel = setInterval(function () {
    var tmp = new Date().getTime() / 100;
    var tempTime = Math.floor(tmp - startTime) / 10;
    time.innerText = " ".concat(tempTime, " s");
    localStorage.setItem('tempTime', JSON.stringify(tempTime));
}, 100);
var mode = localStorage.getItem('mode');
var easy = localStorage.getItem('easyBestTime');
var medium = localStorage.getItem('meddiumBestTime');
var hard = localStorage.getItem('hardBestTime');
var temp = localStorage.getItem('tempTime');
//#endregion
//#endregion
