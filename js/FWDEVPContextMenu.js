/**
 * Easy Video Player PACKAGED v8.3
 * Right click context menu.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
	var FWDEVPContextMenu = function(prt, _d){

		'use strict';
		
		var _s = this;
		var prototype = FWDEVPContextMenu.prototype;
		_s.prt = prt;
		
		_s.buttonsTest_ar = ['copy_url', 'copy_url_time', 'fullscreen'];
		_s.itemsLabels_ar = ['Copy video URL', 'Copy video URL at current time', 'Fullscreen/Normalscreen'];
		_s.items_ar = [];
		_s.spacers_ar = [];
	
	
		_s.backgroundColor_str = _d.contextMenuBackgroundColor_str;
		_s.borderColor_str = _d.contextMenuBorderColor_str;
		_s.spacerColor_str = _d.contextMenuSpacerColor_str;
		_s.itemNormalColor_str = _d.contextMenuItemNormalColor_str;
		_s.itemSelectedColor_str = _d.contextMenuItemSelectedColor_str;
		_s.itemDisabledColor_str = _d.contextMenuItemDisabledColor_str;
		_s.draggingMode_str = _d.startDraggingMode_str;
		_s.link_str = _d.link_str;
		
		_s.borderRadius = 0;
		_s.totalWidth = 400;
		_s.totalHeight = 400;
		_s.sapaceBetweenButtons = 7;
		_s.padding = 6;
		
		_s.inverseNextAndPrevRotation_bl = _d.inverseNextAndPrevRotation_bl;
		_s.showScriptDeveloper_bl = _d.showScriptDeveloper_bl;
		_s.show_bl = false;
		
		_s.init = function(){
			
			if(_s.itemsLabels_ar && _d.contextMenuType == 'default'){
				_s.show_bl = true;
				_s.setWidth(_s.totalWidth);
				_s.setHeight(_s.totalHeight);
				_s.setBkColor(_s.backgroundColor_str);
				_s.style().borderColor = _s.borderColor_str;
				_s.style().borderStyle = "solid";
				_s.style().borderRadius = _s.borderRadius + "px";
				_s.style().borderWidth = "1px";
				_s.setVisible(false);
				_s.setY(-2000);
				_s.prt.main_do.addChild(_s);
				
				_s.setupLabels();	
				_s.setupDeveloperButton();
				_s.setupSpacers();
				_s.disable();
				_s.getMaxWidthResizeAndPositionId_to = setTimeout(_s.getMaxWidthResizeAndPosition, 200);
			}
			
			if(_d.contextMenuType != 'none'){
				_s.addContextEvent();
			}
		};
		

		_s.copyText = function(str){
		 	var el = document.createElement('textarea');
		 	el.value = str;
		  	document.body.appendChild(el);
		  	el.select();
		  	document.execCommand('copy');
		  	document.body.removeChild(el);
		};
		

		//##########################################//
		/* Setup context items. */
		//##########################################//
		_s.setupLabels = function(){
			var len = _s.buttonsTest_ar.length;
			var res;
			var label1_str = "";
			var label2_str = "";
			
			if(!_s.itemsLabels_ar) return;
			
			for(var i=0; i<len; i++){
				res = _s.buttonsTest_ar[i];	
				if(res == "copy_url"){
					label1_str = _s.itemsLabels_ar[i];
					FWDEVPContextMenuButton.setPrototype();
					_s.copyURL_do = new FWDEVPContextMenuButton(label1_str, undefined, _s.itemNormalColor_str, _s.itemSelectedColor_str, _s.itemDisabledColor_str);
					_s.items_ar.push(_s.copyURL_do);
					_s.copyURL_do.addListener(FWDEVPContextMenuButton.MOUSE_DOWN, _s.copyURLHandler);
					_s.addChild(_s.copyURL_do);
				}else if(res == "copy_url_time"){
					label1_str = _s.itemsLabels_ar[i];
					FWDEVPContextMenuButton.setPrototype();
					_s.copyURLTime_do = new FWDEVPContextMenuButton(label1_str, undefined, _s.itemNormalColor_str, _s.itemSelectedColor_str, _s.itemDisabledColor_str);
					_s.items_ar.push(_s.copyURLTime_do);
					_s.copyURLTime_do.addListener(FWDEVPContextMenuButton.MOUSE_DOWN, _s.copyURLAtTimeHandler);
					_s.addChild(_s.copyURLTime_do);
				}else if(res == "fullscreen"){
					if(_d.showFullScreenButton_bl){
						var str =  _s.itemsLabels_ar[i];
						label1_str = str.substr(0, str.indexOf("/"));
						label2_str = str.substr(str.indexOf("/") + 1);
						
						FWDEVPContextMenuButton.setPrototype();
						_s.fullScreenButton_do = new FWDEVPContextMenuButton(label1_str, label2_str, _s.itemNormalColor_str, _s.itemSelectedColor_str, _s.itemDisabledColor_str);
						_s.items_ar.push(_s.fullScreenButton_do);
						_s.fullScreenButton_do.addListener(FWDEVPContextMenuButton.MOUSE_DOWN, _s.fullScreenStartHandler);
						_s.addChild(_s.fullScreenButton_do);
					}
				}
			}
		};
		
		_s.setupDeveloperButton = function(){
			if(_s.showScriptDeveloper_bl){
				if(!_s.itemsLabels_ar) _s.itemsLabels_ar = [];
				_s.itemsLabels_ar.push("&#0169; made by FWD");
				label1_str = "&#0169; made by FWD";
				FWDEVPContextMenuButton.setPrototype();
				_s.developerButton_do = new FWDEVPContextMenuButton(label1_str, undefined, _s.itemNormalColor_str, _s.itemSelectedColor_str, _s.itemDisabledColor_str);
				_s.developerButton_do.isDeveleper_bl = true;
				_s.items_ar.push(_s.developerButton_do);
				_s.addChild(_s.developerButton_do);

			}
		};
		
		_s.copyURLAtTimeHandler = function(e){
			var curTime = prt.curTime;
			if(curTime.length == 5) curTime = '00:' + curTime;
			var time_ar = String(curTime).split(':');
			for(var i=0; i<time_ar.length; i++){
				if(time_ar[i] == '00') time_ar[i] = '0';
			}
			var args = FWDEVPUtils.getHashUrlArgs(window.location.hash);
			var href = location.href;
			href = href.replace(/&evpi=.*/i, '');
			href = href.replace(/&t=.*/i, '');
			
			if(location.href.indexOf('?') == -1){
				if(FWDEVPlayer.instaces_ar.length > 1){
					curTime = href + '?&evpi=' + prt.instanceName_str;
				}else{
					curTime = href + '?';
				}
			}else{
				if(FWDEVPlayer.instaces_ar.length > 1){
					curTime = href + '&evpi=' + prt.instanceName_str;
				}else{
					curTime = href;
				}
			}

			if(curTime.indexOf('t=') == -1) curTime = curTime + '&t=' + time_ar[0] +'h' + time_ar[1] +'m' + time_ar[2] +'s';
			_s.copyText(curTime);
			_s.removeMenuId_to = setTimeout(_s.removeFromDOM, 150);
		};
		
		
		_s.copyURLHandler = function(e){
			_s.copyText(location.href);
			_s.removeMenuId_to = setTimeout(_s.removeFromDOM, 150);
		};

		//full screen.
		_s.fullScreenStartHandler = function(e){
			if(_s.fullScreenButton_do.currentState == 0){
				prt.goFullScreen();
			}else if(_s.fullScreenButton_do.currentState == 1){
				prt.goNormalScreen();
			}
			_s.fullScreenButton_do.onMOU();
		};
		
		_s.updateFullScreenButton = function(currentState){
			if(!_s.fullScreenButton_do) return;
			if(currentState == 0){
				_s.fullScreenButton_do.setButtonState(0);
			}else{
				_s.fullScreenButton_do.setButtonState(1);
			}
			_s.removeMenuId_to = setTimeout(_s.removeFromDOM, 150);
		};
		
		
		//########################################//
		/* setup sapcers */
		//########################################//
		_s.setupSpacers = function(){
			var totalSpacers = _s.items_ar.length - 1;
			var spacer_sdo;
			
			for(var i=0; i<totalSpacers; i++){
				spacer_sdo = new FWDEVPDO("div");
				_s.spacers_ar[i] = spacer_sdo;
				spacer_sdo.setHeight(1);
				spacer_sdo.setBkColor(_s.spacerColor_str);
				_s.addChild(spacer_sdo);
			};
		};
		

		//########################################//
		/* Get max width and position */
		//#######################################//
		_s.getMaxWidthResizeAndPosition = function(){
			var totalItems = _s.items_ar.length;
			var item_do;
			var spacer;
			var finalX;
			var finalY;
			_s.totalWidth = 0;
			_s.totalHeight = 0;
			for(var i=0; i<totalItems; i++){
				item_do = _s.items_ar[i];
				if(item_do.getMaxTextWidth() > _s.totalWidth) _s.totalWidth = item_do.getMaxTextWidth();
			};
			
			for(var i=0; i<totalItems; i++){
				spacer = _s.spacers_ar[i - 1];
				item_do = _s.items_ar[i];
				item_do.setX(_s.padding);
				item_do.setY(10 + (i * (item_do.totalHeight + _s.sapaceBetweenButtons)) - _s.padding);
				
				if(spacer){
					spacer.setWidth(_s.totalWidth + 2);
					spacer.setX(_s.padding);
					spacer.setY(parseInt(item_do.getY() - _s.sapaceBetweenButtons/2) - 1);
				};
				
				
				item_do.setWidth(_s.totalWidth + 2);
				item_do.centerText();
			}
			
			_s.totalHeight = item_do.getY() + item_do.totalHeight + 2;
			
			_s.setWidth(_s.totalWidth + _s.padding * 2 + 4);
			_s.setHeight(_s.totalHeight);
			
			_s.setVisible(true);
			_s.removeMenuId_to = setTimeout(_s.removeFromDOM, 150);
		};
		

		//##########################################//
		/* Add context events. */
		//##########################################//
		_s.addContextEvent = function(){
			if(_s.prt.main_do.screen.addEventListener){
				_s.prt.main_do.screen.addEventListener("contextmenu", _s.contextMenuHandler);
			}else{
				_s.prt.main_do.screen.attachEvent("oncontextmenu", _s.contextMenuHandler);
			}
		};
		
		_s.contextMenuHandler = function(e){
			if(!_s.show_bl && _d.contextMenuType != 'none'){
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}
				return;
			}
			clearTimeout(_s.removeMenuId_to);
			_s.prt.main_do.addChild(_s);

			_s.positionButtons(e);
			_s.setAlpha(0);
			FWDAnimation.to(_s, .4, {alpha:1, ease:Quart.easeOut});
			window.addEventListener("mousedown", _s.onMD);
			window.addEventListener("mouseup", _s.onMD);
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		_s.onMD = function(e){
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);
			
			var screenX =  viewportMouseCoordinates.screenX;
			var screenY =  viewportMouseCoordinates.screenY;
			
			
			if(!FWDEVPUtils.hitTest(_s.screen, screenX, screenY)){
				
				window.removeEventListener("mousedown", _s.onMD);
				window.removeEventListener("mouseup", _s.onMD);
				
				_s.removeMenuId_to = setTimeout(_s.removeFromDOM, 150);
			}
		};
	

		//####################################//
		/* position buttons */
		//####################################//
		_s.positionButtons = function(e){
		
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);
			var parentWidth = _s.prt.main_do.getWidth();
			var parentHeight = _s.prt.main_do.getHeight();
		
			var localX = viewportMouseCoordinates.screenX - _s.prt.main_do.getGlobalX();
			var localY = viewportMouseCoordinates.screenY - _s.prt.main_do.getGlobalY();
			var finalX = localX - 2;
			var finalY = localY - 2;
			_s.totalWidth = _s.getWidth();
			_s.totalHeight = _s.getHeight();
			
			if(finalX + _s.totalWidth > parentWidth - 2) finalX = localX - _s.totalWidth;
			if(finalX < 0) finalX = parseInt((parentWidth - _s.totalWidth)/2);
			if(finalX < 0) finalX = 0;
			
			if(finalY + _s.totalHeight > parentHeight - 2) finalY = localY - _s.totalHeight;
			if(finalY < 0) finalY = parseInt((parentHeight - _s.totalHeight)/2);
			if(finalY < 0) finalY = 0;
	
			_s.setX(finalX);
			_s.setY(finalY);			
		};
		

		//########################################//
		/* disable / enable */
		//########################################//
		_s.disable = function(){
			if(_s.copyURL_do) _s.copyURL_do.disable();
			if(_s.copyURLTime_do) _s.copyURLTime_do.disable();
			
		};
		
		_s.enable = function(){
			if(_s.copyURL_do) _s.copyURL_do.enable();
			if(_s.copyURLTime_do) _s.copyURLTime_do.enable();
		};
		

		//######################################//
		/* remove from DOM */
		//######################################//
		_s.removeFromDOM = function(){
			_s.setX(-5000);
		};
		
		_s.init();
	};
	
	FWDEVPContextMenu.setPrototype = function(){
		FWDEVPContextMenu.prototype = new FWDEVPDO("div");
	};
	
	
	FWDEVPContextMenu.prototype = null;
	window.FWDEVPContextMenu = FWDEVPContextMenu;
	
}(window));
