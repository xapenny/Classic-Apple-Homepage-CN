var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

function wmx_GetCookie(sName)
{
  var aCookie = document.cookie.split("; ");
  for (var i=0; i < aCookie.length; i++)
  {
    var aCrumb = aCookie[i].split("=");
    if (sName == unescape(aCrumb[0]))
    return unescape(aCrumb[1]);
   }
	return null;
}

function wmx_GetHttpUrl(strUrl)
{
	var nPos = strUrl.indexOf("?");
	if (nPos != -1)
		return (strUrl.substring(0,nPos));
	else
		return (strUrl);
}

function wmx_GetHttpUrlParam(strUrl)
{
	var strResParam = "";
	var nPos = strUrl.indexOf("?");
	if (nPos != -1)
	{
		var strSrcParam = strUrl.substring(nPos+1,strUrl.length).toLowerCase();
		var oParam = strSrcParam.split('&');
		oParam.sort();
		for (i=0; i<oParam.length; i++)
		{
		   if (strResParam != "")
		      strResParam += "&";
			strResParam += oParam[i];
		}
	}
	return (strResParam);
}
var oWmxTracker =function(client,campiagn,baseUrl,wmx_cntracking,wmx_sltracking)
{
	this.client=client;
	this.campaign=campiagn;
	this.imgContainer=new Array();
	this.baseUrl=baseUrl;
	this.protocol = location.protocol=="https:"?"https:":"http:";
	this.trackUrl=this.protocol+'//'+this.baseUrl+'/web_service/apple/CSTrack.aspx';
	this.wmx_cntracking=wmx_cntracking;
	this.wmx_sltracking=wmx_sltracking;
	this.strUID = (navigator.cookieEnabled ? "W_S_UID" : "-1");
	this.strAccount = wmx_GetCookie("WMX_Account");
	this.wmx_thisURL = encodeURIComponent(document.URL);
	this.wmx_from = document.referrer;
        this.wmx_title = document.title;
	this.navigator=new Object();
	this.navigator.screenWidth=screen.width;
	this.navigator.screenHeight=screen.height;
	this.navigator.lang=null;
	this.navigator.userAgent=null;
	//--------------------------
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
		//----------FF,IE,Safari
	this.navigator.os=ua.substring(ua.indexOf(';')+1,ua.length).substring(ua.substring(ua.indexOf(';')+1,ua.length).indexOf(';')+1,ua.substring(ua.indexOf(';')+1,ua.length).length).substring(1,ua.substring(ua.indexOf(';')+1,ua.length).substring(ua.substring(ua.indexOf(';')+1,ua.length).indexOf(';')+1,ua.substring(ua.indexOf(';')+1,ua.length).length).indexOf(';'));
    if (Sys.ie) {this.navigator.userAgent='MSIE ' + Sys.ie;
	this.navigator.lang=navigator.browserLanguage;
				}
    else if (Sys.firefox)
	{this.navigator.userAgent='Firefox ' + Sys.firefox;
    this.navigator.lang=navigator.appVersion.substring(navigator.appVersion.lastIndexOf('; ')+2,navigator.appVersion.indexOf(')'));
	}
     else if (Sys.chrome)
	 {this.navigator.userAgent='Chrome ' + Sys.chrome;
	 this.navigator.lang=navigator.appVersion.substring(navigator.appVersion.lastIndexOf('; ')+2,navigator.appVersion.indexOf(')'));
	 }
	 else if (Sys.opera)
	 {this.navigator.userAgent='Opera ' + Sys.opera;
	 this.navigator.lang=navigator.appVersion.substring(navigator.appVersion.lastIndexOf('; ')+2,navigator.appVersion.indexOf(')'));
	 this.navigator.os=ua.substring(ua.indexOf('(')+1,ua.indexOf(';')); //Opera OS info
	 }
	 else if (Sys.safari)
	 {this.navigator.userAgent='Safari ' + Sys.safari;
	 this.navigator.lang=navigator.appVersion.substring(navigator.appVersion.lastIndexOf('; ')+2,navigator.appVersion.indexOf(')'));
	 }
	 else this.navigator.userAgent='Other';
	 this.navigator.lang=this.navigator.lang.toUpperCase();
	 this.aFieldList=new Array();
}
	//------------------------------------------------------------
