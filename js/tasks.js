import { inputText, editInput,
    taskList, searchInput, searchNull } from "./dom.js";
import { tasks, setTasks } from "./states.js";
import { createTask, updateNumbers } from "./ui.js";
import { saveTask } from "./storage.js";
import { showDuplicateModal } from "./modals.js";
import { showToast } from "./toast.js";

export function addTask(){
    
    const text = inputText.value.trim()
    const task = {
        text: text,
        done: false,
    
    }
        if(!text){
            inputText.value = ""
            return
        }

        if(hasDuplicate(text, task)){
            return
        }
        setTasks([...tasks, task]);
        createTask(task)
        saveTask(tasks)
        inputText.value = ""
        return true
    }

export function hasDuplicate(text, task){

        const enterText = text.toLowerCase()

        for(let i = 0; i < tasks.length; i++){
            if(tasks[i] === task){
                continue
            }
            const taskText = tasks[i].text.toLowerCase()
            
            if(taskText === enterText){
                showToast("Така задача вже існує!", "error")
                inputText.value = ""
                return true
            }
            
        }
        return false
    }

export function deleteTask(task, listCard){
        setTasks(tasks.filter(element => element !== task))

        listCard.remove()
        listCard.classList.add("remove-animation");
        updateNumbers()
        
    }

export function editTask(task, spanText){
        const newTask = editInput.value
        if(!newTask)    
        return
        const text = newTask.trim()
        if(!text){
            return
        }
        if(text === task.text){
            showToast("Ви не змінили задачу!", "error")
            return
        }

        if (hasDuplicate(text, task))
            return
        spanText.textContent = newTask;
        task.text = newTask;
        return true
    }

export function doComplete (task, spanText, buttonDone){
        spanText.classList.add("done")
        buttonDone.classList.add("done")
        task.done = true
        return true
    }
export function unComplete (task, spanText, buttonDone) {
        spanText.classList.remove("done")
        buttonDone.classList.remove("done")
        task.done = false
    }

export function searchTask() {
    const searchText = inputText.value.trim().toLowerCase();

    let found = false;

    for (const task of tasks) {
        if (task.text.toLowerCase().includes(searchText)) {
            task.li.classList.remove("hidden");
            found = true;
        } else {
            task.li.classList.add("hidden");
        }
    }

    if (searchText === "") {
        searchNull.classList.add("hidden");
    } else if (found) {
        searchNull.classList.add("hidden");
    } else {
        searchNull.classList.remove("hidden");
    }
}