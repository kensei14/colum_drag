/**
 * @author 鎗水謙星
 */
var column_list = new Array(5);

column_list.test = function() {
	alert(column_list[0]);
}

column_list.exchange = function(i, j) {
	var tmp;
	/*
	if
	tmp = column_list[i];
	column_list[i] = column_list[j];
	column_list[j] = tmp;
	*/
}

//moving_idをもつ列をtarget_idの前に、挿入します。
column_list.insert = function(target_id, moving_id) {
	var target_num, moving_num;
	var moving_div;
	
	console.log("確認:    " + target_id +  "  " + moving_id);
	console.log("for文前: " + target_num +  "  " + moving_num);
	for(var i=0; i < column_list.length; i++) {
		if(column_list[i].id == target_id) target_num = i;
		if(column_list[i].id == moving_id) moving_num = i;
	}
	console.log("for文後: " + target_num +  "  " + moving_num);
	
	var col = column_list[moving_num];
	
	column_list.splice(moving_num, 1);
	column_list.consoleOut();
	//console.log("column" + moving_num + "  is deleted. ");
	column_list.splice(target_num, 0, col);
	column_list.consoleOut();
	//console.log("target" + target_num + "  is deleted? ");
	//alert(column_list.join());
}

column_list.show = function() {
	var c_list = document.getElementById("column_list");
	c_list.innerHTML = "";
		
	for(var i=0; i < column_list.length; i++) {
		console.log(c_list.appendChild(column_list[i]));
		console.log(column_list[i].id);
	}
}

column_list.consoleOut = function() {
	var out = "Console Oout   : ";
	for(var i=0; i < column_list.length; i++) {
		out += column_list[i].id + "  ";
	};
	console.log(out);
}

document.addEventListener("DOMContentLoaded", function() {
	for(var i=0; i<5; i++) {
		column_list[i] = createColumn(i);
	}
}, false);


function createColumn(i) {
	var column_elem = document.getElementById("column_list");
	var new_column = document.createElement("div");
	var new_blank = document.createElement("div");
	var new_dragzone = document.createElement("div");
	var new_content = document.createElement("div");

	new_column.appendChild(new_dragzone);
	new_column.appendChild(new_content);
	
	column_elem.appendChild(new_blank);
	column_elem.appendChild(new_column);
	/*
	document.body.appendChild(new_blank);
	document.body.appendChild(new_column);
	*/
	new_column.classList.add("column-size");
	new_column.classList.add("column-decoration");
	new_column.setAttribute("id", "column" + i);
	
	new_dragzone.classList.add("dragzone");
	new_dragzone.setAttribute("draggable", "true");
	new_dragzone.textContent = "title" + i;
		
	new_content.className = "content";
	new_content.textContent = "content" + i;

	new_blank.classList.add("column-size");
	new_blank.classList.add("blank");
	new_blank.setAttribute("id", "blank" + i);

	new_dragzone.addEventListener("dragstart", function(event) {
		//event.dataTransfer.addElement(this.parentNode);
		event.dataTransfer.setData("Text", this.parentNode.getAttribute('id'));		//移動対象列要素のidをイベントオブジェクトに格納する。
		return true;
	}, false);

	//空白要素の幅を変更する。(Blankクラスを挿入する)
	new_blank.addEventListener("dragenter", function(event) {
		//列要素の直前・直後の空白要素でなければ
		if((this.nextSibling.id != event.dataTransfer.getData("Text")) && (this.previousSibling.id != event.dataTransfer.getData("Text"))) {
			this.classList.remove("blank");	
		}
	}, false);
		
	//空白要素を元に戻す(Blankクラスを取り除く)
	new_blank.addEventListener("dragleave", function(event) {
		this.classList.add("blank");
	}, false);

	new_blank.addEventListener("dragover", function(event) {
		event.preventDefault();		//デフォルトの動作を取り除く
	}, false);
	
	new_blank.addEventListener("drop", function(event) {
		event.preventDefault();
		
		this.classList.add("blank");
		column_list.insert(this.nextSibling.id, event.dataTransfer.getData("Text"));
		column_list.show();
		
		//insertDOM(this.id, event.dataTransfer.getData("Text"));	//列要素の並びを変更する。
	}, false);
	
	return new_column;
}

function insertDOM (target, moving) {
	var target_column = document.getElementById(target);				//挿入先の空白要素
	var moving_column = document.getElementById(moving);				//移動元の列要素
	var moving_blank = document.getElementById(moving).previousSibling;	//移動元の列要素直前の空白要素
	
	document.body.insertBefore(moving_column, target_column);
	document.body.insertBefore(moving_blank, moving_column);
}