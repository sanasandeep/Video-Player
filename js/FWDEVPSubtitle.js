﻿/**
 * Easy Video Player PACKAGED v8.3
 * Subtitle.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
var FWDEVPSubtitle = function(prt, _d){

		'use strict';
		
		var _s = this;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		_s.showSubtitileByDefault_bl = _d.showSubtitileByDefault_bl;
		
	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			_s.style().cursor = "default";
			_s.setupTextContainer();
			_s.setWidth(prt.maxWidth);
			_s.style().margin = "auto";			
			_s.hide();
		};
		

		//##########################################//
		/* setup text containers */
		//##########################################//
		_s.setupTextContainer = function(){
			_s.text_do = new FWDEVPDO("div", 0, 0, true);
			_s.text_do.style().pointerEvents = "none";
			_s.text_do.hasT3D = false;
			_s.text_do.setBackfaceVisibility();
			_s.text_do.style().transformOrigin = "50% 0%";
			_s.text_do.setWidth(prt.maxWidth);
			_s.text_do.style().textAlign = "center";
			
			_s.text_do.style().fontSmoothing = "antialiased";
			_s.text_do.style().webkitFontSmoothing = "antialiased";
			_s.text_do.style().textRendering = "optimizeLegibility";
			_s.addChild(_s.text_do);
		};
		

		//##########################################//
		/* Load subtitle */
		//##########################################//
		_s.loadSubtitle = function(path){
			_s.text_do.setX(-5000);
			if(location.protocol.indexOf("file:") != -1) return;
			_s.subtitiles_ar = [];
			_s.stopToLoadSubtitle();
			_s.sourceURL_str = path;
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.onLoad;
			_s.xhr.onerror = _s.onError;
			
			try{
				_s.xhr.open("get", _s.sourceURL_str + "?rand=" + parseInt(Math.random() * 99999999), true);
				_s.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
			}
		};
		
		_s.onLoad = function(e){
			var response;
			
			if(_s.xhr.readyState == 4){
				if(_s.xhr.status == 404){
					_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:"Subtitle file path is not found: <font color='#FF0000'>" + _s.sourceURL_str + "</font>"});
				}else if(_s.xhr.status == 408){
					_s.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:"Loadiong subtitle file file request load timeout!"});
				}else if(_s.xhr.status == 200){
					
					_s.subtitle_txt = _s.xhr.responseText;
					
					if(_s.isShowed_bl) _s.show();
					
					_s.parseSubtitle(_s.subtitle_txt)
					_s.prevText = "none";
					if(_s.showSubtitileByDefault_bl){
						_s.showId_to = setTimeout(function(){
							_s.show();
							_s.text_do.setX(0);
							_s.updateSubtitle(prt.currentSecconds);
						}, 400);
					}
				}
			}
			
			_s.dispatchEvent(FWDEVPSubtitle.LOAD_COMPLETE);
		};
		
		_s.onError = function(e){
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			_s.dispatchEvent(FWDEVPSubtitle.LOAD_ERROR, {text:"Error loading subtitle file : <font color='#FF0000'>" + _s.sourceURL_str + "</font>."});
		};
		

		//####################################################//
		/* Stop to load subtitile */
		//####################################################//
		_s.stopToLoadSubtitle = function(){
			clearTimeout(_s.showId_to);
			if(_s.xhr != null){
				_s.xhr.onreadystatechange = null;
				_s.xhr.onerror = null;
				try{_s.xhr.abort();}catch(e){}
				_s.xhr = null;
			}
			
			_s.hide();
			_s.isLoaded_bl = false;
		};
		

		//##########################################//
		/* parse subtitle */
		//##########################################//
		_s.parseSubtitle = function(file_str){
			
			 _s.isLoaded_bl = true;
			 function strip(s) {
				if(s ==  undefined) return "";
		        return s.replace(/^\s+|\s+$/g,"");
		     }
			 
			file_str = file_str.replace(/\r\n|\r|\n/g, '\n');
			
			file_str = strip(file_str);

		    var srt_ = file_str.split('\n\n');
		    
		    var cont = 0;
			
		    for(var s in srt_) {
		        var st = srt_[s].split('\n');

		        if(st.length >=2) {
		            var n = st[0];

		            var i = strip(st[1].split(' --> ')[0]);
		            var o = strip(st[1].split(' --> ')[1]);
		            var t = st[2];
					

		            if(st.length > 2) {
		                for(var j=3; j<st.length;j++)
		                  t += '<br>'+st[j];
		            }
		            
		            //define variable type as Object
		            _s.subtitiles_ar[cont] = {};
		            _s.subtitiles_ar[cont].number = n;
		            _s.subtitiles_ar[cont].start = i;
		            _s.subtitiles_ar[cont].end = o;
		            _s.subtitiles_ar[cont].startDuration =  FWDEVPUtils.formatTimeWithMiliseconds(i);
		            _s.subtitiles_ar[cont].endDuration = FWDEVPUtils.formatTimeWithMiliseconds(o);
		            _s.subtitiles_ar[cont].text = "<p class='EVPSubtitle'>" + t + "</p>";
		        }
		        cont++;
		    }
			for(var i=0; i<_s.subtitiles_ar.length; i++){
				if(!_s.subtitiles_ar[i]){
					_s.subtitiles_ar.splice(i,1);
					i--;
				}
			}
		};
		

		//#####################################//
		/* Update text */
		//#####################################//
		_s.updateSubtitle = function(duration){
			if(!_s.isLoaded_bl) return;
		
			var start;
			var end;
			var text = "";
			for(var i=0; i<_s.subtitiles_ar.length; i++){
				start = _s.subtitiles_ar[i].startDuration;
				end = _s.subtitiles_ar[i].endDuration;
				if(start < duration  && end > duration ){
					text = _s.subtitiles_ar[i].text
					break;
				};
			}

			if(prt.sW < 260){
				_s.setVisible(false);
			}else{
				_s.setVisible(true);
			}

			if(prt.sW <= 600){
				text = text.replace('EVPSubtitle', 'EVPSubtitle phone');
			}else if(prt.sW <= 1000){
				text = text.replace('EVPSubtitle', 'EVPSubtitle tablet');
			}else if(prt.sW <= 1800){
				text = text.replace('EVPSubtitle', 'EVPSubtitle normal');
			}else{
				text = text.replace('EVPSubtitle', 'EVPSubtitle large');
			}

			if(_s.prevText != text){
				var totalWidth;
				if(prt.sW)
				var sW = prt.tempVidStageWidth;

				_s.text_do.setInnerHTML(text);
				_s.setAlpha(0);
				setTimeout(function(){
					_s.setAlpha(1);
					_s.position();
				}, 300);
				_s.hasText_bl = true;
			}
			_s.prevText = text;
		};
		
		_s.position = function(animate){
			if(!_s.isLoaded_bl) return;
			
			var finalY;
			_s.text_do.setWidth(prt.tempVidStageWidth);
		
			var textHeight = _s.text_do.getHeight();
			
			if(prt.controller_do){
				if(prt.controller_do.isShowed_bl){
					finalY = parseInt(prt.sH - prt.controller_do.h - textHeight);
				}else{
					finalY = parseInt(prt.sH - textHeight - 10);
				}	
			}else{
				finalY = parseInt(prt.sH - textHeight);
			}
			
			FWDAnimation.killTweensOf(_s.text_do)
			if(animate){
				FWDAnimation.to(_s.text_do, .8, {y:finalY, ease:Expo.easeInOut});
			}else{
				_s.text_do.setY(finalY)
			}
		};
		
		_s.show = function(){
			_s.setVisible(true);
		};
		
		_s.hide = function(){
			_s.setVisible(false);
		}
		
		_s.init();
	};
	
	FWDEVPSubtitle.getDuration = function(str){
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var duration = 0;
		
		str = str.split(":");
		
		hours = str[0];
		if(hours[0] == "0" && hours[1] != "0"){
			hours = parseInt(hours[1]);
		}
		if(hours == "00") hours = 0;
		
		minutes = str[1];
		if(minutes[0] == "0" && minutes[1] != "0"){
			minutes = parseInt(minutes[1]);
		}
		if(minutes == "00") minutes = 0;
		
		secs = parseInt(str[2].replace(/,.*/ig, ""));
		if(secs[0] == "0" && secs[1] != "0"){
			secs = parseInt(secs[1]);
		}
		if(secs == "00") secs = 0;
		
		if(hours != 0){
			duration += (hours * 60 * 60)
		}
		
		if(minutes != 0){
			duration += (minutes * 60)
		}
		
		duration += secs;
		
		return duration;
	 }
	
	
	/* set prototype */
	FWDEVPSubtitle.setPrototype = function(){
		FWDEVPSubtitle.prototype = null;
		FWDEVPSubtitle.prototype = new FWDEVPDO("div");
	};
	
	FWDEVPSubtitle.LOAD_ERROR = "error";
	FWDEVPSubtitle.LOAD_COMPLETE = "complete";
	
	
	FWDEVPSubtitle.prototype = null;
	window.FWDEVPSubtitle = FWDEVPSubtitle;
}(window));