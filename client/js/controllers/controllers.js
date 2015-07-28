var apiData = {
  "success": true,
  "status": "OK",
  "jsessionid": "27874533CEE572D245F7FC123F885FCE",
  "response": {
    "attributionURL": "http://www.glassdoor.com/Job/jobs.htm",
    "countReturned": 0,
    "cities": [
      {
        "numJobs": 13254,
        "name": "New York, NY",
        "stateAbbreviation": "NY",
        "stateName": "New York",
        "id": 1132348,
        "latitude": 40.71417,
        "longitude": -74.00639
      },
      {
        "numJobs": 9570,
        "name": "San Francisco, CA",
        "stateAbbreviation": "CA",
        "stateName": "California",
        "id": 1147401,
        "latitude": 37.775,
        "longitude": -122.41833
      },
      {
        "numJobs": 7232,
        "name": "Chicago, IL",
        "stateAbbreviation": "IL",
        "stateName": "Illinois",
        "id": 1128808,
        "latitude": 41.85,
        "longitude": -87.65
      },
      {
        "numJobs": 6853,
        "name": "Seattle, WA",
        "stateAbbreviation": "WA",
        "stateName": "Washington",
        "id": 1150505,
        "latitude": 47.60639,
        "longitude": -122.33083
      },
      {
        "numJobs": 6671,
        "name": "Washington, DC",
        "stateAbbreviation": "DC",
        "stateName": "District of Columbia",
        "id": 1138213,
        "latitude": 38.895,
        "longitude": -77.03667
      },
      {
        "numJobs": 5165,
        "name": "Atlanta, GA",
        "stateAbbreviation": "GA",
        "stateName": "Georgia",
        "id": 1155583,
        "latitude": 33.74889,
        "longitude": -84.38806
      },
      {
        "numJobs": 5076,
        "name": "Houston, TX",
        "stateAbbreviation": "TX",
        "stateName": "Texas",
        "id": 1140171,
        "latitude": 29.76306,
        "longitude": -95.36306
      },
      {
        "numJobs": 4614,
        "name": "Austin, TX",
        "stateAbbreviation": "TX",
        "stateName": "Texas",
        "id": 1139761,
        "latitude": 30.26694,
        "longitude": -97.74278
      },
      {
        "numJobs": 4453,
        "name": "San Jose, CA",
        "stateAbbreviation": "CA",
        "stateName": "California",
        "id": 1147436,
        "latitude": 37.33944,
        "longitude": -121.89389
      },
      {
        "numJobs": 4361,
        "name": "Boston, MA",
        "stateAbbreviation": "MA",
        "stateName": "Massachusetts",
        "id": 1154532,
        "latitude": 42.35833,
        "longitude": -71.06028
      },
      {
        "numJobs": 4183,
        "name": "Annapolis Junction, MD",
        "stateAbbreviation": "MD",
        "stateName": "Maryland",
        "id": 1153524,
        "latitude": 39.121613,
        "longitude": -76.79043
      },
      {
        "numJobs": 3859,
        "name": "Dallas, TX",
        "stateAbbreviation": "TX",
        "stateName": "Texas",
        "id": 1139977,
        "latitude": 32.78333,
        "longitude": -96.8
      },
      {
        "numJobs": 3552,
        "name": "San Diego, CA",
        "stateAbbreviation": "CA",
        "stateName": "California",
        "id": 1147311,
        "latitude": 32.71528,
        "longitude": -117.15639
      },
      {
        "numJobs": 3353,
        "name": "Los Angeles, CA",
        "stateAbbreviation": "CA",
        "stateName": "California",
        "id": 1146821,
        "latitude": 34.05222,
        "longitude": -118.24278
      },
      {
        "numJobs": 3185,
        "name": "Santa Clara, CA",
        "stateAbbreviation": "CA",
        "stateName": "California",
        "id": 1147439,
        "latitude": 37.35417,
        "longitude": -121.95417
      },
      {
        "numJobs": 3040,
        "name": "Oracle, AZ",
        "stateAbbreviation": "AZ",
        "stateName": "Arizona",
        "id": 1133900,
        "latitude": 32.61083,
        "longitude": -110.77028
      },
      {
        "numJobs": 2731,
        "name": "Phoenix, AZ",
        "stateAbbreviation": "AZ",
        "stateName": "Arizona",
        "id": 1133904,
        "latitude": 33.44833,
        "longitude": -112.07333
      },
      {
        "numJobs": 2702,
        "name": "Redwood City, CA",
        "stateAbbreviation": "CA",
        "stateName": "California",
        "id": 1147394,
        "latitude": 37.48528,
        "longitude": -122.23528
      }
    ]
  }
};

app.controller('MapController', ['$scope', 'leafletData',
    
    function($scope, leafletData) {
    	var popup = L.popup();
    	//Start the map zoomed in on Seattle
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
      
  
        leafletData.getMap().then(function(map) {
        	console.log(map.getPanes().overlayPane);
        	function onMapClick(e) {
        	    popup.setLatLng(e.latlng)
        	       	.setContent("You clicked the map at " + e.latlng.toString())
        	       	.openOn(map);
        	}
        	
        	L.marker([47.6097, -122.3331])
        		.addTo(map)
        		.bindPopup("<b>Front End Developer</b><br>$85,000/year.")
        		.openPopup();
        	
        	map.on('click', onMapClick);
        	
        	d3Map(map);
        });


        $scope.$on('leafletDirectiveMap.zoomstart', function(event){
	    	d3.selectAll('svg').remove();
	    	$scope.$on('leafletDirectiveMap.zoomend', function(event){
		    	leafletData.getMap().then(function(map){
		    		map.getPanes().overlayPane.innerHTML = "";
		    		d3Map(map);
		    	});
	    	});
	    });

    	function d3Map(map){
        	var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    		g = svg.append("g").attr("class", "leaflet-zoom-hide"); 

    	    d3.json("js/lib/states.json", function(collection) {
    	      	var transform = d3.geo.transform({point: projectPoint}),
    	        path = d3.geo.path().projection(transform);

    	      	var feature = g.selectAll("path")
    	          	.data(collection.features)
    	        	.enter().append("path");

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

    	      // Use Leaflet to implement a D3 geometric transformation.
    	      function projectPoint(x, y) {
    	        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    	        this.stream.point(point.x, point.y);
    	      }
    	    });
		}
    }
]);



















