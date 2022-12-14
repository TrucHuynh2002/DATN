import React from 'react';
import ChartBill from './ChartBill';
import PriceRoom from '../../user/Room/PriceRoom';

function LayoutBill() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Phòng đang thuê</h2>
                        </div>
                    </div>
               </div>
            </div>  
        </div>
        <div className='row'>
            <PriceRoom />
            <ChartBill />
        </div>
    </>
  )
}

export default LayoutBill