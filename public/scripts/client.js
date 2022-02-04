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
  
  const $newTweet = $('.new-tweet.tweet').hide();
  const $newTweetCharCount = $('#new-tweet-char-count');
  const $tweetContainer = $('#all-tweets');

  const $errorOver = $('.new-tweet #tweet-error-msg-over').hide();
  const $errorNull = $('.new-tweet #tweet-error-msg-null').hide();

  $('#new-tweet-button').click(() => {
    $newTweet.slideToggle().find('textArea').focus();
  });

  $newTweet.submit(function (event) {
    event.preventDefault();
    console.dir(this);
    const $data = $(this).serialize();
    const $textArea = $(this).find('#tweet-text');

    const numChars = $textArea.val().trim().length;
    console.log(numChars);

    if (numChars <= 0) {
      $errorOver.slideUp();
      return $errorNull.slideDown();
    }

    if (numChars > 140) {
      $errorNull.slideUp();
      return $errorOver.slideDown();
    }

    $.ajax({ method: 'POST', url: '/tweets', data: $data }).then(() => {
      $textArea.val("");
      loadTweets();

      $errorNull.slideUp();
      $errorOver.slideUp();
      $newTweetCharCount.val(140);
    });
  });

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
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
    <p>${escape(tweetData.content.text)}</p>
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
      renderTweets(data);
    });
  };

  loadTweets();
});
