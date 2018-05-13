$(document).ready(function(){
	console.log("Document Ready");
});

/**********************************************************************************************
*
* The CTA APIs don't pass back the necessary header values for us to be able to process 
* the response as JSON in our scripts.
*
* This is a known issue related to the current browser security model 
* (disallowing insecure scripts on secure pages) and the fact that not all servers 
* deliver content via HTTPS (because it costs money to have a security certificate 
* on your site and it add some processing time for the encryption.)
*
* One workaround is to create an HTTPS page on a proxy server which makes 
* the request as HTTP to the endpoint, but delivers it as HTTPS.
*
* This is a passthrough proxy that professor Hayes made in order to 
* obtain manipulatable data from CTA API's
*
* URL is 
* https://polar-garden-75406.herokuapp.com/apiPassThru.php
*
* include your regular API endpoint as a URL param named "apiEndpoint" and include the 
* other parameters as your normally would.  Here's an example call to the "get stops" endpoint
*
* https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=
* http://ctabustracker.com/bustime/api/v2/getstops&key=<your CTA API key>&rt=49&dir=Southbound&format=json
*
* The minor difference is the documentation has a question mark after 'getstops' 
* and the proxy has an ampersand after 'getstops.'
*
* It's important to understand what the question mark ("?") represents in a URL;
* to the server, it indicates the end of the file path and the start of a set of parameters, 
* formatted as name=value pairs, with each pair separated by an ampersand ("&").
* A second question mark in the URL would confuse the parsing.
*
* Professor Haye's says:
* 
* "my pass-through script parses all the parameters passed to it and constructs a 
* server-side API request to the value of apiEndpoint, passing all the other parameters 
* as parameters to apiEndpoint.
* I could have written it to accept a URL-encoded version of the destination 
* URL as the single parameter; that's just not how I chose to do it."
* 
**********************************************************************************************/
var proxy = "https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=";

// Script for temporary drawer for the tool bar
let drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
document.querySelector('#shrine-nav-icon').addEventListener('click', () => drawer.open = true);

// given a bus/train stop name and the direction it is travelling,
// finds the stop object in the array and returns it
function findStop(stopName, direction){
	var stop;

	if (direction === "FP"){
		$.each(bluelineFP, function(i, v){
			if (v.stpnm === stopName)
				stop = v;
		});
	}
	else if (direction === "OH"){
		$.each(bluelineOH, function(i, v){
			if (v.stpnm === stopName)
				stop = v;
		});
	}
	else{
		Object.keys(busStopsArr).forEach(function(key){
			$.each(busStopsArr[key], function(i, v){
				if (v.stpnm === stopName && v.dir === direction)
					stop = v;
			});
		});
	}
	return stop;
}

/**********************************************************************************************
*
* adding action listeners to the tool bar items and the arrival screen's tab bar items
* 
**********************************************************************************************/

var timeURL = "http://ctabustracker.com/bustime/api/v2/gettime&key=ARXsvPdwAMNqNgnbMuyVreNbq&format=json";
var currentDateTime = "1996/10/24 10:00:00";

function setTime(){
	$.ajax({
    url: proxy + timeURL,
    method: 'GET',
 	}).done(function(response) {
    	response = JSON.parse(response);
    	var time = response["bustime-response"]["tm"];
    	time = insertToString(time, "/", 4);
    	time = insertToString(time, "/", 7);
    	currentDateTime = time;
    }).fail(function(err) {
	   		throw err;
   	});
}

// I did not write this function. Code can be found at:
// https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// this is a function that I found online.
// it inserts any string into another string at any desired position
// it takes in the original string as the first parameter, 
// a string that the user wants to insert into the first parameter
// a integer that defines what index of the main string the user 
// wants to insert the second string to
// the code can be found at this website:
// https://www.w3resource.com/javascript-exercises/javascript-string-exercise-14.php
function insertToString(main_string, ins_string, pos){
	if (typeof(pos) == "undefined") 
		pos = 0;
	if(typeof(ins_string) == "undefined") 
		ins_string = '';
	return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}

