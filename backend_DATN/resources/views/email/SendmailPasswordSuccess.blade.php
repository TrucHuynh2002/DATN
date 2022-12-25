<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sendmaildangky</title>
    <style>
        body{
            padding: 50px 500px 50px 500px;
        }
        .table{
            /* background-color: aliceblue;
            height: 550px;
            width: 650px; */
            padding: 12px 12px 12px 12px;
        }
        .header{
            text-align: center;
        }
        .body h2{
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="table">
    <div class="header">
    <h1>ĐỔI MẬT KHẨU THÀNH CÔNG</h1>
    <img src="{{asset('')}}" width="100px" height="100px">
    </div>
    <div class="body">
        {{-- <h2>Chuc mừng bạn đến với Nhà Tui</h2> --}}
        <b>Hello, tên {{$user->full_name}}</b>
        <p>Chúc mừng bạn đã đổi mật khẩu thành công</p>
        <p>Nhấp <a href="http://localhost:3000/login">vào đây</a> để đăng nhập vào tài khoản.</p>
        
    </div>
    <div class="footer">
        <p>Thân,<br>
        Nhà Tui</p>
    </div>
    </div>
</body>
</html>