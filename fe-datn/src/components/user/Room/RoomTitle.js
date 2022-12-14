import React from 'react';
import { Link } from 'react-router-dom';
function RoomTitle() {
  return (
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Tất cả phòng</h2>
                            <Link to='../priceRoom'>tôi nè</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default RoomTitle
