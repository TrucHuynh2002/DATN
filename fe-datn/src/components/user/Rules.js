import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
function Rules() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Điều khoản sử dụng</h2>
                   
                        </div>
                    </div>
                </div>
            </div>

   
        </div>

        <h2 className='rule'>Để tạo tài khoản Google, bạn cần phải đồng ý với điều khoản bên dưới.</h2>
            <h2 className="ruletext">Bên cạnh đó, khi bạn tạo tài khoản, chúng tôi sẽ xử lý thông tin của bạn theo cách đã mô 
                tả trong Chính sách quyền riêng tư của chúng tôi, bao gồm các điểm chính sau:</h2>
            <p className="ruletext2">Dữ liệu chúng tôi xử lý khi bạn sử dụng Google</p>
            
               <p className='ruletext3'> &bull; Khi bạn thiết lập một Tài khoản Google, chúng tôi lưu trữ thông tin bạn cung cấp cho chúng tôi như tên, địa chỉ email và số điện thoại của bạn.</p>
               <p className='ruletext3'> &bull; Khi bạn sử dụng dịch vụ của Google để làm những việc như viết thư trong Gmail hoặc nhận xét về một video YouTube, chúng tôi lưu trữ thông tin mà bạn tạo.</p>
               <p className='ruletext3'> &bull; Ví dụ, khi bạn tìm kiếm một nhà hàng trên Google Maps hoặc xem video trên YouTube, chúng tôi xử lý thông tin về hoạt động đó - bao gồm các thông tin như video bạn xem, ID thiết bị, địa chỉ IP, dữ liệu cookie và vị trí.</p>
               <p className='ruletext3'> &bull; Chúng tôi cũng xử lý các loại thông tin được mô tả ở trên khi bạn sử dụng các ứng dụng hoặc trang web có sử dụng các dịch vụ của Google như quảng cáo, Analytics và trình phát video YouTube.</p>
            <p className="ruletext2">Tại sao chúng tôi xử lý dữ liệu</p>
                <p className="ruletextextra">Chúng tôi xử lý dữ liệu này cho các mục đích mô tả trong chính sách của chúng tôi, bao gồm:</p>
                <p className='ruletext3'> &bull; Giúp các dịch vụ của chúng tôi cung cấp nội dung tùy chỉnh, hữu ích hơn, chẳng hạn như kết quả tìm kiếm phù hợp hơn;</p>   
                <p className='ruletext3'> &bull; Cải thiện chất lượng dịch vụ và phát triển dịch vụ mới;</p>  
                <p className='ruletext3'> &bull; Phân phối quảng cáo được cá nhân hóa, tùy thuộc vào các tùy chọn cài đặt tài khoản của bạn, trên các dịch vụ của Google cũng như các trang web và ứng dụng hợp tác với Google;</p>  
                <p className='ruletext3'> &bull; Tăng cường bảo mật bằng cách bảo vệ chống gian lận và lạm dụng;</p>  
                <p className='ruletext3'> &bull; Tiến hành phân tích và đo lường để hiểu cách thức dịch vụ của chúng tôi được sử dụng. Chúng tôi cũng có các đối tác đo lường cách thức dịch vụ của chúng tôi được sử dụng.</p>      
            <p className="ruletext2">Kết hợp dữ liệu</p>
            <p className="ruletextextra">Chúng tôi cũng kết hợp dữ liệu này giữa các dịch vụ của chúng tôi và trên thiết bị của bạn
                    cho những mục đích này. Ví dụ: tùy thuộc vào các tùy chọn cài đặt tài khoản của bạn, chúng tôi hiển thị cho bạn quảng
                    cáo dựa trên thông tin về sở thích của bạn mà chúng tôi suy ra được từ những lần bạn sử dụng dịch vụ Tìm kiếm và 
                    YouTube. Ngoài ra, chúng tôi sử dụng dữ liệu từ hàng nghìn tỉ cụm từ tìm kiếm để tạo các mẫu sửa chính tả mà chúng 
                    tôi sử dụng trên tất cả các dịch vụ của mình.
            </p>
            <p className="ruletext2">Bạn nắm quyền kiểm soát</p>
                        <p className="ruletextextra">Tùy thuộc vào cài đặt tài khoản, một số dữ liệu này có thể được liên kết với 
                        Tài khoản Google của bạn và chúng tôi xử lý dữ liệu này như thông tin cá nhân. Bạn có thể kiểm soát cách
                         chúng tôi thu thập và sử dụng dữ liệu này bằng cách nhấp vào "Tùy chọn khác" ở bên dưới. Bạn luôn có thể 
                         chỉnh sửa cài đặt kiểm soát sau này hoặc rút lại sự đồng ý của mình trong tương lai bằng cách truy cập 
                         vào Tài khoản của tôi (myaccount.google.com).
                        </p>
                        <NavLink to={`#`}>
                                    <Button className='btnrule'>Đồng ý</Button>
                                </NavLink>
                        {/* <Button className='btnrule'>Tôi đồng ý</Button> */}
        </>
  )
}

export default Rules
