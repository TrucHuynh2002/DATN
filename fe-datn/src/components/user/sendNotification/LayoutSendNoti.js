import React, { useEffect, useState } from 'react';
import ListSendNoti from './ListSendNoti';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function LayoutSendNoti() {
    TabTitle('Gửi yêu cầu');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      },[]);

  return (
    <>
        {loading ? 
            <HashLoader className='css_loading'
            color={'#0d3380'}
            loading={loading}
            size={100}
            />
            :
            <>
                <div className="back_re">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title">
                                    <h2 className="b_title">Quản lý gửi yêu cầu</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="manage">
                    <div className="container-fluid">           
                        <ListSendNoti />
                    </div>            
                </div> 
            </>
        }
    </>
  )
}

export default LayoutSendNoti