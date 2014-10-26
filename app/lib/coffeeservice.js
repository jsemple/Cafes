exports.fetchCoffee = function(callback, errcallback) {
	var id = Alloy.Globals.foursquareID;
	var secret = Alloy.Globals.foursquareSecret;
	
	// Record action
	Ti.Analytics.fireEvent("coffee-request");
	
	// Get my geo data
	Ti.Geolocation.getCurrentPosition(function(results) {
		if (results.success || ENV_DEV) {
			var lat = null;
			var lon = null;
			
			if (ENV_DEV) {
				// Fake coordinates for simulator/emulators
				lat = 51.4477550;  
				lon = -0.9132640; 
			} else {
				// Get coordinates from geoloc
				lat = results.coords.latitude;
				lon = results.coords.longitude;
			}
			
			Ti.API.info(JSON.stringify(results));
			
			// Make call to FourSquare RESTful API
			var url = "https://api.foursquare.com/v2/venues/search" +
					  "?client_id=" + id + 
					  "&client_secret=" + secret +
					  "&v=20141024" + 
					  "&ll=" + lat + "," + lon +
					  "&query=coffee" +
					  "&limit=10";
			
			
			var client = Ti.Network.createHTTPClient({
				// function called when the response data is available
			    onload : function(e) {
			    	Ti.API.info("Received text: " + this.responseText);
			        // Pass data to callback
					callback(JSON.parse(this.responseText));	
			    },
			    // function called when an error occurs, including a timeout
			    onerror : function(e) {
			    	Ti.API.debug(e.error);
			        errcallback(e.error);
			    },
			    timeout : 5000  // in milliseconds
			});
			// Prepare the connection.
			client.open("GET", url);
			// Send the request.
			client.send();
		}
		else {
			// Could not get geolocation
			errcallback(results.error);
		}
	});
};

exports.getDetails = function(venueId, callback, errcallback) {
	var id = Alloy.Globals.foursquareID;
	var secret = Alloy.Globals.foursquareSecret;
	
	// Record action
	Ti.Analytics.fireEvent("coffee-details-request");
	
	var url = "https://api.foursquare.com/v2/venues/" + venueId +
			  "?client_id=" + id + 
			  "&client_secret=" + secret +
			  "&v=20141024";
	
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	        // Pass data to callback
			callback(JSON.parse(this.responseText));	
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	    	Ti.API.debug(e.error);
	        errcallback(e.error);
	    },
	    timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
};