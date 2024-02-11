import React, { useState, useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom'; // Import Link

const Charts = () => {
    const [minTemperature, setMinTemperature] = useState(5);
    const [maxTemperature, setMaxTemperature] = useState(30);

    const stateData = useMemo(() => [
        { state: "Andhra Pradesh", population: 49506799, temperature: -5 },
        { state: "Arunachal Pradesh", population: 1383727, temperature: 15 },
        { state: "Assam", population: 31205576, temperature: 20 },
        { state: "Bihar", population: 13000000, temperature: 35 },
        { state: "Chandigarh", population: 13000000, temperature: -17 },
        { state: "Chhattisgarh", population: 13000000, temperature: 10 },
        { state: "Dadra and Nagar Haveli", population: 13000000, temperature: 10 },
        { state: "Daman and Diu", population: 13000000, temperature: -20 },
        { state: "Delhi", population: 13000000, temperature: 32 },
        { state: "Goa", population: 13000000, temperature: 10 },
        { state: "Gujarat", population: 13000000, temperature: -16 },
        { state: "Haryana", population: 13000000, temperature: 40 },
    ], []);

    useEffect(() => {
        const tempValues = stateData.map(state => state.temperature);
        setMinTemperature(Math.min(...tempValues));
        setMaxTemperature(Math.max(...tempValues));
    }, [stateData]);

    const options = {
        series: [
            {
                data: stateData.map(state => ({
                    x: state.state,
                    y: state.temperature,
                    z: state.population
                }))
            },
        ],
        legend: { show: false },
        chart: { height: 350, type: 'treemap' },
        title: { text: 'Indian State' },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
            },
            formatter: function (text, op) {
                return [text, op.value];
            },
            offsetY: -4,
        },
        plotOptions: {
            treemap: {
                enableShades: true,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                colorScale: {
                    ranges: [
                        { from: -Infinity, to: 5, color: '#4287f5' }, 
                        { from: 5, to: 30, color: '#7d7df6' }, 
                        { from: 30, to: Infinity, color: '#FF0000' }, 
                    ],
                },
                
            },
        },
        tooltip: {
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                return `<div class="custom-tooltip">State: ${w.config.series[seriesIndex].data[dataPointIndex].x}<br>Temperature: ${w.config.series[seriesIndex].data[dataPointIndex].y}<br>Population: ${w.config.series[seriesIndex].data[dataPointIndex].z}</div>`;
            }
        }
    };

    return (
        <div className='pt-20 px-10 '>
            {/* Wrap the Chart with Link component */}
            <Link to="/city-chart">
                <div className={`w-full h-96`}>
                    <Chart options={options} series={options.series} type="treemap" height="100%" />
                </div>
            </Link>
        </div>
    );
};

export default Charts;
