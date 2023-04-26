$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on("keyup", function(event) {
    const maxLength = 140;
    let count = $(this).val().length;
    const charCount = maxLength - count;
    const counter = $(this).parent()[0][2];

    console.log($(this));
    console.log('parent ', $(this).parent());
    console.log($(this).parent()[0][2]);

    if ( charCount < 0) {
      $(counter).addClass('negativeCount');
    } else {
      $(counter).removeClass('negativeCount');
    }

    $(counter).text(charCount)
  });
});
