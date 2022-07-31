import React from 'react';
import ApexChartsReact from 'react-apexcharts';
import s from './Analytics.module.sass';

const Line = () => {
  const series = [
    {
      name: 'Users',
      data: [31, 40, 50, 55, 80, 109, 120],
    },
    {
      name: 'Payments',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
        autoSelected: 'pan',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#F10000', '#00E396'],
    yaxis: [
      {
        y: 100,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: 'Y-axis annotation on 100',
        },
      },
    ],
    xaxis: {
      type: 'datetime',
      categories: [
        '2022-07-30',
        '2022-07-31',
        '2022-08-01',
        '2022-08-02',
        '2022-08-03',
        '2022-08-04',
        '2022-08-05',
      ],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy',
      },
    },
  };
  return (
    <div className={s.box2}>
      <ApexChartsReact options={options} series={series} width="500" />
    </div>
  );
};

const Donut = () => {
  var options = {
    chart: {
      type: 'donut',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    labels: ['Fiction', 'Drama', 'Romance', 'Donut', 'Something'],
  };
  const series = [44, 55, 41, 17, 15];
  return (
    <div className={s.box2}>
      <ApexChartsReact
        options={options}
        series={series}
        width="500"
        type="donut"
      />
    </div>
  );
};

const Graph = () => {
  var randomizeArray = function (arg) {
    var array = arg.slice();
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  // data for the sparklines that appear below header area
  var sparklineData = [
    47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61,
    27, 54, 43, 19, 46,
  ];
  const series = [
    {
      name: 'Sales',
      data: randomizeArray(sparklineData),
    },
  ];
  const options = {
    chart: {
      id: 'sparkline1',
      group: 'sparklines',
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: 1,
    },
    labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
    yaxis: {
      min: 0,
    },
    xaxis: {
      type: 'datetime',
    },
    colors: ['#00FF00'],
    title: {
      text: '$424,652',
      align: 'center',
      style: {
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
    subtitle: {
      text: 'Sales',
      align: 'center',
      style: {
        fontSize: '14px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  };

  const series2 = [
    {
      name: 'Expenses',
      data: randomizeArray(sparklineData),
    },
  ];

  const options2 = {
    chart: {
      id: 'sparkline2',
      group: 'sparklines',
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: 1,
    },
    labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
    yaxis: {
      min: 0,
    },
    xaxis: {
      type: 'datetime',
    },
    colors: ['#FF0000'],
    title: {
      text: '$235,312',
      align: 'center',
      style: {
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
    subtitle: {
      text: 'Expenses',
      align: 'center',
      style: {
        fontSize: '14px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  };

  const series3 = [
    {
      name: 'Profits',
      data: randomizeArray(sparklineData),
    },
  ];

  const options3 = {
    chart: {
      id: 'sparkline3',
      group: 'sparklines',
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: 1,
    },
    labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      min: 0,
    },
    colors: ['#0000AA'],
    title: {
      text: '$135,965',
      align: 'center',
      style: {
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
    subtitle: {
      text: 'Profits',
      align: 'center',
      style: {
        fontSize: '14px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  };
  return (
    <div className={s.displayMe}>
      <div className={s.box}>
        <ApexChartsReact
          options={options}
          series={series}
          width="325"
          height="160"
          type="area"
        />
      </div>
      <div className={s.box}>
        <ApexChartsReact
          options={options2}
          series={series2}
          width="325"
          height="160"
          type="area"
        />
      </div>
      <div className={s.box}>
        <ApexChartsReact
          options={options3}
          series={series3}
          width="325"
          height="160"
          type="area"
        />
      </div>
    </div>
  );
};

export { Line, Donut, Graph };
