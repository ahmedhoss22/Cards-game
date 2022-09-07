const easyBtn=document.getElementById('easy')
const mediumBtn=document.getElementById('medium')
const hardBtn=document.getElementById('hard')
const easyScore=document.getElementById('easyBestScore')
const mediumScore=document.getElementById('mediumBestScore')
const hardScore=document.getElementById('hardBestScore')
let mode =localStorage.getItem('mode')
let easy= parseFloat(JSON.parse(localStorage.getItem('easyBestTime')) ) 
let medium=parseFloat(JSON.parse(localStorage.getItem('mediumBestTime')) ) 
let hard=parseFloat(JSON.parse(localStorage.getItem('hardBestTime')) ) 
let temp=JSON.parse(localStorage.getItem('tempTime')) 
const yourScore=document.getElementById('yourScore');

if(temp){
    yourScore.innerText=`${temp} s`
}else{
    yourScore.innerText='0'
}
easyBtn.addEventListener('click',()=>{
    localStorage.setItem('mode','easy')
    localStorage.setItem('number','6')
    setTimeout(()=>location.assign('game.html'),1000)
})
mediumBtn.addEventListener('click',()=>{
    localStorage.setItem('mode','medium')
    localStorage.setItem('number','12')
    setTimeout(()=>location.assign('game.html'),1000)
})
hardBtn.addEventListener('click',()=>{
    localStorage.setItem('mode','hard')
    localStorage.setItem('number','20')
    setTimeout(()=>location.assign('game.html'),1000)
})

if(mode == 'easy'){
    if(easy){
        if(easy > temp ){
            localStorage.setItem('easyBestTime',JSON.stringify(temp))
            }
    }else{
    localStorage.setItem('easyBestTime',JSON.stringify(temp))
}
}else if(mode== 'medium'){
    if(medium){
        if(medium > temp ){
            localStorage.setItem('mediumBestTime',JSON.stringify(temp))
        }
    }else{
    localStorage.setItem('mediumBestTime',JSON.stringify(temp))
    }
}else if(mode== 'hard'){
    if(hard){
        if(hard > temp ){
            localStorage.setItem('hardBestTime',JSON.stringify(temp))
        }
    }else{
    localStorage.setItem('hardBestTime',JSON.stringify(temp))
    }
}



if(localStorage.getItem('easyBestTime')){
    let x=JSON.parse(localStorage.getItem('easyBestTime'))
    easyScore.innerText=`${x} s`
}
if(localStorage.getItem('mediumBestTime')){
    let x=JSON.parse(localStorage.getItem('mediumBestTime'))
    mediumScore.innerText=`${x} s`
}
if(localStorage.getItem('hardBestTime')){
    let x=JSON.parse(localStorage.getItem('hardBestTime'))
    hardScore.innerText=`${x} s`
}
