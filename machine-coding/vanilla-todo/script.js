document.addEventListener("DOMContentLoaded", function () {
	const todoForm = document.querySelector(".todo-form");
	const todoInput = document.querySelector(".todo-input");
	const todoList = document.querySelector(".todo-list");
	const todoSubmit = document.querySelector(".todo-submit");

	todoForm.addEventListener("submit", function (e) {
		event.preventDefault();
		const todoText = todoInput.value.trim();
		console.log("todoText", todoText);
	});
});