/**********************************************************************************************
*
* adding action listeners to the tool bar items and the arrival screen's tab bar items
* 
**********************************************************************************************/

// add action listeners to the 'arrivals', 'near me', and 'settings' navigation items in the nav bar
navListener("#arrivalsNav", "#arrivalsScreen", "#nearMeNav", "#nearMeScreen", "#settingsNav", "#settingsScreen");
navListener("#nearMeNav", "#nearMeScreen", "#arrivalsNav", "#arrivalsScreen", "#settingsNav", "#settingsScreen");
navListener("#settingsNav", "#settingsScreen", "#arrivalsNav", "#arrivalsScreen", "#nearMeNav", "#nearMeScreen");

function navListener(mainNav, mainScreen, nav2, screen2, nav3, screen3){
	$(mainNav).click(function(){
		$(mainNav).addClass("mdc-list-item--activated");
		$(nav2).removeClass("mdc-list-item--activated");
		$(nav3).removeClass("mdc-list-item--activated");

		$(mainScreen).removeClass("hide");
		$(screen2).addClass("hide");
		$(screen3).addClass("hide");

		drawer.open = false;
	});
}

// add action listeners to the 'home' and 'train' tab in the 'arrivals' screen
tabListener("#busNav", "#busTab", "#trainNav", "#trainTab");
tabListener("#trainNav", "#trainTab", "#busNav", "#busTab");

function tabListener(mainNav, mainTab, otherNav, otherTab){
$(mainNav).click(function(){
		$(mainNav).addClass("mdc-tab--active");
		$(otherNav).removeClass("mdc-tab--active");

		$(mainTab).removeClass("hide");
		$(otherTab).addClass("hide");
	});
}

/**********************************************************************************************
*
* arrivals screen - bus tab items
* 
**********************************************************************************************/

// Script for the bus route drop down select menu
const busRouteSelect = new mdc.select.MDCSelect(document.querySelector("#busRoute"));

// Script for the bus direction drop down select menu
const busDirectionSelect = new mdc.select.MDCSelect(document.querySelector("#busDirection"));

// Script for the bus stop drop down select menu
const busStopSelect = new mdc.select.MDCSelect(document.querySelector("#busStop"));

// add action listener for a change to the first drop down menu on the arrivals screen - bus tab
$("#busRoute").change(function(){
	document.getElementById("busSubmitBtn").disabled = true;
	var busRouteSelect = document.getElementById("busRouteSelect");
	// grab the value attribute of the selected route option that was clicked
	var clickedValue = busRouteSelect.options[busRouteSelect.selectedIndex].value;
	var busDirectionSelect = document.getElementById("busDirectionSelect");

	// want to keep the first option of the bus directions as this is used as the empty value
	// want to remove all the other options so you can re-populate the select box with the new data
	$('#busDirectionSelect').children('option:not(:first)').remove();

	// change the direction value options depending on what route was chosen
	// the eight bus is the only one that has North/South options
	// the rest only have East/West options
	var option = document.createElement("option");
	var option2 = document.createElement("option");

	if (clickedValue === "8") {
		option.text = "Northbound";
		option.value = "Northbound";
		busDirectionSelect.add(option);

		option2.text = "Southbound";
		option2.value = "Southbound";
		busDirectionSelect.add(option2);
	}
	else {
		option.text = "Eastbound";
		option.value = "Eastbound";
		busDirectionSelect.add(option);

		option2.text = "Westbound";
		option2.value = "Westbound";
		busDirectionSelect.add(option2);
	}

	// make sure to pre-select the first empty value of the direction select
	// every single time the route is changed in order to prevent incorrect 
	// direction being handled with the wrong route
	$("#busDirectionSelect").prop("selectedIndex",0);

	// want to keep the first option as this is used as the empty value
	// want to remove all the other options so you can re-populate the select box with the new data
	$('#busStopSelect').children('option:not(:first)').remove();
});

	// add action listener for a change to the second drop down menu on the arrivals screen - bus tab
