import React, { useState, useEffect } from 'react';
// import ChartRace from 'react-chart-race';
import axios from 'axios';
import ChartRace from './component/Chart';

const App = () => {
  const [data, setData] = useState([]);
  const [dataToChart, setDataToChart] = useState([]);
  const [year, setYear] = useState(1951)

  const callApi = async () => {
    try {
      const res = await axios.get(`https://chart-race-api.vercel.app/api/getdata?years=${year}`)
      setData(res.data);
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
  console.log(data)

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(prevYear => (prevYear === 2023 ? 1951 : prevYear + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      {/* <div style={{ position: 'relative', width: '760px',margin:'auto' }}>
        <ChartRace
          data={dataToChart}
          backgroundColor='#000'
          width={760}
          padding={12}
          itemHeight={58}
          gap={12}
          titleStyle={{ font: 'normal 400 13px Arial', color: '#fff' }}
          valueStyle={{ font: 'normal 400 11px Arial', color: 'rgba(255,255,255,0.42)' }}
        />
        <div style={{ position: 'absolute', color: 'white', zIndex: '999', fontSize: '80px', bottom: '10px', right: '10px' }}>
          {year}
        </div>
      </div> */}
      {dataToChart.length > 0 && (
        <div style={{ position: 'relative', width: '760px', margin: 'auto' }}>
          <ChartRace data={dataToChart} years={year} />
          <div style={{ position: 'absolute', color: 'black', zIndex: '999', fontSize: '80px', bottom: '10px', right: '10px' }}>
            {year}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

//---------------- Libary RacingBars -----------------------------

// import RacingBars from "racing-bars/react";

// export default function App() {
//   const options = {
//     dataUrl: "https://racing-bars.hatemhosny.dev/data/population.csv",
//     dataTransform: (data) =>
//       data.map((d) => ({
//         ...d,
//         icon: `https://flagsapi.com/${d.code}/flat/64.png`,
//       })),
//     title: "World Population in 60 Years",
//     subTitle: "Country Population in millions",
//     caption: "Source: World Bank",
//     dateCounter: "YYYY",
//     showIcons: true,
//     labelsPosition: "outside",
//   };

//   return (
//     <div>
//       <RacingBars className="race" {...options}>Loading...</RacingBars>
//     </div>
//   )
// }