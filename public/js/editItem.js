let oldItem;
let categories;
$("#updateItem").on("click", event => {
  event.preventDefault();

  // Make an array of the input values
  for (let i = 0; i < categories.length; i++) {
    const newItem = {};
    const key = categories[i];
    const value = $(".category" + [i])
      .val()
      .trim();
    newItem[key] = value;
  }
  console.log(newItem);
  // Send an AJAX POST-request with jQuery
  $.post("/api/edit", [oldItem, newItem])
    // On success, run the following code
    .then(() => {
      //close window
      $("input").val("");
    });
});

$("#deleteItem").on("click", event => {
  event.preventDefault();
  // Send an AJAX POST-request with jQuery
  $.post("/api/delete", oldItem)
    // On success, run the following code
    .then(() => {
      //close window
      $("input").val("");
    });
});

// When the form loads, grab our categories and item values
$.get("/api/" + oldItem, data => {
  if (data.length !== 0) {
    oldItem = data;
    categories = Object.keys(data);
    for (let i = 0; i < categories.length; i++) {
      const row = $("<div class='form-group'>");
      row.append(
        "<label for='category" +
          i +
          "'>" +
          data[currCategory][i] +
          "</label> <input type='text' class='form-control form-control-lg category" +
          i +
          "'> </div>"
      );

      $("form").apppend(row);
    }
  }
});
