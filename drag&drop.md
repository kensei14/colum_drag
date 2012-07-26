## Drag&Dropの基本
* draggable要素をtrueにする。
* drop先のdropzone属性を設定する。（"copy","move","link"）

## event.dataTransferオブジェクトについて

* items,types,filesなどのプロパティがある。

* setDataメソッドにより渡すデータをセットする。
> event.dataTransfer.setData(fomart, data);
> formatは“Text”など
*** event.dataTransfer.setDataをすると透過したものが表示される。***
*** addElementで透過表示する要素の指定 ***


## ドラッグ＆ドロップ中のイベント
* ondragstart() 	ドラッグ開始時
* ondragover()		ドラッグ中
* ondragenter()		ドラッグ中にある要素内に入った時
* ondragleave()		ドラッグ中にある要素内を離れた時
* ondrop()			ある要素にドロップした時
 
*** ondragover / ondropイベントを実行する際には必ず両イベント内でevent.preventDefault()を行わなければならない！！！***

(行わないとデフォルトの動作が実行され動かない。)


* http://javascript-api.sophia-it.com/reference/%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0%EF%BC%86%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%81%A7%E3%81%8D%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF

## デッキ移動インターフェースの実装

### インターフェース仕様
* デッキのドラッグによる列の配置変更
* 移動元の透過表示 
* 移動先の表示

### デッキ移動方法
1. デッキを作成する。
2. 各列要素の直前に空要素を挿入しておく。
3. DragOverされたらCSSにより空白要素の幅を変更する。
4. Dropされたらドラッグされていた列を空白要素の前に挿入する。
5. さらに挿入された列要素の直前に空白要素を挿入する。