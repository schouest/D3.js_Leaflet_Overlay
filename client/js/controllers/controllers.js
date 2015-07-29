app.controller('MapController', ['$scope', 'leafletData',

    function($scope, leafletData) {
    	
    	// Start the map zoomed in on Seattle and add custom event listenters
    	//for our leaflet directive
    	angular.extend($scope, {
			center: {
				lat: 47.6097,
				lng: -122.3331,
				zoom: 5,
			},
			events: {
	            map: {
	                enable: ['zoomstart', 'zoomend'],
	                logic: 'emit'
	            }
        	}
		});
      
  		/*********************************************************
							INITIALIZATIONS
  		*********************************************************/
  		// Grabs our map objects as a promise and then adds a click handler, a marker
  		//at our center location, and runs our d3Map function which generates our d3
  		//overlay. 
        leafletData.getMap().then(function(map) {
        	var popup = L.popup();
        	
        	function onMapClick(e) {
        	    popup.setLatLng(e.latlng)
        	       	.setContent("You clicked the map at " + e.latlng.toString())
        	       	.openOn(map);
        	}
        	
        	// L.marker([47.6097, -122.3331])
        	// 	.addTo(map)
        	// 	.bindPopup("<b>Front End Developer</b><br>$85,000/year.")
        	// 	.openPopup();
        	
        	map.on('click', onMapClick);

            //var in
        	
        	d3Map(map);
        });


        /*********************************************************
							MAP EVENT HANDLERS
        *********************************************************/
        // This uses the custom event handlers that we registered at the top
        //of the document to clear out the old svg and redraw it when the map
        //is zoomed in or out.
        $scope.$on('leafletDirectiveMap.zoomstart', function(event){
	    	d3.selectAll('svg').remove();
	    	$scope.$on('leafletDirectiveMap.zoomend', function(event){
		    	leafletData.getMap().then(function(map){
		    		map.getPanes().overlayPane.innerHTML = "";
		    		d3Map(map);
		    	});
	    	});
	    });


        // MAP DRAWING FUNCTION
    	function d3Map(map){
        	var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    		g = svg.append("g").attr("class", "leaflet-zoom-hide"); 

    	    d3.json("js/lib/states.json", function(collection) {
    	      	var transform = d3.geo.transform({point: projectPoint}),
    	        path = d3.geo.path().projection(transform);

    	      	var feature = g.selectAll("path")
    	          	.data(collection.features)
    	        	.enter()
    	        	.append("path");

    	      	map.on("viewreset", reset);
    	      	reset();

    	      	// Reposition the SVG to cover the features.
    	      	function reset() {
    	        	var bounds = path.bounds(collection),
    	            	topLeft = bounds[0],
    	            	bottomRight = bounds[1];

	    	        svg.attr("width", bottomRight[0] - topLeft[0])
	    	        	.attr("height", bottomRight[1] - topLeft[1])
	    	           	.style("left", topLeft[0] + "px")
	    	           	.style("top", topLeft[1] + "px");

    	        	g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    	        	feature.attr("d", path);
    	      	}

    	      	// Make Some Dots ON the map.....Hopefully
	      		var svg2 = d3.select(map.getPanes().overlayPane).append("svg");
	      		var g2 = svg.append("g").attr("class", "leaflet-zoom-hide");
	      		
	      		d3.json("/js/lib/apiData.json", function(coll2){
                    var transform = d3.geo.transform({point: projectPoint});
                    var path = d3.geo.path().projection(transform);
                    var circle = d3.geo.circle().origin([47.6097, -122.3331]);
                    var collection2 = toGeoJson(coll2.response.cities);
	      			g2.selectAll("circle")
	      				.data(collection2.features)
	      				.enter()
	      				.append("circle")
                        .attr("cx", function(d){  
                            return makePoint(d.geometry.coordinates[1], d.geometry.coordinates[0]).x / 2.8; })
                        .attr("cy", function(d){
                            return makePoint(d.geometry.coordinates[1], d.geometry.coordinates[0]).y / 2.8; })
                        .attr("r", "8px")
                        .attr("fill", "red");

                        map.on("viewreset", reset);
                        reset();
	      		});

                
                function makePoint(x, y) {
                    return map.latLngToLayerPoint(new L.LatLng(y, x));
                }                

    	      	// Use Leaflet to implement a D3 geometric transformation.
    	      	function projectPoint(x, y) {
    	        	var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    	        	this.stream.point(point.x, point.y);
    	      	}
    	    });
		}

		// Helper to convert our JSON from the API to GeoJSON
		function toGeoJson(data){
			var geo = {
				"type": "FeatureCollection",
				"features":[]
			};

			for(var i=0; i<data.length; i++){
				// console.log(data[i]);
				var geoObj = {
					"type": "Feature",
					"geometry": {
						"type": "Point",
						"coordinates": [data[i].latitude, data[i].longitude]
					},
					"properties": {
						"numJobs": data[i].numJobs,
						"name": data[i].name,
						"stateAbbreviation": data[i].stateAbbreviation,
						"stateName": data[i].stateName,
						"id": 1147394
					}
				};

				geo.features.push(geoObj);
			}
			return geo;
		}
    }
]);



















