import{
    buttonAdd, taskList, inputText, confirmModal, modalText, confirmYes,
    confirmNo, editModal, editModalText, editInput, editButton,
    leaveButton, modalDuplicate, duplicateConfirmText, OKButton,
    ModalComplete, modalTextComplete, completeYes, completeNo, searchInput, searchButton,
    searchNull
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
    doComplete, unComplete, searchTask
}   from "./tasks.js"
    
import{
    showConfirm, showEdit, showDuplicateModal, showComplete
}   from "./modals.js"

import { showToast } from "./toast.js"

lucide.createIcons()

setTasks(loadTasks())

for(task of tasks){
    createTask(task)
    }

    buttonAdd.addEventListener("click", () => {
        if(addTask())
        showToast("Задача була додана!", "success")
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
            
            showToast("Задача була видалена!", "warning")
            
        }
    })
    
    confirmNo.addEventListener("click", () =>{
        saveTask()
        confirmModal.classList.toggle("hidden")
        setPendingAction(null);
        
    })

    editButton.addEventListener("click", () => {
    if (pendingAction) {

        const result = pendingAction();

        if (result) {
            showToast("Задача була змінена!", "success");
        }

        saveTask(tasks);
        editModal.classList.toggle("hidden");
        setPendingAction(null);
    }
});

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
            const result1 = pendingAction()
            if(result1){
                showToast("Ви виконали задачу!", "success")
            }
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
    let isSearchMode = false
    inputText.addEventListener("input", () => {
        if(!isSearchMode){
            return
        }
        searchTask()
   });
   
   searchButton.addEventListener("click", () => {
        if(!isSearchMode){
        isSearchMode = true
        inputText.placeholder = "Пошук задачі..."
        buttonAdd.classList.add("hidden")
        searchButton.innerHTML = "✖"
        inputText.value = "";
        inputText.focus();
    } else{
        isSearchMode = false
        inputText.placeholder = "Додати задачу..." 
        buttonAdd.classList.remove("hidden")
        searchNull.classList.add("hidden");
        searchButton.innerHTML = '<i data-lucide="search"></i>';
        lucide.createIcons();
        inputText.value = "";
        
        for (const task of tasks) {
            task.li.classList.remove("hidden");
            
        }
    }
   })
    inputText.addEventListener("keydown", (event) => {
        if(event.key === "Escape"){
            isSearchMode = false
            inputText.placeholder = "Додати задачу..." 
            buttonAdd.classList.remove("hidden")
            searchButton.innerHTML = '<i data-lucide="search"></i>';
            lucide.createIcons();
            inputText.value = "";
        
        for (const task of tasks) {
            task.li.classList.remove("hidden");
            searchNull.classList.add("hidden")
        }
            }

   })






    
    
    
    

    