/**
 * アクセスロガー
 * Jqueryなどの外部ライブラリに依存しないロギング処理です。
 * idでDOMを認識して取得するので、両方が設定されていない場合は取得できません
 * インスタンス化の際にonloadのアクションでログを送信
 * Class指定に"NoLogger"を指定する事でログの対象外に設定できます。
 */
class AccessLoggerItems {
	/***** 設定部分 *****/
	/*ログのポスト先URL*/
	private LogSendUrl:string = "http://hogehoge/scott/tiger.html";
	/*ログの仕込みを無視するクラス名*/
	public GetNoLogClassName():string {
		return "NoLogger";
	}

	/* 表示しているページのURL */
	private pageUrl:string;
	/* 表示しているページのユーザーエージェント */
	private pageNavi:string;
	/* 表示しているページのユーザーID（取れるの？） */
	private pageUser:string;
	/**
	 * コンストラクタ。
	 * 静的な情報はここで設定
	 */
	constructor() {
  		AccessLoggerItems.prototype.pageUrl = window.location.href;
  		AccessLoggerItems.prototype.pageNavi = window.navigator.userAgent;
		AccessLoggerItems.prototype.pageUser = "";
  		/*読み込んだ事を送信*/
  		AccessLoggerItems.prototype.SendLog("PageOnload");
 	}

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
			/* アクションを作ってログに書き込み */
			AccessLoggerItems.prototype.SendLog(this.id +  "#" + ev + "#" + act);
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
			/* アクションを作ってログに書き込み */
			AccessLoggerItems.prototype.SendLog(this.id +  "#" + ev + "#" + act + ":before[" + beforeValue + "] after[" + this.value + "]");

		}
	}
	/**
	 * ログへの書き込み処理
	 * 第一引数：ログのactに埋める文字列
	 */
	private SendLog(actLog:string)
	{
		var req = {
				url:AccessLoggerItems.prototype.pageUrl,
				nav:AccessLoggerItems.prototype.pageNavi,
				user:AccessLoggerItems.prototype.pageUser,
				act:actLog
		}

		var json_text:string = JSON.stringify(req);
		/*デバック用*/
		alert(json_text);
		/**************************
		ここにajaxでログ用のAPIにぶん投げる処理を書く
		**************************/
		/*
		var request = new XMLHttpRequest();
		request.open("POST", AccessLoggerItems.prototype.LogSendUrl, true);
		request.onreadystatechange = function () {
    		if (request.readyState != 4 || request.status != 200){
    			return;
    		}
		};
		request.send(json_text);
		*/

	}
}

/**
 * アクセスログをinputに仕込む
 *  Chrome、IE10、FireFoxで動作確認
 */
class AccessLogger extends AccessLoggerItems {
	/*読み込んだページのinputにアクセスロガーを設定*/
	public SetLoggerToInputThisPage():void {
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
				if(targetObj != null){
					if(targetObj.className.indexOf(super.GetNoLogClassName()) != 0) {
						targetObj.addEventListener(act, super.SendAction(act), false);
					}
				}
			}
			if(inputTags[i].type.toString() == "text") {
				act="change";
				/*変更後の値をactに結合して送信*/
				if(targetObj != null){
					if(targetObj.className.indexOf(super.GetNoLogClassName()) != 0) {
						targetObj.addEventListener(act, super.SendActionWithValue(act ,  (<HTMLInputElement>targetObj).value), false);
					}
				}
			}
			if (inputTags[i].type.toString()  == "submit" ) {
				act="click";
				if(targetObj != null){
					if(targetObj.className.indexOf(super.GetNoLogClassName()) != 0) {
						targetObj.addEventListener(act, super.SendAction(act), false);
					}
				}
			}
/**** End ロギング処理の仕込み部分****/
		}
	} /*SetLoggerToInputThisPage*/

	/**
 	* アクセスログをselectに仕込む
 	*  Chrome、IE10、FireFoxで動作確認
 	*/
	public SetLoggerToSelectThisPage():void {
		var selectTags = document.getElementsByTagName("select");
		var targetObj : HTMLElement;
		var act:string;
		for(var i = 0; i < selectTags.length; i++) {
			targetObj = document.getElementById(selectTags[i].id.toString());https://www.youtube.com/analytics?o=U#dt=nt,fe=16535,fr=lw-001,fs=16508;fcr=0,r=retention,rpr=d
			act = "change"
			if(targetObj != null){
				if(targetObj.className.indexOf(super.GetNoLogClassName()) != 0) {
					targetObj.addEventListener(act, super.SendAction((<HTMLInputElement>targetObj).value), false);
				}
			}
		}
	}

	 /**
 	* アクセスログをbuttonに仕込む
 	*  Chrome、IE10、FireFoxで動作確認
 	*/
	public SetLoggerToButtonThisPage():void {
		var buttonTags = document.getElementsByTagName("button");
		var targetObj : HTMLElement;
		var act:string;
		for(var i = 0; i < buttonTags.length; i++) {
			act = "click"
			targetObj = document.getElementById(buttonTags[i].id.toString());
			if(targetObj != null){
				if(targetObj.className.indexOf(super.GetNoLogClassName()) != 0) {
					targetObj.addEventListener(act, super.SendAction(act), false);
				}
			}
		}
	}
}/*class AccessLogger*/


/**** ここから↓でログの仕込みをするので、必要ない物は削除してしまえばいい ****/
var al:AccessLogger = new AccessLogger();
/*input要素のロガー*/
window.addEventListener("load", al.SetLoggerToInputThisPage, false);
/*select要素のロガー*/
window.addEventListener("load", al.SetLoggerToSelectThisPage, false);
/*button要素のロガー*/
window.addEventListener("load", al.SetLoggerToButtonThisPage, false);