$("#busDirection").change(function(){
	document.getElementById("busSubmitBtn").disabled = true;

	var route = document.getElementById("busRouteSelect").value;
	var dir = document.getElementById("busDirectionSelect").value;

	switch (route){
		case "7":
			if (dir === "Eastbound")
				addOptions("007E");
			else
				addOptions("007W");
			break;
		case "8":
			if (dir === "Northbound")
				addOptions("008N");
			else
				addOptions("008S");
			break;
		case "12":
			if (dir === "Eastbound")
				addOptions("012E");
			else
				addOptions("012W");
			break;
		case "60":
			if (dir === "Eastbound")
				addOptions("060E");
			else
				addOptions("060W");
			break;
		case "157":
			if (dir === "Eastbound")
				addOptions("157E");
			else
				addOptions("157W");
			break;
		default:
			console.log("error in busDirection change action listener");
	}
});

// add action listener for a change to the third drop down menu on the arrivals screen - bus tab
$("#busStop").change(function(){
	document.getElementById("busSubmitBtn").disabled = false;
});

// given the 4 digit key, function will load all the stops that belong to that key
// to the drop down select menu that has id 'busStopSelect'
function addOptions(key){
	var busStopSelect = document.getElementById("busStopSelect");

	// want to keep the first option as this is used as the empty value
	// want to remove all the other options so you can re-populate the select box with the new data
	$('#busStopSelect').children('option:not(:first)').remove();

	$.each(busStopsArr[key], function(i, v){
		var option = document.createElement("option");
		option.text = v.stpnm;
		option.value = v.stpnm;
		busStopSelect.add(option);
	});

	if (key === "007E" || key === "060E"){
		$.each(busStopsArr["SMEE"], function(i, v){
			var option = document.createElement("option");
			option.text = v.stpnm;
			option.value = v.stpnm;
			busStopSelect.add(option);
		});
	}
	else if (key === "007W" || key === "060W"){
		$.each(busStopsArr["SMEW"], function(i, v){
			var option = document.createElement("option");
			option.text = v.stpnm;
			option.value = v.stpnm;
			busStopSelect.add(option);
		});
	}
}

// To add the ink ripple effect to a button, attach a ripple instance to the button element.
// this ripple effect is attached to the button on the arrivals screen in the bus tab
mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));

// returns green, yellow, or red hex colors depending on how large 'minutes' is
function timeColor(minutes){
	if (parseInt(minutes) <= 8)
		return "#33CC33";
	else if (parseInt(minutes) <= 16)
		return "#ffff66";
	else
		return "#ff4d4d";
}

