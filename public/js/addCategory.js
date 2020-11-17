// When user clicks add-btn
$("#addCategory").on("click", event => {
  event.preventDefault();

  // Make a newChirp object
  const newCategory = $("newCategory")
    .val()
    .trim();

  console.log(newCategory);

  // Send an AJAX POST-request with jQuery
  $.post("/api/newCat", newCategory)
    // On success, run the following code
    .then(() => {
      //display new category
      window.location.href = "/";
    });
});

// When the page loads, grab all of our categories
$.get("/api/all", data => {
  if (data.length !== 0) {
    const categories = Object.keys(data);
    for (let i = 0; i < categories.length; i++) {
      const row = $("<div>");
      row.addClass("category");

      row.append("<p>" + categories[i] + "</p>");

      $("#categoryArea").append(row);
    }
  }
});
