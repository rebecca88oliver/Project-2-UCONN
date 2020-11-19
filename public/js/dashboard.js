$.get("/api/all", data => {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].Quantity < 10) {
        const row = $(
          "<div class='activity col'><div class='activity-inner p-2 border'><h1 class='quantity text-info mt-3'>" +
            data[i].Quantity +
            "</h1><p class='subtitle'>Qty</p> <div class='title row mx-0 mt-3'><p class='col-12 px-0 title-text'>" +
            data[i].Name +
            "</p></div></div></div>"
        );
        $(".items").append(row);
      }
    }
  }
});
