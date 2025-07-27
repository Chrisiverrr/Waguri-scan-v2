const slug = new URLSearchParams(location.search).get('id');
const ch   = +new URLSearchParams(location.search).get('c') || 1;
const totalPages = 12; // stub

let page = 1;
const img  = document.getElementById('pageImg');
const info = document.getElementById('pageInfo');
const prev = document.getElementById('prevZone');
const next = document.getElementById('nextZone');

function loadPage() {
  img.src   = `https://asurascans.com/uploads/${slug}/${ch}/${page}.jpg`;
  info.textContent = `${page} / ${totalPages}`;
}
loadPage();

prev.onclick = () => { if (page > 1) { page--; loadPage(); } };
next.onclick = () => { if (page < totalPages) { page++; loadPage(); } };
