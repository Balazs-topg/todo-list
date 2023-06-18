import menueNode from "./modules/pop-up.html";

class Menue {
  constructor(main = false) {
    this.main = main;
    const DOMparser = new DOMParser();
    this.popUpMenue = DOMparser.parseFromString(menueNode, "text/html").body.firstChild;
    document.body.appendChild(this.popUpMenue);
    this.addTaskAddBtn = this.popUpMenue.querySelector(".add-task-add-btn");
    this.addTaskMenueCont = this.popUpMenue;
    this.addTaskMenue = this.popUpMenue.querySelector(".add-task-menue");
    this.addTaskInput = this.popUpMenue.querySelector("input");

    this.addTaskMenueBtn = document.querySelector(".add-task-menue-btn");
    if (main === true) {
      this.addTaskMenueBtn.addEventListener("input", () => {
        if (this.addTaskMenueBtn.checked) {
          this.open();
        }
      });
    }
    this.addTaskMenueBg = this.popUpMenue.querySelector(".add-task-menue-bg");
    this.addTaskMenueBg.addEventListener("click", () => {
      this.close();
    });
  }

  setupClose() {
    this.addTaskMenueBtn.addEventListener(
      "click",
      () => {
        if (!this.addTaskMenueBtn.checked) {
          this.close();
        }
      },
      { once: true }
    );
  }

  open() {
    this.addTaskMenueBtn.checked = true;
    this.setupClose();

    this.addTaskMenueCont.classList.remove("hidden");
    this.addTaskInput.focus();

    this.addTaskMenue.classList.add("animate-open-menue");
    this.addTaskMenueBg.classList.add("animate-fade-in");

    setTimeout(() => {
      this.addTaskMenue.classList.remove("animate-open-menue");
      this.addTaskMenueBg.classList.remove("animate-fade-in");
    }, 200);
  }

  close() {
    this.addTaskMenueBtn.checked = false;
    this.addTaskMenueBtn.removeEventListener(
      "click",
      () => {
        this.close();
      },
      { once: true }
    );

    this.addTaskMenue.classList.add("animate-close-menue");
    this.addTaskMenueBg.classList.add("animate-fade-out");

    setTimeout(() => {
      this.addTaskMenueCont.classList.add("hidden");

      this.addTaskMenue.classList.remove("animate-close-menue");
      this.addTaskMenueBg.classList.remove("animate-fade-out");
    }, 200);
  }
}

import toDoListNode from "./modules/task-item.html";

class ToDoList {
  constructor() {
    this.toDoListArray = [];
  }

  append(title, desc) {
    this.toDoListArray.push(title);
    const DOMparser = new DOMParser();
    let node = DOMparser.parseFromString(toDoListNode, "text/html").body.firstChild;
    let checkBox = node.querySelector("input");
    this.label = node.querySelector("label");
    this.label.setAttribute("for", this.toDoListArray.length);
    checkBox.id = this.toDoListArray.length;
    this.label.innerText = menue.addTaskInput.value;

    menue.addTaskInput.value = "";
    listContainer.appendChild(node);
    checkBox.addEventListener("input", () => {
      node.classList.add("animate-remove-item");
      setTimeout(() => {
        node.classList.add("hidden");
      }, 550);
    });
    let menueEdit = new Menue();
    let editBtn = node.querySelector("button");
    editBtn.addEventListener("click", () => {
      menueEdit.popUpMenue.querySelector("h2").innerText = "Edit task";
      menueEdit.addTaskInput.value = this.label.innerText;
      menueEdit.open();
    });
    menueEdit.addTaskAddBtn.addEventListener("click", () => {
      this.label.innerText = menueEdit.addTaskInput.value;
      menueEdit.close();
    });
  }
}
let toDoList = new ToDoList();

let menue = new Menue(true);
menue.addTaskAddBtn.addEventListener("click", () => {
  toDoList.append(menue.addTaskInput.value);
  menue.close();
});

let listContainer = document.querySelector(".list-container");
