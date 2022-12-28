import React from 'react';
import AddPosst from './AddPost';
import { TabTitle } from '../../title';

function App() {
    TabTitle('Đăng bài');
    const get_user = JSON.parse(localStorage.getItem('user'));
       
    return (
        <div>
        {get_user ? <AddPosst /> :  <div className="text-center No_user____"><img className="img_________" src="https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A3nh-icon-bu%E1%BB%93n-mu%E1%BB%91n-kh%C3%B3c-1024x1024.jpg" alt="" />
                                            <p>Vui lòng đăng nhập tài khoản </p>
                                        </div>}
        </div>
        
    );
}
export default App