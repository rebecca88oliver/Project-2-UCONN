const currid = window.location.href.replace(
  "http://localhost:8080/editItem/",
  ""
);
const oldItem = {
  id: currid
};
console.log(oldItem);
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
    .then(window.location.assign("/"));
});

// When the form loads, grab our categories and item values
$.get("/api/" + oldItem.id, oldItem, data => {
  if (data.length !== 0) {
    for (const [key, value] of Object.entries(data[0])) {
      const row = $("<div class='form-group'>");
      row.append("<label>" + key + "</label>");
      row.append(
        "<input type='text' class='form-control form-control-lg item" +
          data[0].id +
          "' value='" +
          value +
          "'></div>"
      );

      $(".editFrame").append(row);
    }
  }
});
