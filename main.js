const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

document.querySelector(".todo-button").addEventListener("click", add);
document.querySelector(".todo-list").addEventListener("click", action);
document.addEventListener("DOMContentLoaded", getPrevious);
document.querySelector(".filter-todo").addEventListener("click", filter);

function filter(event) {
  const todoes = todoList.childNodes;
  todoes.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
    }
  });
}

function getPrevious() {
  let todoes;
  if (localStorage.getItem("todoes") !== null) {
    todoes = JSON.parse(localStorage.getItem("todoes"));

    todoes.forEach(function (todo) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("todo");

      const newTodo = document.createElement("li");
      newTodo.innerHTML = todo;
      newTodo.classList.add("todo-item");
      newDiv.appendChild(newTodo);

      const checkButton = document.createElement("button");
      checkButton.innerHTML = "<i class= 'fas fa-check'></i>";
      checkButton.classList.add("complete-btn");
      newDiv.appendChild(checkButton);

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "<i class= 'fas fa-trash'></i>";
      deleteButton.classList.add("trash-btn");
      newDiv.appendChild(deleteButton);

      todoList.appendChild(newDiv);
    });
  }
}

function add(event) {
  event.preventDefault();

  const newDiv = document.createElement("div");
  newDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  newDiv.appendChild(newTodo);

  const checkButton = document.createElement("button");
  checkButton.innerHTML = "<i class= 'fas fa-check'></i>";
  checkButton.classList.add("complete-btn");
  newDiv.appendChild(checkButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<i class= 'fas fa-trash'></i>";
  deleteButton.classList.add("trash-btn");
  newDiv.appendChild(deleteButton);

  todoList.appendChild(newDiv);
  addToLocal(todoInput.value);
  todoInput.value = "";
}

function addToLocal(todo) {
  let todoes;
  if (localStorage.getItem("todoes") === null) {
    todoes = [];
  } else {
    todoes = JSON.parse(localStorage.getItem("todoes"));
  }
  todoes.push(todo);
  localStorage.setItem("todoes", JSON.stringify(todoes));
}

function removeLocal(todo) {
  let todoes;
  if (localStorage.getItem(todoes === null)) {
    todoes = [];
  } else {
    todoes = JSON.parse(localStorage.getItem("todoes"));
  }
  todoes.splice(todoes.indexOf(todo), 1);
  localStorage.setItem("todoes", JSON.stringify(todoes));
}

function action(event) {
  if (event.target.classList[0] === "trash-btn") {
    event.target.parentElement.remove();
    removeLocal(event.target.parentElement.firstChild.innerHTML);
  } else {
    event.target.parentElement.classList.toggle("completed");
  }
}
