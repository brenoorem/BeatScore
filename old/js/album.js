const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('../data/albuns.json')
  .then(res => res.json())
  .then(albums => {

    const album = albums.find(a => a.id == id);

    document.querySelector('h1').innerText = album.title;
    document.querySelector('.album-cover').src = album.cover;
    document.querySelector('.artist').innerText = album.artist;
    document.querySelector('.rating').innerText = "⭐ " + album.rating;
    document.querySelector('.description').innerText = album.description;

  });

function favoriteAlbum() {
  let favs = JSON.parse(localStorage.getItem('favs')) || [];

  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem('favs', JSON.stringify(favs));
  }

  alert("Favoritado!");
}

function addReview() {
  const text = document.getElementById("reviewText").value;

  const review = `<div class="review">${text}</div>`;

  document.querySelector(".reviews").innerHTML += review;
}