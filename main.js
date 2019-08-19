const appWrapper = "main";
const plusButton = "#plus-icon";
const createTodoInput = "#create-todo";
const newTodoSection = "#new-todo";
const clearButton = "#clear";
const trashCan = ".fa-trash";
const checkmark = ".check";
const rotate = ".rotate";
const list = "ul";
const todoText = ".todo-text";
const horizontalShakeAnimation = "shakeX";
const verticalShakeAnimation = "shakeY";

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

            // null is not an object (evaluating 'storageArray.lenght') // error only in safari
            for (let i = storageArray.length - 1; i >= 0; i--) {
               this.addTodo(storageArray[i].text, storageArray[i].completed);
            }
         }
      },
      saveTodoText(todo) {
         this.todosArray[$(todo).index()].savedValue = $(todo).find(todoText).val();
      },
      updateTodoText(todo, type) {
         let index = $(todo).index();
         if ($(todo).find(todoText).val() != undefined && $(todo).find(todoText).val() != "") {
            this.todosArray[index].text = $(todo).find(todoText).val();
            if(type === "enter"){
               $(todo).find(todoText).blur();
               $(todo).addClass(verticalShakeAnimation);
               window.setTimeout(function(){
                  $(todo).removeClass(verticalShakeAnimation);
               }, 300);
            }
         }
         else {
            let text = this.todosArray[index].savedValue;
            this.todosArray[index].text = text;
            $(todo).addClass(horizontalShakeAnimation);
            window.setTimeout(function(){
               $(todo).removeClass(horizontalShakeAnimation);
               if(type === "focusout"){
                  $(todo).find(todoText).val(text);
               }
            }, 500);
         }
         this.updateLocalStorage();
      }
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
         this.todoTextFocus();
         this.todoTextEnter();
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
               if ($(this).val() != undefined && $(this).val() != "") {
                  app.todos.addTodo($(this).val(), false);
                  $(this).val("");
               }
               else {
                  $(newTodoSection).addClass(horizontalShakeAnimation)
                  window.setTimeout(function () {
                     $(newTodoSection).removeClass(horizontalShakeAnimation);
                  }, 500);
               }
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
      todoTextFocus() {
         $(list).on({
            focusin: function () {
               app.todos.saveTodoText($(this).parent().parent());
            },
            focusout: function () {
               app.todos.updateTodoText($(this).parent().parent(), "focusout");
            }
         }, todoText);
      },
      todoTextEnter() {
         $(list).on("keypress", todoText, function (event) {
            if (event.which === 13) {
               app.todos.updateTodoText($(this).parent().parent(), "enter");
            }
         });
      }
   },
}

class Todo {
   constructor(text, completed) {
      this.text = text;
      this.completed = completed;
      this.savedValue = undefined;
   }
   // doesnt work in safari if it is an arrow function
   toggleCompleted() {
      this.completed = !(this.completed);
   }
   // doesnt work in safari if it is an arrow function
   html() {
      let checked = (this.completed) ? "fa-check-circle" : "fa-circle";
      let html = `<li><div><span class='check far ${checked}'></span><input class='todo-text' value="${this.text}" maxlength="50" autocomplete="off" placeholder="Add To-Do Text"></div><span class='menu'><i class='fa fa-trash'></i></span></li>`;
      return html;
   }
}

app.run();