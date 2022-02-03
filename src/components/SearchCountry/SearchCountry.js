import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './SearchCounty.css';
function SearchCountry({searchList, listType}) {
    const [searchName, setSearchName] = useState('')
    const [countryListShow, setCountryListShow] = useState('')
    const clearSearch = ()=>{
        setSearchName('');
        setCountryListShow('');
    }
    const handleSearch = (event)=>{
        let serchVal = event.target.value;
        setSearchName(serchVal);
        if(serchVal.length === 0){
            setCountryListShow('');
        }
        else{
            let newctList;
            const newList = searchList.filter((ct)=>(ct[0]).toLowerCase().includes(serchVal.toLowerCase()));
            newctList = newList.map((ct,index)=><Link onClick={()=>clearSearch()} key={index} to={(listType==='country')?`/${ct[1]}/`:`/india/${(ct[1].toLowerCase())}/`} ><li >{ct[0]}</li></Link>);
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
