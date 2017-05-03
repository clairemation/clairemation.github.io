const imageSection = document.getElementById('imageSection'),
  popover = document.getElementById('popover'),
  searchForm = document.getElementById('searchForm'),
  searchSubmitButton = document.getElementById('searchSubmitButton'),
  prev = document.getElementById('prev'),
  next = document.getElementById('next'),
  loaderWrapper = document.getElementById('loader-wrapper');
var searchTerm = 'kitten',
  page = 0;

searchSubmitButton.onclick = function(e){
  e.preventDefault();
  searchTerm = searchForm.elements.namedItem('searchFormInput').value;
  page = 0
  load(1);
};

prev.onclick = () => load(-1);
next.onclick = () => load(1);
popover.onclick = closePopover;

function loadImage(url){
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(image);
    image.src = url;
  })
}

// Loads images in parallel, displays them in order
function appendLoadedImagesInOrder(thumbsList, fullsizeList){
  var seq = Promise.resolve();
  for (let i = 0; i < thumbsList.length; i++){
    seq = seq.then(() => loadImage(thumbsList[i]))
    .then((img) => {
      img.onclick = function(){popup(fullsizeList[i])};
      imageSection.appendChild(img);
      return Promise.resolve();
    })
    .catch((img) => {
      console.log(`Unable to load ${img.src}`);
      return Promise.resolve();
    })
  }
  return seq;
}

function buildPhotoUrl(item, size){
  return `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_${size}.jpg`
}

function popup(url){
  popover.style.display = 'block';
  popover.innerHTML = `<img src='${url}' />`;
}

function closePopover(){
  popover.style.display = 'none';
}

function load(pageAdvance){

  loaderWrapper.style.display = 'flex';
  page += pageAdvance;
  var url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e80a5b79eada92dc6ef4192c33ead8d2&tags=${searchTerm}&per_page=10&page=${page}&format=json`;

  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200){
        var response = JSON.parse(this.responseText.slice(14, -1)).photos;
        if (page >= response.pages) next.style.display = 'none';
        else next.style.display = 'inline';
        if (page > 1) prev.style.display = 'inline';
        else prev.style.display = 'none';
        var list = response.photo;
        var thumbnails = list.map(item => buildPhotoUrl(item, 's'));
        var fullImages = list.map(item => buildPhotoUrl(item, 'c'));
        resolve({thumbnails, fullImages});
      }
    }
    request.open('GET', url, true);
    request.send();
  }).then(lists => {
    var {thumbnails, fullImages} = lists;
    imageSection.innerHTML = '';
    appendLoadedImagesInOrder(thumbnails, fullImages)
    .then(() => {
      loaderWrapper.style.display = 'none';
    });
  });
};