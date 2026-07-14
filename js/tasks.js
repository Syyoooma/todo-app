import { inputText, editInput,
    taskList } from "./dom.js";
import { tasks, setTasks } from "./states.js";
import { createTask, updateNumbers } from "./ui.js";
import { saveTask } from "./storage.js";
import { showDuplicateModal } from "./modals.js";


export function addTask(){

    const text = inputText.value.trim()
    const task = {
        text: text,
        done: false
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
    }

export function hasDuplicate(text, task){

        
    
        const enterText = text.toLowerCase()

        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].text === task){
                continue
            }
            const taskText = tasks[i].text.toLowerCase()
            
            if(taskText === enterText){
                showDuplicateModal("Така задача вже існує!")
                inputText.value = ""
                return true
            }
            
        }
        return false
    }

export function deleteTask(task, listCard){
        setTasks(tasks.filter(element => element !== task))
        listCard.remove()
        updateNumbers()
        
    }

export function editTask(task, editInput, spanText){
        const NewTask = editInput.value
        if(!NewTask)    
        return
        const text = NewTask.trim()
        if(!text){
            return
        }

        if (hasDuplicate(text, task))
            return
        spanText.textContent = text
        task.text = text
        
    }

export function doComplete (task, spanText, buttonDone){
        spanText.classList.add("done")
        buttonDone.classList.add("done")
        task.done = true
    }
export function unComplete (task, spanText, buttonDone) {
        spanText.classList.remove("done")
        buttonDone.classList.remove("done")
        task.done = false
    }