// action listener to the submit button on the arrivals screen - bus tab
$("#busSubmitBtn").click(function(){
	var busDisplayUL = document.getElementById("busResults");

	var li = document.createElement("li");
	$(li).addClass("mdc-list-item");
	$(li).css("background-color", "#E2E2E2");
	li.appendChild(document.createTextNode("Loading..."));
	busDisplayUL.appendChild(li);

	setTime();

	var route = document.getElementById("busRouteSelect").value;
	var dir = document.getElementById("busDirectionSelect").value;
	var stopName = document.getElementById("busStopSelect").value;

	var clkdStp = findStop(stopName, dir);

	var cta = "http://ctabustracker.com/bustime/api/v2/getpredictions&key=ARXsvPdwAMNqNgnbMuyVreNbq&rt=";
	var end = route + "&stpid=" + clkdStp.stpid + "&format=json";
	cta += end;
	var url = proxy + cta;

	$.ajax({
        url: url,
        method: 'GET',
     }).done(function(response) {
		    response = JSON.parse(response);

		    // if the api returned an error 
		    if (response["bustime-response"]["error"]){
		    	// clear any previously stored data in the list
				$(busDisplayUL).empty();

		    	var li = document.createElement("li");
	    		$(li).addClass("mdc-list-item");
	    		$(li).css("background-color", "#E2E2E2");
	    		li.appendChild(document.createTextNode("CTA API: No Service Scheduled"));
	    		busDisplayUL.appendChild(li);
		    }
		    else{
		    	// clear any previously stored data in the list
				$(busDisplayUL).empty();

		    	$.each(response["bustime-response"]["prd"], function(i, v){
		    		// get the predicted time for this stop, and add the 
		    		// required /'s for the Date() constructor to recongize
		    		var predictedArrival = v.prdtm;
		    		predictedArrival = insertToString(predictedArrival, "/", 4);
		    		predictedArrival = insertToString(predictedArrival, "/", 7);

		    		// calculate the amount of time it'll take for the bus to arrive
		    		var diff = Math.abs(new Date(predictedArrival) - new Date(currentDateTime));
		    		diff = millisToMinutesAndSeconds(diff);
		    		var minutes = diff.split(":")[0];

		    		// create a list item and store the time data into it
		    		var li = document.createElement("li");
	    			$(li).addClass("mdc-list-item");

		    		if (parseInt(minutes) <= 0){
		    			$(li).css("background-color", "#33CC33");
		    			li.appendChild(document.createTextNode("APPROACHING"));
		    		}
		    		else if (parseInt(minutes) < 50){
		    			$(li).css("background-color", timeColor(minutes));
		    			li.appendChild(document.createTextNode(minutes + " minutes away"));
		    		}
		    		else{
		    			$(li).css("background-color", "#E2E2E2");
		    			li.appendChild(document.createTextNode("Error: try again"));
		    		}
		    		
		    		// display the results to the user
		    		busDisplayUL.appendChild(li);
			    });
		    }
	    }).fail(function(err) {
		   		throw err;
	       });
});

/**********************************************************************************************
*
* arrivals screen - train tab items
* 
**********************************************************************************************/

// Script for the bus route drop down select menu - train tab
const trainStopSelect = new mdc.select.MDCSelect(document.querySelector("#trainStop"));

// action listener for the drop down menu on the arrivals screen - train tab
$("#trainStopSelect").change(function(){
	document.getElementById("trainSubmitBtn").disabled = false;
});

// action listener to the submit button on the arrivals screen - train tab
$("#trainSubmitBtn").click(function(){
	var trainDisplayUL = document.getElementById("trainResults");

	var li = document.createElement("li");
	$(li).addClass("mdc-list-item");
	$(li).css("background-color", "#E2E2E2");
	li.appendChild(document.createTextNode("Loading..."));
	trainDisplayUL.appendChild(li);

	setTime();

	var route = document.getElementById("trainStopSelect").value;
	var dir;
	if(document.getElementById("FP").checked)
		dir = "FP";
	else
		dir = "OH";

	var clkdStop = findStop(route, dir);

	var cta = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx&key=c10281242c88403baed503120fc7cc41&&stpid=";
	var end = clkdStop.stpid + "&outputType=JSON";
	cta += end;
	var url = proxy + cta;

	$.ajax({
        url: url,
        method: 'GET',
     }).done(function(response) {
	    	response = JSON.parse(response);
	    	
			if (response["ctatt"]["eta"]){
				// clear any previously stored data in the list
				$(trainDisplayUL).empty();

				$.each(response["ctatt"]["eta"], function(i, v){
					var predictedArrival = v.arrT;
					predictedArrival = predictedArrival.replace(/T/g, ' ');
					predictedArrival = predictedArrival.replace(/-/g, '/');

					var diff = Math.abs(new Date(predictedArrival) - new Date(currentDateTime));
		     		diff = millisToMinutesAndSeconds(diff);
		     		var minutes = diff.split(":")[0];

					// create a list item and store the time data into it
		    		var li = document.createElement("li");
	    			$(li).addClass("mdc-list-item");

		    		if (parseInt(minutes) <= 0){
		    			$(li).css("background-color", "#33CC33");
		    			li.appendChild(document.createTextNode("APPROACHING"));
		    		}
		    		else if (parseInt(minutes) < 50){
		    			$(li).css("background-color", timeColor(minutes));
		    			li.appendChild(document.createTextNode(minutes + " minutes away"));
		    		}
		    		else{
		    			$(li).css("background-color", "#E2E2E2");
		    			li.appendChild(document.createTextNode("Error: try again"));
		    		}
		    		
		    		// display the results to the user
		    		trainDisplayUL.appendChild(li);
			    });
			}
			else{
				// clear any previously stored data in the list
				$(trainDisplayUL).empty();

				var li = document.createElement("li");
	    		$(li).addClass("mdc-list-item");
	    		$(li).css("background-color", "#E2E2E2");
	    		li.appendChild(document.createTextNode("CTA API: No Service Scheduled"));
	    		trainDisplayUL.appendChild(li);
			}
	    }).fail(function(err) {
		   		throw err;
	       });
});

