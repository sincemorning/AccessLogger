/**
 * アクセスログ基本部分
 */
class AccessLoggerItems {
	thisUserAgent:String = window.navigator.userAgent;
	thisURL:String = window.location.href;
	thisUser:String = "";
	thisIPAddress:String = "";
	thisTargetDOM = "";
	thisAction:String = "";

	SendAction(e : MouseEvent) {
		alert("aaa" + e.type);
	}

}

/**
 * アクセスログ仕込み用
 *  document.getElementByTagNameがFireFoxでは正常に動かない
 */
class AccessLogger extends AccessLoggerItems {
	/*このライブラリが対応するすべての要素にアクセスロガーを仕込む*/
	SetLoggerToThisPage() {
		this.SetLoggerToButtonThisPage();
	}


	/*読み込んだページのinput type="button"のクリックにアクセスロガーを設定*/
	SetLoggerToButtonThisPage() {
		var ButtonTags = document.getElementsByTagName("input");
		var targetObj : HTMLElement;
		/*対象属性の要素を洗い出し*/
		for(var i = 0; i < ButtonTags.length; i++) {
			alert("@@@@" + ButtonTags[i].id + ":" + ButtonTags[i].type);
			/*対象属性の要素の指定のtypeを洗い出し*/
			if (ButtonTags[i].type.toString()  == "button" ) {
				targetObj = document.getElementById(ButtonTags[i].id.toString());
				targetObj.addEventListener("click", this.SendAction, false);
			}
		}
	}

	/*読み込んだページのinput type="text"にアクセスロガーを設定*/
	/*読み込んだページのinput type="button"のクリックにアクセスロガーを設定*/
	SetLoggerToInputTextThisPage() {
		var InputTextTags = document.getElementsByTagName("input");
		var targetObj : HTMLElement;
		/*対象属性の要素を洗い出し*/
		for(var i = 1; i <= InputTextTags.length; i++) {
		//	alert("@@@@" + InputTextTags[i].id + ":" + InputTextTags[i].type);
			/*対象属性の要素の指定のtypeを洗い出し*/
			if (InputTextTags[i].type.toString()  == "text" ) {
				targetObj = document.getElementById(InputTextTags[i].id.toString());
				targetObj.addEventListener("change", this.SendAction, false);
			}
		}
	}
}

/*ボタン要素にアクセスログを仕込む*/
window.addEventListener("load", AccessLogger.prototype.SetLoggerToButtonThisPage, true)
window.addEventListener("load", AccessLogger.prototype.SetLoggerToInputTextThisPage, true)

