    const buttonAdd = document.querySelector("#AddText")
    const taskList = document.querySelector("ol")
    const inputText = document.querySelector("#task")
    const confirmModal = document.querySelector("#confirmModal")
    const modalText = document.querySelector("#modalText")
    const confirmYes = document.querySelector("#confirmYes")
    const confirmNo = document.querySelector("#confirmNo")
    const editModal = document.querySelector("#editModal")
    const editModalText = document.querySelector("#editModalText")
    const editInput = document.querySelector("#editInput")
    const editButton = document.querySelector("#editButton")
    const leaveButton = document.querySelector("#leaveButton")
    lucide.createIcons();


    let pendingAction;
    let tasks = []
    const data = localStorage.getItem("tasks")

    tasks = JSON.parse(data) || []

    for(task of tasks){
    createTask(task)
    }
    

    function createTask (task){
        const li = document.createElement("li")
        const DivInLi = document.createElement("div")
        DivInLi.className = "DivLi"
        const number = document.createElement("span");
        number.className = "task-number";
        number.textContent = `${tasks.indexOf(task) + 1}. `;
        DivInLi.prepend(number);
        const spanText = document.createElement("span")
        spanText.className = "taskText"
        if(task.done === true){
            spanText.classList.add("done")
        }
        spanText.textContent = task.text
        li.append(DivInLi)
        DivInLi.append(spanText)
        
        const buttonChange = document.createElement("button")
        const iconForButtonChange = document.createElement("i")
        iconForButtonChange.setAttribute("data-lucide","pencil")
        
        buttonChange.append(iconForButtonChange)
        DivInLi.append(buttonChange)
        


        buttonChange.addEventListener("click", () => {
            const action = () => editTask(task, editInput, spanText)
            const text1 = "Введіть новий текст:"
            showEdit(text1, action)        
            

        })
        
        const buttonDone = document.createElement("button")
        const iconForButtonDone = document.createElement("i")
        iconForButtonDone.setAttribute("data-lucide", "Check")
        buttonDone.append(iconForButtonDone)

        DivInLi.append(buttonDone)
        buttonDone.addEventListener("click", () => {

            const done = confirm("Хотите отметить задачу как выполненую?")

            if(done){
            spanText.classList.toggle("done")
            task.done = !task.done
            saveTask()
            }
        })

        const deleteButton = document.createElement("button")
        const iconForButtonDel = document.createElement("i")
        iconForButtonDel.setAttribute("data-lucide", "Trash 2")
        deleteButton.append(iconForButtonDel)
        DivInLi.append(deleteButton)
        deleteButton.addEventListener("click", () => {
            
            const action = () => deleteTask(task, li)
            const text = "Видалити задачу?"
            showConfirm(text, action)

        
        })
        taskList.append(li)
        lucide.createIcons();
    }

    function addTask(){

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
        tasks.push(task)
        createTask(task)
        saveTask()
        inputText.value = ""
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
            saveTask()
            updateNumbers()
            confirmModal.classList.toggle("hidden")
            pendingAction = null;
        }
    })
    confirmNo.addEventListener("click", () =>{
        saveTask()
        confirmModal.classList.toggle("hidden")
        pendingAction = null;
    })

    editButton.addEventListener("click", () => {
        if(pendingAction){
            pendingAction()
            saveTask()
            editModal.classList.toggle("hidden")
            pendingAction = null
        }
    })

    leaveButton.addEventListener("click", () => {
        if(pendingAction){
            saveTask()
            editModal.classList.toggle("hidden")
            pendingAction = null
        }
    })

    function hasDuplicate(text, task){

        
    
        const enterText = text.toLowerCase()

        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].text === task){
                continue
            }
            const taskText = tasks[i].text.toLowerCase()
            
            if(taskText === enterText){
                alert("Такая задача уже сучествует")
                inputText.value = ""
                return true
            }
            
        }
        return false
    }

    function saveTask (){
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
    }
    function showConfirm(text, action){
        modalText.textContent = text
        confirmModal.classList.remove("hidden")
        pendingAction = action
        
    }
    function deleteTask(task, li){
        tasks = tasks.filter(element => element !== task)
        li.remove()
        
    }
    function showEdit(text, action){
        editModalText.textContent = text
        editModal.classList.remove("hidden")
        pendingAction = action
    }
    function editTask(task, editInput, spanText){
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

    function updateNumbers() {
    document.querySelectorAll(".task-number").forEach((el, index) => {
        el.textContent = `${index + 1}.`;
    });
}