import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../styles/Graph.css'

function Graph({ data, title }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // Transform the data for the line chart
    const lineData = data.map((item) => ({
      time: new Date(item.t).toLocaleTimeString(), // X-axis: Time
      price: item.c, // Y-axis: Price
    }));

    const option = {
      title: {
        text: title, // Dynamic title
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const { name, value } = params[0];
          return `Time: ${name}<br>Price: $${value[1].toFixed(2)}`;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: lineData.map((item) => item.time),
        axisLabel: {
          formatter: (value) => value,
        },
      },
      yAxis: {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: (value) => `$${value.toFixed(2)}`,
        },
      },
      series: [
        {
          name: 'Price',
          type: 'line',
          smooth: true,
          data: lineData.map((item) => [item.time, item.price]),
          lineStyle: {
            width: 2,
            color: '#FF5722', // Customize line color
          },
          areaStyle: {
            color: 'rgba(255, 87, 34, 0.1)', // Shading under the line
          },
          symbol: 'none',
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [data, title]);

  return (
    <div>
      <div ref={chartRef} style={{ width: '100%', height: '500px', marginTop: '20px' }}></div>
    </div>
  );
}

export default Graph;
