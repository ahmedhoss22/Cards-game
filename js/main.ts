//#region  imports
import { Iprepare } from './modules/prepare';
import { Card } from "./modules/card";
//#endregion
//#region variable declaration
const prepare:Iprepare={};
const time=document.getElementById('time')
prepare.card=[];
prepare.progress=0;
prepare.fullTrack=new Audio("./audio/background.mp3");
prepare.flipAudio=new Audio("./audio/cardFlip.mp3")
prepare.goodAudio=new Audio("./audio/success.mp3")
prepare.failAudio=new Audio("./audio/fail.mp3")
prepare.gameOverAudio=new Audio("./audio/win.mp3")
prepare.fullTrack.loop=true;
const numerOfCards:number=JSON.parse(localStorage.getItem('number'));
const tempNumber=[];
let cardsHtmlContent='';


//#endregion
//#region   functions decleration
    function getRandomInt(min:number,max:number):number{
        let result:number;
        min=Math.ceil(min)
        max=Math.floor(max)
        let exists:boolean=true

        while(exists){
            result=Math.floor(Math.random()*(max-min+1))+min;
                if(!tempNumber.find((no) =>  no===result.toString())){
                exists=false;
                tempNumber.push(result.toString())            
            }
        }
        return result
    }

    const toggleFlip=(index:number):void=>{
        prepare.fullTrack.play()
        const card =prepare.card[index];
        if(!card.flip && card.clickable){
            flip(card, index)
            selectCard(card,index)
        }
    }
    const flip= (card:Card,index:number)=>{
        prepare.flipAudio.play();
        if(card){
            card.flip= card.flip===''?'flip':'';
            document.getElementById(`card-flip-${index}`).classList.toggle('flip');
        }
    }
    const selectCard= (card:Card,index:number)=>{
        if(!prepare.selectedCard1){
            prepare.selectedCard1=card;
            prepare.selectedIndex1=index
        }else if(!prepare.selectedCard2){
            prepare.selectedCard2=card;
            prepare.selectedIndex2=index
        }
        if(prepare.selectedCard1 && prepare.selectedCard2){
            if(prepare.selectedCard1.image == prepare.selectedCard2.image){
                prepare.selectedCard1.clickable=false;
                prepare.selectedCard2.clickable=false;
                prepare.selectedCard1=null;
                prepare.selectedCard2=null;
                stopAudio(prepare.goodAudio)
                stopAudio(prepare.failAudio)
                prepare.goodAudio.play();
                changeProgress();
                checkFinsh();
            }else{
                setTimeout(()=>{
                    stopAudio(prepare.failAudio)
                    stopAudio(prepare.goodAudio)
                    prepare.failAudio.play();
                    flip(prepare.selectedCard1,prepare.selectedIndex1)
                    flip(prepare.selectedCard2,prepare.selectedIndex2)
                    prepare.selectedCard1=null;
                    prepare.selectedCard2=null;
                },1000)
            }

        }
    }
    const changeProgress=()=>{
        const progress=Math.round( (prepare.card.filter((ele)=> !ele.clickable).length / numerOfCards)*100);
        
        const progressElement=document.getElementById('progress');
        progressElement.style.width=`${progress}%`
        progressElement.innerText=`${progress}%`
        console.log(progress)
    }
    const checkFinsh=()=>{
        if(prepare.card.filter((ele)=> !ele.clickable).length===numerOfCards){
            stopAudio(prepare.fullTrack)
            stopAudio(prepare.failAudio)
            stopAudio(prepare.goodAudio)
            prepare.gameOverAudio.play()
            setTimeout(()=> location.assign('index.html'), 2000)
            clearInterval(timeIntarvel)
        }
    }
    const stopAudio=(audio:HTMLAudioElement):void=>{
        if(audio && audio.played){
            audio.pause;
            audio.loop=false
            audio.currentTime=0
        }
    }
//#endregion
//#region game logic
    for(let i=0;i<numerOfCards/2;i++){
        prepare.card.push({
            id: getRandomInt(0,numerOfCards),
            image: `./images/${i}.jpg`,
            clickable: true,
            flip: '',
            index:i
        })
        prepare.card.push({
            id: getRandomInt(0,numerOfCards),
            index: i,
            image: `./images/${i}.jpg`,
            clickable: true,
            flip: ''
        })
    }
    prepare.card.sort((a,b) => a.id - b.id)
    prepare.card.forEach((item,index)=>{
        cardsHtmlContent+=`
      <div class="col-lg-2 col-sm-3 col-4 cards" id="card-flip-${index}" onclick="toggleFlip(${index})">
            <img src="images/back.jpg" alt="card" width="100%" height="100%">
                <div class="back">
                <img src="images/${item.index}.jpg" alt="">
                </div>        
        </div>
        `
    })
    let cardBox=document.getElementById('card')
    cardBox.innerHTML=cardsHtmlContent;
    //#region  varibales
        let startTime=new Date().getTime() /100;
        let timeIntarvel= setInterval(()=>{
        let tmp=new Date().getTime()/100;
        let tempTime= Math.floor( tmp- startTime)/10;
        time.innerText=` ${tempTime} s`;
        localStorage.setItem('tempTime',JSON.stringify(tempTime))
        } ,100)
        let mode =localStorage.getItem('mode')
        let easy=localStorage.getItem('easyBestTime')
        let medium=localStorage.getItem('meddiumBestTime')
        let hard=localStorage.getItem('hardBestTime')
        let temp=localStorage.getItem('tempTime')
    //#endregion
 //#endregion