export let pendingAction = null;
export let tasks = [];
export function setTasks(data){
    tasks = data;
}

export function setPendingAction(action){
    pendingAction = action;
}