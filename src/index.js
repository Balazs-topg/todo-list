import htmlContent from "./modules/task-item.html";
console.log(htmlContent);

class Menue {
  constructor() {}
  open() {
    AddTaskMenueCont.classList.remove("hidden");

    addTaskMenue.classList.add("animate-open-menue");
    addTaskMenueBg.classList.add("animate-fade-in");

    setTimeout(() => {
      addTaskMenue.classList.remove("animate-open-menue");
      addTaskMenueBg.classList.remove("animate-fade-in");
    }, 200);
  }

  close() {
    addTaskMenue.classList.add("animate-close-menue");
    addTaskMenueBg.classList.add("animate-fade-out");

    setTimeout(() => {
      AddTaskMenueCont.classList.add("hidden");

      addTaskMenue.classList.remove("animate-close-menue");
      addTaskMenueBg.classList.remove("animate-fade-out");
    }, 200);
  }
}
let menue = new Menue();

let AddTaskMenueCont = document.querySelector(".add-task-menue-cont");
let addTaskMenue = document.querySelector(".add-task-menue");
let addTaskMenueBg = document.querySelector(".add-task-menue-bg");
let addTaskMenueBtn = document.querySelector(".add-task-menue-btn");
addTaskMenueBtn.addEventListener("input", () => {
  if (addTaskMenueBtn.checked) {
    menue.open();
  }
  if (!addTaskMenueBtn.checked) {
    menue.close();
  }
});
addTaskMenueBg.addEventListener("click", () => {
  addTaskMenueBtn.checked = false;
  menue.close();
});

let addTaskInput = document.querySelector(".add-task-input");
let addTaskAddBtn = document.querySelector(".add-task-add-btn");
addTaskAddBtn.addEventListener("click", () => {
  console.log(addTaskInput.value);
});
