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
    <h1>GỬI HÓA ĐƠN HÀNG THÁNG</h1>
    {{-- <img src="{{asset('uploads/logo/logo.png')}}" width="100px" height="100px"> --}}
    </div>
    <div class="body">
        {{-- <h2>Chuc mừng bạn đến với Tìm trọ sinh viên</h2> --}}
        <b>Hello, bạn {{$user->full_name}} </b>
        <p>Gửi hóa đơn tháng vừa rồi</p>
        <p>Tiền điện: {{number_format($user->electricity_money)}}đ</p>
        <p>Tiền nước: {{number_format($user->water_money)}}</p>
        <p>Tiền thuê: {{number_format($user->room_price)}}đ</p>
        <p>Tổng: {{number_format($user->all_money)}}đ</p>
        <p>Nhấp <a href="https://timtrosinhvien.com/login">vào đây</a> để đăng nhập vào tài khoản.</p>  
    </div>
    <div class="footer">
        <p>Thân,<br>
        Tìm trọ sinh viên</p>
    </div>
    </div>
</body>
</html>