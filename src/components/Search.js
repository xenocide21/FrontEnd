import React, {useEffect, useState} from "react";
// import { Input } from "antd";
// import { api } from '../utils/AxiosWithAuth'
import axios from 'axios'
// import Card from './Card';
import CardList from './CardList';

import "antd/dist/antd.css";



export default function Search () {
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [strains, setStrains] = useState([]); //useState({strainObject: {831: {Strain: "G-Force", Type: "indica", Rating: 5, Description: "G-Force by Flying Dutchman is a hearty G13 and Sku…rug off stress and help mute aches and pains.    "}, 1512: {Strain: "G-Force", Type: "indica", Rating: 5, Description: "G-Force by Flying Dutchman is a hearty G13 and Sku…rug off stress and help mute aches and pains.    "}, 1577: {Strain: "G-Force", Type: "indica", Rating: 5, Description: "G-Force by Flying Dutchman is a hearty G13 and Sku…rug off stress and help mute aches and pains.    "}, 1965: {Strain: "G-Force", Type: "indica", Rating: 5, Description: "G-Force by Flying Dutchman is a hearty G13 and Sku…rug off stress and help mute aches and pains.    "}, 2257: {Strain: "G-Force", Type: "indica", Rating: 5, Description: "G-Force by Flying Dutchman is a hearty G13 and Sku…rug off stress and help mute aches and pains.    "}}});
  const [symptoms, setSymptoms] = useState([]);

  const handleChange = e =>{
    e.preventDefault();
    setData({...data, [e.target.name]: e.target.value})
  };
  const handleChange2 = e =>{
    e.preventDefault();
    setData2({...data2, [e.target.name]: e.target.value})
  };

   useEffect(() => {
     console.log("strains (state) 2:", strains);
   }, [strains]);

  useEffect(() => {
    console.log("symptoms (state) 2:", symptoms);
  }, [symptoms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://cors-anywhere.herokuapp.com/https://medcab3-api.herokuapp.com/strains', data)
      .then(r => {
        let strainObject = {};
        let strainArray = [];
        console.log(r);
        let strainIds = Object.keys(r.data['Strain']);
        console.log("strainIds (array)", strainIds);
        strainIds.forEach((strain) => {
          strainObject[strain] = {Strain: r.data.Strain[strain], Type: r.data.Type[strain], Rating: r.data.Rating[strain], Description: r.data.Description[strain]};
          strainArray.push(strainObject[strain]);
        });
        // setStrains({strainObject}); //r.data.[Strain,Type,Rating,Description]
        setStrains(strainArray);
        console.log("strains (state) 1:", strains);
        console.log("strainObject:", strainObject);
        // setSymptoms(r.data); //r.data.[Strain,Type,Rating,Effects,Flavor,Description,symptoms_diseases]
        console.log("data:", data);
      })
      .catch(err => { console.log(err) })
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    axios
      .post('https://cors-anywhere.herokuapp.com/https://medcab3-api.herokuapp.com/symptom', data2)
      .then(r => {
        let symptomsObject = {};
        let symptomsArray = [];
        console.log(r);
        let symptomsIds = Object.keys(r.data['Strain']);
        console.log("symptomsIds (array)", symptomsIds);
        symptomsIds.forEach((symptom) => {
          symptomsObject[symptom] = {Strain: r.data.Strain[symptom], Type: r.data.Type[symptom], Rating: r.data.Rating[symptom], Description: r.data.Description[symptom]};
          symptomsArray.push(symptomsObject[symptom]);
        });
        // setStrains({strainObject}); //r.data.[Strain,Type,Rating,Description]
        setSymptoms(symptomsArray);
        console.log("symptoms (state) 1:", symptoms);
        console.log("symptomsObject:", symptomsObject);
        // setSymptoms(r.data); //r.data.[Strain,Type,Rating,Effects,Flavor,Description,symptoms_diseases]
        console.log("data:", data2);
      })
      .catch(err => { console.log(err) })
  };

    return (
      <div>
        <div>
          <form className='searchForm' onSubmit={handleSubmit}>
            Name: <input type='text'
                         name='input'
                         value={data.input}
                         onChange={handleChange}
          />
            <button type='submit'>Search Strains by Flavor and Effects</button>
          </form>
          <CardList strains={strains}/>
        </div>
        <div>
          <form className='searchForm2' onSubmit={handleSubmit2}>
            Name: <input type='text'
                         name='input'
                         value={data2.input}
                         onChange={handleChange2}
          />
            <button type='submit'>Search Strains by Symptoms</button>
          </form>
          <CardList strains={symptoms}/>
        </div>
      </div>
    )
}
