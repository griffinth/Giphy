var topics = ['The Office', 'Parks and Recreation', 'Breaking Bad', 'The Simpsons', 'Future Man', 'Lost', 'Altered Carbon', 'Comedians in Cars Getting Coffee', 'Happy', 'Black Mirror', 'Full House', 'Rugrats', 'Rockos Modern Life', 'Mindhunter', 'Conan', 'Family Guy'];
var currentGif;
var pausedGif;
var animatedGif;
var stillGif;

//creates buttons
function createButtons() {
	$('#TVButtons').empty();
	for (var i = 0; i < topics.length; i++) {
		var showBtn = $('<button>').text(topics[i]).addClass('showBtn').attr({
			'data-name': topics[i]
		});
		$('#TVButtons').append(showBtn);
	}

	//displays gifs on click
	$('.showBtn').on('click', function () {
		$('.display').empty();

		var thisShow = $(this).data('name');
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=tv+show+" + thisShow + "&limit=10&api_key=Oh1XzkJTE9Z9Rh8fht1grRVa7lRcrKHb";
		$.ajax({
			url: giphyURL,
			method: 'GET'
		}).done(function (giphy) {
			currentGif = giphy.data;
			$.each(currentGif, function (index, value) {
				animatedGif = value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if (thisRating == '') {
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: ' + thisRating).addClass('ratingStyle');
				stillGif = $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif 
$(document).on('mouseover', '.playOnHover', function () {
	$(this).attr('src', $(this).data('animated'));
});
$(document).on('mouseleave', '.playOnHover', function () {
	$(this).attr('src', $(this).data('paused'));
});

//sets a button from from the newShowInput
$('#addShow').on('click', function () {
	var newShow = $('#newShowInput').val().trim();
	topics.push(newShow);
	createButtons();
	return false;
});

createButtons();