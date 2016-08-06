//From https://www.creativejuiz.fr/blog/en/javascript-en/read-url-get-parameters-with-javascript

function $_GET(param) {
	var vars = {};
	window.location.href.replace(location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}


var SongNameSearch = ""
var ArtistNameSearch = ""
var GenreNameSearch = ""

var WantedSongName = $_GET("song")
var WantedArtistName = $_GET("artist")
var WantedGenreName = $_GET("genre")

if (WantedSongName) {
  SongNameSearch = decodeURIComponent(WantedSongName.toLowerCase())
}

if (WantedArtistName) {
  ArtistNameSearch = decodeURIComponent(WantedArtistName.toLowerCase())
}

if (WantedGenreName) {
  GenreNameSearch = decodeURIComponent(WantedGenreName.toLowerCase())
}
