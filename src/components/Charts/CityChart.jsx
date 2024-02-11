import React from 'react';
import Chart from 'react-apexcharts';

const CityChart = () => {
  const indianCitiesData = {
    pieOptions: {
      labels: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai'],
      legend: {
        position: 'bottom',
        markers: {
          width: 12,
          height: 12,
        },
      },
    },
    pieSeries: [20, 15, 25, 10, 30],
    lineOptions: {
      xaxis: {
        categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
      },
      tooltip: {
        enabled: true, 
      },
      markers: {
        size: 5,
        show: false, 
    }
    },

    lineSeries: [{
      name: 'Mumbai',
      data: [30, 40, 25, 50, 49, 21, 70, 51, 60, 49, 62, 91],
    }, ],
  };

  return (
   <div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-20 ">

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-lg p-4 m-5">
        <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
        <Chart
          options={indianCitiesData.pieOptions}
          series={indianCitiesData.pieSeries}
          type="donut"
          width="100%"
          height="300"
        />
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-lg shadow-lg p-4 m-5">
        <h2 className="text-lg font-semibold mb-4">Line Chart</h2>
        <Chart
          options={indianCitiesData.lineOptions}
          
          series={indianCitiesData.lineSeries}
          type="line"
          width="100%"
          height="300"
        />
      </div>

      {/* Table */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-4 m-5">
        <h2 className="text-lg font-semibold mb-4">City Data Table</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {indianCitiesData.pieOptions.labels.map((city, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{city}</td>
                <td className="px-6 py-4 whitespace-nowrap">{indianCitiesData.pieSeries[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </div>
  );
};

export default CityChart;
