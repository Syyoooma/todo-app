import {toastContainer} from "./dom.js"
export function showToast(message, type){
    const toast = document.createElement("div")
    toast.textContent = message
    toast.classList.add("toast")
    toast.classList.add(type)
    toastContainer.append(toast)
    setTimeout(() => {
        toast.remove()
        
    }, 3000);

}