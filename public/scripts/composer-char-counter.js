{
  //$()=> {} //another way to write document.ready

  $(document).ready(function() {
    // --- our code goes here ---
    $("#tweet-text").on("input", onInput);
  });

  const onInput = function(event) {
    const maxLength = 140;
    let count = $(this).val().length;
    const charCount = maxLength - count;
    const counter = $(this).parent()[0][2];
    // const $form = $input.closest("form"); //searches upwards
    //const $counter = $form.find(".counter") // find searches downwards

    if ( charCount < 0) {
      $(counter).addClass('negativeCount');
    } else {
      $(counter).removeClass('negativeCount');
    }
    $(counter).text(charCount)
  };
}
