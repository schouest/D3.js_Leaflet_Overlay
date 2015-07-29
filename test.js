function d3Extra(map){
	var svg = d3.select("g");

	svg.append("circle").attr("r",5).attr("transform", function() {return "translate(" + projection([-75,43]) + ")";});



	function projectPoint(x, y) {
	  	var point = map.latLngToLayerPoint(new L.LatLng(y, x));
		this.stream.point(point.x, point.y);
	}
}