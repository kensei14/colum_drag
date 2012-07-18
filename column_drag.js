/**
 * @author 鎗水謙星
 */
document.addEventListener("DOMContentLoaded", function() {
	for(var i=0; i<5; i++) {
		createColumn(i);
	}
}, false);


function createColumn(i) {
	var new_column = document.createElement("div");
	var new_blank = document.createElement("div");
	var new_dragzone = document.createElement("div");
	var new_content = document.createElement("div");

	new_column.appendChild(new_dragzone);
	new_column.appendChild(new_content);
	document.body.appendChild(new_blank);
	document.body.appendChild(new_column);
	
	new_column.className = "column";
	new_column.setAttribute("id", "column" + i);
	
	new_dragzone.className = "dragzone";
	new_dragzone.setAttribute("draggable", "true");
	new_dragzone.textContent = "title" + i;
		
	new_content.className = "content";
	new_content.textContent = "content" + i;

	new_blank.classList.add("column");
	new_blank.classList.add("blank");
	new_blank.setAttribute("dropzone", "move");
	new_blank.setAttribute("id", "blank" + i);

	new_dragzone.ondragstart = function(event) {
		//event.dataTransfer.addElement(this.parentNode);
		
		event.dataTransfer.setData("Text", this.parentNode.getAttribute('id'));
		return true;
	}

	new_blank.ondrop = function(event) {
		event.preventDefault();
		
		this.classList.add("blank");
		insertDOM(this.id, event.dataTransfer.getData("Text"));
		
		//if (this.getAttribute("id") != event.dataTransfer.getData("Text")) {
					//alert("id of this : " + this.id + "  getData : " + event.dataTransfer.getData("Text"));
					//insertDOM(this.id, event.dataTransfer.getData("Text"));
		//}
		//event.stopPropagation();
		//return false;
	}
	
	new_blank.ondragover = function(event){
		event.preventDefault();
	}
	
	new_blank.ondragenter = function(event) {
		if((this.nextSibling.id != event.dataTransfer.getData("Text")) && (this.previousSibling.id != event.dataTransfer.getData("Text"))) {
			this.classList.remove("blank");	
		}
	}
	
	new_blank.ondragleave = function(event) {
		this.classList.add("blank");
	}
}

function insertDOM (target, moving) {
	var target_column = document.getElementById(target);
	var moving_column = document.getElementById(moving);
	var moving_blank = document.getElementById(moving).previousSibling;
	
	document.body.insertBefore(moving_column, target_column);
	document.body.insertBefore(moving_blank, moving_column);
}
