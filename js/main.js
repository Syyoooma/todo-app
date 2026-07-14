import{
    buttonAdd, taskList, inputText, confirmModal, modalText, confirmYes,
    confirmNo, editModal, editModalText, editInput, editButton,
    leaveButton, modalDuplicate, duplicateConfirmText, OKButton,
    ModalComplete, modalTextComplete, completeYes, completeNo
    } from "./dom.js"

    
import{
    pendingAction, tasks, setTasks, setPendingAction,
}   from "./states.js"

import{
    loadTasks, saveTask
}   from "./storage.js"
 
import{
    createTask, updateNumbers
}   from "./ui.js"


import{
    addTask, hasDuplicate, deleteTask, editTask,
    doComplete, unComplete
}   from "./tasks.js"
    
import{
    showConfirm, showEdit, showDuplicateModal, showComplete
}   from "./modals.js"

lucide.createIcons()

setTasks(loadTasks())

for(task of tasks){
    createTask(task)
    }

    buttonAdd.addEventListener("click", () => {
        addTask()
    })
    inputText.addEventListener("keydown", (event) => {

        if(event.key === "Enter"){
            addTask()
        }
    });

    confirmYes.addEventListener("click", () => {
        if(pendingAction){
            pendingAction()
            updateNumbers()
            saveTask(tasks)
            confirmModal.classList.toggle("hidden")
            setPendingAction(null);
        }
    })
    
    confirmNo.addEventListener("click", () =>{
        saveTask()
        confirmModal.classList.toggle("hidden")
        setPendingAction(null);
    })

    editButton.addEventListener("click", () => {
        if(pendingAction){
            pendingAction()
            saveTask(tasks)
            editModal.classList.toggle("hidden")
            setPendingAction(null);
        }
    })

    leaveButton.addEventListener("click", () => {
        if(pendingAction){
            saveTask(tasks)
            editModal.classList.toggle("hidden")
            setPendingAction(null);
        }
    })
    OKButton.addEventListener("click", () => {
        modalDuplicate.classList.add("hidden")
    })

    completeYes.addEventListener("click", () => {
        if(pendingAction){
            pendingAction()
            saveTask(tasks)
            ModalComplete.classList.toggle("hidden")
            setPendingAction(null);
            
        }
    })
    completeNo.addEventListener("click", () =>{
        saveTask(tasks)
        ModalComplete.classList.toggle("hidden")
        setPendingAction(null);
    })






    
    
    
    

    