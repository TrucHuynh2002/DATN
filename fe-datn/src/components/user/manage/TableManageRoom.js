import React from 'react';
import { Table } from 'react-bootstrap';

function TableManageRoom() {
  return (
    <>
        <div className="manage">
            {/* <div className="container"> */}
                <div className="content_profile">
                    <div className="list-post">
                        <div className='row'>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                        <th>10</th>
                                    </tr>
                                </thead>                           
                                <tbody className="list-cate">                
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>  
                                </tbody>
                            </Table>
                            <div className='color_room_manage'>
                                <div className='color_empty_room'></div><span style={{marginLeft:"5px"}}>Phòng trống</span>
                                <div className='color_ownership_room'></div><span style={{marginLeft:"5px"}}>Phòng đã sở hữu</span>
                                <div className='color_deposit_room'></div><span style={{marginLeft:"5px"}}>Phòng đặt cọc</span>
                            </div>
                        </div>                      
                    </div>
                </div>
            {/* </div> */}
        </div>
    </>
  )
}

export default TableManageRoom