/**
 * アクセスロガー
 * Jqueryなどの外部ライブラリに依存しないロギング処理です。
 * idかnameでDOMを認識して取得するので、両方が設定されていない場合は取得できません
 */
class AccessLoggerItems {
	/**
	 * 単純なアクセスログ送信
	 * 第一引数：呼び元の発生文字列
	 */
	public SendAction(act:string) {
		return function(ev) {
			/*
				コールバックなので、このメソッド内でのthisはこれを呼び出したオブジェクトの意味になるので、
				自分自身のメンバ変数のアクセスに利用できない
			*/
			alert(window.location.href+ "@@" + window.navigator.userAgent.toString() + "@@" + this.id +  "@@" + ev + "@@" + act);
			/*Ajaxでログの送信を行う*/
		}
	}
	/**
	 * アクセスログに起動元のオブジェクトのvalueを追加する
	 * 第一引数：呼び元の発生文字列
	 * 第二引数：変更前の文字列
	 * 変更後の文字列はコールバックの中で取得する
	 */
	public SendActionWithValue(act:string, beforeValue:string) {
		return function(ev) {
			/*
				コールバックなので、このメソッド内でのthisはこれを呼び出したオブジェクトの意味になるので、
				自分自身のメンバ変数のアクセスに利用できない
			*/
			alert(window.location.href+ "@@" + window.navigator.userAgent.toString() + "@@" + this.id +  "@@" + ev + "@@" + act + ":before[" + beforeValue + "] after[" + this.value + "]");
			/*Ajaxでログの送信を行う*/
		}
	}

	public GetHTMLElement (id:string, name:string) : HTMLElement{
		var retObj:HTMLElement;

		return retObj
	}
}

/**
 * アクセスログをinputに仕込む
 *  Chrome、IE10、FireFoxで動作確認
 */
class AccessLogger extends AccessLoggerItems {
	/*読み込んだページのinputにアクセスロガーを設定*/
	public SetLoggerToInputThisPage() {
		var inputTags = document.getElementsByTagName("input");
		var targetObj : HTMLElement;
		var act:string;
		/*対象属性の要素を洗い出し*/
		for(var i = 0; i < inputTags.length; i++) {
/**** Start ロギング処理の仕込み部分****/
			targetObj = document.getElementById(inputTags[i].id.toString());
			act = "";
			if (inputTags[i].type.toString()  == "button" ) {
				act="click";
				targetObj.addEventListener(act, super.SendAction(act), false);
			}
			if(inputTags[i].type.toString() == "text") {
				act="change";
				/*変更後の値をactに結合して送信*/
				targetObj.addEventListener(act, super.SendActionWithValue(act ,  (<HTMLInputElement>targetObj).value), false);
			}
/**** End ロギング処理の仕込み部分****/
		}
	} /*SetLoggerToInputThisPage*/

	public SetLoggerToSelectThisPage(){
		var selectTags = document.getElementsByTagName("select");
		var targetObj : HTMLElement;
		var act:string;
		for(var i = 0; i < selectTags.length; i++) {
			targetObj = document.getElementById(selectTags[i].id.toString());
			act = "change"
			targetObj.addEventListener(act, super.SendAction(act), false);
		}
	}

	public SetLoggerToButtonThisPage(){
		var buttonTags = document.getElementsByTagName("button");
		var targetObj : HTMLElement;
		var act:string;
		for(var i = 0; i < buttonTags.length; i++) {
		alert(buttonTags[i].id.toString());
			act = "click"
			targetObj.addEventListener(act, super.SendAction(act), false);
		}
	}

}/*class AccessLogger*/

/*ボタン要素にアクセスログを仕込む*/
var al:AccessLogger = new AccessLogger();
/*input要素のロガー*/
window.addEventListener("load", al.SetLoggerToInputThisPage, false);
/*select要素のロガー*/
window.addEventListener("load", al.SetLoggerToSelectThisPage, false);
/*button要素のロガー*/
window.addEventListener("load", al.SetLoggerToButtonThisPage, false);


