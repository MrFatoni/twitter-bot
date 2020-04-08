// Packages
var twit = require('twit');

// Configuration
var config = require('./config.js');
var Twitter = new twit(config);

// Parameters
var params = {
    q: '#github, #GitHub',
    result_type: 'recent',
    lang: 'en'
}

// Retweet
var retweet = function() {
    // Search
    Twitter.get('search/tweets', params, function(err, data) {
        // Success
        if(!err) {
            // Grab Tweet ID
            var retweetId = data.statuses[0].id_str;
            // Retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if(response) {
                    console.log('[Retweet]', retweetId, 'Success');
                }
                if(err) {
                    console.log('[Retweet]', retweetId, 'Failed');
                }
            });
        } else {
            // Search Error
            console.log('[Retweet]', 'Error');
        }
    });
}

// Favorite
var favoriteTweet = function(){
    // Search
    Twitter.get('search/tweets', params, function(err,data){
        var tweet = data.statuses;
        var randomTweet = ranDom(tweet);
        // If Exists
        if(typeof randomTweet != 'undefined'){
            // Grab Tweet ID
            var favoriteId = randomTweet.id_str;
            // Favorite
            Twitter.post('favorites/create', {id: favoriteId}, function(err, response){
                // Success
                if(err){
                    console.log('[Favorite]', favoriteId, 'Failed');
                } else {
                    console.log('[Favorite]', favoriteId, 'Success');
                }
                console.log('[Favorite]', 'Error');
            });
        }
    });
}

// Date
const now = new Date();

// Logging
console.log('\n');
console.log('[Started]', now);
console.log('\n');

// Retweet Function
retweet();
setInterval(retweet, 300000);

// Favorite Function
favoriteTweet();
setInterval(favoriteTweet, 300000);

// Random Tweet
function ranDom (arr) {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
};