/**********************************************************************************************
*
* near me screen
* 
**********************************************************************************************/

// set the default location to UIC SCE
var userLocation = {lat: 41.872051, lng: -87.647735};

var flag = false;

// additional action listener for the near me button in the tool bar
$("#nearMeNav").click(function(){

	if ("geolocation" in navigator) {	
		// get the geolocation of the user
		navigator.geolocation.getCurrentPosition(function(position) {
		  	userLocation.lat = position.coords.latitude;
		  	userLocation.lng = position.coords.longitude;
		  	flag = true;
		  	initMap();
		});
	} 
	else
	  alert("geolocation IS NOT available");
});

// the variable that is the map
var map;
var zoomValue = 15;

// 2 miles radius  - 15
// 1 mile radius   - 16
// 0.5 mile radius - 17
// 0.1 mile radius - 18

// add the map to the map screen inside the div with id 'map'
function initMap() {
	var pin = userLocation;
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: zoomValue,
		center: pin
	});

	if (flag){
		var marker = new google.maps.Marker({
			position: userLocation,
			map: map,
			title: "Your Location"
		});
	}

	for (var i = 0; i < 13; i++){
		switch (i){
			case 0:
				addMarkers("007E");
				break;
			case 1:
				addMarkers("007W");
				break;
			case 2:
				addMarkers("008S");
				break;
			case 3:
				addMarkers("008N");
				break;
			case 4:
				addMarkers("012E");
				break;
			case 5:
				addMarkers("012W");
				break;
			case 6:
				addMarkers("060E");
				break;
			case 7:
				addMarkers("060W");
				break;
			case 8:
				addMarkers("157E");
				break;
			case 9:
				addMarkers("157W");
				break;
			case 10:
				addMarkers("SMEE");
				break;
			case 11:
				addMarkers("SMEW");
				break;
			case 12:
				addMarkers("BLUE");
		}
	}
}

// creates a string filled with HTML content to add to the info window for busses
function busContentString(v){
	var gMapsURL = "https://www.google.com/maps/?q=";
	var loc = v.lat + "," + v.lon;
	gMapsURL += loc;

	var contentString = 
		'<div id="content">'+
			'<h1 id="firstHeading" class="firstHeading">' + v.stpnm + '</h1>'+
			'<div id="bodyContent">'+
				'<p>' + "<strong>Route Number: </strong>" + v.rt + '</p>'+
				'<p>' + "<strong>Route Direction: </strong>" + v.dir + '</p>'+
				'<p>' + "<strong>Stop ID: </strong>" + v.stpid + '</p>'+
				'<p><a href=' + gMapsURL +'>' + 'Open in  Google Maps</a></p>'+
			'</div>'+
		'</div>';

	return contentString;
}

