let categories;
// When the page loads, grab all of our categories
$.get("/api/cat", data => {
  categories = data;
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i] !== "id" &&
        data[i] !== "createdAt" &&
        data[i] !== "updatedAt"
      ) {
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
  }
});

$("#addItem").on("click", event => {
  event.preventDefault();
  const newItem = {};
  // Make an array of the input values
  for (let i = 1; i < categories.length; i++) {
    if (
      categories[i] !== "id" &&
      categories[i] !== "createdAt" &&
      categories[i] !== "updatedAt"
    ) {
      const key = categories[i];
      const value = $(".category" + i)
        .val()
        .trim();
      newItem[key] = value;
    }
  }
  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newItem)
    // On success, run the following code
    .then(() => {
      //close window
      $("input").val("");
    });
});
