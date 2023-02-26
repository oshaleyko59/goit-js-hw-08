import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//get iframe by id
const iframe = document.querySelector('#vimeo-player');

//initialize player with iframe
const player = new Player(iframe);

//add listener of timeupdate event - throttled to 1 sec
player.on('timeupdate', throttle(handleTimeupdate, 1000));

//add event listener to window load event
window.addEventListener("load", handlePageLoad);

//on timeupdate event, saves seconds property to local storage
//with "videoplayer-current-time" as key
function handleTimeupdate({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

//on page load, restores player current time from local storage
// eslint-disable-next-line no-unused-vars
function handlePageLoad(_evt) {
  const sec = localStorage.getItem('videoplayer-current-time');
  if (sec) player.setCurrentTime(sec);
}


/* ************************************************************
   ************************************************************
//TODO: remove
  //console.log(seconds);

 // console.log('loaded', sec);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
player.on('play', function () {
  console.log('played the video!');
});
 */
