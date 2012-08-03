/**
 * @author 鎗水謙星
 */
var Columns = new MyColumns();

document.addEventListener("DOMContentLoaded", function() {
	Columns.generate();
	Columns.show();
}, false);

function MyColumns() {
	this.column_list = new Array(5);
	
	this.generate = function() {
		for(var i=0; i<5; i++) {
			this.column_list[i] = this.createColumn(i);
		}
	}

	this.createColumn = function(i) {
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
	this.insert = function(target, moving_id) {
		var target_id;
		var target_num, moving_num;
		var moving_div;
						
		if(target != null) {
			target_id = target.id;
		} else {
			target_id = null;
		}
						
		//動かす要素を見つけ元の配列から削除する。
		for(var i=0; i < this.column_list.length; i++) {
			if(this.column_list[i].id == moving_id) {
				moving_num = i;
				var col = this.column_list[moving_num];
				this.column_list.splice(moving_num, 1);
				break;
			}
		}
		
		//移動先の要素を見つけ、それ以降の要素を切り取る。
		if (target_id == null) {
			target_num = -1;
		} else {
			for(var i=0; i < this.column_list.length; i++) {
				if(this.column_list[i].id == target_id) {
					target_num = i;
					break;
				}
			}			
		}
		var light = this.column_list.slice(target_num+1, this.column_list.length);
	
		this.consoleOut();
		this.column_list.splice(target_num+1);
		this.consoleOut();
		this.column_list = this.column_list.concat(col);
		this.consoleOut();
		this.column_list = this.column_list.concat(light);
		this.consoleOut();
	}
	
	this.show = function() {
		var c_list = document.getElementById("column_list");
		c_list.innerHTML = "";
		
		c_list.appendChild(createBlank());
		for(var i=0; i < this.column_list.length; i++) {
			c_list.appendChild(this.column_list[i]);
			c_list.appendChild(createBlank());
		}
	}

	this.consoleOut = function() {
		var out = "Console Oout (" + this.column_list.length + ")   : ";
		for(var i=0; i < this.column_list.length; i++) {
			out += this.column_list[i].id + "  ";
		};
		console.log(out);
	}
}

function createBlank() {
	var new_blank = document.createElement("div");

	new_blank.classList.add("column-size");
	new_blank.classList.add("blank");
	new_blank.setAttribute("dorpzone", "move");
	
	//空白要素の幅を変更する。(Blankクラスを挿入する)
	new_blank.addEventListener("dragenter", function(event) {

		//最初と最後の空白の場合は何もしない 横幅が広がらないため。
		if ((this.previousSibling == null) || (this.nextSibling == null)) {  }
		//空白の前後の要素が移動していた場合場合も何もしない
		else if ((this.previousSibling.id == event.dataTransfer.getData("Text")) || (this.nextSibling.id == event.dataTransfer.getData("Text"))) { }
		else { 
			//this.classList.remove("blank");
			this.classList.add("drag_line");
		}
	}, false);
		
	//空白要素を元に戻す(Blankクラスを取り除く)
	new_blank.addEventListener("dragleave", function(event) {
		//this.classList.add("blank");
		this.classList.remove("drag_line");
	}, false);
	
	new_blank.addEventListener("dragover", function(event) {
		event.preventDefault();		//デフォルトの動作を取り除く
	}, false);
	
	new_blank.addEventListener("drop", function(event) {
		event.preventDefault();

		if (this.previousSibling == null) { 
			if (this.nextSibling.id != event.dataTransfer.getData("Text")) {
				Columns.insert( null , event.dataTransfer.getData("Text"));
				Columns.show();	
			} 
		} else if(this.previousSibling.id == event.dataTransfer.getData("Text")) {
		} else if ((this.nextSibling != null) && (this.nextSibling.id == event.dataTransfer.getData("Text"))) {
		} else {
			//this.classList.remove("blank");
			this.classList.remove("drag_line");
			
			Columns.insert(this.previousSibling, event.dataTransfer.getData("Text"));
			Columns.show();	
		}

	}, false);

	return new_blank;
}