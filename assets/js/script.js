let storedArray = []

document.getElementById('notes__form').onsubmit = (e) =>{

    e.preventDefault()

    const noteName = document.getElementById('noteName').value
    const noteText = document.getElementById('noteText').value

    if(noteName && noteText){
        const newCard = generateCard(noteName, noteText)
        document.querySelector('#notes').appendChild(newCard)

        addElementToLocalStorage(noteName, noteText)

        document.getElementById('notes__form').reset()
    }
}

const generateCard = (noteName, noteText) =>{

    let card = document.createElement('div')
    card.classList.add("card");

    let card__main = document.createElement('div')
    card.classList.add("card__main")

    let h3 = document.createElement('h3')
    h3.innerText = noteName

    let noteContent = document.createElement('p')
    noteContent.innerText = noteText

    card__main.appendChild(h3)
    card__main.appendChild(noteContent)

    card.appendChild(card__main)

    return card
}

getArrFromLocalStorage = () =>{
    let collection = JSON.parse(localStorage.getItem("notesCollection"))
    if(collection){
        storedArray = collection
    }
}

setArrToLocalStorage = () =>{
    localStorage.setItem("notesCollection", JSON.stringify(storedArray));
}

addElementToLocalStorage = (noteName, noteText) => {
    storedArray.push([noteName, noteText])
    setArrToLocalStorage()
}


document.addEventListener("DOMContentLoaded",function(){
    getNotes()
})

function getNotes() {

    getArrFromLocalStorage()


    for( let i = 0; i < storedArray.length; i++){

        const newCard = generateCard(storedArray[i][0],storedArray[i][1], storedArray[i][2] )
        document.querySelector('#notes').appendChild(newCard)
    }
}
