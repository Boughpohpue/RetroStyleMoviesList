$("#LanguageButton").click(function () {
	$(".shelfTapeMovieTitle").each(function (i, obj) {
		$(this).toggleClass("off");
	});
	$(".shelfTapeMovieTitleAlt").each(function (i, obj) {
		$(this).toggleClass("on");
	});
	$(this).toggleClass("disabled");
});
$("#ScrollTopButton").click(function () {
	scrollToTop();
	return false;
});
$("#ScrollBottomButton").click(function () {
	scrollToBottom();
	return false;
});
$("#ScrollUpButton").click(function () {
	scrollToUp();
	return false;
});
$("#ScrollDownButton").click(function () {
	scrollToDown();
	return false;
});

$("#ClearButton").click(function () {
	$("#SearchPhrase").trigger($.Event("keyup", { keyCode: 27 }));
});

$("#SearchPhrase").keyup(function (e) {
	if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
		$(this).val("");
	}

	if ($(this).val().length > 0 && !$("#ClearButton").hasClass("on")) {
		$("#ClearButton").addClass("on");
	} else if ($(this).val().length == 0 && $("#ClearButton").hasClass("on")) {
		$("#ClearButton").removeClass("on");
	}

	var filter = $(this).val().toLowerCase();
	var filterOn = $("#filterOn").val();
	if (filter.length < 3 && filterOn == "1") {
		$(".shelfTapeMovieTitle").each(function (i, obj) {
			$(obj).removeClass("highlight");
		});
		$(".shelfTapeMovieTitleAlt").each(function (i, obj) {
			$(obj).removeClass("highlight");
		});
		$(".shelfItem").each(function (i, obj) {
			$(obj).show();
		});
		$("#filterOn").val("0");
	} else if (filter.length >= 3) {
		$(".shelfItem").each(function (i, obj) {
			var objId = $(obj).attr("id");
			var m1title = $("#" + objId + "_TapeMovie1Title")
				.text()
				.toLowerCase();
			var m1titleAlt = $("#" + objId + "_TapeMovie1TitleAlt")
				.text()
				.toLowerCase();
			var m2title = $("#" + objId + "_TapeMovie2Title")
				.text()
				.toLowerCase();
			var m2titleAlt = $("#" + objId + "_TapeMovie2TitleAlt")
				.text()
				.toLowerCase();

			var tapeVisible = false;
			if (m1title.includes(filter)) {
				$("#" + objId + "_TapeMovie1Title").addClass("highlight");
				tapeVisible = true;
			} else {
				$("#" + objId + "_TapeMovie1Title").removeClass("highlight");
			}

			if (m1titleAlt.includes(filter)) {
				$("#" + objId + "_TapeMovie1TitleAlt").addClass("highlight");
				tapeVisible = true;
			} else {
				$("#" + objId + "_TapeMovie1TitleAlt").removeClass("highlight");
			}

			if (m2title.includes(filter)) {
				$("#" + objId + "_TapeMovie2Title").addClass("highlight");
				tapeVisible = true;
			} else {
				$("#" + objId + "_TapeMovie2Title").removeClass("highlight");
			}

			if (m2titleAlt.includes(filter)) {
				$("#" + objId + "_TapeMovie2TitleAlt").addClass("highlight");
				tapeVisible = true;
			} else {
				$("#" + objId + "_TapeMovie2TitleAlt").removeClass("highlight");
			}

			if (tapeVisible) {
				$(obj).show();
			} else {
				$(obj).hide();
			}
		});

		$("#filterOn").val("1");
	}
});
