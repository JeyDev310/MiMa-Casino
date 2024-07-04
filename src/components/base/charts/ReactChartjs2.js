import React, { Component } from 'react'
import * as Chartjs from 'react-chartjs-2'
import themeSettings from '../../vendor/libs/theme-settings'

class ReactChartjs2 extends Component {
  constructor(props) {
    super(props)
    props.setTitle('React Chartjs 2 - Charts')
  }

  render() {
    const options = {
      responsive: true,
      maintainAspectRatio: false
    }

    const isDarkStyle = themeSettings.isDarkStyle()

    const scalesOptions = isDarkStyle ? {
      yAxes: [{
        gridLines: { color: '#383b40' },
        ticks: { fontColor: '#fff' }
      }],
      xAxes: [{
        gridLines: { color: '#383b40' },
        ticks: { fontColor: '#fff' }
      }]
    } : {}
    const radialScaleOptions = isDarkStyle ? {
      angleLines: { color: '#383b40' },
      gridLines: { color: '#383b40' },
      pointLabels: { fontColor: '#fff' }
    } : {}
    const legendOptions = isDarkStyle ? {
      labels: { fontColor: '#fff' }
    } : {}

    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Charts /</span> React Chartjs 2
        </h4>

        <hr className="container-m-nx border-light mt-0 mb-5" />

        <div className="demo-vertical-spacing">
          <div>
            <Chartjs.Line
              height={250}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                  label: 'My First dataset',
                  data: [43, 91, 89, 16, 21, 79, 28],
                  borderWidth: 1,
                  backgroundColor: 'rgba(255, 193, 7, 0.3)',
                  borderColor: '#FFC107',
                  borderDash: [5, 5],
                  fill: false
                }, {
                  label: 'My Second dataset',
                  data: [24, 63, 29, 75, 28, 54, 38],
                  borderWidth: 1,
                  backgroundColor: 'rgba(233, 30, 99, 0.3)',
                  borderColor: '#E91E63'
                }]
              }}
              options={{
                ...options,
                scales: scalesOptions,
                legend: legendOptions
              }}
            />
          </div>

          <div>
            <Chartjs.Bar
              height={250}
              data={{
                labels: ['Italy', 'UK', 'USA', 'Germany', 'France', 'Japan'],
                datasets: [{
                  label: '2010 customers #',
                  data: [53, 99, 14, 10, 43, 27],
                  borderWidth: 1,
                  backgroundColor: 'rgba(205, 220, 57, 0.3)',
                  borderColor: '#CDDC39'
                }, {
                  label: '2014 customers #',
                  data: [55, 74, 20, 90, 67, 97],
                  borderWidth: 1,
                  backgroundColor: 'rgba(103, 58, 183, 0.3)',
                  borderColor: '#673AB7'
                }]
              }}
              options={{
                legend: legendOptions,
                scales: scalesOptions,
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>

          <div>
            <Chartjs.Radar
              height={250}
              data={{
                labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
                datasets: [{
                  label: 'My First dataset',
                  backgroundColor: 'rgba(76, 175, 80, 0.3)',
                  borderColor: '#4CAF50',
                  pointBackgroundColor: '#4CAF50',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: '#4CAF50',
                  data: [39, 99, 77, 38, 52, 24, 89],
                  borderWidth: 1
                }, {
                  label: 'My Second dataset',
                  backgroundColor: 'rgba(0, 150, 136, 0.3)',
                  borderColor: '#009688',
                  pointBackgroundColor: '#009688',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: '#009688',
                  data: [6, 33, 14, 70, 58, 90, 26],
                  borderWidth: 1
                }]
              }}
              options={{
                ...options,
                scales: radialScaleOptions,
                legend: legendOptions
              }}
            />
          </div>

          <div>
            <Chartjs.Polar
              height={250}
              data={{
                datasets: [{
                  data: [ 12, 10, 14, 6, 15 ],
                  backgroundColor: [ '#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB' ],
                  borderColor: isDarkStyle ? '#22252B' : 'white',
                  label: 'My dataset'
                }],
                labels: [ 'Red', 'Green', 'Yellow', 'Grey', 'Blue' ]
              }}
              options={{
                ...options,
                legend: legendOptions
              }}
            />
          </div>

          <div>
            <Chartjs.Pie
              height={250}
              data={{
                labels: [ 'Red', 'Blue', 'Yellow' ],
                datasets: [{
                  data: [ 180, 272, 100 ],
                  backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  borderColor: isDarkStyle ? '#22252B' : 'white'
                }]
              }}
              options={{
                ...options,
                legend: legendOptions
              }}
            />
          </div>

          <div>
            <Chartjs.Doughnut
              height={250}
              data={{
                labels: [ 'Red', 'Blue', 'Yellow' ],
                datasets: [{
                  data: [ 137, 296, 213 ],
                  backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  borderColor: isDarkStyle ? '#22252B' : 'white'
                }]
              }}
              options={{
                ...options,
                legend: legendOptions
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ReactChartjs2
