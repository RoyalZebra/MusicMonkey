console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Mekanın Sahibi", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/1.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/1.jpg"},
    {songName: "Everybody Knows", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/2.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/2.jpg"},
    {songName: "Extreme Ways", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/3.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/3.jpg"},
    {songName: "Butterflies", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/4.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/4.jpg"},
    {songName: "The Final Victory", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/5.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/5.jpg"},
    {songName: "Genius ft. Sia, Diplo, Labrinth", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/6.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/6.jpg"},
    {songName: "The Comeback Kid", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/7.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/7.jpg"},
    {songName: "Overdose", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/8.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/8.jpg"},
    {songName: "Rag'n'Bone Man", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/9.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/9.jpg"},
    {songName: "Rag'n'Bone Man (Extended)", filePath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/mp3/10.mp3", coverPath: "https://raw.githubusercontent.com/RoyalZebra/MusicMonkey/master/img/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})