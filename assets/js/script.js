let list = document.querySelector('ul');
let todos;
function toLocal() {
    todos = list.innerHTML;
    localStorage.setItem('todos', todos);
}

list.addEventListener('click', function (ev) {
    if (ev.target.tagName === "LI") {
        ev.target.classList.toggle('checked');
    } else if (ev.target.tagName === "SPAN") {
        let div = ev.target.parentNode;
        div.remove();
        toLocal();
    }
}, false);


const newdo = document.querySelector('#btn');

newdo.addEventListener("click", () => {
    let li = document.createElement('li');
    let inputValue = document.getElementById('toDoEl').value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue == "") {
        alert("Введите дело");
    } else {
        document.getElementById('list').appendChild(li);
    }
    document.getElementById('toDoEl').value = "";
    let span = document.createElement('SPAN');
    let txt = document.createTextNode("Удалить");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    toLocal();
});

if (localStorage.getItem('todos')) {
    list.innerHTML = localStorage.getItem('todos');
}