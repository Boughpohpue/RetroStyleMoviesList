function printInfoToLog() {
	var info =
		"Window inner size: " + window.innerWidth + "x" + window.innerHeight;
	console.log(info);
}

function handleScale() {
	if (window.innerWidth < $("#ShelfContainer").width()) {
		var scale = window.innerWidth / $("#ShelfContainer").width();
		$("#ShelfContainer").css("transform", "scaleX(" + scale + ")");
		console.log("ShelfContainer scale set to " + scale);
	} else {
		console.log("ShelfContainer scale ok!");
	}
}

$(window).on("resize", function () {
	handleScale();
	var win = $(this); //this = window
	if (win.height() >= 820) {
		/* ... */
	}
	if (win.width() >= 1280) {
		/* ... */
	}
});
