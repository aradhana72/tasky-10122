const taskContainer = document.querySelector(".task_container");
let globalTaskData=[];

//TEMPLATE LITERAL - ``

//assume that we have the modal data in a variable -> taskData
//taskData -> object -> key value pairs
/*{
  id, image, title, type, description
}*/
//${}-> to put in dynamic nd changing js value in html
//taskData.key == value
const generateHTML = (taskData) => {
  return ` <div id=${taskData.id} class="col-4">
    <div class="card">
<div class="card-header d-flex justify-content-end gap-2">
<button type="button" name=${taskData.id} class="btn btn-outline-success">
 <i class="fa fa-pencil" name=${taskData.id} aria-hidden="true"></i>
</button>
<button type="button" name=${taskData.id} onclick="deleteCard.apply(this,arguments)" class="btn btn-outline-danger">
 <i class="fa fa-trash" name=${taskData.id} aria-hidden="true"></i>
</button>
</div>
<div class="card-body">
<img
src=${taskData.image}
alt="image"
class="card-img-top"
/>

<h5 class="card-title mt-4 fw-bolder" id="title-color">${taskData.title}</h5>
<p class="card-text">${taskData.description}</p>
<a href="#" class="btn btn-primary">${taskData.type}</a>
</div>
</div>
  </div>`;
};
//stringify-> converts json objects into string
let saveToLocalStorage = () => {
  localStorage.setItem("taskyProject",JSON.stringify({card: globalTaskData}));
}

let insertToDOM = (content) => {
  taskContainer.insertAdjacentHTML("beforeend",content);
}

const addNewCard = () => {
  //get task data
  let taskData = {
    id: `${Date.now()}`,
    title: document.getElementById('taskTitle').value,
    image: document.getElementById('imageURL').value,
    type: document.getElementById('taskType').value,
    description: document.getElementById('taskDescription').value
  };
globalTaskData.push(taskData);
saveToLocalStorage();

let newCard = generateHTML(taskData);
insertToDOM(newCard);

//clear the form
document.getElementById("taskTitle").value="";
document.getElementById("imageURL").value="";
document.getElementById("taskType").value="";
document.getElementById("taskDescription").value="";

return;
}

const loadExistingCards = () => {
  let getData = localStorage.getItem("taskyProject");

  if(!getData) return;
//parse -> string into json -> opposite of stringify
  let taskCards = JSON.parse(getData);

  globalTaskData = taskCards.card;
  globalTaskData.map((taskData)=> {
    let newCard = generateHTML(taskData);
    insertToDOM(newCard);
  });
  return;
}
//tagName -> tagname
const deleteCard = (event) => {
  let targetID = event.target.getAttribute("name");
  let elementType = event.target.tagName;

  let removeTask = globalTaskData.filter((task)=> task.id!==targetID);
  globalTaskData = removeTask;

  saveToLocalStorage();

  if(elementType==="BUTTON") {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  }

};
