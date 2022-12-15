import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PriceRoom() {
  return (
    <>
        <div className="manage col-6">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <h1><b className="b_title">Hóa đơn</b></h1>
                        <div className='row bill'>                         
                            <div className='col-lg-4 col-sm-12'>
                                <span>Từ ngày </span><span>sss</span><span>đến</span><span>dd</span>
                            </div>   
                            <form >                       
                                <div className='col-lg-8 col-sm-12'>
                                    <div className='row'>
                                        <div className='col-lg-4 col-sm-12'>
                                            <input type="date" name="" className='form-control'/>                  
                                        </div>
                                        <div className='col-lg-4 col-sm-12'>
                                            <input type="date" name="" className='form-control'/>                 
                                        </div>
                                        <div className='col-lg-4 col-sm-12'>
                                            <Button   
                                                variant="warning" 
                                                style={{color: 'black', fontWeight: 600, borderRadius: '5px'}}> Lọc
                                                <i className="fa-solid fa-filter" 
                                                style={{marginLeft: '7px'}} 
                                                ></i>
                                            </Button>          
                                        </div>
                                    </div>  
                                </div>                             
                            </form>      
                            <Link to='../billdetail'>test</Link>                    
                        </div> 
                        <hr></hr>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PriceRoom
