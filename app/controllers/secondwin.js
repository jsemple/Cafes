var cafe = arguments[0] || {};

Ti.API.info(JSON.stringify(cafe));

// STARTUP CODE
var ll = cafe.lat + "," + cafe.lng;
$.staticMap.addEventListener('postlayout', setMap);

getDetails();


function closewin(evt){
	$.secondwin.close();
}

function doopen(evt){
	if (OS_ANDROID){
		var abx=require('com.alcoapps.actionbarextras');
		abx.setBackgroundColor('#332413');
		abx.setColor("#fff");
	}
	
	$.secondwin.title = cafe.name;
}

function setMap() {
	// Only want to do this once!!
	$.staticMap.removeEventListener('postlayout', setMap);
	
	var mapHeight = $.staticMap.size.height;
	var mapWidth = $.staticMap.size.width;
	
	Ti.API.info(ll);
	
	$.staticMap.image = "https://maps.googleapis.com/maps/api/staticmap?size=" + mapWidth + "x" + mapHeight + "&markers=" + ll;
	Ti.API.info($.staticMap.image.toString());
}

function getDetails() {
	// Call Foursquare VENUES API to grab venue details
	require('coffeeservice').getDetails(cafe.id, fillDetails, handleError);
}

function buildButtonBar() {
	if(OS_IOS) {
		// Add event handler to Apple Maps
		$.appleMapButton.addEventListener('click', function() {
			alert("You clicked this button!");
			Ti.Platform.openURL("http://maps.apple.com/?ll=" + ll);
		});
		
		// Check for Native Google Maps
		if (Ti.Platform.canOpenURL("comgooglemaps://")) {
			$.googleMapButton.addEventListener('click', function() {
				Ti.Platform.openURL("comgooglemaps://?center=" + ll + "&zoom=14");
			});
		} else {
			$.googleMapButton.addEventListener('click', function() {
				Ti.Platform.openURL("https://maps.google.com/maps?ll=" + ll + "&z=14");
			});
		}
		$.buttonBar.visible = true;
	} else if (OS_ANDROID) {
		$.buttonBar.remove($.appleMapButton);
		
		$.googleMapButton.addEventListener('click', function() {
			Ti.Platform.openURL("https://maps.google.com/maps?ll=" + ll + "&z=14");
			
			/*
			var intent = Ti.Android.createIntent({
			    action: Ti.Android.ACTION_VIEW,
			    data: "geo:" + ll + "z=14"
			});
			intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
			Ti.Android.currentActivity.startActivity(intent);
			*/
		});
		
		$.buttonBar.visible = true;
	}
}

function fillDetails(data) {
	Ti.API.info(data);
	$.address.text = data.response.venue.location.formattedAddress.join("\n");
	
	buildButtonBar();
}

function handleError(err) {
	$.address.text = "err";
}