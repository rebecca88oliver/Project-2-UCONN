$.get("/api/cat", data => {
  if (data.length !== 0) {
    const row = $("<thead><tr>");
    for (let i = 0; i < data.length; i++) {
      row.append("<th scope='col' id='category" + i + "'>" + data[i] + "</th>");
    }
    row.append("<th> </th></tr></thead>");
    $("#fullInventory").append(row);
  }
});
$.get("/api/all", data => {
  if (data.length !== 0) {
    const row = $("<tbody>");
    for (let i = 0; i < data.length; i++) {
      row.append("<tr id='" + data[i].id + "'>");
      for (const [key, value] of Object.entries(data[i])) {
        row.append("<td>" + value + "</td>");
      }
      row.append(
        "<td style='display: block; margin: auto;'><button type='button' class='edit btn btn-light' id='" +
          data[i].id +
          "'>Edit</button></td></tr>"
      );
    }
    row.append("</tbody>");
    $("#fullInventory").append(row);
  }

  $(".edit").on("click", event => {
    data = { id: event.target.id };
    window.location.assign("/editItem/" + data.id);
  });
});
