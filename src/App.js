import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartRace from './component/Chart';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ChartRaceLib from './component/ChartRace'

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [dataToChart, setDataToChart] = useState([]);
  const [year, setYear] = useState(1951)

  const callApi = async () => {
    try {
      const res = await axios.get(`https://chart-race-api.vercel.app/api/getdata?years=${year}`)
      setData(res.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, [year]);

  useEffect(() => {
    if (data.length > 0) {
      const dataToChartRace = data.map((values, index) => ({
        id: index,
        title: values.Entity,
        value: values.Population,
      }));
      setDataToChart(dataToChartRace);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(prevYear => (prevYear === 2023 ? 1951 : prevYear + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const datas = [
    { id: 1, title: 'USA', value: 100, color: 'blue' },
    { id: 2, title: 'China', value: 90, color: 'red' },
    { id: 3, title: 'India', value: 85, color: 'green' },
    { id: 4, title: 'Russia', value: 70, color: 'yellow' },
    { id: 5, title: 'Japan', value: 60, color: 'purple' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Population growth per country, 1951 to 2023</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
        <div>
          <h3>Region</h3>
        </div>
        <div style={{ width: '20px', height: '20px', backgroundColor: 'rgb(67, 40, 231)', borderRadius: '20%' }}></div>
        <p>Asia</p>
        <div style={{ width: '20px', height: '20px', backgroundColor: 'rgb(150, 84, 229)', borderRadius: '20%' }}></div>
        <p>Europe</p>
        <div style={{ width: '20px', height: '20px', backgroundColor: 'rgb(255, 98, 131)', borderRadius: '20%' }}></div>
        <p>Africa</p>
        <div style={{ width: '20px', height: '20px', backgroundColor: 'rgb(255, 197, 2)', borderRadius: '20%' }}></div>
        <p>Americas</p>
      </div>

      <div style={{ position: 'relative', width: '760px', margin: 'auto' }}>
        <Spin spinning={loading} size="large" tip="Loading" indicator={<LoadingOutlined spin />}>
          {/* <ChartRace data={dataToChart} years={year} /> */}
          <ChartRaceLib data={dataToChart} />
          <div style={{ position: 'fixed', bottom: '0px', right: '175px', padding: '10px', fontSize: '80px' }}>
            {!loading ? year : null}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default App;