var keyStr = "ABCDEFGHIJKLMNOP" +
              "QRSTUVWXYZabcdef" +
              "ghijklmnopqrstuv" +
              "wxyz0123456789+/" +
              "=";
// add by cady 2009-10-19  get ascii
function native2ascii(strNative) {
     var output = "";
     for (var i=0; i<strNative.length; i++) {
         var c = strNative.charAt(i);
         var cc = strNative.charCodeAt(i);
         if (cc > 0xff)
           output += "\\u" + toHex(cc >>  8 ) + toHex(cc & 0xff);
         else
           output += c;
     }
     return output;
}

var hexChars = "0123456789ABCDEF";
function toHex(n) {
     var nH = (n >> 4) & 0x0f;
     var nL = n & 0x0f;
     return hexChars.charAt(nH) + hexChars.charAt(nL);
}

function ascii2native(strAscii) {
     var output = "";
     var posFrom = 0;
     var posTo = strAscii.indexOf("\\u", posFrom);
     while (posTo >= 0) {
         output += strAscii.substring(posFrom, posTo);
         output += toChar(strAscii.substr(posTo, 6));
         posFrom = posTo + 6;
         posTo = strAscii.indexOf("\\u", posFrom);
     }
     output += strAscii.substr(posFrom);
     return output;
}

function toChar(str) {
     if (str.substr(0, 2) != "\\u") return str;

     var code = 0;
     for (var i=2; i<str.length; i++) {
         var cc = str.charCodeAt(i);
         if (cc >= 0x30 && cc <= 0x39)
             cc = cc - 0x30;
         else if (cc >= 0x41 && cc <= 0x5A)
             cc = cc - 0x41 + 10;
         else if (cc >= 0x61 && cc <= 0x7A)
             cc = cc - 0x61 + 10;

         code <<= 4;
         code += cc;
     }

     if (code < 0xff) return str;

     return String.fromCharCode(code);
}

oWmxTracker.prototype.addFields=function(iFieldID,sValue)
{
	this.aFieldList.push([iFieldID,sValue])
}
oWmxTracker.prototype.ad=function()
{
    if(this.wmx_from==this.wmx_title) return;
    var sAdUrl=this.protocol + "//"+this.baseUrl+"/web_service/apple/ad_total_open.aspx"+"?"+this.client;
    var _this=this;
    if(window.addEventListener)
    addEventListener('load', function(){
	_this.createImg(sAdUrl)},false);
    else
       attachEvent('onload',function(){
	_this.createImg(sAdUrl)});
}
oWmxTracker.prototype.track=function()
{
    //var title_Reg = new RegExp("\u7F51\u9875\u627E\u4E0D\u5230");
    var title_Reg = new RegExp("\u627E\u4E0D\u5230");
    if(title_Reg.test(this.wmx_title))
    {
	this.wmx_thisURL = 'http://www.apple.com.cn/error404.html';
        this.wmx_title = 'error404';
    }


	if (this.wmx_cntracking == "1")
	{
	  if(this.wmx_title == "")
	  {
	      var nIndex = this.wmx_title.indexOf("?");
		  if(nIndex != -1)
		    this.wmx_title = this.wmx_title.substring(0, nIndex);
			nIndex = this.wmx_title.indexOf("#");
			if(nIndex != -1)
			this.wmx_title = this.wmx_title.substring(0, nIndex);
			nIndex = this.wmx_title.lastIndexOf("//");
			if(nIndex != -1)
			this.wmx_title =this.wmx_title.substring(nIndex+2,this.wmx_title.length);
			if(this.wmx_title.substring(this.wmx_title.length-1,this.wmx_title.length)=='/')
			this.wmx_title =this.wmx_title.substring(0,this.wmx_title.length-1);
	  }
			this.aFieldList.push(["pname",escape(this.wmx_title)]);
			}
			this.aFieldList.push(["cli",this.client],["uid",this.strUID],[1,this.wmx_thisURL],[2,this.strUID],[3,'W_S_SC'],[4,this.strAccount],[6,'W_S_DATE'],[9,this.wmx_from],[10,'W_S_IP'],[11,this.campaign],[22,this.navigator.userAgent],[23,this.navigator.screenWidth],[24,this.navigator.screenHeight],[12,this.navigator.lang],[13,this.navigator.os]);
			if (this.wmx_sltracking =="1")
			{
			this.aFieldList.push([20,wmx_GetHttpUrl(this.wmx_thisURL)],[21,wmx_GetHttpUrlParam(this.wmx_thisURL)]);
			//alert(wmx_GetHttpUrl(this.wmx_thisURL));
			//alert(this.wmx_thisURL);
			}
			this.createImg(this.formTrackString());
}
oWmxTracker.prototype.formTrackString=function(){
	var strSrc=this.trackUrl+'?';
	for(var i=0;i<this.aFieldList.length;i++)
	{
		if(i!=0)
		strSrc+='&';
		strSrc+=this.aFieldList[i][0]+'='+encodeURIComponent(wmx_encodeGB2312(this.aFieldList[i][1]));
		}
		strSrc+='&countertracking='+this.wmx_cntracking;
		strSrc+='&sltracking='+this.wmx_sltracking;
		return strSrc;
	}
