
function storeImages(data) {
  images = data;
}

function getRandomImage() {
  const rand = Math.floor(Math.random() * images.length);
  return images[rand].images.original.url;
}

async function loadImage(url) {
  loaded = false;
  image.src = "Rolling-1s-200px.gif";
  return new Promise(function(resolve, reject) {
    image.addEventListener('load', () => {
      resolve();
    });
    image.src = url;
  }).then(function() {
    loaded = true;
  })
}

function onGifsFound(gifs) {
  storeImages(gifs);
  if(loaded) {
    loadImage(getRandomImage())
    .then(function() {
      hideSearchResult();
      showGifView();
    })
  }
}

function showGifView() {
  if(gifView.classList.contains('hidden')) {
    gifView.classList.remove('hidden');
  }
}

function hideGifView() {
  if(!gifView.classList.contains('hidden')) {
    gifView.classList.add('hidden');
  }
}

async function loadData(data) {
  if(data.length <= 0) {
    return Promise.reject("No results found");
  } else {
    onGifsFound(data);
    button.addEventListener('click', () => { loadImage(getRandomImage()) });
    return Promise.success();
  }
}

function showSearchResult(message) {
  if(searchResponse.classList.contains('hidden')) {
    searchResponse.innerText = message;
    searchResponse.classList.remove('hidden');
  }
}

function hideSearchResult() {
  if(!searchResponse.classList.contains('hidden')) {
    searchResponse.classList.add('hidden');
  }
}

async function searchGif(searchTerm) {
  const apiResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=VA4SRDcUUN8rczfH6EzYL1TRXEIVZzAR&q=${searchTerm}`, {mode: 'cors'});
  const response = await apiResponse.json();
  console.log(response);
  await loadData(response.data).catch(function(error) {
    showSearchResult(error);
    hideGifView();
  })
}

const image = document.querySelector('#image');
const button = document.querySelector('#new-gif-btn');
const searchBar = document.querySelector('#search-bar');
const searchBtn = searchBar.querySelector("#search-btn");
const searchText = searchBar.querySelector('#search-text');
const gifView = document.querySelector('#gif-view');
const searchResponse = document.querySelector('#search-result');

let images = [];
let loaded = true;

searchBtn.addEventListener('click', () => searchGif(searchText.value));
searchText.value = "";

searchGif('dogs');

