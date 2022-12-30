import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {url} from '../url';
import { TabTitle } from '../title';
import HashLoader from "react-spinners/HashLoader";

function About() {
  TabTitle('Giới thiệu');
  const [listAbout, setListAbout] = useState([]);  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    getData()
  },[]);
  
  const getData= async () => {
    const result = await axios.get(`${url}/config`);
    setListAbout(result.data.data);
   };

    return (
    <>
      {loading ? 
        <HashLoader className='css_loading'
        color={'#0d3380'}
        loading={loading}
        size={100}
        style={{display: 'inherit', position: 'relative', height: '100px', transform: 'rotate(165deg)'}}
        />
      : 
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
          <div className="container-fluid" dangerouslySetInnerHTML={{__html: listAbout.introduce}} />
      </div>
    </>
    }     
    </>
  )
}

export default About