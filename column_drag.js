/**
 * @author 鎗水謙星
 */
var LENGTH = 5;
var Columns = new MyColumns(LENGTH);

document.addEventListener("DOMContentLoaded", function() {
	Columns.generate();
	Columns.show();
}, false);

//Columnsをカプセル化する
function MyColumns(length) {
	this.length = length;
	this.column_list = new Array(this.length);
	
	this.generate = function() {
		for(var i=0; i < this.length; i++) {
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
			var moving_column = this.parentNode;
			
			//透過中ドラッグ対象カラムの表示
            if (event.dataTransfer.addElement) {	//FireFox
            	//moving_column.style.visibility = "hidden";
                event.dataTransfer.addElement(moving_column);
            }
            else if (event.dataTransfer.setDragImage) {		//Chrome etc
            	    //moving_column.style.visibility = "hidden";
                    event.dataTransfer.setDragImage (moving_column, 0, 0);
            }
            			
			event.dataTransfer.setData("Text", this.parentNode.getAttribute('id'));		//移動対象列要素のidをイベントオブジェクトに格納する。
			return true;
		}, false);
		
		new_column.appendChild(new_dragzone);
		new_column.appendChild(new_content);
		
		return new_column;
	}
	
	//moving_id(文字列型) をもつ列をtarget(HTMLDivObject型) の前に、挿入します。
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
		
		//移動先の要素番号を見つる。
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
		var light = this.column_list.slice(target_num+1, this.column_list.length);		//移動先の要素を以降の要素列を切り取る
	
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
	
	//空白要素に罫線をつける
	new_blank.addEventListener("dragenter", function(event) {
		var moving_id = event.dataTransfer.getData("Text");

		if ((this.previousSibling == null) && (this.nextSibling.id != moving_id)) { this.classList.add("drag_line"); }		//先頭にドラッグするときの処理
		else if ((this.nextSibling == null) && (this.previousSibling.id != moving_id)) { this.classList.add("drag_line"); }		//最後尾にドラッグするときの処理
		else if ((this.previousSibling.id == moving_id) || (this.nextSibling.id == moving_id)) { }		//空白の前後の要素が移動していた場合場合も何もしない
		else { this.classList.add("drag_line"); }
	}, false);
		
	//空白要素を元に戻す(罫線を消す)
	new_blank.addEventListener("dragleave", function(event) {
		this.classList.remove("drag_line");
	}, false);
	
	new_blank.addEventListener("dragover", function(event) {
		event.preventDefault();		//デフォルトの動作を取り除く
	}, false);
	
	new_blank.addEventListener("drop", function(event) {
		event.preventDefault();
		var moving_id = event.dataTransfer.getData("Text");

		if (this.previousSibling == null) { 
			if (this.nextSibling.id != moving_id) {
				Columns.insert( null , moving_id);
				Columns.show();	
			} 
		} else if(this.previousSibling.id == moving_id) {
		} else if ((this.nextSibling != null) && (this.nextSibling.id == moving_id)) {
		} else {
			Columns.insert(this.previousSibling, moving_id);
			Columns.show();	
		}

	}, false);

	return new_blank;
}