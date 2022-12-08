import React, { useEffect, useState } from 'react'
import axios from 'axios';

function About() {
<<<<<<< HEAD
  
=======

  const [listAbout, setListAbout] = useState([]);  
  useEffect(() => {
    getData()
   
  },[]);
  
  const getData= async () => {
    const result = await axios.get("http://127.0.0.1:8000/api/config");
    setListAbout(result.data.data);
   };

>>>>>>> a83fb8cac23a33884730e96367899bc02d5c5785
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
        <div className="container-fluid" dangerouslySetInnerHTML={{__html: listAbout.introduce}} />
    </div>
    </>
  )
}

export default About