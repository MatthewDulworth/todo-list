appWrapper = "main";
plusButton = "#plus";
createTodoInput = "#create-todo";
newTodoSection = "#new-todo";
clearButton = "clear";
todoList = "ul";

class Todo {
   constructor(text, completed) {
      this.text = text;
      this.completed = completed;
      todosContainer.addTodo(this);
   }
   toggleCompleted = () => {
      this.completed = !(this.completed);
   }
   html = () => {
      let html = `<li><div><span class='check far fa-circle'></span><input class='todo-text' value="${this.text}" maxlength="50" autocomplete="off"></div><span class='menu'><i class='fa fa-trash'></i></span></li>`;
      return html;
   }
}

let todosContainer = {
   todos: [],
   localStorageKey: "todosContainer",

   storeContainer() {
      localStorage.setItem(
         this.localStorageKey,
         JSON.stringify(this.todos)
      );
   },
   addTodo(todo) {
      this.todos.push(todo);
   },
   initTodos() {
      let storageArray = JSON.parse(localStorage.getItem(this.localStorageKey));

      for(let i=0; i<this.length(); i++){
         let todo = new Todo(storageArray[i].text, storageArray[i].completed);
         console.log(todo);
         this.addTodo(todo);
      }
   },
   length(){
      return this.todos.length;
   }
}

let eventHandler = {
   addEventListeners() {
      this.addPlusButtonClickEvent();
      this.addRotateClickEvent();
      this.addHoverEffectsEvent();
      this.addCreateNewTodoEvent();
      this.addClearButtonClickEvent();
      this.addToggleCompletedTodoEvent();
      this.addDeleteTodoEvent();
   },
   addPlusButtonClickEvent() {
      $(plusButton).click(function () {
         $("#new-todo").toggleClass("visible");
         $("#create-todo").toggleClass("visible");
      });
   },
   addRotateClickEvent() {
      $(".rotate").click(function () {
         $(this).toggleClass("down");
      });
   },
   addHoverEffectsEvent() {
      $(appWrapper).on({
         mouseenter: function () {
            $(this).addClass("rainbow-text");
         },
         mouseleave: function () {
            $(this).removeClass("rainbow-text");
         }
      }, "#plus, .fa-trash, .check");
   },
   addCreateNewTodoEvent() {
      $(createTodoInput).keypress(function (event) {
         if (event.which === 13) {
            let todo = new Todo($(this).val(), false);
            todosContainer.storeContainer();
            $(todoList).prepend(todo.html());
            $(this).val("");
         }
      });
   },
   addClearButtonClickEvent() {
      $(clearButton).click(function () {
         $("ul").empty();
         localStorage.clear();
      });
   },
   addToggleCompletedTodoEvent() {
      $(todoList).on("click", ".check", function () {
         let listItemIndex = $(this).parent().parent().index();
         $(this).toggleClass("fa-circle fa-check-circle");
         todosContainer.todos[listItemIndex].toggleCompleted();
      });
   },
   addDeleteTodoEvent() {
      $(todoList).on("click", ".fa-trash", function () {
         localStorage.removeItem($(this).parent().parent().attr("id"));
         $(this).parent().parent().remove();
      });
   }
}

function initApp() {
   eventHandler.addEventListeners();
   console.log(localStorage.length);

   if (localStorage.length != 0) {
      todosContainer.initTodos();

      for(let i=0; i<todosContainer.length(); i++){
        
      }
   }
}

initApp();