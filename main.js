const appWrapper = "main";
const plusButton = "#plus";
const createTodoInput = "#create-todo";
const newTodoSection = "#new-todo";
const clearButton = "#clear";
const trashCan = ".fa-trash";
const checkmark = ".check";
const rotate = ".rotate";
const list = "ul";
const todoText = ".todo-text";

let app = {
   run() {
      this.todos.initTodosFromStorage();
      this.events.addEventListeners();
      console.log(localStorage);
      console.log(this.todos.todosArray);
   },

   todos: {
      localStorageKey: "app",
      todosArray: [],

      updateLocalStorage() {
         localStorage.setItem(this.localStorageKey, JSON.stringify(this.todosArray));
      },
      addTodo(text, completed) {
         let todo = new Todo(text, completed);
         this.todosArray.unshift(todo);
         $(list).prepend(todo.html());
         this.updateLocalStorage();
      },
      removeTodo(todo) {
         this.todosArray.splice($(todo).index(), 1);
         $(todo).remove();
         this.updateLocalStorage();
      },
      clearTodos() {
         this.todosArray = [];
         $(list).empty();
         this.updateLocalStorage();
         console.log(localStorage);
         console.log(app.todos.todosArray);
      },
      toggleTodoCompleted(todo) {
         this.todosArray[$(todo).index()].toggleCompleted();
         $(todo).find(".check").toggleClass("fa-circle fa-check-circle");
         this.updateLocalStorage();
      },
      initTodosFromStorage() {
         if (localStorage.length != 0) {
            let storageArray = JSON.parse(localStorage.getItem(this.localStorageKey));

            for (let i = storageArray.length - 1; i >= 0; i--) {
               this.addTodo(storageArray[i].text, storageArray[i].completed);
            }
         }
      },
   },

   events: {
      addEventListeners() {
         this.buttonHover();
         this.plusButtonClick();
         this.trashCanClick();
         this.rotateElementClick();
         this.clearButtonClick();
         this.checkmarkClick();
         this.createNewTodoEnter();
      },
      buttonHover() {
         $(appWrapper).on({
            mouseenter: function () {
               $(this).addClass("rainbow-text");
            },
            mouseleave: function () {
               $(this).removeClass("rainbow-text");
            }
         }, `${plusButton}, ${checkmark}, ${trashCan}`);
      },
      plusButtonClick() {
         $(plusButton).click(function () {
            $(newTodoSection).toggleClass("visible");
            $(createTodoInput).toggleClass("visible");
         });
      },
      trashCanClick() {
         $(list).on("click", trashCan, function () {
            app.todos.removeTodo($(this).parent().parent());
         });
      },
      rotateElementClick() {
         $(rotate).click(function () {
            $(this).toggleClass("down");
         });
      },
      createNewTodoEnter() {
         $(createTodoInput).keypress(function (event) {
            if (event.which === 13) {
               app.todos.addTodo($(this).val(), false);
               $(this).val("");
            }
         });
      },
      clearButtonClick() {
         $(clearButton).click(function () {
            app.todos.clearTodos();
         });
      },
      checkmarkClick() {
         $(list).on('click', checkmark, function () {
            app.todos.toggleTodoCompleted($(this).parent().parent());
         });
      },
   },
}

class Todo {
   constructor(text, completed) {
      this.text = text;
      this.completed = completed;
   }
   toggleCompleted = () => {
      this.completed = !(this.completed);
   }
   html = () => {
      let checked = (this.completed) ? "fa-check-circle" : "fa-circle";
      let html = `<li><div><span class='check far ${checked}'></span><input class='todo-text' value="${this.text}" maxlength="50" autocomplete="off"></div><span class='menu'><i class='fa fa-trash'></i></span></li>`;
      return html;
   }
}

function status() {
   console.log(localStorage);
   console.log(app.todos.todosArray);
}

app.run();