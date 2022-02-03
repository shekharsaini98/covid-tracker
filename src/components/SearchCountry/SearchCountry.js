import React, { useState } from 'react';
import countryList from '../../countryList';
import {Link} from 'react-router-dom';
import './SearchCounty.css';
function SearchCountry() {
    const [searchName, setSearchName] = useState('')
    const [countryListShow, setCountryListShow] = useState('')
    const handleSearch = (event)=>{
        let serchVal = event.target.value;
        console.log('serchVal',serchVal)
        setSearchName(serchVal);
        if(serchVal.length === 0){
            setCountryListShow('');
        }
        else{
            const newList = countryList.filter((ct)=>(ct[0]).toLowerCase().includes(serchVal.toLowerCase()));
            const newctList = newList.map((ct,index)=><Link key={index} to={`/covid-tracker/${ct[1]}`}><li >{ct[0]}</li></Link>);
            setCountryListShow(newctList);
        }
    }
    return <div>
        {
            <>
                <input 
                    className='countrySearch' 
                    placeholder='Search by country name'
                    onChange={(e)=>handleSearch(e)}
                    value={searchName}
                />
                <div className='countryListWrapper'>
                    <ul className='countryList'>
                        {countryListShow}
                    </ul>
                </div>
            </>
        }
        
    </div>;
}

export default SearchCountry;
