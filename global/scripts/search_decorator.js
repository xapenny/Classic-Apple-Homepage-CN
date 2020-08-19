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

Event.onDOMReady(function(){var h=document.getElementsByTagName("input");for(var c=0;c<h.length;c++){var S=$(h[c]);if(S.hasClassName("prettysearch")){var p={};if(S.hasClassName("applesearch")){p.autosave="Apple.com";}else{if(S.hasClassName("reseller")){p.autosave="Apple.com Reseller";}}if(S.parentNode.tagName=="LABEL"){var A="";var j=S.up().getElementsByClassName("prettyplaceholder")[0];if(j){A=j.innerHTML;}else{A=S.parentNode.firstChild.nodeValue;S.parentNode.firstChild.nodeValue="";}A=A.split("\n")[0];p.placeholder=A;}AC.decorateSearchInput(S,p);}}});

}