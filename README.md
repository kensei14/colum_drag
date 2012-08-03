colum_drag
==========


	MyColumns: 以下のプロパティ・メソッドを持つオブジェクトを生成する。
	
		length: 配列の長さを保持する変数
		column_list: 各列のHTMLDivObjectを格納している配列
		
		generate(): length長のHTMLDivObject配列を生成する関数
		createColumn(i): 各列のHTMLDivObjectを生成する関数。引数iをidに保持する。
		insert(target, moving_id): targetとして渡されたDiv要素の後にmoving_idを持つDiv要素を挿入する。 
		show() : 配列を画面上に表示する。
		consoleOut(): 配列中のDiv要素のidを配列順に表示する。
	
	createBlank(): Div要素間に挟まれた空白Div要素を生成する関数。
	

**仕様の留意点**

ドラッグ中の透過表示に利用したメソッドはFireFoxとChrome,Safari,Operaで異なり、その表示にも差異があります。
FireFoxの場合カラムが小さめに表示されます。