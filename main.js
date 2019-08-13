let counter = 0;
init();

// show the create new todo menu
$("#plus").click(function () {
   $("#new-todo").toggleClass("visible");
   $("#create-todo").toggleClass("visible");
});

// hover effects
$("main").on({
   mouseenter: function () {
      $(this).addClass("rainbow-text");
   },
   mouseleave: function () {
      $(this).removeClass("rainbow-text");
   }
}, "#plus, .fa-trash, .check");

// rotate animation
$(".rotate").click(function () {
   $(this).toggleClass("down");
});

// create new todo
$("#create-todo").keypress(function (event) {
   if (event.which === 13) {
      let html = `<li id="${counter}"><div><span class='check far fa-circle'></span><input class='todo-text' value="${$(this).val()}" maxlength="50" autocomplete="off"></div><span class='menu'><i class='fa fa-trash'></i></span></li>`;
      $("ul").prepend(html);
      $(this).val("");
      localStorage.setItem(counter,html);
      counter++;
      localStorage.setItem("counter",counter);
   }
});

// clear button 
$("#clear").click(function(){
   $("ul").empty();
   localStorage.clear();
});

// checkmarks
$("ul").on("click", ".check", function () {
   $(this).toggleClass("fa-circle fa-check-circle");
});

// delete todo
$("ul").on("click", ".fa-trash", function () {
   localStorage.removeItem($(this).parent().parent().attr("id"));
   $(this).parent().parent().remove();
});

// local storage 
function init(){
   for(i=localStorage.getItem("counter"); i>=0; i--){
      $("ul").append(localStorage.getItem(i));
   }
}

// clear function
function clearTodo(){
   $("ul").empty();
   localStorage.clear();
   counter = 0;
}