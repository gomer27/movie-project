const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");

//UI Objesini başlatma
const ui = new UI();

// Storage Objesini üret
const storage = new Storage();
// Tüm eventleri yükleme
eventListerners();

function eventListerners() {
  form.addEventListener("submit", addFlim);
  document.addEventListener("DOMContentLoaded", function () {
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  });
}

function addFlim(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    //hata
    ui.displayMessages("Tüm alanları doldurun...", "danger");
  } else {
    const newFilm = new Film(title, director, url);
    ui.addFilmToUI(newFilm); // UI (Arayüze) film ekleme
    storage.addFilmToStorage(newFilm); // Storage film ekleme
    ui.displayMessages("Film başarıyla eklendi...", "success");
  }
  ui.clearInputs(titleElement, urlElement, directorElement);
  e.preventDefault();
}
