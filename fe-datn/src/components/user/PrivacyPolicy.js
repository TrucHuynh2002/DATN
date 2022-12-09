import React from 'react'
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
function PrivacyPolicy() {
  return (
    <div className='privacypolicy'>
        <Link to="/">
        <img className="logo-privacy " src={logo} alt="#" width={400} height={150} />
      </Link>
        <p className="title-privacy">Nguyên tắc về quyền riêng tư của Tìm Trọ Nhà Tui</p>
        <p className="content-privacy">
          Tìm Trọ Nhà Tui được xây dựng để đưa mọi người có thể tìm kiếm phòng ở dễ dàng hơn.
          Chúng tôi giúp bạn kết nối với các chủ phòng,
          khám phá các căng phòng và tìm kiếm những căn phòng mà bạn cần.
          Chúng tôi nhận thấy mọi người sử dụng Tìm Trọ Nhà Tui để tìm kiếm phòng ở,
          nhưng không phải ai cũng muốn chia sẻ tất cả mọi thứ với tất cả mọi người - ngay cả là chia sẻ với chúng tôi.
          Quan trọng là bạn có quyền lựa chọn dữ liệu của mình nên được sử dụng như thế nào.
          Đây là các nguyên tắc định hướng cách chúng tôi tiếp cận vấn đề quyền riêng tư tại Tìm Trọ Nhà Tui.
        </p>
        <h1 className="h1privacy">
          Chúng tôi trao cho bạn khả năng kiểm soát quyền riêng tư của mình
        </h1>
        <p className="p-privacy"> Bạn có thể đưa ra các lựa chọn về quyền riêng tư sao cho phù hợp với bản thân.
          Chúng tôi muốn đảm bảo bạn biết các công cụ kiểm soát quyền riêng tư của mình nằm ở đâu và
          làm sao để điều chỉnh chúng. Ví dụ: bằng công cụ thay đổi mật khẩu của chúng tôi, bạn có
          thể thay đổi mật khẩu của bạn một cách dễ dàng. Chúng tôi phát triển các biện pháp kiểm 
          soát dựa trên phản hồi từ tất cả những người dùng.</p>
        <h1 className="h1privacy">
          Chúng tôi muốn mọi người hiểu dữ liệu của họ được sử dụng như thế nào
        </h1>
        <p className="p-privacy"> Mặc dù Chính sách bảo mật có mô tả chi tiết cách làm của chúng tôi nhưng
          không dừng lại ở đó, chúng tôi còn cung cấp cho bạn nhiều thông tin hơn nữa. Ví dụ: chúng tôi
          đưa các cách hướng dẫn vào quá trình sử dụng Tìm Trọ Nhà Tui hàng ngày của mọi người - như các bài viết hướng dẫn
          chọn trọ phù hợp với bản thân người dùng.</p>
        <h1 className="h1privacy">
          Chúng tôi thiết kế quyền riêng tư trong sản phẩm của mình ngay từ đầu
        </h1>
        <p className="p-privacy"> Chúng tôi thiết kế quyền riêng tư trong các sản phẩm của Tìm Trọ Nhà Tui dưới sự 
          tìm hiểu qua mạng xã hội của các chuyên gia trong nhiều lĩnh vực như bảo vệ dữ liệu và luật về quyền riêng tư, 
          bảo mật, thiết kế giao diện, kỹ thuật, quản lý sản phẩm và chính sách công. Đội ngũ quyền riêng 
          tư của chúng tôi tìm cách đưa những quan điểm đa chiều này vào mọi giai đoạn trong quá trình thiết kế sản phẩm.</p>
        <h1 className="h1privacy">
          Chúng tôi nỗ lực để giữ cho thông tin của bạn an toàn
        </h1>
        <p className="p-privacy"> Chúng tôi làm việc không quản ngày đêm để bảo vệ tài khoản của mọi người và tích hợp
          khả năng bảo mật vào mọi sản phẩm của Tìm Trọ Nhà Tui. Bạn cũng có thể sử dụng các
          công cụ bảo mật của chúng tôi như thay đổi mật khẩu theo định kì hàng tháng để giữ cho tài khoản của mình an toàn hơn nữa.</p>
       
       <h1 className="h1privacy">
         Bạn sở hữu và có thể xóa thông tin của mình
        </h1>
        <p className="p-privacy">Bạn sở hữu thông tin mình chia sẻ trên Tìm Trọ Nhà Tui.
         Có nghĩa là bạn được quyết định sẽ chia sẻ điều gì và với ai trên Tìm Trọ Nhà Tui và có
          thể thay đổi quyết định đó. Đây là lý do chúng tôi cung cấp cho bạn các công cụ để xóa 
          bất kỳ nội dung nào bạn đã đăng. Chúng tôi xóa nội dung đó khỏi dòng thời gian của bạn 
          và máy chủ của chúng tôi. Bạn cũng có thể xóa tài khoản bất cứ khi nào bạn muốn.</p>
      
      <h1 className="h1privacy">
      Không ngừng cải thiện        </h1>
        <p className="p-privacy">Chúng tôi không ngừng nỗ lực phát triển các biện pháp kiểm soát mới
         và thiết kế chúng sao cho thật rõ ràng với mọi người. Chúng tôi đầu tư vào nghiên cứu để bảo vệ tài khoản của các bạn một cách tốt nhất.</p>
      
        <h1 className="h1privacy">
        Chúng tôi hành động có trách nhiệm       </h1>
        <p className="p-privacy">Ngoài việc xem xét toàn diện về quyền riêng tư, chúng tôi còn nghiêm ngặt thử
         nghiệm bảo mật dữ liệu với sản phẩm. Chúng tôi cũng tìm hiểu ý kiến về các chính sách cũng như cách xử lý dữ liệu của
          các nhà quản lý, nhà lập pháp và chuyên gia
          về quyền riêng tư từ khắp nơi trên thế giới.
</p>
      
      
      </div>
  )
}

export default PrivacyPolicy
