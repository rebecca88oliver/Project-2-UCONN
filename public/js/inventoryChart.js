const botLabel = [];
const values = [];

$.get("/api/all", data => {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      botLabel[i] = data[i].itemName;
      values[i] = data[i].itemQuantity;
    }
  }
});

const color = Chart.helpers.color;
const barChartData = {
  labels: botLabel,
  datasets: [
    {
      backgroundColor: color(window.chartColors.black)
        .alpha(0.5)
        .rgbString(),
      borderColor: window.chartColors.black,
      borderWidth: 1,
      data: values
    }
  ]
};

(function() {
  const ctx = document.getElementById("inventoryChart").getContext("2d");
  window.inventoryChart = new Chart(ctx, {
    type: "bar",
    data: barChartData,
    options: {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Inventory Stock"
      }
    }
  });
})();
