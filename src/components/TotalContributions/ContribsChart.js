import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import '../../index.scss'

class ContribsChart extends React.Component {
  funding = parseFloat(this.props.funding);
  spent = parseFloat(this.props.spent);
  cashOnHand = parseFloat(this.props.cashOnHand);

  

  /* Formatting react chart-js2 data */
  data = {
    labels: ['Total Funding', ' Total Spent', ' Cash on Hand'],
    datasets: [
      {
        label: 'Dollars ($)',
        data: [this.funding, this.spent, this.cashOnHand],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', // green
          'rgba(255, 99, 132, 0.2)', // red
          'rgba(153, 102, 255, 0.2)', // purple
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', // green
          'rgba(255, 99, 132, 1)', // red
          'rgba(153, 102, 255, 1)', // purple
        ],
        borderWidth: 1,
      },
    ],
  };

  options = {
    title: {
      display: true,
      text: 'Total Contributions, Spending, and Cash on Hand',
      fontSize: 25,
      fontColor: '#000000',
      padding: 20,
      responsive: true,
      fontFamily: "'JostRegular', 'Source Sans Pro', 'Lato', sans-serif",
      maintainAspectRation: false,
    },
    legend: {
      display: false,
    },
    // Add commas and dollar signs
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var value = data.datasets[0].data[tooltipItem.index];
          if (parseInt(value) >= 1000) {
            return ('$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
          } else {
            return '$' + value;
          }
        },
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 14,
            beginAtZero: true,
            userCallback: function(value, index, values) {
              if (parseInt(value) >= 1000) {
                return ('$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
              } else {
                return '$' + value;
              }
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontSize: 14,
          },
        },
      ],
    },
  };

  render() {
    return (
      <section id="contributionChart">
        <HorizontalBar data={this.data} options={this.options} />
      </section>
    );
  }
}

export default ContribsChart;
