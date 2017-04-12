
/*

document.getElementById('element-id')  -  Gets whole html element eg <div id="xxxxxx"></div>

document.querySelector('button.edit') - gets button with class .delete

*/



// 1. Plan program literally/pseudocode. PROBLEM PLAN PERFORM PERFECT.

// 2. Split stages of program into sensible functions

// 3. Create some sensible variables to target dom elements to be used and manipulated



/**********************

  DECLARE VARIABLES
  
**********************/




var taskInput = document.getElementById('new-task');  // New task

// This method reutrns collection of elements as a nodelist object. access each element with index like array.
var addButton = document.getElementsByTagName('button')[0]; // First button on page
var completedTasksHolder = document.getElementById('completed-tasks'); // Completed tasks list 
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); // Incomplete tasks list





/**********************

  CREATE FUNCTIONS
  
**********************/




var createNewTaskElement = function (taskTextString) {
  
  // Create list item
  var listItem = document.createElement('li');  
  
      // Checkbox <input type="checkbox">
  var checkBox = document.createElement('input');
      // Label (Text from input)
  var label = document.createElement('label');
      // Text input too for editing task name
  var editInput = document.createElement('input');
      // Edit <button class="edit">Edit</button>
  var editButton = document.createElement('button');
      // Delete <button class="delete">Delete</button> 
  var deleteButton = document.createElement('button');
  
    // Modify each element
  
    // Specify that checkbox input has a type of checkbox - dot notation to access element properties. (style, href, type etc)
  checkBox.type = "checkbox";
  
    // Specify that text input has a type of text
  editInput. type = "text";
  
    //  Add text to buttons and relevant classes
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
    // Add text to label element
  label.innerText = taskTextString;
  
    // Append each element
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}

//// Add a new task
var addTask = function() {
  
  console.log('Add task....');
  
  // if there is text in input field then add a task
  
  var inputContainsText = taskInput.value;
  
  console.log(inputContainsText);
  
  // Create a new task li with text from #new-task   
  var listItem = createNewTaskElement(taskInput.value);
  
    // Append list item to ul for incomplete tasks
  
  incompleteTasksHolder.appendChild(listItem);
  
    // Bind event handlers
  bindTaskEvents(listItem, completeTask);
  
  // Clear text from inout field
  taskInput.value = "";
  
  }

// Edit task

var editTask = function() {
  console.log('Edit task....');
    
  // Get <li> element to be modified
  var listItem = this.parentNode;  
  
  // Get inner elements to be modified
  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");
  var button = listItem.querySelector("button.edit");
  
  // If the parent has the class of .editmode
  
  // Store precence of class as boolean  
  var containsClass = listItem.classList.contains("editMode");
  
  if(containsClass) {
    // Switch from editmode
    // Inpout value goes into label text
    label.innerText = editInput.value;
    button.innerText = "Edit"; 
  } else {
    // Switch to editmode
    // Label text goes into input value
    editInput.value = label.innerText; 
    
    // Change button text to "save"
    button.innerText = "Save"; 
  }
  
  // Toggle editmode class
    listItem.classList.toggle("editMode");
  
  }
     
  
    // if parent li has editmode class
      // Text inpt becomes label
      // Switch from editmode class
    // If parent list item not have editmode class
      // Label text becomes input property value
      // add editmode class




// Delete task

var deleteTask = function() {
  console.log('Delete task....');

  // delete/remove parent of button (li) from the ul.
  
  // Get <li> element - call parentnode method on 'this' as its the button that's been clicked
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  
}


// Mark task as complete

var completeTask = function() {
  console.log('Task complete....');
  
  // Get parent element of button that's been clicked as it's the <li> we want to move to the other list  
  var listItem = this.parentNode;
  
  // Append task list item to completedTaskList ul element
  completedTasksHolder.appendChild(listItem);
  
  // Need to bind different event handler to checkbox now so we can switch back to incomplete.
  bindTaskEvents(listItem, incompleteTask);
    
}


// Mark task as incomplete

var incompleteTask = function() {
  console.log('Task incomplete....');

  // Get parent element of button that's been clicked as it's the <li> we want to move to the other list
  var listItem = this.parentNode;
  
  // Append task list item to incompleteTaskList ul element
  incompleteTasksHolder.appendChild(listItem);
  
  // Need to bind different event handler to checkbox now so we can switch back to complete.
  bindTaskEvents(listItem, completeTask);
  
}


// Pass in list item and bind all event handlers to relevant child elements

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
    // Select task list item's children
  var checkbox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');;
  
  // Bind the edit task to the edit button
  editButton.onclick = editTask;
  
  // Bind delete task to the delete button
  deleteButton.onclick = deleteTask;
  
  
  // We use different event here as checkbox can be triggered with spacebar....  
  // Bind task checkbox event handler to the checkbox
  checkbox.onchange = checkBoxEventHandler;
  
}


/*****************************

  DO ALL THE STUFF

*****************************/


/*   Bind all event handlers to elements on the page*/

  // Bind addTask event handler to add task button

    //Don't call function like addTask() unless you want it to be called straight away
    // Use var functionName = function(){} like above. The onclick method = function reference. See global event handlers.onclick on MDN



//  addButton.onclick = addTask; - this would be overridden


var ajaxRequest = function(){
  console.log('ajax request');
};



addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// Function to cycle over li items in incomplete task list
// Trigger bind eventhandler function on each li 

// .children method - parentNode.children, returns a live html collection of the child elements of the node.

for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], completeTask);   
}


// Function to cycle over li items in incomplete task list
// Trigger bind eventhandler function on each li 

for(var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], incompleteTask);  
  
}
    
