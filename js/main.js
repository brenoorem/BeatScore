
const grid = document.querySelector('.grid');

fetch('../data/albuns.json')
  .then(res => res.json())
  .then(albums => {

    grid.innerHTML = albums.map(album => `
      <div class="card" onclick="goToAlbum(${album.id})">
        <img src="${album.cover}">
        <h3>${album.title}</h3>
        <p>⭐ ${album.rating}</p>
      </div>
    `).join('');

  });

function goToAlbum(id) {
  window.location.href = `../pages/album.html?id=${id}`;
}