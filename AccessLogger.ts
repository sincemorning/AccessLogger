/**
 * アクセスログ基本部分
 */
class AccessLoggerItems {
	private thisUserAgent:String;
	private thisURL:String;
	private thisUser:String;
	private thisIPAddress:String;
	private thisTargetDOM:any;
	private thisAction:String;

	constructor() {
	 	this.thisUserAgent = window.navigator.userAgent;
		this.thisURL = window.location.href;
		this.thisUser = "";
		this.thisIPAddress = "";
		this.thisTargetDOM = "";
		this.thisAction = "";
	}
	/*実際に仕込むアクション処理*/
	public SendAction() {
		alert("aaa");
	}
}

/**
 * アクセスログ仕込み用
 *  document.getElementByTagNameがFireFoxでは正常に動かない
 */
class AccessLogger extends AccessLoggerItems {
	/*読み込んだページのinput type="button"のクリックにアクセスロガーを設定*/
	public SetLoggerToButtonThisPage() {
		var ButtonTags = document.getElementsByTagName("input");
		var targetObj : HTMLElement;
		/*対象属性の要素を洗い出し*/
		for(var i = 0; i < ButtonTags.length; i++) {
			/*対象属性の要素の指定のtypeを洗い出し*/
			if (ButtonTags[i].type.toString()  == "button" ) {
				targetObj = document.getElementById(ButtonTags[i].id.toString());
				targetObj.addEventListener("click", super.SendAction, true);
			}
		}
	}

}/*class AccessLogger*/

/*ボタン要素にアクセスログを仕込む*/
var al:AccessLogger = new AccessLogger();
window.addEventListener("load", al.SetLoggerToButtonThisPage, false);
