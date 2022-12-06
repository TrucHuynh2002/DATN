import React from 'react'

import axios from 'axios';
import { useEffect, useState } from 'react';
function About() {
  useEffect(() => {
    getData()
   
  },[]);
  const [listAbout, setListAbout] = useState([]);
  const getData= async () => {
    const result = await axios.get("http://127.0.0.1:8000/api/about/show");
    setListAbout(result.data.data);
   };
  return (
    <>
      <div className="back_re">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <h2>Về chúng tôi</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
     <div className="about1">
     <div className="container-fluid" dangerouslySetInnerHTML={{__html: listAbout[0].introduce}} />
    </div>
    </>
  )
}

export default About