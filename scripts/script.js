// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

var counter = 0;
// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        counter++;
        let newPost = document.createElement('journal-entry');
        newPost.addEventListener('click', () => {
          router.setState(counter);
        });
        //console.log(counter);
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});