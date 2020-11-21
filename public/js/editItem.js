const currid = window.location.href.replace(
  "http://localhost:8080/editItem/",
  ""
);
const oldItem = {
  id: currid
};
let categories;
const newItem = {};

$("#updateItem").on("click", event => {
  event.preventDefault();
  $.ajax({
    method: "PUT",
    url: "/api/edit",
    data: newItem
    // On success, run the following code
  }).then(window.location.assign("/fullInventory"));
});

$("#deleteItem").on("click", event => {
  event.preventDefault();
  // Send an AJAX POST-request with jQuery
  $.post("/api/delete", oldItem)
    // On success, run the following code
    .then(window.location.assign("/fullInventory"));
});

// When the form loads, grab our categories and item values
$.get("/api/" + oldItem.id, oldItem, data => {
  if (data.length !== 0) {
    categories = Object.keys(data[0]);
    for (const [key, value] of Object.entries(data[0])) {
      const row = $("<div class='form-group'>");
      row.append("<label>" + key + "</label>");
      row.append(
        "<input type='text' class='form-control form-control-lg " +
          key +
          "' value='" +
          value +
          "'></div>"
      );

      $(".editFrame").append(row);
    }
  }
  $("input").on("change", event => {
    // Make an array of the input values
    for (let i = 0; i < categories.length; i++) {
      const key = categories[i];
      const value = $("." + key)
        .val()
        .trim();
      newItem[key] = value;
    }
  });
});
