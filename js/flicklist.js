

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "9eebe5d98c036c65a175f364d59f7ef6" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2
			// update the model, setting its .browseItems property
			// equal to the movies we recieved in the response
			model.browseItems = response.results;
			//model.browseItems = model.browseItems.concat(response.results); -- if you wanted to add to

			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
	$('#section-watchlist ul').innerHTML = '';
	$('#section-browse ul').empty();
  // TODO 7
  // clear everything from both lists
  

  	model.watchlistItems.forEach(function(movie) {
  		$('#section-watchlist ul').append('<li>' + movie.title + '</li>');
  	});
  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  
  // for each movie on the current browse list, 
  //model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
	

	model.browseItems.forEach(function(movie) {
		var button = $('<button>Add to Watch List</button>');
		button.click(function() {
			model.watchlistItems.push(movie);
			render();
		});

		var listItem = $('<li><span>' + movie.title + '</span></li>');
		listItem.append(button);
		$('#section-browse ul').append(listItem);
		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
		
		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again


  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