// creates a string filled with HTML content to add to the info window for trains
function trainContentString(v){
	var gMapsURL = "https://www.google.com/maps/?q=";
	var loc = v.lat + "," + v.lon;
	gMapsURL += loc;

	var contentString = 
		'<div id="content">'+
			'<h1 id="firstHeading" class="firstHeading">' + v.stpnm + '</h1>'+
			'<div id="bodyContent">'+
				'<p>Blue Line</p>'+
				'<p>To Forest Park</p>'+
				'<p>To O\'Hare</p>'+
				'<p><a href=' + gMapsURL +'>' + 'Open in  Google Maps</a></p>'+
			'</div>'+
		'</div>';

	return contentString;
}

// given the 4 digit key, function will add all stop locations as pins with info windows
// to the map object with unique colors
function addMarkers(key){
	if (key === "BLUE"){
		$.each(bluelineFP, function(i, v){
			var latitude = v.lat;
			var longitude = v.lon;
			var color = colors[key];
			var contentString = trainContentString(v);

			// create the marker for this stop
			var marker = new google.maps.Marker({
				position: {lat: latitude, lng: longitude},
				map: map,
				title: name,
				icon: 
				{
			        path: google.maps.SymbolPath.CIRCLE,
			        scale: 5.5,
			        fillColor: color,
			        fillOpacity: 1.0,
			        strokeWeight: 0.4
			    }
			});

			// create the info window for this stop
		    var infowindow = new google.maps.InfoWindow({
		    	content: contentString
		    });

		    // add a listener to the marker to display the info window when clicked
		    marker.addListener('click', function() {
		    	infowindow.open(map, marker);
		    });
		});
	}
	else{
		$.each(busStopsArr[key], function(i, v){
			var latitude = v.lat;
			var longitude = v.lon;
			var color = colors[key];
			var contentString = busContentString(v);

			// create the marker for this stop
			var marker = new google.maps.Marker({
				position: {lat: latitude, lng: longitude},
				map: map,
				title: name,
				icon: 
				{
			        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
			        scale: 5.5,
			        fillColor: color,
			        fillOpacity: 1.0,
			        strokeWeight: 0.4
			    }
			});

			// create the info window for this stop
	        var infowindow = new google.maps.InfoWindow({
	        	content: contentString
	        });

	        // add a listener to the marker to display the info window when clicked
	        marker.addListener('click', function() {
	        	infowindow.open(map, marker);
	        });
		});
	}
}
	
/**********************************************************************************************
*
* Settings Screen
* 
**********************************************************************************************/

// Script for the distance select menu in the settings screen
const settingsSelect = new mdc.select.MDCSelect(document.querySelector("#settingsDiv"));

// action listener for the drop down menu on the settings screen
$("#settingsSelect").change(function(){
	document.getElementById("saveChanges").disabled = false;
});

// IndexedDB
var db = new Dexie('MyTransitApp-Settings');

db.version(1).stores({
	preferences: 'id,value'
});

db.open().catch(function(err){
	console.log("Error trying to open database");
});

db.preferences.add({id:1, value:"15"});

// 2 miles radius  - 15
// 1 mile radius   - 16
// 0.5 mile radius - 17
// 0.1 mile radius - 18

// action listener to the save changes button on the settings screen
$("#saveChanges").click(function(){

	var settingsSelect = document.getElementById("settingsSelect");
	var clickedValue = settingsSelect.options[settingsSelect.selectedIndex].value;

	var saveResultUL = document.getElementById("saveResults");
	var li = document.createElement("li");
	$(li).addClass("mdc-list-item");

	db.preferences.update(1,{value:clickedValue})
		.then(function(update){
			if (update)
				li.appendChild(document.createTextNode("Preferences have been updated!"));
			else
				li.appendChild(document.createTextNode("Failed to update preferences."));
		});

	saveResultUL.appendChild(li);

	zoomValue = parseInt(clickedValue);
	initMap();
});

// Adding Service Worker
if ('serviceWorker' in navigator){
	window.addEventListener('load', function(){
		navigator.serviceWorker.register('./sw.js').then(function(registration){
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err){
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}