import styles from './LineChart.module.css';
import React, { useState, useEffect } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import {API_BASE_URL} from '../config/host-cofig';


const LineCharts = () => {
    const API_PROC_URL = API_BASE_URL + 'ynfinal/performance';

    const [chartData, setChartData] = useState([]);


     useEffect(() => { 
       fetch(API_PROC_URL)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
            name: item.finishedName,
            양품: item.performanceGoodCnt,
            불량: item.performanceBadCnt,
          }));
          setChartData(formattedData);
        })
        .catch(error => {
          console.error('데이터 로드 중 오류가 발생했습니다:', error);
        });
    }, []);
    console.log(chartData);

  return ( 
    <>
  <div style={{ width: 1100, textAlign : "center"}}><span>생산실적</span></div>
  <LineChart
    width={1100}
    height={400}
    data={chartData}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="양품" stroke="#FFB74D" activeDot={{ r: 8 }} />
    <Line type="monotone" dataKey="불량" stroke="#2196F3" />
  </LineChart>
    </>
  )
}

export default LineCharts
