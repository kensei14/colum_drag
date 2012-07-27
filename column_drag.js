/**
 * @author 鎗水謙星
 */

Array.prototype = Array.prototype || {};

Array.prototype.createColumn = function(i) {
//function createColumn(i) {
	var new_column = document.createElement("div");
	var new_dragzone = document.createElement("div");
	var new_content = document.createElement("div");
	
	new_column.classList.add("column-size");
	new_column.classList.add("column-decoration");
	new_column.setAttribute("id", "column" + i);
	
	new_dragzone.classList.add("dragzone");
	new_dragzone.setAttribute("draggable", "true");
	new_dragzone.textContent = "title" + i;
		
	new_content.className = "content";
	new_content.textContent = "content" + i;

	new_dragzone.addEventListener("dragstart", function(event) {
		//event.dataTransfer.addElement(this.parentNode);
		event.dataTransfer.setData("Text", this.parentNode.getAttribute('id'));		//移動対象列要素のidをイベントオブジェクトに格納する。
		return true;
	}, false);
	
	new_column.appendChild(new_dragzone);
	new_column.appendChild(new_content);
	
	return new_column;
}

//moving_idをもつ列をtarget_idの前に、挿入します。
Array.prototype.insert = function(target_id, moving_id) {
//column_list.insert = function(target_id, moving_id) {
	var target_num, moving_num;
	var moving_div;
	
	console.log("確認:    " + target_id +  "  " + moving_id);
	//console.log("for文前: target-" + target_num +  "  moving-" + moving_num);
	
	//動かす要素を見つけ元の配列から削除する。
	for(var i=0; i < column_list.length; i++) {
		if(column_list[i].id == moving_id) {
			moving_num = i;
			var col = column_list[moving_num];
			column_list.splice(moving_num, 1);
			break;
		}
	}
	//移動先の要素を見つけ、それ以降の要素を切り取る。
	for(var i=0; i < column_list.length; i++) {
		if(column_list[i].id == target_id) {
			target_num = i;
			var back = 	column_list.slice(target_num+1, column_list.length);
			break;
		}
	}

	//console.log("for文後: target-" + column_list[target_num].id +  "  moving-" + column_list[moving_num].id);

	column_list.consoleOut();
	column_list.splice(target_num+1);
	column_list.consoleOut();
	column_list = column_list.concat(col);
	column_list.consoleOut();
	column_list = column_list.concat(back);
	column_list.consoleOut();
}

Array.prototype.show = function() {
//column_list.prototype.show = function() {
	var c_list = document.getElementById("column_list");
	c_list.innerHTML = "";
		
	for(var i=0; i < column_list.length; i++) {
		c_list.appendChild(column_list[i]);
		c_list.appendChild(createBlank());
	}
}

Array.prototype.consoleOut = function() {
//column_list.consoleOut = function() {
	var out = "Console Oout (" + column_list.length + ")   : ";
	for(var i=0; i < column_list.length; i++) {
		out += column_list[i].id + "  ";
	};
	console.log(out);
}

var column_list = new Array(5);

document.addEventListener("DOMContentLoaded", function() {
	for(var i=0; i<5; i++) {
		column_list[i] = column_list.createColumn(i);
	}
	column_list.show();
}, false);

function createBlank() {
	var new_blank = document.createElement("div");

	new_blank.classList.add("column-size");
	new_blank.classList.add("blank");
	
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
		column_list.insert(this.previousSibling.id, event.dataTransfer.getData("Text"));
		column_list.show();	
	}, false);

	return new_blank;
}