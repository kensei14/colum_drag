/**
 * @author 鎗水謙星
 */
document.addEventListener("DOMContentLoaded", function() {
	for(var i=0; i<3; i++) {
		createColumn(i);
	}
}, false);


function createColumn(i) {
	var new_column = document.createElement("div");
	//var new_blank = document.createElement("div");
	var new_dragzone = document.createElement("div");
	var new_content = document.createElement("div");

	new_column.appendChild(new_dragzone);
	new_column.appendChild(new_content);
	document.body.appendChild(new_column);
	//document.body.appendChild(new_blank);
	
	new_column.className = "column";
	new_column.setAttribute("id", "column" + i);
	
	new_dragzone.className = "dragzone";
	new_dragzone.setAttribute("draggable", "true");
	new_dragzone.textContent = "title" + i;
		
	new_content.className = "content";
	new_content.textContent = "content" + i;
	/*
	new_blank.classList.add("column");
	new_blank.classList.add("blank");
	new_blank.setAttribute("id", "blank" + i);
	*/
	new_dragzone.ondragstart = function(event) {
		//event.dataTransfer.effectAllowed = 'move';
	   	//event.dataTransfer.dropEffect = 'move';
		
		event.dataTransfer.addElement(this.parentNode);
		
		//alert("setData : " + this.parentNode.getAttribute("id"));
		event.dataTransfer.setData("Text", this.parentNode.getAttribute('id'));
	}
	
	new_column.ondragenter = function(event) {
		if (this.getAttribute("id") != event.dataTransfer.getData("Text")) {
					alert("id of this : " + this.id + "  getData : " + event.dataTransfer.getData("Text"));
					
					insertDOM(this.id, event.dataTransfer.getData("Text"));
		}
	}
}

function insertDOM (id1, id2) {
	var elem1 = document.getElementById(id1);
	var elem2 = document.getElementById(id2);
	
	alert(elem1.classList[0]);
	document.body.insertBefore(elem2, elem1);
	
}