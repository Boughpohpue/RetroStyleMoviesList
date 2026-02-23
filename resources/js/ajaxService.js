class AjaxService {
	mdbUrl = "http://infertus.pl/mdbv8_a2/api/query/movies";
	movieUrl = `${this.mdbUrl}/getbymdbid.php?im=me&mdbId=`;

	constructor() {
		console.log("AjaxService created!");
	}

	hello() {
		console.log("AjaxService hello...");
	}

	sendGetMovieRequest(mdbid) {
		$.ajax({
			url: this.movieUrl + mdbid,
			success: function (response) {
				ajaxResponseReceived(response);
			},
			error: function (response) {
				ajaxRequestFailed(response);
			},
		});
	}
}

const ajaxService = new AjaxService();
