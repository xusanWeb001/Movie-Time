const elList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");
const countText = document.getElementById("countText");
const emptyMsg = document.getElementById("emptyMsg");

// Genre dropdown
const allGenres = [...new Set(films.flatMap(f => f.genres))].sort();
allGenres.forEach(g => {
  const opt = document.createElement("option");
  opt.value = g;
  opt.textContent = g;
  genreSelect.appendChild(opt);
});

// Skeleton
function showSkeletons() {
  for (let i = 0; i < 8; i++) {
    const li = document.createElement("li");
    li.className = "movie-item skeleton-item";
    li.innerHTML = `
            <div class="skeleton skeleton-img"></div>
            <div class="movie-content">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
                <div class="skeleton skeleton-badge"></div>
            </div>`;
    elList.appendChild(li);
  }
}

function removeSkeletons() {
  document.querySelectorAll(".skeleton-item").forEach(el => el.remove());
}

// Filter
function filter() {
  const q = searchInput.value.toLowerCase().trim();
  const g = genreSelect.value.toLowerCase();
  const items = elList.querySelectorAll(".movie-item:not(.skeleton-item)");
  let count = 0;

  items.forEach(item => {
    const matchTitle = item.dataset.title.includes(q);
    const matchGenre = !g || item.dataset.genres.includes(g);
    if (matchTitle && matchGenre) {
      item.classList.remove("hidden");
      count++;
    } else {
      item.classList.add("hidden");
    }
  });

  countText.innerHTML = `<span>${count}</span> movie${count !== 1 ? "s" : ""} found`;
  emptyMsg.style.display = count === 0 ? "block" : "none";
}

// Render
function renderFilms() {
  showSkeletons();

  setTimeout(() => {
    removeSkeletons();

    films.forEach((film, i) => {
      const elItem = document.createElement("li");
      const elImg = document.createElement("img");
      const elContent = document.createElement("div");
      const elTitle = document.createElement("h2");
      const elText = document.createElement("p");
      const elGenres = document.createElement("div");
      const elDate = document.createElement("span");

      elItem.className = "movie-item";
      elImg.className = "movie-img";
      elContent.className = "movie-content";
      elTitle.className = "movie-title";
      elText.className = "movie-text";
      elGenres.className = "genres";
      elDate.className = "date";

      elItem.dataset.title = film.title.toLowerCase();
      elItem.dataset.genres = film.genres.join(",").toLowerCase();
      elItem.style.animationDelay = `${i * 0.04}s`;

      elImg.src = film.poster;
      elImg.alt = film.title;
      elImg.loading = "lazy";

      elTitle.textContent = film.title;
      elText.textContent = film.overview;

      film.genres.forEach(g => {
        const span = document.createElement("span");
        span.className = "genre";
        span.textContent = g;
        elGenres.appendChild(span);
      });

      const d = new Date(film.release_date * 1000);
      elDate.textContent = d.toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric"
      });

      elContent.appendChild(elTitle);
      elContent.appendChild(elText);
      elContent.appendChild(elGenres);
      elContent.appendChild(elDate);
      elItem.appendChild(elImg);
      elItem.appendChild(elContent);
      elList.appendChild(elItem);
    });

    // filter faqat render tugagandan keyin chaqiriladi
    filter();

  }, 500);
}

searchInput.addEventListener("input", filter);
genreSelect.addEventListener("change", filter);

// Ishga tushirish
renderFilms();