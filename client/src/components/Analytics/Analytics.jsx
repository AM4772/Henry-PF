import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import axios from 'axios';
import ApexChartsReact from 'react-apexcharts';
import s from './Analytics.module.sass';

const Line = () => {
  const [labelsCopy, setLabelsCopy] = useState([]);
  const [seriesPaymentsCopy, setSeriesPaymentsCopy] = useState([]);
  useEffect(() => {
    const asyncGetSeriesPayments = async () => {
      const response = await axios.get(
        'https://db-proyecto-final.herokuapp.com/stats'
      );
      let both = {};
      for (let i = 0; i < response.data.payments.length; i++) {
        both[response.data.payments[i].createdAt.substring(0, 10)] =
          Math.ceil(response.data.payments[i].total) +
          (both[response.data.payments[i].createdAt.substring(0, 10)]
            ? both[response.data.payments[i].createdAt.substring(0, 10)]
            : 0);
      }
      setLabelsCopy(Object.keys(both));
      setSeriesPaymentsCopy(Object.values(both));
    };
    asyncGetSeriesPayments();
  }, []);
  const series = [
    {
      name: 'Earnings 💰',
      data: seriesPaymentsCopy,
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
    plotOptions: {
      pie: {
        customScale: 0.8,
        offsetY: 20,
      },
      stroke: {
        colors: undefined,
      },
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
      categories: ['2022-08-09', '2022-08-10', '2022-08-11'],
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
    <ApexChartsReact
      options={options}
      series={series}
      width="130%"
      height="90%"
    />
  );
};

const Donut = () => {
  const [labelsCopy, setLabelsCopy] = useState([]);
  const [seriesCopy, setSeriesCopy] = useState([]);
  const isResponsive = useMediaQuery({ query: '(max-width: 1000px)' })
  useEffect(() => {
    const asyncGetSeries = async () => {
      const response = await axios.get(
        'https://db-proyecto-final.herokuapp.com/stats'
      );
      let arr1 = [],
        arr2 = [];
      for (let i = 0; i < response.data.categories.length; i++) {
        arr1.push(response.data.categories[i].category);
        arr2.push(response.data.categories[i].soldCopies);
      }
      setLabelsCopy(arr1);
      setSeriesCopy(arr2);
    };
    asyncGetSeries();
  }, []);
  const series = seriesCopy;
  var options = {
    chart: {
      width: '100%',
      height: 400,
    },
    legend: {
      show: false,
      offsetY: 0
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: '75%',
        },
        offsetY: 20,
      },
      stroke: {
        colors: undefined
      }
    },
    labels: labelsCopy,
  };
  var options2 = {
    chart: {
      width: '100%',
      height: 400,
    },
    legend: {
      show: false,
      offsetY: 20
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: '75%',
        },
        offsetY: 20,
      },
      stroke: {
        colors: undefined
      }
    },
    labels: labelsCopy,
  };
  return (
    <ApexChartsReact
      options={isResponsive ? options2 : options}
      series={series}
      type="donut"
      width="300%"
      height="260vw"
    />
  );
};

const Graph = () => {
  const [labelsUsersCopy, setLabelsUsersCopy] = useState([]);
  const [seriesUsersCopy, setSeriesUsersCopy] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    const asyncGetSeriesUsers = async () => {
      const response = await axios.get(
        'https://db-proyecto-final.herokuapp.com/stats'
      );
      let both = {};
      for (let i = 0; i < response.data.users.createdDate.length; i++) {
        both[response.data.users.createdDate[i].createdAt.substring(0, 10)] =
          1 +
          (both[response.data.users.createdDate[i].createdAt.substring(0, 10)]
            ? both[
                response.data.users.createdDate[i].createdAt.substring(0, 10)
              ]
            : 0);
      }
      setLabelsUsersCopy(Object.keys(both));
      setSeriesUsersCopy(Object.values(both));
      setTotalUsers(response.data.users.totalUsers);
    };
    asyncGetSeriesUsers();
  }, []);

  const series = [
    {
      name: 'Users',
      data: seriesUsersCopy,
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
    labels: labelsUsersCopy,
    yaxis: {
      show: false,
    },
    xaxis: {
      type: 'datetime',
    },
    colors: ['#00FF00'],
    title: {
      text: totalUsers,
      align: 'center',
      style: {
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
    subtitle: {
      text: 'Users',
      align: 'center',
      style: {
        fontSize: '14px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  };

  // const series2 = [
  //   {
  //     name: 'Expenses',
  //     data: randomizeArray(sparklineData),
  //   },
  // ];

  // const options2 = {
  //   chart: {
  //     id: 'sparkline2',
  //     group: 'sparklines',
  //     type: 'area',
  //     height: 160,
  //     sparkline: {
  //       enabled: true,
  //     },
  //   },
  //   stroke: {
  //     curve: 'straight',
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  //   labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
  //   yaxis: {
  //     min: 0,
  //   },
  //   xaxis: {
  //     type: 'datetime',
  //   },
  //   colors: ['#FF0000'],
  //   title: {
  //     text: '$235,312',
  //     align: 'center',
  //     style: {
  //       fontSize: '24px',
  //       cssClass: 'apexcharts-yaxis-title',
  //     },
  //   },
  //   subtitle: {
  //     text: 'Expenses',
  //     align: 'center',
  //     style: {
  //       fontSize: '14px',
  //       cssClass: 'apexcharts-yaxis-title',
  //     },
  //   },
  // };

  // const series3 = [
  //   {
  //     name: 'Profits',
  //     data: randomizeArray(sparklineData),
  //   },
  // ];

  // const options3 = {
  //   chart: {
  //     id: 'sparkline3',
  //     group: 'sparklines',
  //     type: 'area',
  //     height: 160,
  //     sparkline: {
  //       enabled: true,
  //     },
  //   },
  //   stroke: {
  //     curve: 'straight',
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  //   labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
  //   xaxis: {
  //     type: 'datetime',
  //   },
  //   yaxis: {
  //     min: 0,
  //   },
  //   colors: ['#0000AA'],
  //   title: {
  //     text: '$135,965',
  //     align: 'center',
  //     style: {
  //       fontSize: '24px',
  //       cssClass: 'apexcharts-yaxis-title',
  //     },
  //   },
  //   subtitle: {
  //     text: 'Profits',
  //     align: 'center',
  //     style: {
  //       fontSize: '14px',
  //       cssClass: 'apexcharts-yaxis-title',
  //     },
  //   },
  // };
  return (
    <div className={s.displayMe}>
      <div className={s.box}>
        <ApexChartsReact
          options={options}
          series={series}
          width="330"
          height="160"
          type="area"
        />
      </div>
      {/* <div className={s.box}>
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
      </div> */}
    </div>
  );
};

export { Line, Donut, Graph };
