import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import {API_BASE_URL, FINDALL} from '../config/host-cofig';
import styles from './BarChart.module.css';

const Barchart = () => {
  const API_USERLIST_URL = API_BASE_URL + FINDALL;
  // const [chartData, setChartData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        // 백엔드에서 employee 데이터를 받아오는 API 호출
        const response = await fetch(API_USERLIST_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const employeeData = await response.json();
        // console.log('employeeData:',employeeData);
  

        // 부서별로 인원수를 계산하여 chartData 생성
        const deptCounts = {};
        employeeData.forEach((employee) => {
          const { deptName } = employee;
          if (deptCounts[deptName]) {
            deptCounts[deptName]++;
          } else {
            deptCounts[deptName] = 1;
          }
        });

        const chartData = Object.entries(deptCounts).map(([deptName, count]) => ({
          department: deptName,
          employeeCount: count,
        }));

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // console.log(chartData);

  // Extract department names from chartData
  const deptNames = chartData.map((item) => item.deptName);
  // console.log('deptName:', deptNames);

  // Prepare data for the bar chart
  const chartDataForBar = chartData.map((item) => {
    return {
      department: item.deptName,
      [item.deptName]: item.employeeCount,
    };
  });

  const handle = {
    barClick: (data) => {
      // console.log(data);
    },

    legendClick: (data) => {
      // console.log(data);
    },
  };

  return (
    <div className={styles.barchartContainer}>
      <p className={styles.barchartHead}>인원 현황</p>
      <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
        <ResponsiveBar
          data={chartData}
          keys={['employeeCount']}
          indexBy="department"
          margin={{ top: 50, right: 100, bottom: 50, left: 60 }}
          padding={0.3}
          colors={['orange']}
          colorBy="id"
          theme={{
            labels: {
              text: {
                fontSize: 14,
                fill: '#000000',
              },
            },
            legends: {
              text: {
                fontSize: 12,
                fill: '#000000',
              },
            },
            axis: {
              legend: {
                text: {
                  fontSize: 20,
                  fill: '#000000',
                },
              },
              ticks: {
                text: {
                  fontSize: 16,
                  fill: '#000000',
                },
              },
            },
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'department',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          // axisLeft={{
          //   tickSize: 5,
          //   tickPadding: 5,
          //   tickRotation: 0,
          //   legend: '인원',
          //   legendPosition: 'middle',
          //   legendOffset: -60,
          // }}
          labelSkipWidth={36}
          labelSkipHeight={12}
          onClick={handle.barClick}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
              onClick: handle.legendClick,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Barchart;
