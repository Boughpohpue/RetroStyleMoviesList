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

function getStickerStyles(count) {
	const stickers = [];
	for (var i = 0; i < count; i++)
		stickers.push(`transform: rotate(${getStckrAngle()}deg); color: ${getStckrColor()};`);
	return stickers;
}

function getIdStr(id, length = 3) {
	var idStr = `${id}`;
	while (idStr.length < length) idStr = `0${idStr}`;
	return idStr;
}

function getTapeItemStr(tapeId, tapeMovies) {
	var idLength = 3;
	var tapeIdStr = getIdStr(tapeId);
	var stickers = getStickerStyles(idLength);
	var tapeStyle = `background-image: url("${getTapeFront()}");`;
	var orderCss = ['first', 'second', 'third'];

	var item = "";
	item += "<!-- Tape -->";
	item += `<div id='Item${tapeId}_Tape' class='shelfTape' style='tapeStyle'>`;
	item += `<div id='Item${tapeId}_TapeIdStickers' class='tapeIdStickers'>`;
	for (var i = 0; i < idLength; i++)
		item += `<div class='tapeIdSticker ${orderCss[i]}' style='${stickers[i]}'>${tapeIdStr[i]}</div>`;
	item += "</div>";
	item += `<div id='Item${tapeId}_TapeFrontSticker' class='shelfTapeFrontSticker'>`;
	for (var i = 0; i < tapeMovies.length; i++) {
		var cntr = i + 1;
		var movie = tapeMovies[i];
		var altTitle = !movie.title2 || movie.title2.length === 0 ? movie.title : movie.title2;
		item += `<div id='Item${tapeId}_TapeMovie${cntr}' class='shelfTapeMovie ${orderCss[i]}' onclick='movieTitleClicked("${movie.mdbId}");'>`;
		item += `<span id='Item${tapeId}_TapeMovie${cntr}Title' class='shelfTapeMovieTitle'>${cntr}. ${movie.title}</span>`;
		item += `<span id='Item${tapeId}_TapeMovie${cntr}TitleAlt' class='shelfTapeMovieTitleAlt'>${cntr}. ${altTitle}</span>`;
		item += `<span id='Item${tapeId}_TapeMovie${cntr}Info' class='shelfTapeMovieInfo'>${movie.year}r.</span>`;
		item += "</div>";
	}
	item += "</div>";
	item += "</div>";
	item += "<!-- End of tape -->";

	return item;
}

function getShelfItemStr(tapeId, tapeMovies) {
	var item = "";
	item += "<!-- Shelf item -->";
	item += `<div id='Item${tapeId}' class='shelfItem'>`;
	item += `<div id='Item${tapeId}_TapeHolderLeft' class='shelfTapeHolder left'></div>`;
	item += `<div id='Item${tapeId}_TapeHolderRight' class='shelfTapeHolder right'></div>`;
	item += `<div id='Item${tapeId}_Tray' class='shelfTapeTray'></div>`;
	item += `<div id='Item${tapeId}_HolderLeft' class='shelfTapeTrayHolder left'></div>`;
	item += `<div id='Item${tapeId}_HolderRight' class='shelfTapeTrayHolder right'></div>`;
	item += getTapeItemStr(tapeId, tapeMovies);
	item += "</div>";
	item += "<!-- End of shelf item -->";
	return item;
}

function fetchMovies(moviesArray, container) {
	var tapeMovies = [];
	var tapeCounter = 0;

	$.each(moviesArray, function (i, f) {
		tapeMovies.push(f);
		if (tapeMovies.length === 2 || i + 1 === moviesArray.length) {
			const item = getShelfItemStr(++tapeCounter, tapeMovies);
			moviesCount += tapeMovies.length;
			$(item).appendTo($(container));
			tapeMovies = [];
		}
	});

	tapesCount = tapeCounter;

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
