import React from 'react';
import ApexChartsReact from 'react-apexcharts';
import s from './Analytics.module.sass';

const Analytics = () => {
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
    theme: {
      mode: 'white'
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
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
    tooltip: {
      x: {
        format: 'dd/MM/yy',
      },
    },
  };
  return (
    <div className={s.mergeMe}>
      <ApexChartsReact options={options} series={series} height="350" width="500" />
    </div>
  );
};

export default Analytics;
