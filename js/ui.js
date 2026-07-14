import { tasks } from "./states.js";
import {  editInput,
    taskList } from "./dom.js";
import { showEdit, showComplete, showConfirm, } from "./modals.js";
import { editTask, deleteTask, unComplete, doComplete } from "./tasks.js";
export function createTask (task){
        const listCard = document.createElement("li")
        const taskItem = document.createElement("div")
        taskItem.className = "DivLi"
        const number = document.createElement("span");
        number.className = "task-number";
        number.textContent = `${tasks.indexOf(task) + 1}. `;
        taskItem.prepend(number);
        const spanText = document.createElement("span")
        spanText.className = "taskText"
        if(task.done === true){
            spanText.classList.add("done")
        }
        spanText.textContent = task.text
        listCard.append(taskItem)
        taskItem.append(spanText)
        
        const buttonChange = document.createElement("button")
        const iconForButtonChange = document.createElement("i")
        iconForButtonChange.setAttribute("data-lucide","pencil")
        
        buttonChange.append(iconForButtonChange)
        taskItem.append(buttonChange)
        


        buttonChange.addEventListener("click", () => {
            const action = () => editTask(task, editInput, spanText)
            const text1 = "Введіть новий текст:"
            showEdit(text1, action)        
            

        })
        
        const buttonDone = document.createElement("button")
        const iconForButtonDone = document.createElement("i")
        iconForButtonDone.setAttribute("data-lucide", "Check")
        buttonDone.append(iconForButtonDone)

        taskItem.append(buttonDone)
        buttonDone.addEventListener("click", () => {

            let action;
            let text;

            if (task.done) {
                action = () => unComplete(task, spanText, buttonDone);
                text = "Відмітити задачу як невиконану?";
            } else {
                action = () => doComplete(task, spanText, buttonDone);
                text = "Виконати задачу?";
        }
            showComplete(text, action);
        });

        

        const deleteButton = document.createElement("button")
        const iconForButtonDel = document.createElement("i")
        iconForButtonDel.setAttribute("data-lucide", "Trash 2")
        deleteButton.append(iconForButtonDel)
        taskItem.append(deleteButton)
        deleteButton.addEventListener("click", () => {
            
            const action = () => deleteTask(task, listCard)
            const text = "Видалити задачу?"
            showConfirm(text, action)
            updateNumbers()

        
        })
        taskList.append(listCard)
        lucide.createIcons();
    }

export function updateNumbers() {
    document.querySelectorAll(".task-number").forEach((el, index) => {
        el.textContent = `${index + 1}.`;
    });}