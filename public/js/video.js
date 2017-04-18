function logVideo(x){
	var arrayOfWhere = ["/populationvideo/back", "/categoricalvideo/back", "/biasvideo/back", "/meanvideo/back", "/proportionvideo/back"]
	var arrayDirect = ["/marsUniversity","/mod2", "/mod3", "/mod4", "/mod5"]
	var where = arrayOfWhere[x-1]
	$.post(where, {videoNum: x});
	window.location = arrayDirect[x-1]
}