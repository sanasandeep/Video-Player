/**
 * Easy Video Player PACKAGED v8.3
 * Complex button.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
var FWDEVPComplexButton = function(
			n1Img, 
			s1Path, 
			n2Img, 
			s2Path, 
			disptachMainEvent_bl,
			useHEX,
		    nBC,
		    sBC,
			iconCSSString, 
			icon2CSSString, 
			normalCalssName,
			selectedCalssName
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDEVPComplexButton.prototype;
		
		_s.iconCSSString = iconCSSString;
		_s.icon2CSSString = icon2CSSString;
		_s.normalCalssName = normalCalssName;
		_s.selectedCalssName = selectedCalssName;
		
		_s.n1Img = n1Img;
		_s.s1Path_str = s1Path;
		_s.n2Img = n2Img;
		_s.s2Path_str = s2Path;
		
		if(_s.n1Img){
			_s.buttonWidth = _s.n1Img.width;
			_s.buttonHeight = _s.n1Img.height;
		}
		
		_s.useHEX = useHEX;
		_s.nBC = nBC;
		_s.sBC = sBC;

		_s.currentState = 1;
		_s.disptachMainEvent_bl = disptachMainEvent_bl;
		_s.isMobile_bl = FWDEVPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		_s.allowToCreateSecondButton_bl = !_s.isMobile_bl || _s.hasPointerEvent_bl;
		_s.useFontAwesome_bl = Boolean(_s.iconCSSString);
		

		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.hasT2D = false;
			_s.setButtonMode(true);
			_s.setWidth(_s.buttonWidth);
			_s.setHeight(_s.buttonHeight);
			_s.setupMainContainers();
			_s.secondButton_do.setVisible(false);
			_s.setNormalState();
		};
		

		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			if(_s.useFontAwesome_bl){
				_s.firstButton_do = new FWDEVPDO("div");
				_s.n1_do = new FWDEVPDO("div");	
				_s.n1_do.hasT3D = false;
				_s.n1_do.hasT2D = false;
				_s.n1_do.setInnerHTML(_s.iconCSSString);
				_s.firstButton_do.addChild(_s.n1_do);
				
				
				//Second button
				_s.secondButton_do = new FWDEVPDO("div");
				_s.n2_do = new FWDEVPDO("div");	
				_s.n2_do.hasT3D = false;
				_s.n2_do.hasT2D = false;
				_s.n2_do.setInnerHTML(_s.icon2CSSString);
				_s.secondButton_do.addChild(_s.n2_do);
				
				_s.setFinalSize();
				
			}else{
			
				_s.firstButton_do = new FWDEVPDO("div");
				_s.firstButton_do.setWidth(_s.buttonWidth);
				_s.firstButton_do.setHeight(_s.buttonHeight);
				
				if(_s.useHEX){
					_s.n1_do = new FWDEVPDO("div");
					_s.n1_do.setWidth(_s.buttonWidth);
					_s.n1_do.setHeight(_s.buttonHeight);
					_s.n1_sdo_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.n1Img, _s.nBC).canvas;
					_s.n1_do.screen.appendChild(_s.n1_sdo_canvas);			
				}else{
					_s.n1_do = new FWDEVPDO("img");	
					_s.n1_do.setScreen(_s.n1Img);
				}
				_s.n1_do.setAlpha(1);
				_s.firstButton_do.addChild(_s.n1_do);
				
				if(_s.allowToCreateSecondButton_bl){
					
					_s.s1_img = new Image();
					_s.s1_img.src = _s.s1Path_str;
					
					if(_s.useHEX){
						_s.s1_do = new FWDEVPDO("div");
						_s.s1_do.setWidth(_s.buttonWidth);
						_s.s1_do.setHeight(_s.buttonHeight);
						_s.s1_img.onload = function(){
							_s.s1_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.s1_img, _s.sBC).canvas;
							_s.s1_do.screen.appendChild(_s.s1_do_canvas);
						}
						_s.s1_do.setAlpha(0);
					}else{
						_s.s1_do = new FWDEVPDO("img");
						_s.s1_do.setScreen(_s.s1_img);
						_s.s1_do.setWidth(_s.buttonWidth);
						_s.s1_do.setHeight(_s.buttonHeight);
						_s.s1_do.setAlpha(0);
					}
					_s.firstButton_do.addChild(_s.s1_do);
				}
							
				//Second button
				_s.secondButton_do = new FWDEVPDO("div");
				_s.secondButton_do.setWidth(_s.buttonWidth);
				_s.secondButton_do.setHeight(_s.buttonHeight);
				
				if(_s.useHEX){
					_s.n2_do = new FWDEVPDO("div");
					_s.n2_do.setWidth(_s.buttonWidth);
					_s.n2_do.setHeight(_s.buttonHeight);
					_s.n2_sdo_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.n2Img, _s.nBC).canvas;
					_s.n2_do.screen.appendChild(_s.n2_sdo_canvas);			
				}else{
					_s.n2_do = new FWDEVPDO("img");	
					_s.n2_do.setScreen(_s.n2Img);
				}
				_s.n2_do.setAlpha(1);
				_s.secondButton_do.addChild(_s.n2_do);
				
				if(_s.allowToCreateSecondButton_bl){
					
					_s.s2_img = new Image();
					_s.s2_img.src = _s.s2Path_str;
					
					if(_s.useHEX){
						_s.s2_do = new FWDEVPDO("div");
						_s.s2_do.setWidth(_s.buttonWidth);
						_s.s2_do.setHeight(_s.buttonHeight);
						_s.s2_img.onload = function(){
							_s.s2_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(_s.s2_img, _s.sBC).canvas;
							_s.s2_do.screen.appendChild(_s.s2_do_canvas);
						}
						_s.s2_do.setAlpha(0);
					}else{
						_s.s2_do = new FWDEVPDO("img");
						_s.s2_do.setScreen(_s.s2_img);
						_s.s2_do.setWidth(_s.buttonWidth);
						_s.s2_do.setHeight(_s.buttonHeight);
						_s.s2_do.setAlpha(0);
					}
					_s.secondButton_do.addChild(_s.s2_do);
				}	
			}
			
			_s.addChild(_s.secondButton_do);
			_s.addChild(_s.firstButton_do);
			
			if(_s.hasPointerEvent_bl){
				_s.screen.addEventListener("pointerup", _s.onMUP);
				_s.screen.addEventListener("pointerover", _s.onMOV);
				_s.screen.addEventListener("pointerout", _s.onMOU);
			}else if(_s.screen.addEventListener){	
				if(!_s.isMobile_bl){
					_s.screen.addEventListener("mouseover", _s.onMOV);
					_s.screen.addEventListener("mouseout", _s.onMOU);
					_s.screen.addEventListener("mouseup", _s.onMUP);
				}
				_s.screen.addEventListener("toustart", _s.onDown);
				_s.screen.addEventListener("touchend", _s.onMUP);
			}
		};
		
		_s.onMOV = function(e, animate){
			if(_s.isDisabled_bl || _s.isSelectedState_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				_s.dispatchEvent(FWDEVPComplexButton.MOUSE_OVER, {e:e});
				_s.dispatchEvent(FWDEVPComplexButton.SHOW_TOOLTIP, {e:e});
				_s.setSelectedState(true);
			}
		};
			
		_s.onMOU = function(e){
			if(_s.isDisabled_bl || !_s.isSelectedState_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				_s.setNormalState(true);
				_s.dispatchEvent(FWDEVPComplexButton.MOUSE_OUT);
			}
		};
		
		_s.onDown = function(e){
			if(e.preventDefault) e.preventDefault();
		};
	
		_s.onMUP = function(e){
			if(_s.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			if(!_s.isMobile_bl) _s.onMOV(e, false);
			if(_s.disptachMainEvent_bl) _s.dispatchEvent(FWDEVPComplexButton.MOUSE_UP, {e:e});
		};
		
		_s.checkCount = 0;
		_s.setFinalSize = function(){
			
			clearInterval(_s.checkId_int);
			_s.lastWidth = _s.n1_do.screen.firstChild.offsetWidth;
			if(_s.checkCount > 5) return;
			_s.checkCount ++;
				
			_s.checkId_int = setInterval(function(){
				_s.setFinalSize();
			},100);
			
			if(_s.prevWidth == _s.lastWidth || _s.lastWidth == 0) return;
			var maxWidth = Math.max(_s.n1_do.screen.firstChild.offsetWidth, _s.n2_do.screen.firstChild.offsetWidth); 
			var maxHeight = Math.max(_s.n1_do.screen.offsetHeight, _s.n2_do.screen.firstChild.offsetHeight); 
			_s.buttonWidth = maxWidth;
			_s.buttonHeight = maxHeight;
			
			_s.setWidth(maxWidth);
			_s.setHeight(maxHeight);
			_s.firstButton_do.setWidth(_s.w);
			_s.firstButton_do.setHeight(_s.h);
			_s.secondButton_do.setWidth(_s.w);
			_s.secondButton_do.setHeight(_s.h);
			
			_s.n1_do.setX(Math.round((maxWidth - _s.n1_do.getWidth())/2));
			_s.n1_do.setY(Math.round((maxHeight - _s.n1_do.getHeight())/2) + 1);
			_s.n2_do.setX(Math.round((maxWidth - _s.n2_do.getWidth())/2));
			_s.n2_do.setY(Math.round((maxHeight - _s.n2_do.getHeight())/2) + 1);
		
		
			_s.prevWidth = _s.lastWidth;
		}
		

		//##############################//
		/* toggle button */
		//#############################//
		_s.toggleButton = function(){
			if(_s.currentState == 1){
				_s.firstButton_do.setVisible(false);
				_s.secondButton_do.setVisible(true);
				_s.currentState = 0;
				_s.dispatchEvent(FWDEVPComplexButton.FIRST_BUTTON_CLICK);
			}else{
				_s.firstButton_do.setVisible(true);
				_s.secondButton_do.setVisible(false);
				_s.currentState = 1;
				_s.dispatchEvent(FWDEVPComplexButton.SECOND_BUTTON_CLICK);
			}
		};
		

		//##############################//
		/* set second buttons state */
		//##############################//
		_s.setButtonState = function(state){
			if(state == 1){
				_s.firstButton_do.setVisible(true);
				_s.secondButton_do.setVisible(false);
				_s.currentState = 1; 
			}else{
				_s.firstButton_do.setVisible(false);
				_s.secondButton_do.setVisible(true);
				_s.currentState = 0; 
			}
			
		};
		
		//###############################//
		/* set normal state */
		//################################//
		_s.setNormalState = function(animate){
			if(_s.isMobile_bl && !_s.hasPointerEvent_bl && !_s.useFontAwesome_bl) return;
			_s.isSelectedState_bl = false;
			FWDAnimation.killTweensOf(_s.s1_do);
			FWDAnimation.killTweensOf(_s.s2_do);
				
			if(_s.useFontAwesome_bl){
				FWDAnimation.killTweensOf(_s.n1_do.screen);
				FWDAnimation.killTweensOf(_s.n2_do.screen);
					
				if(animate){
					FWDAnimation.to(_s.n1_do.screen, .8, {className:_s.normalCalssName, ease:Expo.easeOut});	
					FWDAnimation.to(_s.n2_do.screen, .8, {className:_s.normalCalssName, ease:Expo.easeOut});
				}else{
					_s.n1_do.screen.className = _s.normalCalssName;
					_s.n2_do.screen.className = _s.normalCalssName;
				}
			}else{
				FWDAnimation.to(_s.s1_do, .5, {alpha:0, ease:Expo.easeOut});	
				FWDAnimation.to(_s.s2_do, .5, {alpha:0, ease:Expo.easeOut});
			}
		};
		
		_s.setSelectedState = function(animate){
			_s.isSelectedState_bl = true;
			FWDAnimation.killTweensOf(_s.s1_do);
			FWDAnimation.killTweensOf(_s.s2_do);
			
			if(_s.useFontAwesome_bl){
				
					FWDAnimation.killTweensOf(_s.n1_do.screen);
					FWDAnimation.killTweensOf(_s.n2_do.screen);
					if(animate){
						FWDAnimation.to(_s.n1_do.screen, .8, {className:_s.selectedCalssName, ease:Expo.easeOut});	
						FWDAnimation.to(_s.n2_do.screen, .8, {className:_s.selectedCalssName, ease:Expo.easeOut});	
					}else{
						_s.n1_do.screen.className = _s.selectedCalssName;
						_s.n2_do.screen.className = _s.selectedCalssName;
					}
			}else{
				
				FWDAnimation.to(_s.s1_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
				FWDAnimation.to(_s.s2_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			}
		};
		
		_s.disable = function(){
			if(_s.isDisabled_bl) return;
			_s.isDisabled_bl = true;
			_s.setButtonMode(false);
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, .6, {alpha:.4});
			_s.setNormalState();
		};
		
		_s.enable = function(){
			if(!_s.isDisabled_bl) return;
			_s.isDisabled_bl = false;
			_s.setButtonMode(true);
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, .6, {alpha:1});
		};

		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			FWDEVPUtils.changeCanvasHEXColor(_s.n1Img, _s.n1_sdo_canvas, nBC);
			FWDEVPUtils.changeCanvasHEXColor(_s.s1_img, _s.s1_do_canvas, sBC);
			FWDEVPUtils.changeCanvasHEXColor(_s.n2Img, _s.n2_sdo_canvas, nBC);
			FWDEVPUtils.changeCanvasHEXColor(_s.s2_img, _s.s2_do_canvas, sBC);
		}
		
		_s.init();
	};
	
	
	/* set prototype */
	FWDEVPComplexButton.setPrototype = function(){
		FWDEVPComplexButton.prototype = new FWDEVPDO("div");
	};
	
	FWDEVPComplexButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDEVPComplexButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDEVPComplexButton.MOUSE_OVER = "onMOV";
	FWDEVPComplexButton.MOUSE_OUT = "onMOU";
	FWDEVPComplexButton.MOUSE_UP = "onMUP";
	FWDEVPComplexButton.CLICK = "onClick";
	FWDEVPComplexButton.SHOW_TOOLTIP = "showTooltip";
	
	FWDEVPComplexButton.prototype = null;
	window.FWDEVPComplexButton = FWDEVPComplexButton;
}(window));