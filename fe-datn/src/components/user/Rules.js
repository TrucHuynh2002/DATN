import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { url } from '../url';

function Rules() {
    const user = JSON.parse(localStorage.getItem('user'));
    const id_user = user ? user[0].id : 0;
    const [alert, setAlert] = useState({
        err_list: {},
    });
    const getDataRoomType = async () => {
        const res = await axios.put(`${url}/user/updateStatus/${id_user}`);
        if(res.data.status === true){
            const John = [{"id":res.data.data.id_user,"phone":res.data.data.phone,"fullname":res.data.data.full_name,"email": res.data.data.email,"address":res.data.data.address,"role":"1"}];
              const jsonObj = JSON.stringify(John);
              localStorage.setItem("user", jsonObj);
            setAlert({
                err_list: res.data
            });
        }
        else{           
            setAlert({
                err_list: res.data
            });
          
        }
    };
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Điều khoản tài khoản chủ trọ</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container rules" style={{marginTop: '22px'}}>
            <p className='ruletext'>Để tạo tài khoản chủ trọ, bạn cần phải đồng ý với điều khoản bên dưới . Bên cạnh đó, khi bạn tạo tài khoản, chúng tôi sẽ xử lý thông tin của bạn theo cách đã mô tả trong chính sách quyền riêng tư của chúng tôi, bao gồm các điểm chính sau:</p>
            <h3>Dữ liệu chúng tôi xử lý khi bạn sử dụng tài khoản chủ trọ : </h3>
            <p> &bull; Khi bạn thiết lập một tài khoản chủ trọ, chúng tôi lưu trữ thông tin bạn cung cấp cho chúng tôi như tên, địa chỉ email, số điện thoại và thông tin phòng của bạn.</p>
            <p> &bull; Khi bạn sử dụng dịch vụ của chủ trọ để làm những việc như đăng bài, bình luận, quản lý phòng đã đăng, quản lý hóa đơn hoặc nhận xét về một bài đăng, tìm kiếm bài đăng chúng tôi lưu trữ thông tin mà bạn tạo.</p>
            <p> &bull; Ví dụ, khi bạn tìm kiếm một bài đăng trên Nhatui.com hoặc đăng tin và quản lý trên website chúng tôi xử lý thông tin và lưu trữ dữ liệu về hoạt động đó. </p>
            <h3> Tại sao chúng tôi xử lý dữ liệu</h3>
            <p >Chúng tôi xử lý dữ liệu này cho các mục đích mô tả trong chính sách của chúng tôi, bao gồm:</p>
            <p> &bull; Giúp các dịch vụ của chúng tôi cung cấp nội dung tùy chỉnh, hữu ích hơn, chẳng hạn như kết quả tìm kiếm phù hợp hơn;</p>   
            <p> &bull; Cải thiện chất lượng dịch vụ và phát triển dịch vụ mới;</p>  
            <p> &bull; Tăng cường bảo mật bằng cách bảo vệ chống gian lận và lạm dụng;</p>
            <p> &bull; Tiến hành phân tích và đo lường để hiểu cách thức dịch vụ của chúng tôi được sử dụng. Chúng tôi cũng có các đối tác đo lường cách thức dịch vụ của chúng tôi được sử dụng.</p>      
            <h3>Kết hợp dữ liệu : </h3>
            <p > &bull; Chúng tôi cũng kết hợp dữ liệu này giữa các dịch vụ của chúng tôi và trên thiết bị của bạncho những mục đích này. Ví dụ: tùy thuộc vào các tùy chọn cài đặt tài khoản của bạn, chúng tôi hiển thị cho bạn những thông tin dựa trên thông tin về sở thích của bạn mà chúng tôi suy ra được từ những lần bạn sử dụng dịch vụ. </p>
            <h3>Bạn nắm quyền kiểm soát : </h3>
            <p > &bull; Tùy thuộc vào cài đặt tài khoản, một số dữ liệu này có thể được liên kết với tài khoản chủ trọ của bạn và chúng tôi xử lý dữ liệu này như thông tin cá nhân, tìm kiếm, đăng tin, đăng hỏi đáp, bình luận, quản lý hóa đơn,... </p>
            {alert.err_list.status === true && <div className="notice success_____">Đã cập nhật thành công tài khoản chủ trọ </div>}
           <div className="btnrule"> <Button className=' btn btn-primary' onClick={getDataRoomType}>Đồng ý</Button></div>
        </div>
    </>
  )
}

export default Rules