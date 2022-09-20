let storedArray = [];

document.addEventListener("DOMContentLoaded", function () {
  getNotes();
});

function getNotes() {
  getArrFromLocalStorage();

  for (let i = 0; i < storedArray.length; i++) {
    const newCard = generateCard(storedArray[i][0]);
    document.querySelector("#notes").appendChild(newCard);
  }
}

//generate card
const generateCard = (noteText) => {
  let card = document.createElement("li");
  card.classList.add("card");

  let noteContent = document.createElement("p");
  noteContent.innerText = noteText;

  let delButton = document.createElement("button");
  delButton.innerText = "delete";
  delButton.classList.add("deleteBtn");

  card.appendChild(noteContent);
  card.appendChild(delButton);

  return card;
};

//add note
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

//work with LocalStorage
const getArrFromLocalStorage = () => {
  let collection = JSON.parse(localStorage.getItem("notesCollection"));
  if (collection) {
    storedArray = collection;
  }
};

const setArrToLocalStorage = () => {
  localStorage.setItem("notesCollection", JSON.stringify(storedArray));
};

const addElementToLocalStorage = (noteText) => {
  storedArray.push([noteText]);
  console.log(storedArray);
  setArrToLocalStorage();
};

//delete note
document.querySelector("#notes").addEventListener(
  "click",
  function (ev) {
    if (ev.target.className === "deleteBtn") {
      let li = ev.target.closest("li"); // get reference by using closest
      let nodes = Array.from(li.closest("ul").children); // get array
      let delIndex = nodes.indexOf(li); //get deleted index

      var notes = JSON.parse(localStorage.getItem("notesCollection"));
      let newNotes = notes.filter((value, index) => index !== delIndex);
      localStorage.setItem("notesCollection", JSON.stringify(newNotes));

      let div = ev.target.parentNode;
      div.remove();

      getArrFromLocalStorage();
    }
  },
  false
);
