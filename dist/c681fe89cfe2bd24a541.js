class Menue{constructor(){}open(){addTaskMenueBtn.checked=!0,AddTaskMenueCont.classList.remove("hidden"),addTaskMenue.classList.add("animate-open-menue"),addTaskMenueBg.classList.add("animate-fade-in"),setTimeout((()=>{addTaskMenue.classList.remove("animate-open-menue"),addTaskMenueBg.classList.remove("animate-fade-in")}),200)}close(){addTaskMenueBtn.checked=!1,addTaskMenue.classList.add("animate-close-menue"),addTaskMenueBg.classList.add("animate-fade-out"),setTimeout((()=>{AddTaskMenueCont.classList.add("hidden"),addTaskMenue.classList.remove("animate-close-menue"),addTaskMenueBg.classList.remove("animate-fade-out")}),200)}}let menue=new Menue,AddTaskMenueCont=document.querySelector(".add-task-menue-cont"),addTaskMenue=document.querySelector(".add-task-menue"),addTaskMenueBg=document.querySelector(".add-task-menue-bg"),addTaskMenueBtn=document.querySelector(".add-task-menue-btn");addTaskMenueBtn.addEventListener("input",(()=>{addTaskMenueBtn.checked&&menue.open(),addTaskMenueBtn.checked||menue.close()})),addTaskMenueBg.addEventListener("click",(()=>{menue.close()}));let toDoListArray=[];import htmlContent from"./modules/task-item.html";const DOMparser=new DOMParser;let listContainer=document.querySelector(".list-container"),addTaskInput=document.querySelector(".add-task-input"),addTaskAddBtn=document.querySelector(".add-task-add-btn");addTaskAddBtn.addEventListener("click",(()=>{toDoListArray.push(addTaskInput.value);let e=DOMparser.parseFromString(htmlContent,"text/html").body.firstChild,a=e.querySelector("label");a.setAttribute("for",toDoListArray.length),e.querySelector("input").id=toDoListArray.length,a.innerText=addTaskInput.value,addTaskInput.value="",listContainer.appendChild(e),menue.close()}));