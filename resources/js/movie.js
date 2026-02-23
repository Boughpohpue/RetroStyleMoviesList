var currentMovieId = "";
var poster = document.getElementById("PosterImage");
var trailer = document.getElementById("TrailerVideo");

function popupMdb(mdbid) {
	var url = `db.com/title/${mdbid}`;
	var wdth = 1024;
	var hght = 768;
	var left = (window.innerWidth / 2) - (wdth / 2);
	var top = (window.innerHeight / 2) - (hght / 2);
	var opts = `width=${wdth},height=${hght},left=${left},top=${top}`;
	opts += ",resizable=no,status=no,menubar=no";
	opts += ",toolbar=no,location=no,scrollbars=no,noreferer";
	window.open(`https://www.im${url}`, "Moie info", opts);
}

// tape item
function movieTitleClicked(mdbid) {
	if (!mdbid) return;

	console.log("Movie " + mdbid.replace('tt', '') + " clicked!");
	currentMovieId = mdbid;
	popupMdb(currentMovieId);
	return;

	console.log("Checking local storage...");
	var storedPoster = localStorage.getItem("poster_" + currentMovieId);
	if (storedPoster !== null) {
		$(poster).attr("src", storedPoster);
		$("#PosterModal").addClass("active");

		var storedTrailerLink = localStorage.getItem("trailer_" + currentMovieId);
		$(trailer).attr("src", storedTrailerLink);
	} else {
		ajaxService.sendGetMovieRequest(mdbid);
	}
}

function ajaxResponseReceived(response) {
	console.log("ajax request succeeded!");
	console.log(response);
	$(poster).attr("src", response.imageUrl);
	$("#PosterModal").addClass("active");

	if (response.trailer !== null && response.trailer.url !== null) {
		var trailerLink = response.trailer.url;
		while (trailerLink.includes("\\u0026")) {
			trailerLink = trailerLink.replace("\\u0026", "\u0026");
		}

		localStorage.setItem("trailer_" + currentMovieId, trailerLink);
		$(trailer).attr("src", trailerLink);
	}
}
function ajaxRequestFailed(response) {
	console.error("ajax request failed!");
	console.error(response);
}

poster.addEventListener(
	"load",
	function () {
		if (currentMovieId.length == 0) {
			return false;
		}

		var imgCanvas = document.createElement("canvas"),
			imgContext = imgCanvas.getContext("2d");

		imgCanvas.width = poster.width;
		imgCanvas.height = poster.height;
		imgContext.drawImage(poster, 0, 0, poster.width, poster.height);

		// Get canvas contents as a data URL
		var imgAsDataURL = imgCanvas.toDataURL("image/png");
		try {
			localStorage.setItem("poster_" + currentMovieId, imgAsDataURL);
		} catch (e) {
			console.log("Storage failed: " + e);
		}
	},
	false
);

$("#PosterModal").mousedown(function (e) {
	if (e.which == 3) {
		if (window.innerWidth < 720) {
			$(trailer).attr("width", window.innerWidth);
		}
		trailer.play();
		$("#TrailerModal").addClass("active");
	}

	setTimeout(() => {
		$("#PosterModal").removeClass("active");
		$(poster).attr("src", "");
	}, 1500);
});

$("#TrailerModal").mousedown(function (e) {
	$("#TrailerModal").removeClass("active");
	trailer.pause();
	$(trailer).attr("src", "");
});
