// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// Initialise Appcelerator Performance Management
Alloy.Globals.apm = require("com.appcelerator.apm");
Alloy.Globals.apm.init();

// Store Foursquare details in globals
Alloy.Globals.foursquareID = "50T5LY0MC350LNLMHF0GK10UDKXKFZRZWVCHSPGDN0CHKKIJ";
Alloy.Globals.foursquareSecret = "DEAFMXUDD4B4OCEQAZ255BK13WEHHKBRRM1RNWWOWGW0PDXL";

// Calculate screen real estate
if (OS_IOS) {
	Alloy.Globals.headerHeight = 50;
} else {
	Alloy.Globals.headerHeight = 40;
} 

var h = Ti.Platform.displayCaps.platformHeight;
var w = Ti.Platform.displayCaps.platformWidth;

var divider = 1;

// Fix android to get dimensions in dp
if (OS_ANDROID) {
	divider = Ti.Platform.displayCaps.dpi/160;
	
	h = h / divider;
	w = w / divider;
}

Alloy.Globals.longside = h > w ? h : w;
Alloy.Globals.shortside = h > w ? w : h;

// Calculate main space on home screen
Alloy.Globals.mainheight = (Alloy.Globals.longside - Alloy.Globals.headerHeight) * 0.75;
Ti.API.info("mainheight is " + Alloy.Globals.mainheight);