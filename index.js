
import i18Obj from './js/translate.js'

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const blackout = document.querySelector('.blackout')

function toggleMenu() {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  blackout.classList.toggle('active');
}

function closeMenu(event) {
  if (event.target.classList.contains('nav__link')) {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    blackout.classList.remove('active')
  }
}

hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);

//Смена изображений в секции Portfolio
const portfolioImages = document.querySelectorAll('.portfolio__image__item');
const portfolioBtns = document.querySelector('.portfolio__buttons');
const portfolioButtons = document.querySelectorAll('.portfolio__btn');

function changeClassActive(event){
    portfolioButtons.forEach((btn, index)=> btn.classList.remove('active_btn'));
    event.add('active_btn')
}
//Кеширование изображений
function preloadSeasonsImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach(item => {
      for(let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `./assets/img/${item}/${i}.jpg`;
      }
    });
  }
  preloadSeasonsImages();

function changeImage(event) {
    if(event.target.classList.contains('portfolio__btn')) {
        switch(true){
            case((event.target.dataset.season === "winter")):{
                portfolioImages.forEach((img, index) => img.src = `./assets/img/winter/${index + 1}.jpg`)               
                break;
            }
            case((event.target.dataset.season === "spring")):{
                portfolioImages.forEach((img, index) => img.src = `./assets/img/spring/${index + 1}.jpg`)                           
                break;
            }
            case((event.target.dataset.season === "summer")):{
                portfolioImages.forEach((img, index) => img.src = `./assets/img/summer/${index + 1}.jpg`)                        
                break;
            }
            case((event.target.dataset.season === "autumn")):{
                portfolioImages.forEach((img, index) => img.src = `./assets/img/autumn/${index + 1}.jpg`)                  
                break;
            }
       }
    }
}
portfolioBtns.addEventListener('click',changeImage)
portfolioBtns.addEventListener('click', (event) => changeClassActive(event.target.classList));

//Перевод страницы на два языка
const languageContainer = document.querySelector('.language')
const languages = document.querySelectorAll('.lang')
let lang = 'en';

function getTranslate(language){
    lang = language;
    const elements = document.querySelectorAll('[data-i18]');
    elements.forEach((item) => (item.textContent = i18Obj[language][item.dataset.i18]));
}

languageContainer.addEventListener('click', (event) => getTranslate(event.target.dataset.lang))

function changeClassActiveLang(event) {
    languages.forEach((item) => item.classList.remove('active_lang'));
    event.add('active_lang');
}
languageContainer.addEventListener('click', (event) => changeClassActiveLang(event.target.classList));



  //Эфект на кнопки
  var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("section__btn");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  //Переключение светлой и тёмной темы
  let theme = 'dark'
  const changeItems = ['.skills', '.portfolio', '.video', '.price', '.background'];
  document.querySelector('.theme__btn').addEventListener('click', changeTheme);
   
  
  function changeTheme() { 
    changeItems.forEach((element) => document.querySelector(element).classList.toggle('light-theme'));
    document.body.classList.toggle('light-theme'); 
    if (document.body.classList.contains('light-theme')) {
      theme = 'light';
    } else {
      theme = 'dark';
    }
  }

  //Сохранение в LocalStorage
function setLocalStorage() {
  localStorage.setItem("lang", lang);
  localStorage.setItem('theme', theme);
}
window.addEventListener("beforeunload", setLocalStorage);

