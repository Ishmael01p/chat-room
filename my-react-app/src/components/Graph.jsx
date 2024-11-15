import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function Graph({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // Transform the data
    const lineData = data.map((item) => ({
      time: new Date(item.t).toLocaleTimeString(), // Format time for the X-axis
      price: item.c, // Use close price for the Y-axis
    }));

    const option = {
      title: {
        text: 'Stock Price Over Time',
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
        data: lineData.map((item) => item.time), // X-axis: Time
        axisLabel: {
          formatter: (value) => value, // Show formatted time
        },
      },
      yAxis: {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: (value) => `$${value.toFixed(2)}`, // Show prices with dollar signs
        },
      },
      series: [
        {
          name: 'Price',
          type: 'line',
          smooth: true, // Smooth line like Robinhood
          data: lineData.map((item) => [item.time, item.price]), // Line chart data
          lineStyle: {
            width: 2,
            color: '#00C853', // Green line color
          },
          areaStyle: {
            color: 'rgba(0, 200, 83, 0.1)', // Light green shading below the line
          },
          symbol: 'none', // No symbols at data points
        },
      ],
    };

    chartInstance.setOption(option);

    // Cleanup on unmount
    return () => {
      chartInstance.dispose();
    };
  }, [data]); // Re-render the chart if the data changes

  return (
    <div>
      <h2>Stock Chart</h2>
      <div
        ref={chartRef}
        style={{ width: '100%', height: '400px', marginTop: '20px' }}
      ></div>
    </div>
  );
}

export default Graph;
