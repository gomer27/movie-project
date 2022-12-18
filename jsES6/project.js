const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//UI Objesini başlatma
const ui = new UI();

// Storage Objesini üret
const storage = new Storage();
// Tüm eventleri yükleme
eventListerners();

function eventListerners() {
  form.addEventListener("submit", addFlim);
  document.addEventListener("DOMContentLoaded", function () {
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });
  cardbody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}

function addFlim(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    //hata
    UI.displayMessages("Tüm alanları doldurun...", "danger");
  } else {
    const newFilm = new Film(title, director, url);
    UI.addFilmToUI(newFilm); // UI (Arayüze) film ekleme
    Storage.addFilmToStorage(newFilm); // Storage film ekleme
    UI.displayMessages("Film başarıyla eklendi...", "success");
  }
  UI.clearInputs(titleElement, urlElement, directorElement);
  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    UI.deleteFilmFromUI(e.target);
    Storage.deleteFilmFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
    UI.displayMessages("Silme işlemi başarılı...", "success");
  }
}

function clearAllFilms() {
  if (confirm("Hepsini silmek istediğinize emin misiniz ?")) {
    UI.displayMessages("Silme işlemi başarılı...", "success");
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
  }
}
