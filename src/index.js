import menueNodeImport from "./modules/pop-up.html";

class Menue {
  constructor(main = false) {
    this.main = main;
    const DOMparser = new DOMParser();
    this.popUpMenue = DOMparser.parseFromString(menueNodeImport, "text/html").body.firstChild;

    if (main === true) {
      document.body.appendChild(this.popUpMenue);
    } else {
      document.querySelector(".edit-menues-container").appendChild(this.popUpMenue);
    }
    this.addTaskDialogLabel = this.popUpMenue.querySelector("h2");
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

    this.addTaskMenue.classList.add("animate-close-menue");
    this.addTaskMenueBg.classList.add("animate-fade-out");
    this.addTaskInput.value = "";
    setTimeout(() => {
      this.addTaskMenueCont.classList.add("hidden");

      this.addTaskMenue.classList.remove("animate-close-menue");
      this.addTaskMenueBg.classList.remove("animate-fade-out");
    }, 200);
  }
}

import toDoListNodeImport from "./modules/task-item.html";

function ToDoItemUtil(title) {
  this.title = title;
}
function NodeUtin(title, dataEntryNumber) {
  this.dataEntryNumber = dataEntryNumber;
  this.title = title;
  const DOMparser = new DOMParser();
  this.node = DOMparser.parseFromString(toDoListNodeImport, "text/html").body.firstChild;

  this.node.setAttribute("dataEntryNumber", dataEntryNumber);
  this.checkBox = this.node.querySelector("input");
  this.editBtn = this.node.querySelector("button");
  this.label = this.node.querySelector("label");
  this.label.innerText = title;
}

class ToDoList {
  constructor() {
    this.toDoListArray = [];
    this.listContainer = document.querySelector(".list-container");
  }
  updateDisplay(edited = false, checked = false) {
    document.querySelector(".edit-menues-container").innerHTML = "";
    this.listContainer.innerHTML = "";
    let count = 0;
    this.toDoListArray.forEach((item) => {
      let currentNode = new NodeUtin(item.title, count);
      console.log(this.toDoListArray.length);

      if (count === this.toDoListArray.length - 1 && !edited && !checked) {
        currentNode.node.classList.add("animate-add-new-item");
      }
      count += 1;
      let editMenu = new Menue();
      currentNode.editBtn.addEventListener("click", () => {
        editMenu.addTaskDialogLabel.innerText = "Edit item";
        editMenu.addTaskInput.value = item.title;
        editMenu.addTaskAddBtn.addEventListener("click", () => {
          this.toDoListArray[currentNode.dataEntryNumber].title = editMenu.addTaskInput.value;
          currentNode.label.innerText = editMenu.addTaskInput.value;
          editMenu.close();

          setTimeout(() => {
            this.updateDisplay((edited = true));
          }, 200);
        });
        editMenu.open();
      });
      currentNode.checkBox.addEventListener("input", () => {
        this.toDoListArray.splice(currentNode.dataEntryNumber, 1);
        currentNode.node.classList.add("animate-remove-item");
        setTimeout(() => {
          this.updateDisplay((checked = true));
        }, 550);
      });

      this.listContainer.appendChild(currentNode.node);
    });
  }

  append(title, desc) {
    this.toDoListArray.push(new ToDoItemUtil(title));
    this.updateDisplay();
    /*
    this.toDoListArray.push(new ToDoItemUtil(title));
    const DOMparser = new DOMParser();
    let node = DOMparser.parseFromString(toDoListNodeImport, "text/html").body.firstChild;
    let checkBox = node.querySelector("input");
    this.label = node.querySelector("label");
    this.label.setAttribute("for", this.toDoListArray.length);
    checkBox.id = this.toDoListArray.length;
    this.label.innerText = menue.addTaskInput.value;

    menue.addTaskInput.value = "";
    this.listContainer.appendChild(node);
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
    */
  }
}
let toDoList = new ToDoList();

let menue = new Menue(true);
menue.addTaskAddBtn.addEventListener("click", () => {
  toDoList.append(menue.addTaskInput.value);
  menue.close();
});
