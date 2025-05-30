import { getData,deleteTODO, saveData } from "./storage";
import "../styles.css";
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function displayTODO(){
    const array=getData();
    const container=document.getElementById('content');
    removeAllChildNodes(container);
    array.forEach(element => {
        //
        const TODOdiv=document.createElement('div');
        if(element.completed===true){
            TODOdiv.className='TODO completed';
        }else{
            TODOdiv.className='TODO';
        }
        //checkbox
        const checkbox=document.createElement('input');
        checkbox.type='checkbox';
        checkbox.checked=element.completed;
        checkbox.addEventListener('change',()=>{
            element.completed=checkbox.checked;
            saveData();
            displayTODO();
        })
        //name of todo
        const name=document.createElement('div');
        name.className='TODO-name'
        name.innerText=element.TODOname;
        //due date
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        const dateText = document.createElement('div')
        dateText.innerText = element.date || 'No date';
        dateText.addEventListener('click', () => {
            dateText.replaceWith(dateInput);
            dateInput.addEventListener('change',()=>{
                element.date = dateInput.value;
                saveData();
                displayTODO();
            })
        });
        //delete todo
        const deleteTODObtn=document.createElement('button');
        deleteTODObtn.innerText='Delete';
        deleteTODObtn.addEventListener('click',()=>{
            deleteTODO(element);
            displayTODO();
        })
        //appending childs
        TODOdiv.appendChild(checkbox);
        TODOdiv.appendChild(name);
        TODOdiv.appendChild(dateText);
        TODOdiv.appendChild(deleteTODObtn);
        container.appendChild(TODOdiv);
    });
}
export{displayTODO};