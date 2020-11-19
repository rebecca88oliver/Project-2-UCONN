let categories;
// When the page loads, grab all of our categories
$.get("/api/cat", data => {
  categories = data;
  if (data.length !== 0) {
    for (let i = 7; i < data.length; i++) {
      const row = $("<div class='form-group' id='" + i + "'>");
      row.append(
        "<input type='text' class='form-control form-control-lg category" +
          i +
          "' value='" +
          data[i] +
          "'><button type='button' class='btn-danger delete' aria-label='Delete'>Delete</button></div>"
      );

      $("#editCategoryFrame").append(row);
    }
  }

  $(".delete").on("click", event => {
    // Make a newChirp object
    const currCategory = categories[event.target.parentElement.id].trim();

    // Send an AJAX POST-request with jQuery
    $.post("/api/delCat", currCategory)
      // On success, run the following code
      .then(
        //display new category
        window.location.assign("/fullInventory")
      );

    // Empty each input box by replacing the value with an empty string
  });
});

$(".addCategory").on("click", event => {
  event.preventDefault();
  const newCategory = $(".newCategory")
    .val()
    .trim()
    .split(" ")
    .join("");
  // Make an array of the input values
  // Send an AJAX POST-request with jQuery
  $.post("/api/newCat", newCategory)
    // On success, run the following code
    .then(window.location.reload());
});
$("#editCategory").on("click", event => {
  event.preventDefault();

  for (let i = 7; i < categories.length; i++) {
    if (categories[i] !== $(".category" + i).val()) {
      const newCategory = $(".category" + i)
        .val()
        .trim()
        .split(" ")
        .join("");
      editObj = {
        newCategory: newCategory,
        oldCategory: categories[i]
      };
      $.post("/api/editCat", editObj).then(window.location.reload());
    }
  }
});
