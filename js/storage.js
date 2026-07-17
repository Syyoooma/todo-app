import { tasks } from "./states.js";

export function loadTasks(){
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function saveTask (){
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
}