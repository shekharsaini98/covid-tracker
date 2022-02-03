import React from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts'
import moment from 'moment';
import './Barchart.css';

function Barchar() {
    const state = useSelector(state=>state.countryStats);
    const {countryStats:{data},countryStatsLoading} = state;
    let series;let options;
    if(data!==undefined){
        series= [
              {
                name: 'Covid Cases',
                data: data.map((dt)=> [moment(dt.Date).valueOf(), dt.Confirmed])
              },
              {
                name: 'Deaths',
                data: data.map((dt)=> [moment(dt.Date).valueOf(), dt.Deaths])
              },
              {
                name: 'Recovered',
                data: data.map((dt)=> [moment(dt.Date).valueOf(), dt.Recovered])
              }
            ];
            options = {
              chart: {
                type: 'area',
                height: 350,
                stacked: true,
                events: {
                  selection: function (chart, e) {
                    new Date(e.xaxis.min)
                  }
                },
              },
              colors: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              fill: {
                type: 'gradient',
                gradient: {
                  opacityFrom: 0.6,
                  opacityTo: 0.8,
                }
              },
              legend: {
                position: 'top',
                horizontalAlign: 'left'
              },
              xaxis: {
                type: 'datetime'
              },
            };
    }  
    return <>
        {
            (countryStatsLoading)?
            <p>Loading...</p>:
            <Chart options={options} series={series} type="area" className="barChart" height={450} />
            
        }
    </>
}

export default Barchar;

// barLabels= data.map((dt)=>dt.Date.slice(0,10));
        // barData= {
        //     barLabels,
        //     fill: true,
        //     datasets: [
        //         {
        //         label: 'Covid Cases',
        //         data: data.map((dt) => dt.Confirmed),
        //         backgroundColor: 'rgba(54, 162, 235, 1)',
        //         },
        //         {
        //         label: 'Deaths',
        //         data: data.map((dt) => dt.Deaths),
        //         backgroundColor: 'rgba(255, 99, 132, 1)',
        //         },
        //         {
        //         label: 'Recovered',
        //         data: data.map((dt) => dt.Recovered),
        //         backgroundColor: 'rgba(75, 192, 192, 1)',
        //         },
        //     ],
        // }
        // console.log('barData',barData)
