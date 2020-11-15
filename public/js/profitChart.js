const botLabel = [];
const costs = [];
const prices = [];
const profits = [];

$.get("/api/all", data => {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      botLabel[i] = data[i].itemName;
      costs[i] = data[i].baseCost;
      prices[i] = data[i].retailPrice;
      profits[i] = prices[i] - costs[i];
    }
  }
});

const color = Chart.helpers.color;
const barChartData = {
  labels: botLabel,
  datasets: [
    {
      label: "Wholesale Cost",
      backgroundColor: color(window.chartColors.red)
        .alpha(0.5)
        .rgbString(),
      borderColor: window.chartColors.red,
      borderWidth: 1,
      data: costs
    },
    {
      label: "Retail Price",
      backgroundColor: color(window.chartColors.blue)
        .alpha(0.5)
        .rgbString(),
      borderColor: window.chartColors.blue,
      borderWidth: 1,
      data: prices
    },
    {
      label: "Profit",
      backgroundColor: color(window.chartColors.green)
        .alpha(0.5)
        .rgbString(),
      borderColor: window.chartColors.green,
      borderWidth: 1,
      data: profits
    }
  ]
};

(function() {
  const ctx = document.getElementById("profitChart").getContext("2d");
  window.profitChart = new Chart(ctx, {
    type: "bar",
    data: barChartData,
    options: {
      responsive: true,
      legend: {
        position: top
      },
      title: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return "$" + value;
              }
            }
          }
        ]
      }
    }
  });
})();
