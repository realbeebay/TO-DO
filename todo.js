	
	const storagePreferenceName = "beebay-to-do-app";
    let getLocalTODOStr = localStorage.getItem(storagePreferenceName);
    if(getLocalTODOStr == null){
    	 localStorage.setItem(storagePreferenceName, "");
    }
    
    getLocalTODOStr = localStorage.getItem(storagePreferenceName);
    
    const todoArrayStorage = [... new Set(getLocalTODOStr.split(","))];
    document.getElementById("todo-button").addEventListener("click", () => {
        const todoInput = document.getElementById("todo-input");
        const todoError = document.getElementById("todo-error");
        
        if(todoInput.value.trim().length > 0) {
            if(todoArrayStorage.indexOf(todoInput.value) == -1) {
                todoArrayStorage.push(todoInput.value);
                showTODO();
                todoInput.value = "";
                todoError.innerHTML = "Task Added Successfully";
            }else{
                todoError.innerHTML = "Err: Task exists in the list";
            }
        }else{
            todoError.innerHTML = "Err: Input Field Empty";
        }
    });
    
    showTODO();
    
    function showTODO() {
    	localStorage.setItem(storagePreferenceName, todoArrayStorage.join(","));
    	const todoListContainer = document.getElementById("todo-list-container");
    	todoListContainer.innerHTML = "";
    	todoArrayStorage.forEach(todoItem => {
    		if(todoItem !== ""){
    			createDiv = document.createElement("div");
    			createDiv.className = "todo-list-item";
    		
    			createSpan = document.createElement("span");
    			createSpan.innerHTML = todoItem.replaceAll("\n", "<br>");
    		
    			createImg = document.createElement("img");
    			createImg.src="assets/delete-icon.png";
    			createImg.alt = todoItem;
    			createImg.setAttribute("onclick", "removeTODOItem('" + Math.floor(todoArrayStorage.indexOf(todoItem)) +"')");
    		
    			createDiv.appendChild(createSpan);
    			createDiv.appendChild(createImg);
    		
    			todoListContainer.appendChild(createDiv);
    		}
    	});
    }
    
    function removeTODOItem(todoIndex){
    	const todoError = document.getElementById("todo-error");
    	if(confirm("Are you sure you want to remove item?")){
    		if(Number(todoIndex) >= 0){
    			if(todoIndex >= 0){
    				if(typeof todoArrayStorage[todoIndex] !== 'undefined'){
    					todoArrayStorage.splice(todoIndex, 1);
    					showTODO();
    				}else{
    					todoError.innerHTML = "Err: Invalid Todo Identifier";
    				}
    			}else{
    				todoError.innerHTML = "Err: Task Not Exists";
    			}
    		}else{ alert(todoIndex);
    			todoError.innerHTML = "Err: Index Should Be Numeric";
    		}
    	}
    }