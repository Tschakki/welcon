var map;
var ajaxRequest;

var plotlayers=[];
var JsonPlots;
localStorage.setItem("markerSet","false");
function initmap(callback) {
    $.getJSON('data/dummy.json', function(response){
           JsonPlots = response;
    
    
    	/*var map = L.map('map').setView([52.52113, 13.38577], 5);
	L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
		attribution: false,
		maxZoom: 17
	}).addTo(map);
	var marker = L.marker([52.52113, 13.38577]).addTo(map);
	marker.bindPopup("Berlin");
    map.setView(new L.LatLng(52.52113, 13.38577),9);*/
	
        // set up the map
        map = new L.Map('map');

        // create the tile layer with correct attribution
        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        //var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 30, attribution: osmAttrib});		
        L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
            attribution: false,
            minZoom: 1,
            maxZoom: 17
        }).addTo(map);

        // start the map in Berlin
        map.setView(new L.LatLng(52.52113, 13.38577),11);
        //map.addLayer(osm);
        console.dir(JsonPlots);
        stateChanged(JsonPlots);
        map.on('moveend', onMapMove);
        map.on('click', addMarker);
        function onMapMove(e) { stateChanged(JsonPlots); }
    });
    setTimeout(callback, 500);
    
}

function showMap(callback) {
    //get all entries in db, to display their markers on te map
    var entryArray;
    entryArray = ajaxREAD("","location");
//$.getJSON('data/dummy.json', function(response){
    //JsonPlots = response;
    JsonPlots = "";
	
        // set up the map
        map = new L.Map('map');

        // create the tile layer with correct attribution
        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        //var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 30, attribution: osmAttrib});		
        L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
            attribution: false,
            minZoom: 1,
            maxZoom: 17
        }).addTo(map);

        // start the map in Berlin
        map.setView(new L.LatLng(52.52113, 13.38577),11);
        //map.addLayer(osm);
        //console.dir(JsonPlots);
 //stateChanged(JsonPlots);
        map.on('moveend', onMapMove);
        map.on('click', addMarker);
    //statt jsonplots richtige eintrge aus DB anzeigen, sofern vorhanden
        function onMapMove(e) { stateChanged(JsonPlots); }
//});
    setTimeout(callback, 500);
    
}

function ajaxREAD (entryID, actionID) {
        localStorage.setItem("selectedEntry", entryID);
        console.log("entryID: " + entryID);
        var find = new Object();
        find._id = entryID;
        find.actionID = actionID;

        var promise = $.ajax({
            type: "POST",
            url: "db/read.php",
            data: {
                find: JSON.stringify(find),
            },
            success: function (data) {
    console.log("ERFOLG!!");
                /*var response = $.parseJSON(data);*/
                if (data.status) {
                    swal({
                                title: "Erfolg",
                                text: 'Lesen von ' + localStorage.getItem('selectedEntry') + ' erfolgreich!',
                                type: "success"
                            }, function () {
                        location.reload();
                    });
                    $.notify({
                        message: 'Lesen von ' + localStorage.getItem('selectedEntry') + ' erfolgreich!'
                    }, {
                        type: 'success'
                    });
                    //                     alert("true: "+response.data);
                } else {
                    //                      alert("false: "+response.data);
                    $.notify({
                        message: 'Lesen von ' + localStorage.getItem('selectedEntry') + ' nicht erfolgreich!'
                    }, {
                        type: 'warning'
                    });
                }
            },
        });
    }
var newMarker;
function addMarker(e){
    if (localStorage.getItem("markerSet") == "false") {
        
        // Add marker to map at click location; add popup window
        newMarker = new L.marker(e.latlng).addTo(map);
        console.dir(newMarker);
        localStorage.setItem("markerSet","true");
        localStorage.setItem("lat",e.latlng.lng.toString());
        localStorage.setItem("lon",e.latlng.lat.toString());
        
/*        marker.on('dragend', function(event){
            var marker = event.target;
            var position = marker.getLatLng();
            alert(position);
            marker.setLatLng([position],{id:uni,draggable:'true'}).bindPopup(position).update();
    });*/

        var newEntry = {
                 "name": "new marker",
                 "lon": e.latlng.lng.toString(),
                 "lat": e.latlng.lat.toString(),
                 "details": "the details",
                 image: "res/dog.jpg"
             }
        //JsonPlots.push(newEntry);
    } else {
        var lat = (e.latlng.lat);
        var lng = (e.latlng.lng);
        var newLatLng = new L.LatLng(lat, lng);
        newMarker.setLatLng(newLatLng); 
        localStorage.setItem("lat",lat);
        localStorage.setItem("lon",lng);
    }
}
    

function stateChanged(plots) {
    if (plots != null || plots != "" || plots == undefined) {
    var plotlist;
	// if AJAX returned a list of markers, add them to the map
	//if (ajaxRequest.readyState==4) {
		//use the info here that was returned
		//if (ajaxRequest.status==200) {
    //console.dir(plots);
			plotlist=plots;
    //console.dir(plotlist);
			removeMarkers();
			for (i=0;i<plotlist.length;i++) {
				var plotll = new L.LatLng(plotlist[i].lat,plotlist[i].lon, true);
				var plotmark = new L.Marker(plotll);
                //brauchen wir die folgende zeile?
				plotmark.data=plotlist[i];
				map.addLayer(plotmark);
				plotmark.bindPopup("<h3>"+plotlist[i].name+"</h3>"+plotlist[i].details);
				plotlayers.push(plotmark);
			}
	//	}
	//}
    }
}

function removeMarkers() {
	for (i=0;i<plotlayers.length;i++) {
		map.removeLayer(plotlayers[i]);
	}
	plotlayers=[];
}



