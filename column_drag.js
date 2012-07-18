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
	
	new_column.classList.add("column-size");
	new_column.classList.add("column-decoration");
	new_column.setAttribute("id", "column" + i);
	
	new_dragzone.className = "dragzone";
	new_dragzone.setAttribute("draggable", "true");
	new_dragzone.textContent = "title" + i;
		
	new_content.className = "content";
	new_content.textContent = "content" + i;

	new_blank.classList.add("column-size");
	new_blank.classList.add("blank");
	new_blank.setAttribute("dropzone", "move");
	new_blank.setAttribute("id", "blank" + i);

	new_dragzone.ondragstart = function(event) {
		//event.dataTransfer.addElement(this.parentNode);
		event.dataTransfer.setData("Text", this.parentNode.getAttribute('id'));		//移動対象列要素のidをイベントオブジェクトに格納する。
		return true;
	}

	new_blank.ondrop = function(event) {
		event.preventDefault();
		
		this.classList.add("blank");
		insertDOM(this.id, event.dataTransfer.getData("Text"));	//列要素の並びを変更する。
	}
	
	new_blank.ondragover = function(event){
		event.preventDefault();		//デフォルトの動作を取り除く
	}
	
	//空白要素の幅を変更する。(Blankクラスを挿入する)
	new_blank.ondragenter = function(event) {
		//列要素の直前・直後の空白要素でなければ
		if((this.nextSibling.id != event.dataTransfer.getData("Text")) && (this.previousSibling.id != event.dataTransfer.getData("Text"))) {
			this.classList.remove("blank");	
		}
	}
	
	//空白要素を元に戻す(Blankクラスを取り除く)
	new_blank.ondragleave = function(event) {
		this.classList.add("blank");
	}
}

function insertDOM (target, moving) {
	var target_column = document.getElementById(target);				//挿入先の空白要素
	var moving_column = document.getElementById(moving);				//移動元の列要素
	var moving_blank = document.getElementById(moving).previousSibling;	//移動元の列要素直前の空白要素
	
	document.body.insertBefore(moving_column, target_column);
	document.body.insertBefore(moving_blank, moving_column);
}
