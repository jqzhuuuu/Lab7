// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

const h1 = document.getElementsByTagName('h1')[0];
var counter = 0;
// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        counter++;
        let perm = counter;
        let newPost = document.createElement('journal-entry');
        newPost.addEventListener('click', () => {
          let state = {entryNo: perm, data: entry};
          let title;
          let url = "/#entry" + perm;
          history.pushState(state, title, url);

          router.setState(perm, entry);
        });
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

const Settings = document.getElementsByTagName('header')[0].children[1];

Settings.addEventListener('click', () => {
  history.pushState({entryNo: -1, data: null}, null, "/#settings");

  router.setState(-1, null);
});

window.onpopstate = function(event) {
  if(event.state == null){
    router.setState(0, null);
  }else {
    let entryNum = event.state.entryNo;
    let entryData = event.state.data;

    router.setState(entryNum, entryData);
  }
};

h1.addEventListener('click', () => {
  history.pushState({entryNo: 0, data: null}, null, "/");

  router.setState(0, null);
});