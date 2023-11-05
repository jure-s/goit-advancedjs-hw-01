import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

    const updateLocalStorage = throttle(function(data) {
        const currentTime = data.seconds;
        localStorage.setItem('videoplayer-current-time', currentTime);
    }, 1000);

    player.on('timeupdate', updateLocalStorage);

    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime) {
        player.setCurrentTime(savedTime).then(function(seconds) {
            console.log('Video has been set to', seconds);
        }).catch(function(error) {
            console.error('Error setting video time:', error);
        });
    }
});