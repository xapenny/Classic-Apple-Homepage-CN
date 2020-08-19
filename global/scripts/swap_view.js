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

if(typeof(AC)==="undefined"){AC={}}if(typeof(document.event)==="undefined"){document.event={}
}if(Event.Publisher){Object.extend(document.event,Event.Publisher)}AC.SwapView=Class.create({_view:null,currentContent:null,delegate:null,initialize:function(a){if(typeof a==="string"){this._viewId=a
}else{this._view=$(a);this._resetView()}},view:function(){if(!this._view){this._view=$(this._viewId);
this._resetView()}return this._view},_resetView:function(){if(!this._view){return
}var b=this._view.childNodes,a;while(a=b[0]){this._view.removeChild(a)}this._view.addClassName("swapView")
},setDelegate:function(a){this.delegate=a},setContent:function(a){if(a===this.currentContent){return
}if(this.currentContent&&typeof(this.delegate.willClose)==="function"){this.delegate.willClose(this,this.currentContent)
}if(a&&typeof(this.delegate.isContentLoaded)==="function"){if(!this.delegate.isContentLoaded(this,a)){if(typeof(this.delegate.loadContent)==="function"){this.delegate.loadContent(this,a);
return}}}this.setLoadedContent(a)},setLoadedContent:function(b){if(typeof(this.delegate.willShow)==="function"){b=this.delegate.willShow(this,this.currentContent,b)
}var a=true,c;if(typeof(this.delegate.shouldAnimateContentChange)==="function"){a=this.delegate.shouldAnimateContentChange(this,this.currentContent,b)
}if(a&&typeof(this.delegate.willAnimate)==="function"){this.didAnimate=true;if(this.view()&&b&&this.currentContent!==b){this.view().appendChild(b)
}if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}c=this.delegate.willAnimate(this,this.currentContent,b,this.didShow.bind(this,b))
}else{this.didAnimate=false;if(this.currentContent!==b){if(this.currentContent&&this.currentContent.parentNode){this.currentContent.parentNode.removeChild(this.currentContent)
}if(b){this.view().appendChild(b)}if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}}if(b){$(b).setOpacity(1)}this.didShow(b)}},didShow:function(a){if(this.currentContent&&(this.currentContent!==a)&&this.currentContent.parentNode){this.currentContent.parentNode.removeChild(this.currentContent)
}if(typeof(this.delegate.didShow)==="function"){this.delegate.didShow(this,this.currentContent,a)
}this.currentContent=a}});if(typeof(AC.ViewMaster)==="undefined"){AC.ViewMaster={}
}AC.ViewMaster.Viewer=Class.create({view:null,triggerClassName:null,currentSection:null,requestedSection:null,sections:null,orderedSections:null,_locked:false,_didShowInitial:false,options:null,initialize:function(e,k,g,n){if(g){this.triggerClassName=g
}this.sections=$H();this.orderedSections=[];this.options=n||{};this.silentPreviousSelection(this.options.silentPreviousSelection);
this.triggerEvent=this.options.triggerEvent||"click";var d=null,l,h;if(e){for(h=0;
h<e.length;h++){l=this.addSection(e.item(h));if(!d){d=l}}}this.view=new AC.SwapView(k);
this.view.setDelegate(this);var a=document.location.hash,f,c;this.sectionRegExp=this.options.sectionRegExp||new RegExp(/#(.*)$/);
c=a.match(this.sectionRegExp);if(c&&c[1]){a=c[1]}if(a!==this.view._viewId){var j=document.getElementsByClassName(this.triggerClassName),b;
for(h=0,b;(b=j[h]);h++){if(b.getAttribute("href").match(new RegExp("#"+a+"(?![_w-])"))){f=this.sectionWithId(a);
if(f){d=f}break}}}if(!f&&typeof this.options.initialId==="string"&&this.options.initialId.length>0){d=this.sectionWithId(this.options.initialId)
}this.show(d);this._boundTriggerClicked=this._triggerClicked.bindAsEventListener(this);
if(typeof this.triggerEvent==="object"){for(var h=0,m;m=this.triggerEvent[h];h++){Event.observe(document,m,this._boundTriggerClicked)
}}else{Event.observe(document,this.triggerEvent,this._boundTriggerClicked)}if(AC.Detector.isIEStrict()){Event.observe(document,"mouseup",this._boundTriggerClicked)
}if(typeof(this.listenForEvent)==="function"){this.selectSectionFromEventHandler=this.selectSectionFromEvent.bind(this);
this.listenForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler);
this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",true,this.stopMovieIfItsPlaying);
this.listenForEvent(document.event,"replayMovie",false,this.stopMovieIfItsPlaying.bind(this));
if(this.options.parentSectionId){this.listenForEvent(AC.ViewMaster,"ViewMasterWillCloseNotification",false,function(o){var p=o.event_data.data;
if(this===p.sender){return}if(p.outgoingView&&p.outgoingView.id===this.options.parentSectionId){this.willClose(this.view,this.currentSection)
}})}}},initialSectionFromId:function(a){return this.sectionWithId(a)},sectionWithId:function(c){if(!c){return null
}var d=null;if(c&&this.sections.get(c)){d=this.sections.get(c)}if(d){return d}var b,a=null;
b=document.getElementById(c);if(b===this.view._view){b=null}if(!b){b=document.body.down("a."+this.triggerClassName+"[href*=#"+c+"]")
}if(!b){a=document.getElementsByName(c);if(a&&a.length>0){b=a[0]}if(b===this.view._view){b=null
}}if(b){if(b.tagName.toLowerCase()==="a"){if(Element.hasClassName(b,this.triggerClassName)){d=this.addSection(b)
}}else{d=this.addSection(b)}}return d},indexOfSection:function(a){return this.orderedSections.indexOf(a.id)
},selectSectionFromEvent:function(a){if(a.event_data.data.sender===this){return
}if(a.event_data.data.parentTriggerClassName!==this.triggerClassName){return}this.selectSectionWithIdEvent(a.event_data.data.parentSectionId,a.event_data.data.event)
},selectSectionWithIdEvent:function(f,e){var a=this.sectionWithId(f),d=null,b,c,g=false;
if(a){d=a.triggers();if(d&&d.length>0){for(b=0;(c=d[b]);b++){if(Element.Methods.hasClassName(c,this.triggerClassName)){g=true;
break}}}if(!g){c=document.createElement("a");c.className=this.triggerClassName;
c.href="#"+f;c.style.display="none";document.body.appendChild(c);a._triggers.push(c)
}this.triggerClicked(e,$(c))}},setDelegate:function(a){this.delegate=a;if(this.delegate&&typeof(this.delegate.didShow)==="function"&&this.currentSection&&this.currentSection.isContentLoaded()){this.delegate.didShow(this,this.previousSection,this.currentSection)
}},createSectionForContent:function(a){return new AC.ViewMaster.Section(a,this)
},addSection:function(a){var b=this.createSectionForContent(a);this.sections.set(b.id,b);
this.orderedSections.push(b.id);return b},silentPreviousSelection:function(a){if(typeof(a)=="boolean"){this._silentPreviousSelection=a
}return this._silentPreviousSelection},currentTrigger:function(){return this._currentTrigger
},triggerClicked:function(a,b){b.addClassName("active");this._currentTrigger=b;
if(a&&this.options.silentTriggers){Event.stop(a)}var d=null,e;if(!!b.href.match(/#previous/)){d=this.getPreviousSection()
}else{if(!!b.href.match(/#next/)){d=this.getNextSection()}else{var c=b.href.match(this.sectionRegExp);
if(c){e=c[1]}else{e=b.name}d=this.sections.get(e)}}if(!d){d=this.addSection(b)}if(d.isContentRemote()){if(d.isContentLoaded()){d.clearTrigger(b)
}if(a){Event.stop(a)}}if(d===this.currentSection){if(a){Event.stop(a)}if(typeof(AC.ViewMaster.dispatchEvent)==="function"){AC.ViewMaster.dispatchEvent("ViewMasterDidShowNotification",{sender:this,outgoingView:this.previousSection,incomingView:this.currentSection,trigger:b})
}return}else{if(!d){return}}this._didShowInitial=true;setTimeout(this.show.bind(this,d),1)
},_triggerClicked:function(a){if(this.options.passive){return}var c=a.element();
if(AC.Detector.isIEStrict()&&a.type==="mouseup"){if(c&&c.nodeName.toUpperCase()==="A"){c=c.down("."+this.triggerClassName)
}}else{while(c&&c.nodeName.toUpperCase()!=="A"&&c.nodeName.toUpperCase()!=="BODY"){c=c.parentNode
}}if(this._silentPreviousSelection!==true&&!this._locked){if(c&&c.href&&c.href.toString().match(/SwapViewPreviousSelection$/)){c=$(c);
if(c.hasClassName(this.triggerClassName)||c.descendantOf(this.view.view())){Event.stop(a);
this.showPreviousSelection();return}}}if(c&&c.href&&Element.Methods.hasClassName(c,this.triggerClassName)){if(this._locked){Event.stop(a);
return}if(this.options.parentSectionId&&(typeof(this.stopListeningForEvent)==="function")&&(typeof(this.listenForEvent)==="function")&&(typeof(AC.ViewMaster.dispatchEvent)==="function")){var b=this;
Event.stop(a);this.stopListeningForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler);
this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,function(d){this.stopListeningForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,arguments.callee);
b.triggerClicked(d,c);this.listenForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler)
});AC.ViewMaster.dispatchEvent("ViewMasterSelectSectionWithIdNotification",{sender:this,parentSectionId:this.options.parentSectionId,parentTriggerClassName:this.options.parentTriggerClassName,event:a,trigger:c})
}else{this.triggerClicked(a,c)}}},isContentLoaded:function(b,a){return a.isContentLoaded()
},loadContent:function(b,a){if(a){a.loadContent()}},_showContentDidLoad:false,contentDidLoad:function(c,b,a){if(b&&b.firstChild){this._showContentDidLoad=true
}this.view.setLoadedContent(c);AC.loadRemoteContent.insertScriptFragment(b);this.scrollSectionToVisible(c);
if(this._showContentDidLoad&&this.delegate&&typeof(this.delegate.didShow)==="function"){this.delegate.didShow(this,this.previousSection,this.currentSection)
}this._showContentDidLoad=false},show:function(c,b){if(this._locked||(!c&&!b)){return
}if(!this.options.alwaysShowSection&&c===this.currentSection){return}this._locked=true;
if(this.delegate&&typeof(this.delegate.willShowSection)==="function"){var a=this.delegate.willShowSection(this,this.previousSection,c);
if(a instanceof AC.ViewMaster.Section){c=a}}this.previousSection=this.currentSection;
this.currentSection=c;this.view.setContent(c);this.scrollSectionToVisible(c)},scrollSectionToVisible:function(a){if(typeof this.options.ensureInView==="boolean"&&this.options.ensureInView){if(this._didShowInitial){if(a._isContentLoaded){var b=a.content.viewportOffset()[1];
if(b<0||b>(document.viewport.getHeight()*0.75)){new Effect.ScrollTo(a.content,{duration:0.3})
}}}else{$(document.body).scrollTo()}return true}return false},showFirst:function(){this.show(this.getFirstSection())
},getFirstSection:function(){return this.sections.get(this.orderedSections[0])},showNext:function(){this.show(this.getNextSection())
},getNextSection:function(){var b=this.orderedSections.indexOf(this.currentSection.id);
var a=(this.orderedSections.length-1)===b?0:b+1;return this.sections.get(this.orderedSections[a])
},showPrevious:function(){this.show(this.getPreviousSection())},getPreviousSection:function(){var a=this.orderedSections.indexOf(this.currentSection.id);
var b=0===a?this.orderedSections.length-1:a-1;return this.sections.get(this.orderedSections[b])
},showPreviousSelection:function(){this.show(this.getPreviousSelection())},getPreviousSelection:function(){if(this.previousSection){return this.previousSection
}var a=this.orderedSections.length;for(i=0;i<a;i++){if(this.orderedSections[i]!=this.currentSection.id){return this.sections.get(this.orderedSections[i])
}}return false},willShow:function(b,c,a){if(this.delegate&&typeof(this.delegate.willShow)==="function"){this.delegate.willShow(this,this.previousSection,this.currentSection)
}if(typeof(AC.ViewMaster.dispatchEvent)==="function"){AC.ViewMaster.dispatchEvent("ViewMasterWillShowNotification",{sender:this,outgoingView:this.previousSection,incomingView:this.currentSection})
}this._repaintTriggers(this.previousSection,this.currentSection);if(this._didShowInitial&&a&&a!=this.previousSection){$(a.content).setOpacity(0);
$(a.content).removeClassName("hidden")}if(a){return a.willShow(this)}return null
},willClose:function(a,b){if(this.delegate&&typeof(this.delegate.willClose)==="function"){this.delegate.willClose(this,this.previousSection,this.currentSection)
}if(typeof(AC.ViewMaster.dispatchEvent)==="function"){AC.ViewMaster.dispatchEvent("ViewMasterWillCloseNotification",{sender:this,outgoingView:b})
}if(this.previousSection){this.previousSection.willClose(this)}},shouldAnimateContentChange:function(d,c,b){var a=true;
if(this.delegate&&typeof(this.delegate.shouldAnimateContentChange)==="function"){a=this.delegate.shouldAnimateContentChange(this,this.previousSection,this.currentSection)
}else{a=(typeof this.options.shouldAnimateContentChange==="boolean")?this.options.shouldAnimateContentChange:true
}return(typeof a==="boolean")?a:true},willAnimate:function(b,c,a,e){var f=this.options.animationDuration||0.4;
var d=Math.random()+"Queue";if(!this._didShowInitial&&typeof(e)=="function"){e();
return}if(this.delegate&&typeof this.delegate.willAnimate=="function"){return this.delegate.willAnimate(this,c,a,e,d)
}if(c){return new Effect.Parallel([new Effect.Opacity(c,{sync:true,from:1,to:0}),new Effect.Opacity(a,{sync:true,from:0,to:1})],{duration:f,afterFinish:e,queue:{scope:d}})
}else{return new Effect.Opacity(a,{from:0,to:1,duration:f,afterFinish:e,queue:{scope:d}})
}},didAppendContent:function(a,b){if(this.delegate&&typeof this.delegate.didAppendContent==="function"){this.delegate.didAppendContent(this,b)
}},hidePreviousSelectionLinks:function(c){var d=this.getPreviousSelection();if(!d||this._silentPreviousSelection===true){var a=c.select('a[href$="SwapViewPreviousSelection"]');
if(a.length>0){if(!this._previousSectionLinks){this._previousSectionLinks=[]}for(var b=a.length-1;
b>=0;b--){a[b].style.display="none";this._previousSectionLinks.push(a[b])}}}if(d&&this._silentPreviousSelection!==true&&this._previousSectionLinks&&this._previousSectionLinks.length>0){for(var b=this._previousSectionLinks.length-1;
b>=0;b--){this._previousSectionLinks[b].style.display="";this._previousSectionLinks.splice(b,1)
}}},stopMovieIfItsPlaying:function(c){if(AC.ViewMaster.Viewer.allowMultipleVideos()!==true){if(c.event_data.data.incomingView){var b=c.event_data.data.sender,a=c.event_data.data.incomingView,d=false
}else{var b=this,a=c.event_data.data,d=true}if(b!=this||d){if(a&&this.currentSection&&((typeof(a.hasMovie)=="function"&&a.hasMovie())||(a.content&&a.content.getElementsByClassName("movieLink")[0]))&&this.currentSection.isMoviePlaying()){this.currentSection.stopMovie()
}}}},didShow:function(b,c,a){if(a){this.hidePreviousSelectionLinks(a)}if(this.currentSection){this.currentSection.didShow(this)
}this._didShowInitial=true;this._locked=false;if(!this._showContentDidLoad&&this.delegate&&typeof(this.delegate.didShow)=="function"){this.delegate.didShow(this,this.previousSection,this.currentSection)
}if(typeof(AC.ViewMaster.dispatchEvent)=="function"){AC.ViewMaster.dispatchEvent("ViewMasterDidShowNotification",{sender:this,outgoingView:this.previousSection,incomingView:this.currentSection,trigger:this._currentTrigger})
}},_repaintTriggers:function(f,a){if(f){var e=f.triggers();for(var b=0,c;(c=e[b]);
b++){c.removeClassName("active")}e=f.relatedElements();for(var b=0,c;(c=e[b]);b++){c.removeClassName("active")
}}if(a){var d=a.triggers();for(var b=0,c;(c=d[b]);b++){c.addClassName("active")
}d=a.relatedElements();for(var b=0,c;(c=d[b]);b++){c.addClassName("active")}}}});
AC.ViewMaster.Viewer.allowMultipleVideos=function(a){if(typeof(a)=="boolean"){this._allowMultipleVideos=a
}return this._allowMultipleVideos};if(Event.Publisher){Object.extend(AC.ViewMaster,Event.Publisher)
}if(Event.Listener){Object.extend(AC.ViewMaster.Viewer.prototype,Event.Listener)
}AC.ViewMaster.Section=Class.create({content:null,moviePanel:null,controllerPanel:null,movie:null,_movieController:null,movieLink:null,endState:null,hasShown:false,_isContentRemote:false,isContentRemote:function(){return this._isContentRemote
},_isContentLoaded:true,isContentLoaded:function(){return this._isContentLoaded
},_onMoviePlayable:Prototype.EmptyFunction,_onMovieFinished:Prototype.EmptyFunction,id:null,triggers:function(){if(!this._triggers){this._triggers=[];
var e=new RegExp("#"+this.id+"$");if(this.viewMaster.sectionRegExp||this.viewMaster.options.sectionRegExp){e=this.viewMaster.sectionRegExp||this.viewMaster.options.sectionRegExp;
e=e.toString().replace(/^\//,"").replace(/\/$/,"");e=new RegExp(e.replace("(.*)",this.id))
}var d=document.getElementsByClassName(this.viewMaster.triggerClassName);for(var b=0,c;
(c=$(d[b]));b++){if(c.tagName.toLowerCase()!=="a"){continue}if(c.href.match(e)){this._triggers.push(c)
}}var a=this.content.getElementsByClassName(this.viewMaster.triggerClassName);for(var b=0,c;
(c=$(a[b]));b++){if(c.tagName.toLowerCase()!=="a"){continue}if(c.href.match(e)){this._triggers.push(c)
}}}return this._triggers},relatedElements:function(){if(!this._relatedElements){this._relatedElements=document.getElementsByClassName(this.id)
}return this._relatedElements},initialize:function(j,k){this.content=$(j);if(this.content.tagName.toLowerCase()==="a"){var c=this.content.getAttribute("href");
var e=c.split("#");this._contentURL=e[0];var f=window.location.href.split("#");
var d=j.className;var g=document.getElementsByTagName("base")[0];var a=g?g.href:null;
if(e.length===2){this.id=e[1]}if(this._contentURL.length>0&&(!a||this._contentURL!=a)&&(this._contentURL!==f[0])&&(!this._contentURL.startsWith("#")||this._contentURL!==c)){this._isContentRemote=true;
this._isContentLoaded=false}else{var h=$(this.id)||$("MASKED-"+this.id);if(h){this.content=h
}}if(!this.id){this.id=this.content.name}}else{this.id=j.id}if(!this._isContentRemote||this._isContentLoaded){this.content.setAttribute("id","MASKED-"+this.id)
}if(k){this.viewMaster=k}if(!this._isContentRemote&&this._isContentLoaded&&!this.content.hasClassName("content")){var b=this.content.getElementsByClassName("content")[0];
if(b){this.content=b}}this.isMobile=AC.Detector.isMobile()},clearTrigger:function(a){if(a.href===("#"+this.id)){return
}a.href="#"+this.id;a.removeAttribute("id");a.removeAttribute("name")},remoteContentDidLoad:function(a,b){this.clearTrigger(this.content);
this.content=$(a);this.content.setAttribute("id","MASKED-"+this.id);this._isContentLoaded=true;
this.viewMaster.contentDidLoad(this,b)},loadContent:function(){if(this._isContentLoaded){var b=this;
b.viewMaster.contentDidLoad(b,null)}else{if(this.content.className.indexOf("imageLink")!==-1){var a=document.createElement("div");
a.appendChild(this.content.cloneNode(true));this.remoteContentDidLoad(a)}else{if((this.content.className.indexOf("movieLink")!==-1)||(this.content.className.indexOf("audioLink")!==-1)){var a=document.createElement("div");
a.appendChild(this.content.cloneNode(true));this.remoteContentDidLoad(a)}else{AC.loadRemoteContent(this._contentURL,true,true,this.remoteContentDidLoad.bind(this),null,this)
}}}},shouldImportScriptForContentURL:function(h,g,c){var f=false;if(h.hasAttribute){f=h.hasAttribute("src")
}else{src=h.getAttribute("src");f=((src!=null)&&(src!==""))}if(!f){var b=navigator.userAgent.toLowerCase(),d=(b.indexOf("applewebkit")!=-1),e=parseInt(parseFloat(b.substring(b.lastIndexOf("safari/")+7))),j=(d&&e>=419),a;
if(j){a=h.innerHTML}else{a=h.text}if(a.search(/.*\.location\.replace\(.*\).*/)!==-1){return false
}return true}else{return true}},mediaType:function(){return this.movieLink?"video/quicktime":"text/html"
},willShow:function(){if(!this.hasShown){this.hasShown=true;var a=this.content.getElementsByClassName("imageLink");
for(var b=0;b<a.length;b++){this._loadImage(a[b])}if(!this.moviePanel){this.movieLink=this.content.getElementsByClassName("movieLink")[0];
this.posterLink=this.content.getElementsByClassName("posterLink")[0];if(this.movieLink){this._loadMovie()
}}}return this.content},_loadImage:function(b){var a=document.createElement("img");
if(b.protocol==="about:"){b.href="/"+b.pathname;b.href=b.href.replace(/^\/blank/,"")
}a.setAttribute("src",b.href);a.setAttribute("alt",b.title);b.parentNode.replaceChild(a,b)
},_loadMovie:function(){var a=this.isACMediaAvailable();this.moviePanel=$(document.createElement("div"));
this.moviePanel.addClassName("moviePanel");this.movieLink.parentNode.replaceChild(this.moviePanel,this.movieLink);
this.controllerPanel=$(document.createElement("div"));this.controllerPanel.addClassName("controllerPanel");
if(a===false){}else{this.moviePanel.appendChild(this.controllerPanel)}if(a===false){this.moviePanel.parentNode.insertBefore(this.controllerPanel,this.moviePanel.nextSibling)
}else{this.moviePanel.appendChild(this.controllerPanel)}this.endState=$(this.content.getElementsByClassName("endState")[0]);
if(this.endState){this.endState.parentNode.removeChild(this.endState);var b=$(this.endState.getElementsByClassName("replay")[0]);
if(b){b.observe("click",function(c){Event.stop(c);this.replayMovie()}.bindAsEventListener(this))
}}},_forceACQuicktime:false,isACMediaAvailable:function(){return(typeof(Media)!="undefined"&&this._forceACQuicktime===false)
},setShouldForceACQuicktime:function(a){this._forceACQuicktime=a},newMovieController:function(){if(this.isACMediaAvailable()){return this._movieControls||new Media.ControlsWidget(this.controllerPanel)
}else{return new AC.QuicktimeController()}},movieControls:function(){return this._movieControls
},didShow:function(c){var a=this.hasMovie()&&!this.isMobile,b=this.isACMediaAvailable();
if(b){if(a){this._movieControls=this.newMovieController();this._playMovie();if(this._movieController){this._movieController.setControlPanel(this._movieControls);
this.onMovieFinished=this.didFinishMovie.bind(this);this._movieController.setDelegate(this)
}else{this.controllerPanel.innerHTML=""}}else{this._playMovie()}}else{if(a){this._movieController=this.newMovieController();
this.controllerPanel.innerHTML="";this.controllerPanel.appendChild(this._movieController.render())
}this._playMovie();if(a){this._onMoviePlayable=this._movieController.monitorMovie.bind(this._movieController);
this._onMovieFinished=this.didFinishMovie.bind(this);this._movieController.attachToMovie(this.movie,{onMoviePlayable:this._onMoviePlayable,onMovieFinished:this._onMovieFinished})
}}},willClose:function(a){this._closeController();this._closeMovie()},_closeMovie:function(){if(this.movie&&this.moviePanel){if(!this.isACMediaAvailable()){this.moviePanel.removeChild(this.movie);
this.movie=null;this.moviePanel.innerHTML=""}else{if(AC.Detector.isIEStrict()){this.moviePanel.removeChild(this.movie);
this.controllerPanel.hide()}else{this.moviePanel.innerHTML=""}this.movie=null}}},_closeController:function(){if(this.isACMediaAvailable()){if(this._movieController&&this.hasMovie()&&!this.isMobile){this._movieController.stop();
this._movieController.setControlPanel(null);if(AC.Detector.isIEStrict()){this.controllerPanel.hide()
}this.controllerPanel.addClassName("inactive")}}else{if(this._movieController&&this._movieController.movie&&this.hasMovie()&&!this.isMobile){this._movieController.Stop();
this._movieController.detachFromMovie();this.controllerPanel.addClassName("inactive");
this._movieController.replay=this.replayMovie.bind(this);this.controllerPanel.observe("click",this._movieController.replay)
}}},hasMovie:function(){return !!this.movieLink},isMoviePlaying:function(){if(this._movieController){if(typeof(this._movieController.playing)==="function"){return this._movieController.playing()
}if(typeof(this._movieController.playing)==="boolean"){return this._movieController.playing
}}return false},stopMovie:function(){if(!this.hasMovie()){return}this._closeController();
this._closeMovie();if(this.endState){this.moviePanel.appendChild(this.endState)
}else{this.stopMovieWithNoEndState()}},stopMovieWithNoEndState:function(){var a=this;
setTimeout(function(){a.viewMaster.showPreviousSelection()},0)},didFinishMovie:function(){if(!this.hasMovie()){return
}this.stopMovie();if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didFinishMovie",this)
}},defaultMovieWidth:function(){return 640},defaultMovieHeight:function(){return 480
},defaultOptions:function(){return{width:this.defaultMovieWidth(),height:this.defaultMovieHeight(),controller:false,posterFrame:null,showlogo:false,autostart:true,cache:true,bgcolor:"white",aggressiveCleanup:false}
},_playMovie:function(){if(this.movieLink&&this.moviePanel){var d=this.isACMediaAvailable();
if(!d){this.moviePanel.innerHTML=""}else{if(this.movie&&this.movie.parentNode==this.moviePanel){this.moviePanel.removeChild(this.movie);
this.controllerPanel.hide()}if(this.endState&&this.endState.parentNode==this.moviePanel){this.moviePanel.removeChild(this.endState)
}if(this.controllerPanel&&Element.hasClassName(this.controllerPanel,"inactive")){this.controllerPanel.show();
Element.removeClassName(this.controllerPanel,"inactive")}}if(this.posterLink&&this.posterLink.href){var b=this.posterLink.href
}var e=this.movieLink.getAttribute("href",2).toQueryParams(),a=this.defaultOptions(),c;
a.posterFrame=b;c=Object.extend(a,e);if(d===true){this._movieController=Media.create(this.moviePanel,this.movieLink.getAttribute("href",2),c);
if(this._movieController){this.movie=this._movieController.video().object()}}else{this.movie=AC.Quicktime.packageMovie(this.movieLink.id+"movieId",this.movieLink.getAttribute("href",2),c,this.moviePanel);
if(!AC.Quicktime.movieIsFlash){this.moviePanel.appendChild(this.movie)}}if(d===true&&!this.isMobile&&this.movie){this._movieControls.reset();
this.moviePanel.appendChild(this.controllerPanel)}if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didStart",this)
}}},replayMovie:function(){var a=this.isACMediaAvailable();if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("replayMovie",this)
}if(a){if(this.moviePanel&&this.endState){this.moviePanel.removeChild(this.endState)
}}this._playMovie();if(a){this.controllerPanel.show()}this.controllerPanel.removeClassName("inactive");
if(a){this._movieController.setControlPanel(this._movieControls);this._movieController.setDelegate(this)
}else{this.controllerPanel.stopObserving("click",this._movieController.replay);
this._movieController.replay=null;this._movieController.attachToMovie(this.movie,{onMoviePlayable:this._onMoviePlayable,onMovieFinished:this._onMovieFinished})
}}});AC.ViewMaster.SlideshowViewer=Class.create();Object.extend(AC.ViewMaster.SlideshowViewer.prototype,AC.ViewMaster.Viewer.prototype);
Object.extend(AC.ViewMaster.SlideshowViewer.prototype,{_superInitialize:AC.ViewMaster.Viewer.prototype.initialize,initialize:function(d,a,e,c,b){this._superInitialize(d,a,e,b);
this.slideshow=new AC.ViewMaster.Slideshow(this,c,b)},setDelegate:function(a){this.delegate=a
},start:function(){this.slideshow.start()},stop:function(){this.slideshow.stop()
},reset:function(){if(this._isLocked){this._needsReset=true}else{this.slideshow.reset()
}},superDidShow:AC.ViewMaster.Viewer.prototype.didShow,didShow:function(b,c,a){this.superDidShow(b,c,a);
if(this._needsReset){this._needsReset=false;this.slideshow.reset()}},next:function(){this.slideshow.next()
},previous:function(){this.slideshow.previous()}});AC.ViewMaster.Slideshow=Class.create();
if(Event.Listener){Object.extend(AC.ViewMaster.Slideshow.prototype,Event.Listener)
}if(Event.Publisher){Object.extend(AC.ViewMaster.Slideshow.prototype,Event.Publisher)
}Object.extend(AC.ViewMaster.Slideshow.prototype,{contentController:null,animationTimeout:null,options:null,_playing:false,_active:false,_progress:0,setProgress:function(a){this._progress=a
},progress:function(){return this._progress},initialize:function(a,c,b){this.contentController=a;
this.triggerClassName=c;this.options=b||{};if(!this.options.addNoListeners){this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",true,this.willShow);
this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",true,this.didShow)
}if(this.options.autoplay){this.start()}if(this.triggerClassName){Event.observe(document,"click",this._triggerHandler.bindAsEventListener(this))
}},start:function(){if(this._active){return}this._active=true;if(this.options.wipeProgress=="always"||this.options.wipeProgress=="on start"){this._progress=0
}this.play(true);this._repaintTriggers();if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didStart",this)
}},stop:function(){if(!this._active){return}this._active=false;this.pause();this._repaintTriggers();
if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didEnd",this)
}},play:function(a){if(!this._active){return}if(this.options.wipeProgress=="always"||(this.options.wipeProgress=="on play"&&!a)){this._progress=0
}this.animationTimeout=setTimeout(this._update.bind(this),this._heartbeatDelay());
this._playing=true},_update:function(){if(typeof(this.options.onProgress)=="function"){this.options.onProgress(this._progress,this.delay())
}if(this._progress>=this.delay()){this._progress=0;this.next()}else{this._progress+=this._heartbeatDelay();
this.animationTimeout=setTimeout(this._update.bind(this),this._heartbeatDelay())
}},delay:function(){return this.options.delay||5000},_heartbeatDelay:function(){return this.options.heartbeatDelay||100
},pause:function(){clearTimeout(this.animationTimeout);this._playing=false},next:function(){if(this.options.willEnd&&(this.contentController.getNextSection()==this.contentController.getFirstSection())){if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didEnd",this)
}return}this.contentController.showNext()},previous:function(){this.contentController.showPrevious()
},reset:function(){this.contentController.showFirst();this.setProgress(0)},willShow:function(a){if(a.event_data.data.sender!=this.contentController){return
}this.pause()},didShow:function(a){if(a.event_data.data.sender!=this.contentController){return
}this.play()},_triggerHandler:function(a){var b=a.element();var c=null;if(b.hasClassName(this.triggerClassName)&&b.href.match(/#slideshow-toggle/)){Event.stop(a);
if(this._active){this.stop()}else{this.start()}}},_repaintTriggers:function(){if(!this.triggerClassName){return
}var b=document.getElementsByClassName(this.triggerClassName);for(var a=b.length-1;
a>=0;a--){this._repaintTrigger(b[a])}},_repaintTrigger:function(a){var b=$(a);if(this._active){b.addClassName("playing")
}else{b.removeClassName("playing")}}});AC.loadRemoteContent=function(h,a,c,g,d,f){if(typeof h!=="string"){return
}if(typeof a!=="boolean"){a=true}if(typeof c!=="boolean"){c=true}var e=arguments.callee;
var b=e._loadArgumentsByUrl[h];if(!b){e._loadArgumentsByUrl[h]={contentURL:h,importScripts:a,importCSS:c,callback:g,context:d,delegate:f};
new Ajax.Request(h,{method:"get",requestHeaders:{Accept:"text/xml"},onSuccess:arguments.callee.loadTemplateHTMLFromRequest,onFailure:arguments.callee.failedToadTemplateHTMLFromRequest,onException:function(j,k){throw (k)
},onCreate:function(j){j.request.overrideMimeType("text/xml")}})}};AC.loadRemoteContent._loadArgumentsByUrl={};
AC.loadRemoteContent.loadTemplateHTMLFromRequest=function(b){var d=b.request.url;
var m=arguments.callee;var h=AC.loadRemoteContent._loadArgumentsByUrl[d];var q=window.document;
var k=b.responseXMLValue().documentElement;if(AC.Detector.isIEStrict()){k=k.ownerDocument
}var q=window.document;var l=document.createDocumentFragment();if(h.importScripts){AC.loadRemoteContent.importScriptsFromXMLDocument(k,l,h)
}if(h.importCSS){AC.loadRemoteContent.importCssFromXMLDocumentAtLocation(k,d,h)
}var r=null;var a=null;var g=k.getElementsByTagName("body")[0];if(!g){return}g.normalize();
var a=Element.Methods.childNodeWithNodeTypeAtIndex(g,Node.ELEMENT_NODE,0);var f=AC.Detector.isSafari2();
if(a){if(f){r=q._importNode(a,true)}else{r=q.importNode(a,true)}if(r.cleanSpaces){r.cleanSpaces(true)
}}else{if(g.cleanSpaces){g.cleanSpaces(true)}else{if(typeof g.normalize==="function"){g.normalize()
}}var j=g.childNodes;r=q.createDocumentFragment();var n=/\S/;for(var e=0,c=0;(c=j[e]);
e++){var o=(f)?q._importNode(c,true):q.importNode(c,true);r.appendChild(o)}}var p=h.callback;
p(r,l,h.context)};AC.loadRemoteContent.javascriptTypeValueRegExp=new RegExp("text/javascript","i");
AC.loadRemoteContent.javascriptLanguageValueRegExp=new RegExp("javascript","i");
AC.loadRemoteContent.documentScriptsBySrc=function(){if(!AC.loadRemoteContent._documentScriptsBySrc){AC.loadRemoteContent._documentScriptsBySrc={};
var b=document.getElementsByTagName("script");if(!b||b.length===0){return AC.loadRemoteContent._documentScriptsBySrc
}for(var c=0,a=null;(a=b[c]);c++){var d=a.getAttribute("type");var f=null;var g=a.getAttribute("language");
if(!this.javascriptTypeValueRegExp.test(d)&&!this.javascriptLanguageValueRegExp.test(g)){continue
}if(a.hasAttribute){var e=a.hasAttribute("src")}else{var e=Element.Methods.hasAttribute(a,"src")
}if(e){var f=a.getAttribute("src");AC.loadRemoteContent._documentScriptsBySrc[f]=f
}}}return AC.loadRemoteContent._documentScriptsBySrc};AC.loadRemoteContent.importScriptsFromXMLDocument=function(o,c,v){var f=o.getElementsByTagName("script"),g,j,q,w,d=v.contentURL,u=v.delegate,e=v.context,b=(u&&typeof u.shouldImportScriptForContentURL==="function"),k=true;
if(!c){c=document.createDocumentFragment()}var m=AC.loadRemoteContent.documentScriptsBySrc();
for(var s=0,n=null;(n=f[s]);s++){g=n.getAttribute("type");j=null;k=true;q=n.getAttribute("language");
if(!this.javascriptTypeValueRegExp.test(g)&&!this.javascriptLanguageValueRegExp.test(q)){continue
}if(n.hasAttribute){w=n.hasAttribute("src");j=n.getAttribute("src")}else{j=n.getAttribute("src");
w=((j!=null)&&(j!==""))}if(n.getAttribute("id")==="Redirect"||(b&&!u.shouldImportScriptForContentURL(n,d,e))){continue
}if(w){if(!m.hasOwnProperty(j)){var p=document.createElement("script");p.setAttribute("type","text/javascript");
if(AC.Detector.isIEStrict()){p.tmp_src=j;p.onreadystatechange=function(){var x=window.event.srcElement,y;
if(!x.isLoaded&&((x.readyState=="complete")||(x.readyState=="loaded"))){y=x.tmp_src;
if(y){x.tmp_src=null;x.src=y;x.isLoaded=false}else{x.onreadystatechange=null;x.isLoaded=true
}}}}else{p.src=j}AC.loadRemoteContent._documentScriptsBySrc[j]=j;c.appendChild(p)
}}else{var p=document.createElement("script");p.setAttribute("type","text/javascript");
if(AC.Detector.isIEStrict()){var l=new Function(n.text);p.onreadystatechange=function(){var x=window.event.srcElement;
if(!x.isLoaded&&((x.readyState=="complete")||(x.readyState=="loaded"))){x.onreadystatechange=null;
x.isLoaded=true;l()}}}else{var r=navigator.userAgent.toLowerCase();var a=(r.indexOf("applewebkit")!=-1);
var h=parseInt(parseFloat(r.substring(r.lastIndexOf("safari/")+7)));var t=(a&&h>=419);
if(t){p.innerHTML=n.innerHTML}else{p.text=n.text}}AC.loadRemoteContent._documentScriptsBySrc[j]=j;
c.appendChild(p)}}return c};AC.loadRemoteContent.insertScriptFragment=function(e){if(!e){return
}AC.isDomReady=false;Event._domReady.done=false;var d=document.getElementsByTagName("head")[0],g=e.childNodes,b,c,a=function(){var h;
if(!window.event||((h=window.event.srcElement)&&(h.isLoaded||((typeof h.isLoaded==="undefined")&&((h.readyState=="complete")||(h.readyState=="loaded")))))){arguments.callee.loadedCount++;
if(h&&!h.isLoaded){h.onreadystatechange=null;h.isLoaded=true}if(arguments.callee.loadedCount===arguments.callee.loadingCount){Event._domReady()
}}};a.loadedCount=0;a.loadingCount=e.childNodes.length;for(c=0;(b=g[c]);c++){if(b.addEventListener){b.addEventListener("load",a,false)
}else{if(typeof b.onreadystatechange==="function"){var f=b.onreadystatechange;b.onreadystatechange=function(h){var j=window.event.srcElement;
f.call(j);a()}}else{b.onreadystatechange=a}}}d.appendChild(e);d=null};AC.loadRemoteContent.documentLinksByHref=function(){if(!AC.loadRemoteContent._documentLinksByHref){AC.loadRemoteContent._documentLinksByHref={};
var b=document.getElementsByTagName("link");if(!b||b.length===0){return AC.loadRemoteContent._documentLinksByHref
}for(var c=0,e=null;(e=b[c]);c++){var d=e.getAttribute("type");if(e.type.toLowerCase()!=="text/css"){continue
}var f=null;if(e.hasAttribute){var a=e.hasAttribute("href")}else{var a=Element.hasAttribute(e,"href")
}if(a){var f=e.getAttribute("href");AC.loadRemoteContent._documentLinksByHref[f]=f
}}}return AC.loadRemoteContent._documentLinksByHref};AC.loadRemoteContent.__importCssElementInHeadFromLocation=function(e,g,b){var d=(e.tagName.toUpperCase()==="LINK");
if(d){var f=e.getAttribute("type");if(!f||f&&f.toLowerCase()!=="text/css"){return
}var c=e.getAttribute("href");if(!c.startsWith("http")&&!c.startsWith("/")){var j=c;
if(b.pathExtension().length>0){b=b.stringByDeletingLastPathComponent()}c=b.stringByAppendingPathComponent(j)
}if(AC.Detector.isIEStrict()){var a=window.document.createStyleSheet(c,1)}else{var h=window.document.importNode(e,true);
h.href=c}AC.loadRemoteContent.documentLinksByHref()[c]=c}if(!AC.Detector.isIEStrict()||(AC.Detector.isIEStrict()&&!d)){g.insertBefore(h,g.firstChild)
}};AC.loadRemoteContent.importCssFromXMLDocumentAtLocation=function(h,b,g){var j=window.document.getElementsByTagName("head")[0];
var c=[];c.addObjectsFromArray(h.getElementsByTagName("style"));c.addObjectsFromArray(h.getElementsByTagName("link"));
if(c){var d=AC.loadRemoteContent.documentLinksByHref();for(var e=0,f=null;(f=c[e]);
e++){var a=f.getAttribute("href");if(d.hasOwnProperty(a)){continue}this.__importCssElementInHeadFromLocation(f,j,b)
}}};Ajax.Request.prototype._overrideMimeType=null;Ajax.Request.prototype.overrideMimeType=function(a){this._overrideMimeType=a;
if(this.transport.overrideMimeType){this.transport.overrideMimeType(a)}};Ajax.Request.prototype._doesOverrideXMLMimeType=function(){return(this._overrideMimeType==="text/xml")
};Ajax.Response.prototype.responseXMLValue=function(){if(AC.Detector.isIEStrict()){var a=this.transport.responseXML.documentElement;
if(!a&&this.request._doesOverrideXMLMimeType()){this.transport.responseXML.loadXML(this.transport.responseText)
}}return this.transport.responseXML};


}