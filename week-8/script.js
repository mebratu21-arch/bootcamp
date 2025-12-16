/***********************
}
};


// Delete button
const delBtn = document.createElement("button");
delBtn.textContent = "Delete";
delBtn.onclick = function () {
const updatedTodos = getTodos().filter(t => t.id !== todo.id);
saveTodos(updatedTodos);
renderTodos(updatedTodos);
};


// Append everything
li.append(span, editBtn, delBtn);
list.appendChild(li);
});
}


/***********************
4️⃣ ADD NEW TODO
************************/
addBtn.onclick = function () {
if (input.value === "") {
alert("Please write a task");
return;
}


const todos = getTodos();


todos.push({
id: Date.now(), // unique id
text: input.value, // todo text
completed: false // default status
});


saveTodos(todos);
input.value = ""; // clear input
renderTodos(todos);
};


/***********************
5️⃣ FILTER TODOS
************************/
filterBtns.forEach(btn => {
btn.onclick = function () {
const type = btn.dataset.filter;
let todos = getTodos();


if (type === "active") {
todos = todos.filter(t => !t.completed);
}


if (type === "completed") {
todos = todos.filter(t => t.completed);
}


renderTodos(todos);
};
});


/***********************
6️⃣ LOAD TODOS ON PAGE START
************************/
renderTodos(getTodos());