oWmxTracker.prototype.flashTrack=function(bCounter,s12,s13)
{
	this.clearFieldArray(12);
	this.clearFieldArray(13);
	if(typeof(bCounter)!='boolean')
	return;
	if(bCounter)
	this.wmx_cntracking=1;
	else
	this.wmx_cntracking=0;
	if(typeof(s12)!='undefined')
	this.aFieldList.push([12,s12]);
	else return;
	if(typeof(s13)!='undefined')
	this.aFieldList.push([13,s13]);
	 this.createImg(this.formTrackString());
	}

oWmxTracker.prototype.clearFieldArray=function(fieldId)
{
	for(var i=0;i<this.aFieldList.length;i++)
		{
			if(this.aFieldList[i][0]==fieldId)
				{this.aFieldList.splice(i,1)}
			}
	}

oWmxTracker.prototype.eventTrack=function()
{
	for(var i=0;i<arguments[0].length;i++)
	{

		this.clearFieldArray(arguments[0][i][0]);
		this.aFieldList.push([arguments[0][i][0],arguments[0][i][1]]);

		this.wmx_cntracking=0;
	}
	this.createImg(this.formTrackString());
	}

oWmxTracker.prototype.createImg=function(sUrl)
{
	var oImg=new Image(1,1);
	oImg.src=sUrl+'&'+Math.random();
	this.imgContainer.push(oImg);
	}
/*Apple custom part*/
	function getArg(str)
{var LocString=String(window.document.location.href);
 //alert(LocString);
 var rs=new RegExp("(^|)"+str+"=([^\&]*)(\&|$)","gi").exec(LocString),tmp;
 if(tmp=rs)return tmp[2];
 return false;}


var _oWmxTracker=new oWmxTracker('Datadept','website','wm2.1to1crm.com.cn',1,1) ;
if(getArg('S')!='')
_oWmxTracker.aFieldList.push([15,getArg('S')]);
if(getArg('P')!='')
_oWmxTracker.aFieldList.push([16,getArg('P')]);
if(getArg('C')!='')
_oWmxTracker.aFieldList.push([17,getArg('C')]);
if(getArg('G')!='')
_oWmxTracker.aFieldList.push([7,getArg('G')]);
if(getArg('F')!='')
_oWmxTracker.aFieldList.push([8,getArg('F')]);

_oWmxTracker.track();

function wmx_encodeGB2312(strUri)
{
	var s;
	try{
			s=decodeURIComponent(strUri);
			return s;
		}
	catch(e){
		return strUri;
		}
	}

function wmx_ClickTrack()
{
	_oWmxTracker.eventTrack(arguments);

	}
