var map;
var plotlayers=[];
localStorage.setItem("markerSet","false");
function initmap(callback) {
   var find = new Object();
        find._id = "";
        find.actionID = "location";

        var promise = $.ajax({
            type: "POST",
            url: "db/read.php",
            data: {
                find: JSON.stringify(find),
            },
            success: function (data) {
    console.log("ERFOLG!!");
                var response = $.parseJSON(data);
                if (response.status) {
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
                stateChanged(response.data);
                function onMapMove(e) { stateChanged(response.data); }
                map.on('moveend', onMapMove);
                //map.on('click', addMarker);
                setTimeout(callback, 500);
                 $.notify({
                    message: 'Lesen von den Einträgen erfolgreich!'
                }, {
                    type: 'success',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    }
                });
                return response;
            } else {
                $.notify({
                    message: 'Lesen von ' + localStorage.getItem('selectedEntry') + ' nicht erfolgreich!'
                }, {
                    type: 'warning',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    }
                });
            }
        },
    });
}

function showMap(callback) {
    //get all entries in db, to display their markers on te map
    var find = new Object();
        find._id = "";
        find.actionID = "location";

        var promise = $.ajax({
            type: "POST",
            url: "db/read.php",
            data: {
                find: JSON.stringify(find),
            },
            success: function (data) {
                var response = $.parseJSON(data);
                if (response.status) {
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
                stateChanged(response.data);
                function onMapMove(e) { stateChanged(response.data); }
                map.on('moveend', onMapMove);
                map.on('click', addMarker);
                setTimeout(callback, 500);
                $.notify({
                    message: 'Lesen von den Eiträgen erfolgreich!'
                }, {
                    type: 'success',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    }
                });
                return response;
            } else {
                $.notify({
                    message: 'Lesen von ' + localStorage.getItem('selectedEntry') + ' nicht erfolgreich!'
                }, {
                    type: 'warning',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    }
                });
            }
        },
    });
}
function showMarker(lat,lon,callback) {
    //get all entries in db, to display their markers on te map
    var find = new Object();
    find._id = "";
    find.actionID = "location";
    var promise = $.ajax({
        type: "POST",
        url: "db/read.php",
        data: {
            find: JSON.stringify(find),
        },
        success: function (data) {
            var response = $.parseJSON(data);
            if (response.status) {
                //remove previous loaded map
               // map.remove();
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
                map.setView(new L.LatLng(lat, lon),11);
                //map.addLayer(osm);
                stateChanged(response.data);
                function onMapMove(e) { stateChanged(response.data); }
                map.on('moveend', onMapMove);
               // map.on('click', addMarker);
                setTimeout(callback, 500);
                $.notify({
                    message: 'Lesen von den Einträgen erfolgreich!'
                }, {
                    type: 'success',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    }
                });
                return response;
            } else {
                $.notify({
                    message: 'Lesen von den Einträgen nicht erfolgreich!'
                }, {
                    type: 'warning',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    }
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
        localStorage.setItem("markerSet","true");
        localStorage.setItem("lon",e.latlng.lng.toString());
        localStorage.setItem("lat",e.latlng.lat.toString());
        $("#latitude").val(localStorage.getItem("lat"));
        $("#longitude").val(localStorage.getItem("lon"));
/*        marker.on('dragend', function(event){
            var marker = event.target;
            var position = marker.getLatLng();
            alert(position);
            marker.setLatLng([position],{id:uni,draggable:'true'}).bindPopup(position).update();
    });*/
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
    if (plots != null) {
    var plotlist;
        plotlist=plots;
        removeMarkers();
        for (i=0;i<plotlist.length;i++) {
            var plotll = new L.LatLng(plotlist[i].lat,plotlist[i].lon, true);
            var plotmark = new L.Marker(plotll);
            //brauchen wir die folgende zeile?
            plotmark.data=plotlist[i];
            map.addLayer(plotmark);
            plotmark.bindPopup("<h3>"+plotlist[i].title + "</h3>"+plotlist[i].description);
            plotlayers.push(plotmark);
        }
    }
}

function removeMarkers() {
	for (i=0;i<plotlayers.length;i++) {
		map.removeLayer(plotlayers[i]);
	}
	plotlayers=[];
}



