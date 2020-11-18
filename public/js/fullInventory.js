$.get("/api/cat", data => {
  console.log(data);
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
      Object.values(data[i]).forEach(val => {
        row.append("<td>" + val + "</td>");
      });
      row.append(
        "<td style='display: block; margin: auto;'><button type='button' class='edit btn btn-light'>Edit</button></td></tr>"
      );
    }
    row.append("</tbody>");
    $("#fullInventory").append(row);
  }
});

$("#editItem").on("click", event => {});
