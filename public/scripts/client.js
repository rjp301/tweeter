/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData =  {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };

$(document).ready(() => {
  

  $(".new-tweet > form").submit(function (event) {
    event.preventDefault();
    const $data = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $data
    }).then(() => {
      loadTweets();
      console.log($data);
    });
  });

  
  const createTweetElement = tweetData => {
    return $(`
    <article class="tweet">
    <header>
    <div class="tweet-avatar">
    <img src="${tweetData.user.avatars}" alt="">
    <div>${tweetData.user.name}</div>
    </div>
    <div class="username">${tweetData.user.handle}</div>
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
    <div>${timeago.format(tweetData.created_at)}</div>
    <div class="actions">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    `);
  };
  
  const renderTweets = tweets => {
    const $tweetContainer = $('section#tweet-container');
    $tweetContainer.empty();
    
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
    }
  };
  
  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then(data => {
      console.log(data);
      renderTweets(data);
    });
  };

  loadTweets();
});
