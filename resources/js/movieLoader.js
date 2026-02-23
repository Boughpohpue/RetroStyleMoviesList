var tapesCount = 0;
var moviesCount = 0;

function getTapeFront() {
	var front = "resources/img/vhs_front_";
	var idx = Math.floor(Math.random() * 14) + 1;
	if (idx < 10) front += "0";
	return `${front}${idx}.jpg`
}
function getStckrColor() {
	var colors = ["black", "navy", "darkred", "darkgreen"];
	return colors[Math.floor(Math.random() * colors.length)];
}
function getStckrAngle() {
	var angle = 270;
	var maxRotate = 9;
	var rotate = Math.floor(Math.random() * maxRotate);
	if (Math.floor(Math.random() * 100) % 2 != 0) {
		rotate *= -1;
	}
	return angle + rotate;
}

function fetchMovies(moviesArray, container) {
	var tapeMovies = [];
	var tapeCounter = 0;

	$.each(moviesArray, function (i, f) {
		tapeMovies.push(f);

		if (tapeMovies.length == 2 || i + 1 == moviesArray.length) {
			var tapeId = ++tapeCounter;
			var tapeIdStr = "" + tapeId;
			while (tapeIdStr.length < 3) {
				tapeIdStr = "0" + tapeIdStr;
			}

			var tapeStyle =
				//'background-image: url("resources/img/vhs_front_' + f.front + '.jpg");';
				`background-image: url("${getTapeFront()}");`;
			var stick1Style =
				//"transform: rotate(" + f.s1a + "deg); color: " + f.s1c + ";";
				`transform: rotate(${getStckrAngle()}deg); color: ${getStckrColor()};`;
			var stick2Style =
				`transform: rotate(${getStckrAngle()}deg); color: ${getStckrColor()};`;
			var stick3Style =
				`transform: rotate(${getStckrAngle()}deg); color: ${getStckrColor()};`;

			var item = "";
			item += "<!-- Tape -->";
			item += "<div id='Item" + tapeId + "' class='shelfItem'>";
			item +=
				"<div id='Item" +
				tapeId +
				"_TapeHolderLeft' class='shelfTapeHolder left'></div>";
			item +=
				"<div id='Item" +
				tapeId +
				"_TapeHolderRight' class='shelfTapeHolder right'></div>";
			item += "<div id='Item" + tapeId + "_Tray' class='shelfTapeTray'></div>";
			item +=
				"<div id='Item" +
				tapeId +
				"_HolderLeft' class='shelfTapeTrayHolder left'></div>";
			item +=
				"<div id='Item" +
				tapeId +
				"_HolderRight' class='shelfTapeTrayHolder right'></div>";
			item +=
				"<div id='Item" +
				tapeId +
				"_Tape' class='shelfTape' style='" +
				tapeStyle +
				"'>";
			item +=
				"<div id='Item" + tapeId + "_TapeIdStickers' class='tapeIdStickers'>";
			item +=
				"<div class='tapeIdSticker first' style='" +
				stick1Style +
				"' >" +
				tapeIdStr[0] +
				"</div>";
			item +=
				"<div class='tapeIdSticker second' style='" +
				stick2Style +
				"' >" +
				tapeIdStr[1] +
				"</div>";
			item +=
				"<div class='tapeIdSticker third' style='" +
				stick3Style +
				"'>" +
				tapeIdStr[2] +
				"</div>";
			item += "</div>";
			item +=
				"<div id='Item" +
				tapeId +
				"_TapeFrontSticker' class='shelfTapeFrontSticker'>";
			item +=
				"<div id='Item" +
				tapeId +
				"_TapeMovie1' class='shelfTapeMovie first'" +
				" onclick=\"movieTitleClicked('" +
				tapeMovies[0].mdbId +
				"');\">";

			item +=
				"<span id='Item" +
				tapeId +
				"_TapeMovie1Title' class='shelfTapeMovieTitle'>1. " +
				tapeMovies[0].title +
				"</span>";

			if (tapeMovies[0].title2 == null || tapeMovies[0].title2 == "") {
				item +=
					"<span id='Item" +
					tapeId +
					"_TapeMovie1TitleAlt' class='shelfTapeMovieTitleAlt'>1. " +
					tapeMovies[0].title +
					"</span>";
			} else {
				item +=
					"<span id='Item" +
					tapeId +
					"_TapeMovie1TitleAlt' class='shelfTapeMovieTitleAlt'>1. " +
					tapeMovies[0].title2 +
					"</span>";
			}

			item +=
				"<span id='Item" +
				tapeId +
				"_TapeMovie1Info' class='shelfTapeMovieInfo'>" +
				tapeMovies[0].year +
				"r.</span>";
			item += "</div>";

			if (tapeMovies.length > 1) {
				item +=
					"<div id='Item" +
					tapeId +
					"_TapeMovie2' class='shelfTapeMovie second'" +
					" onclick=\"movieTitleClicked('" +
					tapeMovies[1].mdbId +
					"');\">";

				item +=
					"<span id='Item" +
					tapeId +
					"_TapeMovie2Title' class='shelfTapeMovieTitle'>2. " +
					tapeMovies[1].title +
					"</span>";

				if (tapeMovies[1].title2 == null || tapeMovies[1].title2 == "") {
					item +=
						"<span id='Item" +
						tapeId +
						"_TapeMovie21TitleAlt' class='shelfTapeMovieTitleAlt'>2. " +
						tapeMovies[1].title +
						"</span>";
				} else {
					item +=
						"<span id='Item" +
						tapeId +
						"_TapeMovie2TitleAlt' class='shelfTapeMovieTitleAlt'>2. " +
						tapeMovies[1].title2 +
						"</span>";
				}

				item +=
					"<span id='Item" +
					tapeId +
					"_TapeMovie2Info' class='shelfTapeMovieInfo'>" +
					tapeMovies[1].year +
					"r.</span>";
				item += "</div>";
			}

			item += "</div>";
			item += "</div>";
			item += "</div>";
			item += "<!-- End of tape -->";

			moviesCount += tapeMovies.length;
			$(item).appendTo($(container));
			tapeMovies = [];
		}
	});

	tapesCount = tapeCounter;

	console.log("Fetch movies complete!");
	console.log("Loaded " + moviesCount + " movies.");
	console.log("Created " + tapesCount + " tapes.");

	setTimeout(() => {
		$("#SpinnerModal").removeClass("active");
		$(".lds-spinner").addClass("off");
		$("#Shelf").addClass("active");
		setTimeout(() => {
			$("#SpinnerModal").addClass("hidden");
		}, 1666);
	}, 666);
}
