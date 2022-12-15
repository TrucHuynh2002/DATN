import React from 'react';
import ChartBill from './ChartBill';
import PriceRoom from '../../user/Room/PriceRoom';
const user = JSON.parse(localStorage.getItem("user"));
// if(!user){
//     window.location="https://localhost:3000/Loi";
// }
function LayoutBill() {
    // Nếu k có đường dẫn sau đó là :id_user thì trả về trang lỗi
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