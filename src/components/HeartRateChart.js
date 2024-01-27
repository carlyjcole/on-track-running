import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { lightBlue } from '@mui/material/colors';

const chartSetting = {
  xAxis: [
    {
      label: 'heart rate (bpm)',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    pace: '7:00-7:30',
    heartrate: 150,
  }
];

const valueFormatter = (value) => `${value} bpm`;

export default function HorizontalBars() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'pace' }]}
      series={[{ dataKey: 'heartrate', valueFormatter, color: 'rgb(217, 229, 238)'}]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}