let numCategories;
$("#addItem").on("click", event => {
  event.preventDefault();

  // Make an array of the input values
  for (let i = 0; i < data.length; i++) {
    const newItem = [];
    newItem.push(
      $(".category" + [i])
        .val()
        .trim()
    );
  }
  console.log(newItem);
  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newItem)
    // On success, run the following code
    .then(() => {
      //close window
      $("input").val("");
    });
});

// When the page loads, grab all of our categories
$.get("/api/all", data => {
  if (data.length !== 0) {
    numCategories = data.length;
    const categories = Object.keys(data);
    for (let i = 0; i < data.length; i++) {
      const row = $("<div class='form-group'>");
      row.append(
        "<label>" +
          categories[i] +
          "</label> <input type='text' class='form-control form-control-lg category" +
          i +
          "'> </div>"
      );

      $("form").apppend(row);
    }
  }
});
