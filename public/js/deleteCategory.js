// When user clicks add-btn
$("#deleteCategory").on("click", event => {
  event.preventDefault();

  // Make a newChirp object
  const currCategory = $("#deleteCategory")
    .parent()
    .val()
    .trim();

  console.log(currCategory);

  // Send an AJAX POST-request with jQuery
  $.post("/api/delCat", currCategory)
    // On success, run the following code
    .then(() => {
      //display new category
    });

  // Empty each input box by replacing the value with an empty string
});

// When the page loads, grab all of our categories
$.get("/api/all", data => {
  if (data.length !== 0) {
    const categories = Object.keys(data);
    for (let i = 0; i < categories.length; i++) {
      const row = $("<div>");
      row.addClass("category");

      row.append("<p>" + categories[i] + "</p>");

      $("#categoryArea").apppend(row);
    }
  }
});
