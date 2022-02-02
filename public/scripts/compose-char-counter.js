$(document).ready(() => {
  $('#tweet-text').on('input', function () {
    const text = $(this).val();
    const numChars = text.trim().length;
    const numCharsAllowed = 140;
    const numCharsRemain = numCharsAllowed - numChars;

    const counter = $(this).siblings().children('.counter');
    counter.val(numCharsRemain)

    if (numCharsRemain < 0) {
      counter.addClass('counter-red')
    } else {
      counter.removeClass('counter-red')
    }

  })
});