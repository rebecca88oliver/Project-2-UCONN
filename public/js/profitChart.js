const botLabel2 = [];
const costs = [];
const prices = [];
const profits = [];

$.get("/api/all", data => {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      botLabel2[i] = data[i].Name;
      costs[i] = data[i].Wholesale;
      prices[i] = data[i].Retail;
      profits[i] = parseInt(prices[i]) - parseInt(costs[i]);
    }
  }

  const color = Chart.helpers.color;
  const barChartData2 = {
    labels: botLabel2,
    datasets: [
      {
        label: "Wholesale Cost",
        backgroundColor: color(window.chartColors.red)
          .alpha(0.5)
          .rgbString(),
        borderColor: window.chartColors.red,
        borderWidth: 1,
        data: Object.values(costs)
      },
      {
        label: "Retail Price",
        backgroundColor: color(window.chartColors.blue)
          .alpha(0.5)
          .rgbString(),
        borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: Object.values(prices)
      },
      {
        label: "Profit",
        backgroundColor: color(window.chartColors.green)
          .alpha(0.5)
          .rgbString(),
        borderColor: window.chartColors.green,
        borderWidth: 1,
        data: Object.values(profits)
      }
    ]
  };

  const ctx = document.getElementById("profitChart").getContext("2d");
  window.profitChart = new Chart(ctx, {
    type: "bar",
    data: barChartData2,
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
});
