/**
 * Easy Video Player PACKAGED v8.3
 * Opener for the sticky display.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
	var FWDEVPOpener = function(prt, _d, position_str, playerIsShowed_bl){

		'use strict';
		
		var _s = this;
		
		_s.animation_img = _d.openerAnimation_img;
		
		if(position_str ==  FWDEVPlayer.POSITION_TOP){
			_s.openN_img = _d.openTopN_img;
			_s.openSPath_str = _d.openTopSPath_str;		
		}else{
			_s.openN_img = _d.openBottomN_img;
			_s.openSPath_str = _d.openBottomSPath_str;
		}
	
		_s.openerPauseN_img = _d.openerPauseN_img;
		_s.openerPlayN_img = _d.openerPlayN_img;
		_s.closeN_img = _d.closeN_img;
		
		_s.useHEX = _d.useHEX; 
		_s.nBC = _d.nBC;
		_s.sBC = _d.sBC;
		
		_s.openerPauseS_str = _d.openerPauseS_str;
		_s.openerPlaySPath_str = _d.openerPlayS_str;
		_s.closeSPath_str = _d.closeSPath_str;
		_s.animationPath_img = _d.animationPath_img;
	
		_s.totalWidth = _s.openN_img.width;
		_s.totalHeight = _s.openN_img.height;
		_s.position_str = position_str;
		_s.alignment_str = _d.openerAlignment_str;
		
		_s.openerEqulizerOffsetLeft = _d.openerEqulizerOffsetLeft; 
		_s.openerEqulizerOffsetTop = _d.openerEqulizerOffsetTop;
		
		_s.showFirstTime_bl = true;
		_s.playerIsShowed_bl = playerIsShowed_bl;
		_s.showOpenerPlayPauseButton_bl = _d.showOpenerPlayPauseButton_bl;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		
		_s.init = function(){
			if(_d.sknPth.indexOf("hex_white") != -1){
				_s.sBC = "#FFFFFF";
			}else{
				_s.sBC = _d.sBC;
			}
			_s.hasT3D = false;
			_s.hasT2D = false;
			_s.setBackfaceVisibility();
			_s.style().msTouchAction = "none";
			_s.style().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
			_s.setupStuff();
			if(_s.showOpenerPlayPauseButton_bl) _s.setupPlayPauseButton();
		
			if(_s.playerIsShowed_bl) _s.showCloseButton();
			if(_s.showOpenerPlayPauseButton_bl){
				_s.setWidth(_s.totalWidth + _s.openerPauseN_img.width + 1);
			}else{
				_s.setWidth(_s.totalWidth);
			}
			_s.setHeight(_s.totalHeight);
		};
	

		//######################################//
		/* setup main stuff */
		//######################################//
		_s.setupStuff = function(e){
			_s.mainHolder_do = new FWDEVPDO("div");
			_s.mainHolder_do.hasT3D = false;
			_s.mainHolder_do.hasT2D = false;
			_s.mainHolder_do.setBackfaceVisibility();
			
			if(_s.showOpenerPlayPauseButton_bl){
				_s.mainHolder_do.setWidth(_s.totalWidth + _s.openerPauseN_img.width + 1);
			}else{
				_s.mainHolder_do.setWidth(_s.totalWidth);
			}
			_s.mainHolder_do.setHeight(_s.totalHeight);
			
			if(_s.useHEX){
				_s.openN_do = new FWDEVPDO("div");
				_s.openN_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.openN_img, _s.nBC).canvas;
				_s.openN_do.screen.appendChild(_s.openN_canvas);
			}else{
				_s.openN_do = new FWDEVPDO("img");
				_s.openN_do.setScreen(_s.openN_img);
			}
			_s.openN_do.setWidth(_s.openN_img.width);
			_s.openN_do.setHeight(_s.openN_img.height);
			
			
			_s.openS_img = new Image();
			_s.openS_img.src = _s.openSPath_str;	
			if(_s.useHEX){
				_s.openS_do = new FWDEVPDO("div");
				_s.openS_img.onload = function(){		
					_s.openS_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.openS_img, _s.sBC).canvas;
					_s.openS_do.setWidth(_s.openS_img.width);
					_s.openS_do.setHeight(_s.openS_img.height);
					_s.openS_do.screen.appendChild(_s.openS_canvas);
				}					
			}else{
				_s.openS_do = new FWDEVPDO("img"); 
				_s.openS_do.setScreen(_s.openS_img);
			}
			_s.openS_do.setWidth(_s.openN_do.w);
			_s.openS_do.setHeight(_s.openN_do.h);
			_s.openS_do.setAlpha(0);
			
			
			if(_s.useHEX){
				_s.closeN_do = new FWDEVPDO("div");
				_s.closeN_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.closeN_img, _s.nBC).canvas;
				_s.closeN_do.screen.appendChild(_s.closeN_canvas);
			}else{
				_s.closeN_do = new FWDEVPDO("img");
				_s.closeN_do.setScreen(_s.closeN_img);
			}
			_s.closeN_do.setWidth(_s.closeN_img.width);
			_s.closeN_do.setHeight(_s.closeN_img.height);
			
			_s.closeN_do.hasT3D = false;
			_s.closeN_do.hasT2D = false;
			_s.closeN_do.setBackfaceVisibility();
			
			_s.closeS_img = new Image();
			_s.closeS_img.src = _s.closeSPath_str;	
			if(_s.useHEX){
				_s.closeS_do = new FWDEVPDO("div");
				_s.closeS_img.onload = function(){		
					_s.closeS_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.closeS_img, _s.sBC).canvas;
					_s.closeS_do.setWidth(_s.closeN_img.width);
					_s.closeS_do.setHeight(_s.closeN_img.height);
					_s.closeS_do.screen.appendChild(_s.closeS_canvas);
				}					
			}else{
				_s.closeS_do = new FWDEVPDO("img"); 
				_s.closeS_do.setScreen(_s.closeS_img);
			}
			
			_s.closeS_do.setWidth(_s.closeN_img.width);
			_s.closeS_do.setHeight(_s.closeN_img.height);
			
			_s.closeS_do.setAlpha(0);
			_s.closeS_do.hasT3D = false;
			_s.closeS_do.hasT2D = false;
			
			
			FWDEVPPreloader2.setPrototype();
			_s.animation_do = new FWDEVPPreloader2(_s.animationPath_img, 29, 22, 31, 80, true);
			_s.animation_do.setY(_s.openerEqulizerOffsetTop);
			_s.animation_do.show(false);
			_s.animation_do.stop();
			
			_s.dumy_do = new FWDEVPDO("div");
			_s.dumy_do.setWidth(_s.totalWidth);
			_s.dumy_do.setHeight(_s.totalHeight);
			_s.dumy_do.style().zIndex = 2;
			_s.dumy_do.hasT3D = false;
			_s.dumy_do.hasT2D = false;
			_s.dumy_do.setBackfaceVisibility();
			_s.dumy_do.setButtonMode(true);
			
			if(FWDEVPUtils.isIE || FWDEVPUtils.isAndroid){
				_s.dumy_do.setBkColor("#FF0000");
				_s.dumy_do.setAlpha(.01);
			}
		
			
			if(_s.hasPointerEvent_bl){
				_s.mainHolder_do.screen.addEventListener("pointerup", _s.onMouseUp);
				_s.mainHolder_do.screen.addEventListener("pointerover", _s.onMouseOver);
				_s.mainHolder_do.screen.addEventListener("pointerout", _s.onMouseOut);
			}else if(_s.screen.addEventListener){	
				if(!_s.isMobile_bl){
					_s.mainHolder_do.screen.addEventListener("mouseover", _s.onMouseOver);
					_s.mainHolder_do.screen.addEventListener("mouseout", _s.onMouseOut);
					_s.mainHolder_do.screen.addEventListener("mouseup", _s.onMouseUp);
				}
				_s.screen.addEventListener("touchend", _s.onMouseUp);
			}
			
			_s.mainHolder_do.addChild(_s.openN_do);
			_s.mainHolder_do.addChild(_s.openS_do);
			
			_s.mainHolder_do.addChild(_s.closeN_do);
			_s.mainHolder_do.addChild(_s.closeS_do);
			_s.mainHolder_do.addChild(_s.animation_do);
			_s.mainHolder_do.addChild(_s.dumy_do);
			_s.addChild(_s.mainHolder_do);
		};
		
		_s.onMouseOver = function(e, animate){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				_s.setSelectedState();
			}
		};
			
		_s.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				_s.setNormalState();
			}
		};
		
		_s.onMouseUp = function(e){
			if(e.preventDefault) e.preventDefault();
			if(_s.playerIsShowed_bl){
				_s.playerIsShowed_bl = false;
				_s.dispatchEvent(FWDEVPOpener.HIDE);
			}else{
				_s.playerIsShowed_bl = true;
				_s.dispatchEvent(FWDEVPOpener.SHOW);
			}
		};
		

		//################################################//
		/* Setup play button */
		//################################################//
		_s.setupPlayPauseButton = function(){
			FWDEVPComplexButton.setPrototype();
			_s.playPauseButton_do = new FWDEVPComplexButton(
					_s.openerPlayN_img,
					_s.openerPlaySPath_str,
					_s.openerPauseN_img,
					_s.openerPauseS_str,
					true,
					_s.useHEX,
					_s.nBC,
					_s.sBC
			);
			_s.playPauseButton_do.addListener(FWDEVPComplexButton.MOUSE_UP, _s.playButtonMouseUpHandler);
			_s.addChild(_s.playPauseButton_do);
		};
		
		_s.showPlayButton = function(){
			if(_s.playPauseButton_do) _s.playPauseButton_do.setButtonState(1);
			_s.animation_do.stop();
		};
		
		_s.showPauseButton = function(){
			if(_s.playPauseButton_do) _s.playPauseButton_do.setButtonState(0);
			_s.animation_do.start(0);
		};
		
		_s.playButtonMouseUpHandler = function(){
			if(_s.playPauseButton_do.currentState == 0){
				_s.dispatchEvent(FWDEVPController.PAUSE);
			}else{
				_s.dispatchEvent(FWDEVPController.PLAY);
			}
		};
		

		//###############################//
		/* set normal / selected state */
		//################################//
		_s.setNormalState = function(){
			if(_s.isMobile_bl && !_s.hasPointerEvent_bl) return;
			FWDAnimation.killTweensOf(_s.openS_do);
			FWDAnimation.killTweensOf(_s.closeS_do);
			FWDAnimation.to(_s.openS_do, .5, {alpha:0, ease:Expo.easeOut});	
			FWDAnimation.to(_s.closeS_do, .5, {alpha:0, ease:Expo.easeOut});
		};
		
		_s.setSelectedState = function(animate){
			FWDAnimation.killTweensOf(_s.openS_do);
			FWDAnimation.killTweensOf(_s.closeS_do);
			FWDAnimation.to(_s.openS_do, .5, {alpha:1, ease:Expo.easeOut});	
			FWDAnimation.to(_s.closeS_do, .5, {alpha:1, ease:Expo.easeOut});
		};
		

		//######################################//
		/* show /hide close / open */
		//######################################//
		_s.showOpenButton = function(){
			_s.playerIsShowed_bl = false;
			_s.closeN_do.setX(150);
			_s.closeS_do.setX(150);
			
			if(_s.playPauseButton_do){
				if(_s.alignment_str == "right"){
					_s.playPauseButton_do.setX(0);
					_s.openN_do.setX(_s.playPauseButton_do.w + 1);
					_s.openS_do.setX(_s.playPauseButton_do.w + 1);
					_s.dumy_do.setX(_s.playPauseButton_do.w + 1);
					_s.dumy_do.setWidth(_s.totalWidth);
					_s.animation_do.setX(_s.playPauseButton_do.w + 1 + _s.openerEqulizerOffsetLeft);
				}else{
					_s.playPauseButton_do.setX(_s.openN_do.w + 1);
					_s.openN_do.setX(0);
					_s.openS_do.setX(0);
					_s.dumy_do.setX(0);
					_s.dumy_do.setWidth(_s.totalWidth);
					_s.animation_do.setX(_s.openerEqulizerOffsetLeft);
				}
			}else{
				_s.openN_do.setX(0);
				_s.openS_do.setX(0);
				_s.dumy_do.setX(0);
				_s.dumy_do.setWidth(_s.totalWidth);
				_s.animation_do.setX(_s.openerEqulizerOffsetLeft);
			}
			_s.animation_do.setVisible(true);
		};
		
		_s.showCloseButton = function(){
			_s.playerIsShowed_bl = true;
			_s.openN_do.setX(150);
			_s.openS_do.setX(150);
			_s.dumy_do.setWidth(_s.closeN_do.w);
			if(_s.alignment_str == "right"){
				if(_s.playPauseButton_do){
					_s.closeN_do.setX(_s.totalWidth + 1);
					_s.closeS_do.setX(_s.totalWidth + 1);
					_s.dumy_do.setX(_s.totalWidth + 1);
				}else{
					_s.closeN_do.setX(_s.totalWidth - _s.closeN_do.w);
					_s.closeS_do.setX(_s.totalWidth - _s.closeN_do.w);
					_s.dumy_do.setX(_s.totalWidth - _s.closeN_do.w);
				}
			}else{
				_s.closeN_do.setX(0);
				_s.closeS_do.setX(0);
				_s.dumy_do.setX(0);
			}
			
			if(_s.playPauseButton_do) _s.playPauseButton_do.setX(150);
			_s.animation_do.setX(150);
			_s.animation_do.setVisible(false);
		};
		
		_s.hide = function(){
			_s.mainHolder_do.setX(150);
		};
		
		_s.show = function(){
			_s.mainHolder_do.setX(0);
		};
		

		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			
			_s.nBC = nBC;
			_s.sBC = sBC;
			_s.playPauseButton_do.updateHEXColors(nBC, sBC);
			FWDEVPUtils.changeCanvasHEXColor(_s.openN_img, _s.openN_canvas, nBC);
			FWDEVPUtils.changeCanvasHEXColor(_s.closeN_img, _s.closeN_canvas, nBC);
			
			FWDEVPUtils.changeCanvasHEXColor(_s.openS_img, _s.openS_canvas, sBC);
			FWDEVPUtils.changeCanvasHEXColor(_s.closeS_img, _s.closeS_canvas, sBC);
		}
		
		_s.init();
	};
	

	/* set prototype */
	FWDEVPOpener.setPrototype = function(){
		FWDEVPOpener.prototype = new FWDEVPDO("div");
	};
	
	FWDEVPOpener.SHOW = "show";
	FWDEVPOpener.HIDE = "hise";
	FWDEVPOpener.PLAY = "play";
	FWDEVPOpener.PAUSE = "pause";
	
	
	FWDEVPOpener.prototype = null;
	window.FWDEVPOpener = FWDEVPOpener;
	
}(window));