function wmx_DownloadLisener()
{
var aLink=document.getElementsByTagName('a');
var sRegExp=/[^/]*\.(zip|pdf)/;
for (var i=0;i<aLink.length;i++)
{
if(aLink[i].href.toLowerCase().search(sRegExp)!=-1)
	{
		if(window.addEventListener)
				aLink[i].addEventListener('click',function(){
					wmx_ClickTrack ([18,'download'],[19,this.href.toLowerCase().match(sRegExp)[0]]);
														 },false);
			else
			{
				aLink[i].attachEvent('onclick',function(){
					 wmx_ClickTrack ([18,'download'],[19,this.href.toLowerCase().match(sRegExp)[0]]);
													  })
			}

	}
}
}
/**
 * @param {Object} actionType
 * @param {Object} sVideoURL
 * @param {Object} timeVideo
 */
var RootURL = window.location;
var ac_media_url = "";
var tT = "";
function wmx_acMedia_videoTracking(actionType, srcVideo, sVideoURL, timeVideo)
{
	var sP;
	var eP;
	var sURL;
	var pt;
	var playedTime;
	var totalTime;
	var videoURL;

	if(srcVideo)
	{
		videoURL = srcVideo;
	}
	else
	{
		sVideoURL= sVideoURL.toLowerCase();
		sP = sVideoURL.indexOf('<param name="src');
		sP = sVideoURL.indexOf('<source src=');
		eP = sVideoURL.indexOf('.mov');
	    sURL = sVideoURL.slice(sP, eP);
		sURL = sURL.replace('<source src="','');
		sURL = sURL+".mov"
		videoURL = sURL;
	}

	//videoURL = videoURL.replace("http://movies.apple.com"," ");
	//videoURL = videoURL.replace("http://images.apple.com"," ");

	if(timeVideo!=null)
	{
	   pt = timeVideo.indexOf("/");
	   playedTime =  timeVideo.slice(0,pt);
	   totalTime =  timeVideo.slice(pt+1,timeVideo.length);
	   tT = totalTime;

	   if(actionType=="newUserCancel")
	   {
	   			if(playedTime!=totalTime)
	   			{
      	 			wmx_ClickTrack([18,actionType],[19,videoURL],[5,timeVideo]);
	  			}
	   }
	   else
	   {
				//alert(actionType+"---"+ac_media_url+'---'+timeVideo);
				wmx_ClickTrack([18,actionType],[19,ac_media_url],[5,timeVideo]);
	   }
	}
	else
	{
			ac_media_url = videoURL;
	   		wmx_ClickTrack([18,actionType],[19,videoURL],[5,timeVideo]);
	}
}
/**
 * @param {Object} actionType
 * @param {Object} sVideoURL
 * @param {Object} timeVideo
 */
var ac_quicktime_url;
function wmx_acQuickTime_videoTracking(actionType, sVideoURL, timeVideo)
{
	var eP;
	var sP;
	var tVideo;

    if(timeVideo != null)
    {
		/**
		 * UserCancel & VideoStop
		 */
		if(sVideoURL == null)
		{
				if(actionType == "videoStop" && timeVideo != "NaN:NaN/NaN:NaN")
				{
					wmx_ClickTrack([18,actionType],[19,ac_quicktime_url],[5,timeVideo]);
				}

				if(actionType == "videoStop" && timeVideo == "NaN:NaN/NaN:NaN")
				{
					wmx_ClickTrack([18,"videoNotLoaded"],[19,ac_quicktime_url],[5,null]);
				}

				if(actionType == "userCancel")
				{
					if(ac_quicktime_url == null || timeVideo == "NaN:NaN/NaN:NaN")
					{
						//alert("111"+ac_quicktime_url+"---"+timeVideo);
						wmx_ClickTrack([18,"videoNotLoaded"],[19,ac_quicktime_url],[5,null]);
					}else{
						//alert("222"+ac_quicktime_url+"---"+timeVideo);
						wmx_ClickTrack([18,actionType],[19,ac_quicktime_url],[5,timeVideo]);
					}
				}
		}
    }
    else
    {
		/**
		 * Play & Replay
		 */
		sVideoURL = RootURL+"#"+sVideoURL;
		ac_quicktime_url = sVideoURL;
		//alert(actionType+"---"+sVideoURL);
 		wmx_ClickTrack([18,actionType],[19,sVideoURL],[5,null]);
    }

}

if(window.addEventListener)
window.addEventListener('load',function(){
wmx_DownloadLisener();
},false);
else
{window.attachEvent('onload',function(){
wmx_DownloadLisener();
});
}




}