/**
 * アクセスロガー
 * Jqueryなどの外部ライブラリに依存しないロギング処理です。
 */
class AccessLoggerItems {
	private thisUserAgent:String;
	private thisURL:String;
	private thisUser:String;

	constructor() {
	 	this.thisUserAgent = window.navigator.userAgent;
		this.thisURL = window.location.href;
		this.thisUser = "";
	}
	/*実際に仕込むアクション処理*/
	public SendAction(domId:string, prepare:string) {
		return function(ev) {
			/* 送信するのは、このページのURLとユーザーエージェント、(取れれば)ユーザーID、domのIDイベント、コール元の処理 */
			/* 区切り文字は@@ */
			alert( this.thisURL + "@@" + this.thisUserAgent + "@@" + this.User + "@@" + domId +  "@@" + ev + "@@" + prepare);
		}
	}
}

/**
 * アクセスログをinput type="button"に仕込む
 *  Chrome、IE10、FireFoxで動作確認
 */
class AccessLogger extends AccessLoggerItems {
	constructor() {
	 	super();
	}
	/*読み込んだページのinput type="button"のクリックにアクセスロガーを設定*/
	public SetLoggerToButtonThisPage() {
		var ButtonTags = document.getElementsByTagName("input");
		var targetObj : HTMLElement;
		/*対象属性の要素を洗い出し*/
		for(var i = 0; i < ButtonTags.length; i++) {
			/*対象属性の要素の指定のtypeを洗い出し*/
			if (ButtonTags[i].type.toString()  == "button" ) {
				targetObj = document.getElementById(ButtonTags[i].id.toString());
				targetObj.addEventListener("click", super.SendAction(targetObj.id.toString(), "click"), true);
			}
		}
	}

}/*class AccessLogger*/

/*ボタン要素にアクセスログを仕込む*/
var al:AccessLogger = new AccessLogger();
window.addEventListener("load", al.SetLoggerToButtonThisPage, false);

