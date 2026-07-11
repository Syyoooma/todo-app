const buttonAdd = document.querySelector("#AddText")
const taskList = document.querySelector("ol")
const inputText = document.querySelector("#task")

let tasks = []
const data = localStorage.getItem("tasks")

tasks = JSON.parse(data) || []

for(task of tasks){
createTask(task)
}
  

function createTask (task){

    const li = document.createElement("li")
    
    const spanText = document.createElement("span")
    spanText.className = "taskText"
    if(task.done === true){
        spanText.classList.add("done")
    }
    spanText.textContent = task.text
    
    li.append(spanText)
    
    const buttonChange = document.createElement("button")
    buttonChange.textContent = "✏️"
    li.append(buttonChange)

    buttonChange.addEventListener("click", () => {
        const newText = prompt("Enter new text:")
    
        if(!newText)    
        return
        const text = newText.trim()
        if(!text){
            return
        }   

        if (hasDuplicate(text, task))
            return      
            
        spanText.textContent = text
        task.text = text
        saveTask()

    })
    
    const buttonDone = document.createElement("button")
    buttonDone.textContent = "✅"

    li.append(buttonDone)
    buttonDone.addEventListener("click", () => {

        const done = confirm("Хотите отметить задачу как выполненую?")

        if(done){
        spanText.classList.toggle("done")
        task.done = !task.done
        saveTask()
        }
    })

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "❌"
    li.append(deleteButton)
    deleteButton.addEventListener("click", () => {
        const delBttn = confirm("Вы действительно хотите удалить задачу?")
        if(delBttn){
        tasks = tasks.filter(element => element !== task)
        
        li.remove()
        
        saveTask()   

        
        }
    }) 
    
    taskList.append(li)
    
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

    createTask(task)
    tasks.push(task)
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
