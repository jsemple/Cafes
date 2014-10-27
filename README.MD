# Cafes

Welcome to the Cafes app - finding the nearest coffee shop to you!

This app leans heavily upon: -

Ricardo Alcocer's cross-platform navigation template ... <https://github.com/ricardoalcocer/AlloyAppTemplate>  
The FourSquare API     <https://developer.foursquare.com/start>  
Google Static Map API  <https://developers.google.com/maps/documentation/staticmaps/>  


## QUICKSTART GUIDE TO THE CODE
Index does nothing except open the platform specific home.xml files which in turn require sharedhome.xml.
This allows us to keep the iOS navigation window component separate and means sharedhome is largely consistent
across both platforms. 

The main business logic is in home.js and secondwin.js. Both of these leverage functionality in lib/coffeeservice.js. 

Alloy.js uses some FourSquare API keys. It would be nice if people created their own keys and used them but for casual
usage of the app (i.e. demos, etc) there should be no problem with everyone using my keys for the time being.


## USING THE APP
The app is simplicity itself: the first page takes the current location and queries for nearby coffee shops. It brings
back a list of coffee shop names and distances (arbitrarily limited to the first 10). Clicking on any of these list items
will take you to a detail page featuring a map and address of the shop. You can further link out to external map apps
such as Apple Maps or Google Maps.


## TO DO
So this was done across a weekend and I had to be pragmatic in terms of what I had time to work on. There are plenty of
features I wanted to add and didn't get the time for.

1. Pull to refresh on the home page
2. Embedded map functionality (in addition to external map functionality)
3. Saving favourites locally
4. Integrating the ACS Places API (plus possibly Reviews as well)
5. Sharing mechanisms (email, Twitter, FB, messages, Push Notifications, etc)


Cheers

James Semple
Oct 2014


----------------------------------
Stuff our legal folk make us say:

Appcelerator, Appcelerator Titanium and associated marks and logos are 
trademarks of Appcelerator, Inc. 

Titanium is Copyright (c) 2008-2013 by Appcelerator, Inc. All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the LICENSE file for the full license.

