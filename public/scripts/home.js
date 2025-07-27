const catalog = document.getElementById('catalog');
const search  = document.getElementById('search');

async function loadAsuraCatalog() {
  catalog.innerHTML = '<div class="loader">Loading…</div>';
  try {
    const res  = await fetch('https://api.asurascans.com/api/manga');
    const data = await res.json();
    const list = data.data || data;

    render(list.map(m => ({
      id: m.slug || m.id,
      title: m.title,
      cover: m.image_url || m.cover_url,
      latest: m.latest_chapter || m.latest
    })));
  } catch {
    catalog.innerHTML = '<div class="loader">Error loading catalog</div>';
  }
}

function render(list) {
  catalog.innerHTML = '';
  list.forEach(m => {
    catalog.insertAdjacentHTML('beforeend', `
      <div class="card" onclick="location.href='chapter.html?id=${m.id}&c=${m.latest}'">
        <img src="${m.cover}" alt="${m.title}" onerror="this.src='https://via.placeholder.com/140x200?text=No+Cover'">
        <h3>${m.title}</h3>
      </div>
    `);
  });
}

search.addEventListener('input', () => {
  const q = search.value.toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    const title = c.querySelector('h3').textContent.toLowerCase();
    c.style.display = title.includes(q) ? '' : 'none';
  });
});

loadAsuraCatalog();
