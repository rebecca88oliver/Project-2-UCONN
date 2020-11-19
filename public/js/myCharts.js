const botLabel = [];
const values = [];
const costs = [];
const prices = [];
const profits = [];

$.get("/api/all", data => {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      botLabel[i] = data[i].Name;
      values.push(data[i].Quantity);
      costs[i] = data[i].Wholesale;
      prices[i] = data[i].Retail;
      profits[i] = parseInt(prices[i]) - parseInt(costs[i]);
    }
  }
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
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  const barChartData2 = {
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

  const ctx2 = document.getElementById("profitChart").getContext("2d");
  window.profitChart = new Chart(ctx2, {
    type: "bar",
    data: barChartData2,
    options: {
      responsive: true,
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
