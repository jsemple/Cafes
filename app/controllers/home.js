/*
Even though your Views are platform-specific, you can still keep your controllers cross-platform.
This controller will be used for your home View regardless of the platform, so you'll have to 
manually check in case you need to perform platform-specific operations
*/

var args = arguments[0] || {};

var moment = require("alloy/moment");

var cafes = [];
var tbl = $.sharedhome.getView('coffeeTable');
var status = $.sharedhome.getView('status');
var info = $.sharedhome.getView('info');
var banner = $.sharedhome.getView('softBanner');
var refresh = $.sharedhome.getView('refreshImg');

banner.addEventListener('dblclick', autoScroll);
info.addEventListener('dblclick', autoScroll);
tbl.addEventListener('click', tableClick);
refresh.addEventListener('click', getCoffee);

// Special table scroll handling for iOS
if (OS_IOS) {
	tbl.addEventListener('scroll', doScroll);
}


function doOpen(evt){
	if (OS_ANDROID){
		// Sort out action bar properties here
		var abx=require('com.alcoapps.actionbarextras');
		abx.setBackgroundColor('#332413');
		abx.setColor('#fff');
	}
	
	getCoffee();
}

function doadd(evt){
	if (OS_IOS){
		$.nav.openWindow(Alloy.createController('secondwin').getView());
	} else if (OS_ANDROID){
		Alloy.createController('secondwin').getView().open();
	}
}

function statusUpdated() {
	status.text = "Last updated at " + moment().format('MMMM Do YYYY, h:mm:ss a');
	Ti.API.info(status.text);
}

function getCoffee() {
	// Set info message
	info.text = "Searching...";
	
	// Clear results table
	tbl.data = [];
	
	// Get local coffee shops!
	Ti.API.info("calling coffeeservice!!");
	require('coffeeservice').fetchCoffee(fillTable, handleError);
}

function autoScroll() {
	// Auto scroll table to bottom unless it's already at the bottom
	// in which case scroll back to top
	var i = _.size(cafes);
	
	if (i > 0) {
		tbl.scrollToIndex(i-1);
		
		if (OS_IOS) { 
			var obj = { contentOffset: { y: 30 } };
			doScroll(obj);
		}
	}
}

function tableClick(o) {
	// If they have clicked a row then we open the relevant detail page
	Ti.API.info(o.index);
	var cafe = cafes[o.index];
	
	var detail = Alloy.createController('secondwin', cafe).getView();
	
	// Open detail window
	if (OS_IOS){
		$.nav.openWindow(detail);
	}else if (OS_ANDROID){
		detail.open();
	}
}

function doScroll(obj) {
	// Blur effect on iOS
	if (OS_IOS) {
		var blurImg = $.sharedhome.getView('blurImg');
		var maxOffset = 30;
		if (obj.contentOffset.y <= 0) {
			blurImg.opacity = 0;
		} else if (obj.contentOffset.y >= maxOffset) {
			blurImg.opacity = 1;
		} else {
			blurImg.opacity = obj.contentOffset.y/maxOffset;
		}
	}
}

function fillTable(data) {
	cafes = [];
	
	tbl.data = _.map(data.response.venues, 
					 function(value) { 
					 	var newRow = { 
					 		title: "  " + value.name + "  (" + value.location.distance + "m)",
					 		left: 0, 
					 		color: "white",
					 		height: 45,
					 		width: "100%",
					 		backgroundGradient: {
					 			type: 'linear',
					 			startPoint: { x: '0%', y: '50%' },
					 			endPoint: { x: '100%', y: '50%' },
					 			colors: [ { color: "#55000000", offset: 0.2 }, { color: "#00000000", offset: 0.8 } ] 
					 		} 
					 	};
					 	
					 	var cafe = _.pick(value, 'id', 'name');
					 	cafe.distance = value.location.distance;
					 	cafe.lat = value.location.lat;
					 	cafe.lng = value.location.lng;
					 	cafes.push(cafe);
					 	
					 	return newRow; 
					 });
					
	var count = _.size(data.response.venues);
	
	if (count < 1) {
		info.text = "No coffee houses nearby";
	} else {
		info.text = "Nearest " + count + " coffee houses";
	}
	
	statusUpdated();
}

function handleError(err) {
	info.text = err;
}