const elList = document.querySelector(".js-list");

films.forEach((films) => {

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

  elImg.src = films.poster;
  elImg.alt = films.title;

  elTitle.textContent = films.title;
  elText.textContent = films.overview;

 

  elContent.appendChild(elTitle);
  elContent.appendChild(elText);
  elContent.appendChild(elGenres);
  elContent.appendChild(elDate);

  elItem.appendChild(elImg);
  elItem.appendChild(elContent);

  elList.appendChild(elItem);
});