# Drag and Drop について

## Drag&Dropの基本
* draggable要素をtrueにする。
* element.setAttribute("draggable", "true");

* event.dataTransfer.setDataをすると透過したものが表示される。


## DataTransferオブジェクトについて

## 絶対に必要な処理
* ondragoverでは必ず event.preventDefault()を行わなければならない！！！
* http://javascript-api.sophia-it.com/reference/%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0%EF%BC%86%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%81%A7%E3%81%8D%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF
* 