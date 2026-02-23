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
