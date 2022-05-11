/**
 * Easy Video Player PACKAGED v8.3
 * Popup window.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDEVPOPWindow = function(_d, prt){

		'use strict';
		
		var _s = this;
		var prototype = FWDEVPOPWindow.prototype;
	
		_s.buttons_ar = [];
		_s.maxWidth = _d.aopwWidth;
		_s.maxHeight = _d.aopwHeight + _d.popwColseN_img.height + 1; 
		_s.sW = 0;
		_s.sH = 0;
		_s.aopwSource = _d.aopwSource;
		_s.aopwTitle = _d.aopwTitle;
		_s.aopwTitleColor_str = _d.aopwTitleColor_str;
		_s.aopwBorderSize = _d.aopwBorderSize;
		
		_s.isShowed_bl = false;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
	

		//#################################//
		/* init */
		//#################################//
		_s.init = function(){
			_s.setBackfaceVisibility();
			
			_s.mainBar_do = new FWDEVPDO("div");
			
			_s.bar_do = new FWDEVPDO("div");
			_s.bar_do.style().background = "url('" + _d.popwBarBackgroundPath_str + "')";
			
			_s.adHolder_do = new FWDEVPDO("div");
		
			
			_s.adBk_do = new FWDEVPDO("div");
			_s.adBk_do.style().background = "url('" + _d.popwWindowBackgroundPath_str + "')";
				
			//setup close button
			FWDEVPSimpleButton.setPrototype();
			_s.closeButton_do = new FWDEVPSimpleButton(_d.popwColseN_img, _d.popwColseSPath_str, undefined,
					true,
					_d.useHEX,
					_d.nBC,
					_d.sBC);
			_s.closeButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
			
			
			_s.title_do = new FWDEVPDO("div");
			_s.title_do.style().width = "100%";
			_s.title_do.style().textAlign = "left";
			_s.title_do.style().fontFamily = "Arial";
			_s.title_do.style().fontSize= "14px";
			_s.title_do.style().fontWeight = "100";
			_s.title_do.style().color = _s.aopwTitleColor_str;
			_s.title_do.setInnerHTML(_s.aopwTitle);
			_s.bar_do.addChild(_s.title_do);
			
			_s.addChild(_s.adBk_do);
			_s.mainBar_do.addChild(_s.bar_do);
			_s.mainBar_do.addChild(_s.closeButton_do); 
			_s.mainBar_do.setHeight(_s.closeButton_do.h);
			_s.addChild(_s.mainBar_do);
			_s.addChild(_s.adHolder_do);
			_s.bar_do.setHeight(_s.mainBar_do.h);
		};
		
		_s.closeButtonOnMouseUpHandler = function(){
			if(!_s.isShowed_bl) return;
			_s.hide();
			prt.play();
		};
		
		_s.positionAndResize = function(){
			_s.sW = Math.min(prt.sW, _s.maxWidth);
			_s.sH = Math.min(prt.sH, _s.maxHeight);
			var totalScale = 1;
			var scaleX = prt.sW/_s.maxWidth;
			var scaleY = prt.sH/_s.maxHeight;
			if(scaleX < scaleY){
				totalScale = scaleX;
			}else if(scaleX > scaleY){
				totalScale = scaleY;
			}
			if(totalScale > 1) totalScale = 1;
			
			_s.sW = totalScale * _s.maxWidth;
			_s.sH = totalScale * _s.maxHeight;
				
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
		
			_s.setHeight(_s.sH);
			_s.setX(Math.round((prt.sW - _s.sW)/2));
			_s.setY(Math.round((prt.sH - _s.sH)/2));
			
			_s.mainBar_do.setWidth(_s.sW);
			_s.closeButton_do.setX(_s.sW - _s.closeButton_do.w);
			_s.bar_do.setWidth(_s.sW - _s.closeButton_do.w - 1);
			
			_s.adBk_do.setWidth(_s.sW);
			_s.adBk_do.setHeight(_s.sH - _s.mainBar_do.h - 1);
			_s.adBk_do.setY(_s.mainBar_do.h + 1);
			
			_s.adHolder_do.setWidth(_s.sW - _s.aopwBorderSize * 2);
			_s.adHolder_do.setX(_s.aopwBorderSize);
			_s.adHolder_do.setY(_s.mainBar_do.h + _s.aopwBorderSize + 1);
			_s.adHolder_do.setHeight(_s.sH - _s.mainBar_do.h - _s.aopwBorderSize * 2 - 1);
		};
		
		
		//###########################################//
		/* show / hide */
		//###########################################//
		_s.show = function(id){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			prt.main_do.addChild(_s);
			_s.adHolder_do.setInnerHTML("<iframe width='100%' height='100%' scrolling='no' frameBorder='0' src=" + _s.aopwSource + "></iframe>");
			_s.positionAndResize();
			
			_s.title_do.setX(8);
			_s.title_do.setY(Math.round((_s.bar_do.h - _s.title_do.getHeight())/2));
		};
		
		_s.showCompleteHandler = function(){};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			if(prt.main_do.contains(_s)) prt.main_do.removeChild(_s);
		};
		
		_s.hideCompleteHandler = function(){
			prt.main_do.removeChild(_s);
			_s.dispatchEvent(FWDEVPOPWindow.HIDE_COMPLETE);
		};
		

		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			_s.closeButton_do.updateHEXColors(nBC, sBC);
		}
	
		_s.init();
	};
		
		
	/* set prototype */
	FWDEVPOPWindow.setPrototype = function(){
		FWDEVPOPWindow.prototype = new FWDEVPDO("div");
	};
	
	FWDEVPOPWindow.HIDE_COMPLETE = "hideComplete";
	
	FWDEVPOPWindow.prototype = null;
	window.FWDEVPOPWindow = FWDEVPOPWindow;
}(window));