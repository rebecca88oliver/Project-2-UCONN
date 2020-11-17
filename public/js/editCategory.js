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

let categories;
// When the page loads, grab all of our categories
$.get("/api/cat", data => {
  console.log(data);
  categories = data;
  if (data.length !== 0) {
    for (let i = 1; i < data.length - 2; i++) {
      const row = $("<div class='form-group'>");
      row.append(
        "<label>" +
          data[i] +
          "</label> <input type='text' class='form-control form-control-lg category" +
          i +
          "'> </div>"
      );

      $("#createInventoryFrame").append(row);
    }
  }
});
