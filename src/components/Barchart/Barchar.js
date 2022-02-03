import React from 'react';
import Chart from 'react-apexcharts'
import './Barchart.css';

function Barchar({options,series}) {
    
    return <>
        {
            <Chart options={options} series={series} type="area" className="barChart" height={450} />
        }
    </>
}

export default Barchar;