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
            width: 140px;
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
    <div class="table">
    <div class="header">
    <h1>ĐẶT PHÒNG THÀNH CÔNG</h1>
    {{-- <img src="{{asset('uploads/logo/logo.png')}}" width="100px" height="100px"> --}}
    </div>
    <div class="body">
        {{-- <h2>Chuc mừng bạn đến với Nhà Tui</h2> --}}
        <b>Hello, bạn {{$user->full_name}}</b>
        <p>Bạn vừa đặt phòng thành công</p>
        <p>Nhấp <a href="https://timtrosinhvien.com/login">vào đây</a> để đăng nhập và xem chi tiết.</p>
        
    </div>
    <div class="footer">
        <p>Thân,<br>
        Nhà Tui</p>
    </div>
    </div>
</body>
</html>