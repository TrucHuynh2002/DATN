<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sendmailquenmatkhau</title>
    <style>
        body{
            padding: 50px 500px 50px 500px;
           
        }
        .table{
            /* background-color: aliceblue;
            height: 600px;
            width: 650px; */
            padding: 12px 12px 12px 12px;
        }
        .header{
            text-align: center;
        }
        .body h2{
            text-align: center;
        }
        .code{
            background-color: wheat;
            height: 40px;
            width: 200px;
            text-align: center;
            padding-top: 20px;
            font-weight: bold;
            border-radius: 20px;
            font-size: 20px;
        }
        .button{
            background-color: blue;
            height: 40px;
            width: 100%;
            font-weight: bold;
            font-size:17px;
            border-radius: 20px;
            color: white;
            
        }
    </style>
</head>
<body>
    <div style=" height: 400px;" class="table">
    <div style="margin-bottom: 100px;" class="body">
        
        <h2>Bạn vừa gửi hỗ trợ vấn đề {{$user->subject}}</h2>
        <p>Hello, bạn {{$user->full_name}}</p>
        <p>Tìm trọ sinh viên đã nhận được yêu cầu hỗ trợ của anh/chị với nội dung Re:</p>
        <b>Tiêu đề: {{$user->subject}}</b>
        <p>Nội dung: {{$user->content}}</p><br>
        <p>Tìm trọ sinh viên sẽ kiểm tra và phản hồi lại chậm nhất trong vòng 24h tiếp theo qua email mà anh/chị cung cấp.</p>
        <p>Với các yêu cầu được khởi tạo trong ngày thứ 7, Chủ nhật hàng tuần thì việc trả lời sẽ có chậm trễ đôi chút, Tìm trọ sinh viên sẽ phản hồi lại thông tin chậm nhất trong sáng thứ 2 của tuần làm việc kế tiếp.<br><br>
            
             
            Cảm ơn anh/chị, chúc anh/chị có một ngày làm việc vui vẻ!<br>
            
            image<br>
            
            *Anh/chị chú ý theo dõi và phản hồi thông tin của Tìm trọ sinh viên qua cổng hỗ trợ hoặc email. Yêu cầu có thể bị đóng sau 24h nếu Tìm trọ sinh viên không nhận được phản hồi của anh/chị.</p><br>
    </div>
    <div class="footer">
        <p>Thân,<br>
            Tìm trọ sinh viên</p>
    </div>
    </div>
</body>
</html>