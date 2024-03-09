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

  if (!Array.isArray(activities)) {
    return <div>No activities data available</div>;
  }

  const paceCategories = [
    { label: '7:00-7:30', minPace: 3.6, maxPace: 3.9 },
    { label: '7:30-8:00', minPace: 3.3, maxPace: 3.5 },
    { label: '8:00-8:30', minPace: 3.15, maxPace: 3.2 },
    { label: '8:30-9:00', minPace: 3.0, maxPace: 3.1 },
    { label: '9:00-9:30', minPace: 2.85, maxPace: 2.9 },
    { label: '9:30-10:00', minPace: 2.6, maxPace: 2.8},
  ];

  const dataset = paceCategories.map(category => {
    const filteredActivities = activities.filter(activity => {
      const pace = activity.average_speed;
      console.log('pace:', pace);
      return pace >= category.minPace && pace < category.maxPace;
    });

    console.log('Filtered Activities:', filteredActivities);
    console.log('filtered length:', filteredActivities.length); 

    const activitiesWithHeartRate = filteredActivities.filter((activity) => activity.has_heartrate);

    const totalHeartRate = activitiesWithHeartRate.reduce((total, activity) => total + activity.average_heartrate, 0);
    const averageHeartRate = activitiesWithHeartRate.length > 0 ? Math.round(totalHeartRate / activitiesWithHeartRate.length) : 0;


    console.log('Average Heart Rate:', averageHeartRate);

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
