
// show the create new todo menu
$("#plus").click(function () {
   $("#new-todo").toggleClass("visible");
   $("#create-todo").toggleClass("visible");
});

/******************************** this bit is relevent ***************************/
// the problem is the icons flash white for a second on mouse-exit instead of transitioning smoothly like they do on mouse-enter
// hover effect for icons
$("#plus, .fa-trash").hover(function () {
   $(this).toggleClass("rainbow-text")
});

// rotate animation
$(".rotate").click(function () {
   $(this).toggleClass("down");
});

// create new todo
$("#create-todo").keypress(function (event) {
   if (event.which === 13) {
      let todoTextContent = $(this).val();
      $("ul").prepend(`<li><div><span class='check far fa-circle'></span><input class='todo-text' value="${todoTextContent}" maxlength="50" autocomplete="off"></div><span class='menu'><i class='fa fa-trash'></i></span></li>`);
      $(this).val("");
   }
});

// checkmarks
$("ul").on("click", ".check", function () {
   $(this).toggleClass("fa-circle fa-check-circle");
});

// delete todo
$("ul").on("click", ".fa-trash", function () {
   $(this).parent().parent().remove();
});






















// -------------------- code i may need one day ---------------------- // 
// let li = $(this).parent().parent();
// if($(li).hasClass("completed")){
//    $(li).removeClass("completed");
//    $(this).removeClass("fa-check-circle");
//    $(this).addClass("fa-circle");
// }
// else{
//    $(li).addClass("completed");
//    $(this).removeClass("fa-circle");
//    $(this).addClass("fa-check-circle");
// }