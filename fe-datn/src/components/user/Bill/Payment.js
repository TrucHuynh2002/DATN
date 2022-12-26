import React from 'react'

function thanhtoan() {
  return (
    <div className="container">
      <div className="header clearfix">
        <h3 className="text-muted">VNPAY DEMO</h3>
      </div>
      <h3>Tạo mới đơn hàng</h3>
      <div className="table-responsive">
        <form action="/vnpay_php/vnpay_create_payment.php" id="create_form" method="post">       
          <div className="form-group">
            <label htmlFor="language">Loại hàng hóa </label>
            <select name="order_type" id="order_type" className="form-control">
              <option value="billpayment">Thanh toán hóa đơn</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="order_id">Mã hóa đơn</label>
            <input className="form-control" id="order_id" name="order_id" type="text" 
            // defaultValue="<?php echo date(" ymdhis") ? 
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Số tiền</label>
            <input className="form-control" id="amount" name="amount" type="number" defaultValue={10000} />
          </div>
          <div className="form-group">
            <label htmlFor="order_desc">Nội dung thanh toán</label>
            <textarea className="form-control" cols={20} id="order_desc" name="order_desc" rows={2} defaultValue={"Noi dung thanh toan"} />
          </div>
          <div className="form-group">
            <label htmlFor="bank_code">Ngân hàng</label>
            <select name="bank_code" id="bank_code" className="form-control">
              <option value>Không chọn</option>
              <option value="NCB"> Ngan hang NCB</option>
              <option value="AGRIBANK"> Ngan hang Agribank</option>
              <option value="SCB"> Ngan hang SCB</option>
              <option value="SACOMBANK">Ngan hang SacomBank</option>
              <option value="EXIMBANK"> Ngan hang EximBank</option>
              <option value="MSBANK"> Ngan hang MSBANK</option>
              <option value="NAMABANK"> Ngan hang NamABank</option>
              <option value="VNMART"> Vi dien tu VnMart</option>
              <option value="VIETINBANK">Ngan hang Vietinbank</option>
              <option value="VIETCOMBANK"> Ngan hang VCB</option>
              <option value="HDBANK">Ngan hang HDBank</option>
              <option value="DONGABANK"> Ngan hang Dong A</option>
              <option value="TPBANK"> Ngân hàng TPBank</option>
              <option value="OJB"> Ngân hàng OceanBank</option>
              <option value="BIDV"> Ngân hàng BIDV</option>
              <option value="TECHCOMBANK"> Ngân hàng Techcombank</option>
              <option value="VPBANK"> Ngan hang VPBank</option>
              <option value="MBBANK"> Ngan hang MBBank</option>
              <option value="ACB"> Ngan hang ACB</option>
              <option value="OCB"> Ngan hang OCB</option>
              <option value="IVB"> Ngan hang IVB</option>
              <option value="VISA"> Thanh toan qua VISA/MASTER</option>
            </select>
          </div>
          <div className="form-group">
            <h3>Thông tin hóa đơn </h3>
          </div>
          <div className="form-group">
            <label>Họ tên (*)</label>
            <input className="form-control" id="txt_billing_fullname" name="txt_billing_fullname" type="text" defaultValue="NGUYEN VAN XO" />             
          </div>
          <div className="form-group">
            <label>Email (*)</label>
            <input className="form-control" id="txt_billing_email" name="txt_billing_email" type="text" defaultValue="xonv@vnpay.vn" />   
          </div>
          <div className="form-group">
            <label>Số điện thoại (*)</label>
            <input className="form-control" id="txt_billing_mobile" name="txt_billing_mobile" type="text" 
            // defaultValue={0934998386} 
            />   
          </div>
          <div className="form-group">
            <label>Địa chỉ (*)</label>
            <input className="form-control" id="txt_billing_addr1" name="txt_billing_addr1" type="text" defaultValue="22 Lang Ha" />   
          </div>
          <div className="form-group">
            <label>Tỉnh/TP (*)</label>
            <input className="form-control" id="txt_bill_city" name="txt_bill_city" type="text" defaultValue="Hà Nội" /> 
          </div>
          <button type="submit" className="btn btn-primary" id="btnPopup">Thanh toán Post</button>
          <button type="submit" name="redirect" id="redirect" className="btn btn-default">Thanh toán Redirect</button>
        </form>
      </div>
    </div>  
  );
}

export default thanhtoan