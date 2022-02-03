import React from 'react';
import {useSelector} from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
function Piechart() {
    const state = useSelector(state=>state.countryStats);
    const {countryStats:{data},countryStatsLoading} = state;
    let pieData;
    if(data!==undefined){
        const pielastData = data[data.length-1];
        const {Confirmed,Deaths,Recovered}= pielastData;
        pieData = {
            labels: [`Cases ${Confirmed}`, `Deaths ${Deaths}`, `Recovered ${Recovered}`],
            datasets: [
            {
                label: '# of Votes',
                data: [Confirmed,Deaths,Recovered],
                backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                ],
            },
            ],
        }
    }  
    return <>
        {
            (countryStatsLoading)?
            <p>Loading...</p>:
            <Pie data={pieData} className="countryStatsPie"/>
        }
    </>
}

export default Piechart;