//Извлечение из LocalStorage
function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
    if (lang !== 'en') {
      languages.forEach((item) => {
        item.classList.remove('active_lang');
        if (item.dataset.lang === 'ru') {
          item.classList.add('active_lang');
        }
      });
    }
  }
  if (localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      changeTheme();
    }
  }
}
window.addEventListener('load', getLocalStorage);




 /*Video player function*/

 const videoPlayer = document.querySelector('.video-player-video');
 //const videoPlayerCover = document.querySelector('.video-player-cover');
 const progressBar = document.querySelector('.video-progressbar');
 const currTime = document.querySelector('.video-controls-time');
 const durationTime = document.querySelector('.video-controls-duration');
 const videoPlayerButton = document.querySelector('.video__player__btn');
 const playButton = document.querySelector('.video-controls-play');
 const volumeButton = document.querySelector('.video-controls-volume');
 const volumeScale = document.querySelector('.volume-progressbar');
 const titleColor = '#BDAE82';
 const videoCotrolsColor = '#C8C8C8';


 const videoActive = () => {
     if (videoPlayer.paused) {
         videoPlayer.play();
         playButton.classList.add("video-controls-pause");
         videoPlayerButton.classList.add("hidden");
     } else {
         videoPlayer.pause();
         playButton.classList.remove("video-controls-pause");
         videoPlayerButton.classList.remove("hidden");
         videoPlayerButton.classList.add("open-video");
     }
     if (durationTime.innerHTML == '00:00') {
         durationTime.innerHTML = videoTime(videoPlayer.duration);
     }
 }

 playButton.addEventListener('click', videoActive);
 videoPlayerButton.addEventListener('click', videoActive);
 videoPlayer.addEventListener('click', videoActive);

 const videoTime = (time) => {
     time = Math.floor(time);
     let minutes = Math.floor(time / 60);
     let seconds = Math.floor(time - minutes * 60);
     let minutesValue = minutes;
     var secondsValue = seconds;
     if (minutes < 10) {
         minutesValue = `0${minutes}`;
     }
     if (seconds < 10) {
         secondsValue = `0${seconds}`;
     }
     return `${minutesValue}:${secondsValue}`;
 }

 const videoProgress = () => {
     let progress = (Math.floor(videoPlayer.currentTime) / (Math.floor(videoPlayer.duration) / 100));
     progressBar.value = progress;
     currTime.innerHTML = videoTime(videoPlayer.currentTime);
     progressBar.style.background = `linear-gradient(to right, ${titleColor} 0%, ${titleColor} ${progress}%, ${videoCotrolsColor} ${progress}%, ${videoCotrolsColor} 100%)`;
     if (videoPlayer.currentTime === videoPlayer.duration) {
         playButton.classList.remove("video-controls-pause");
     }
 }

 videoPlayer.addEventListener('timeupdate', videoProgress);

 progressBar.addEventListener("input", function () {
     let newTime = videoPlayer.duration * (progressBar.value / 100);
     videoPlayer.currentTime = newTime;
 })


 const videoChangeVolume = () => {
     let volume = volumeScale.value / 100;
     videoPlayer.volume = volume;
     if (videoPlayer.volume == 0) {
         volumeButton.classList.add("video-controls-mute");
     } else {
         volumeButton.classList.remove("video-controls-mute");
     }
 }
 const videoMute = () => {
     if (videoPlayer.volume == 0) {
         videoPlayer.volume = volumeScale.value / 100;
         volumeButton.classList.remove("video-controls-mute");
     } else {
         videoPlayer.volume = 0;
         volumeButton.classList.add("video-controls-mute");
     }
 }
 volumeButton.addEventListener('click', videoMute);
 volumeScale.addEventListener('change', videoChangeVolume);

 volumeScale.addEventListener('input', function () {
     const value = this.value;
     console.log(value)
     this.style.background = `linear-gradient(to right, ${titleColor} 0%, ${titleColor} ${value}%, ${videoCotrolsColor} ${value}%, ${videoCotrolsColor} 100%)`
 })

 const videoWrap = document.querySelector('.video-wrap');
 const videoFullscreenButton = document.querySelector('.video-controls-fullscreen');

 const openFullscreen = () => {
     if (document.fullscreenElement === null) {
         videoWrap.requestFullscreen();
     } else {
         document.exitFullscreen();
     }
 }

 videoFullscreenButton.addEventListener('click', openFullscreen);

 document.addEventListener("fullscreenchange", () => {
     videoFullscreenButton.classList.toggle("active");
 });

 //Очистка полей формы
 function clearAllFormInputs() {
  let form = document.getElementById('form');
  let inputs = form.getElementsByTagName('input');
  let textar = form.getElementsByTagName('textarea');
  for (let input of inputs)
    input.value = '';
  for (let textarea of textar)
    textarea.value = '';
}

let button = document.getElementById('button');
button.addEventListener('click', clearAllFormInputs);




     

