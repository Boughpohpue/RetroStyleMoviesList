var scrolling = false;
var currentShelfTop = 0;

class ScrollStep {
  static MIN = new ScrollStep(144, 169);
  static MED = new ScrollStep(639, 693);
	static MAX = new ScrollStep(2369, 2396);

	#interval;
	#timeout;

	constructor(interval, timeout) {
		this.#interval = interval;
		this.#timeout = timeout;
	}
	get timeout() {
		return this.#timeout;
	}
	get interval() {
		return this.#interval;
	}
}

function getShelfItemHeight() {
	return $("#Item1").height();
}
function getMediumScrollDelta() {
	return $("#ShelfContainer").height() * 0.98;
}
function getShelfBottom() {
	return $("#Shelf").offset().top + $("#Shelf")[0].scrollHeight;
}

function canScrollUp() {
	return currentShelfTop > 0;
}
function canScrollDown() {
	return currentShelfTop < getShelfBottom();
}

function disableToolboxScrollButtons() {
	if (!$("#ScrollTopButton").hasClass("disabled"))
		$("#ScrollTopButton").addClass("disabled");
	if (!$("#ScrollUpButton").hasClass("disabled"))
		$("#ScrollUpButton").addClass("disabled");
	if (!$("#ScrollBottomButton").hasClass("disabled"))
		$("#ScrollBottomButton").addClass("disabled");
	if (!$("#ScrollDownButton").hasClass("disabled"))
		$("#ScrollDownButton").addClass("disabled");
}
function updateToolboxScrollButtons() {
	if (canScrollUp()) {
		if ($("#ScrollTopButton").hasClass("disabled"))
			$("#ScrollTopButton").removeClass("disabled");
		if ($("#ScrollUpButton").hasClass("disabled"))
			$("#ScrollUpButton").removeClass("disabled");
	}
	else {
		if (!$("#ScrollTopButton").hasClass("disabled"))
			$("#ScrollTopButton").addClass("disabled");
		if (!$("#ScrollUpButton").hasClass("disabled"))
			$("#ScrollUpButton").addClass("disabled");
	}
	if (canScrollDown()) {
		if ($("#ScrollBottomButton").hasClass("disabled"))
			$("#ScrollBottomButton").removeClass("disabled");
		if ($("#ScrollDownButton").hasClass("disabled"))
			$("#ScrollDownButton").removeClass("disabled");
	}
	else {
		if (!$("#ScrollBottomButton").hasClass("disabled"))
			$("#ScrollBottomButton").addClass("disabled");
		if (!$("#ScrollDownButton").hasClass("disabled"))
			$("#ScrollDownButton").addClass("disabled");
	}
}

function scrollShelfStep(toDown, scrollStep = ScrollStep.MED) {
	if (scrolling) return;

	scrolling = true;
	disableToolboxScrollButtons();
	setTimeout(() => {
		scrolling = false;
		updateToolboxScrollButtons();
	}, scrollStep.timeout);

	var scrollDelta = 0;
	if (scrollStep === ScrollStep.MIN)
			scrollDelta = getShelfItemHeight();
	else if (scrollStep === ScrollStep.MED)
			scrollDelta = getMediumScrollDelta();
	else if (scrollStep === ScrollStep.MAX) {
			scrollDelta = toDown === false
				? currentShelfTop
				: getShelfBottom() - currentShelfTop;
	}
	if (!toDown) scrollDelta *= -1;
	var newTop = Math.floor(currentShelfTop + scrollDelta);
	$("#Shelf").animate({ scrollTop: newTop }, scrollStep.interval);
	currentShelfTop = newTop;

}

function scrollToDown() {
	if (!scrolling)
		scrollShelfStep(true, ScrollStep.MED);
}
function scrollToBottom() {
	if (!scrolling)
		scrollShelfStep(true, ScrollStep.MAX);
}
function scrollToUp() {
	if (!scrolling)
		scrollShelfStep(false, ScrollStep.MED);
}
function scrollToTop() {
	if (!scrolling)
		scrollShelfStep(false, ScrollStep.MAX);
}

function registerScrolling() {
	updateToolboxScrollButtons();
	document
		.getElementById("ShelfContainer")
		.addEventListener("wheel", function (e) {
			if (e.deltaY < 0) {
				scrollToUp();
			} else if (e.deltaY > 0) {
				scrollToDown();
			}
			return false;
		});
	document.body
		.addEventListener('keydown', function (e) {
			switch (e.which) {
				case 35: /*END*/
					scrollToBottom();
					break;
				case 36: /*HOME*/
					scrollToTop();
					break;
				case 33: /*PAGEUP*/
					scrollToUp();
					break;
				case 34: /*PAGEDOWN*/
					scrollToDown();
					break;
				case 38: /*ARROWUP*/
					scrollShelfStep(false, ScrollStep.MIN);
					break;
				case 40: /*ARROWDOWN*/
					scrollShelfStep(true, ScrollStep.MIN);
					break;
				default:
					break;
			}
		});
}
