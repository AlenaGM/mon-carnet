let storedArray = [];

document.getElementById("notes__form").onsubmit = (e) => {
  e.preventDefault();

  const noteText = document.getElementById("noteText").value;

  if (noteText) {
    const newCard = generateCard(noteText);
    document.querySelector("#notes").appendChild(newCard);

    addElementToLocalStorage(noteText);

    document.getElementById("notes__form").reset();
  }
};

const generateCard = (noteText) => {
  let card = document.createElement("div");
  card.classList.add("card");

  let card__main = document.createElement("div");
  card.classList.add("card__main");

  let noteContent = document.createElement("p");
  noteContent.innerText = noteText;

  card__main.appendChild(noteContent);

  card.appendChild(card__main);

  return card;
};

getArrFromLocalStorage = () => {
  let collection = JSON.parse(localStorage.getItem("notesCollection"));
  if (collection) {
    storedArray = collection;
  }
};

setArrToLocalStorage = () => {
  localStorage.setItem("notesCollection", JSON.stringify(storedArray));
};

addElementToLocalStorage = (noteText) => {
  storedArray.push([noteText]);
  setArrToLocalStorage();
};

document.addEventListener("DOMContentLoaded", function () {
  getNotes();
});

function getNotes() {
  getArrFromLocalStorage();

  for (let i = 0; i < storedArray.length; i++) {
    const newCard = generateCard(
      storedArray[i][0],
      storedArray[i][1],
      storedArray[i][2]
    );
    document.querySelector("#notes").appendChild(newCard);
  }
}
