import { setPendingAction } from "./states.js"

export function showConfirm(text, action){
        modalText.textContent = text
        confirmModal.classList.remove("hidden")
        setPendingAction(action)
        
    }
export function showEdit(text, action){
        editModalText.textContent = text
        editModal.classList.remove("hidden")
        setPendingAction(action)
    }

export function showDuplicateModal(text){
        duplicateConfirmText.textContent = text
        modalDuplicate.classList.remove("hidden")
    }
export function showComplete (text, action){
        modalTextComplete.textContent = text
        ModalComplete.classList.remove("hidden")
        setPendingAction(action)
    }