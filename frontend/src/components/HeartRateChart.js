import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  xAxis: [
    {
      label: 'heart rate (bpm)',
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value} bpm`;

const HeartRateChart = ({ activities }) => {
  console.log(activities);

  const paceCategories = [
    { label: '7:00-7:30', minPace: 420, maxPace: 450 },
    { label: '7:30-8:00', minPace: 450, maxPace: 480 },
    { label: '8:00-8:30', minPace: 480, maxPace: 510 },
    { label: '8:30-9:00', minPace: 510, maxPace: 540 },
    { label: '9:00-9:30', minPace: 540, maxPace: 570 },
    { label: '9:30-10:00', minPace: 570, maxPace: 600 },
  ];

  const dataset = paceCategories.map(category => {
    const filteredActivities = activities.filter(activity => {
      const pace = activity.moving_time / (activity.distance / 1000);
      return pace >= category.minPace && pace < category.maxPace;
    });
    
    const averageHeartRate = filteredActivities.reduce((total, activity) => total + activity.heartrate, 0) / filteredActivities.length;

    return {
      paceCategory: category.label,
      heartrate: averageHeartRate,
    };
  });

  return ( 
    <div>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'paceCategory' }]}
        xAxis={[{ scaleType: 'band' }]}
        series={[{ dataKey: 'heartrate', valueFormatter, color: 'rgb(217, 229, 238)' }]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
};

export default HeartRateChart;
