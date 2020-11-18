$.get("/api/all", data => {
  if (data.length !== 0) {
    const row = $("<tbody>");
    for (let i = 0; i < data.length; i++) {
      row.append(
        "<a class='list-group-item list-group-item-action editItem' id='" +
          data[i].id +
          "'>" +
          data[i].Name +
          "</a>"
      );
    }
    row.append("</tbody>");
    $("#productList").append(row);
  }
  $(".editItem").on("click", event => {
    data = { id: event.target.id };
    window.location.assign("/editItem/" + data.id);
  });
});
