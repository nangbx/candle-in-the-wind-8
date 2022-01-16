import "./Footer.scss";

export default function Footer() {
  return (
    <div>
      <div id="footer">
        <div id="container">
          <div id="col1">
            <div id="mini-container">
              <div id="content">
                <h2>GIỚI THIỆU</h2>
              </div>
              <div id="text">
                <p>
                  <span>Candle in the wind là thương hiệu chuyên cung cấp nến thơm, tinh dầu, 
                    sáp thơm và phụ kiện trang trí - mang lại cho bạn những phút giây thư giãn hoàn hảo.</span>
                </p>
              </div>
            </div>
          </div>
          <div id="col2">
            <div id="mini-container">
              <div id="content">
                <h2>LIÊN KẾT</h2>
              </div>
              <div id="text">
                <p style={{marginBottom: 5}}>
                  <a href={void(0)}>Home</a>
                </p>
                <p style={{marginBottom: 5}}>
                  <a href={void(0)}>Hạng mục</a>
                </p>
                <p style={{marginBottom: 5}}>
                  <a href={void(0)}>Forum</a>
                </p>
                <p style={{marginBottom: 5}}>
                  <a href={void(0)}>Shop</a>
                </p>
              </div>
            </div>
          </div>
          <div id="col3">
            <div id="mini-container">
              <div id="content">
                <h2>CHÍNH SÁCH</h2>
              </div>
              <div id="text">
                <p style={{marginBottom: 5}}>
                  <a href={void(0)}>Chính sách giao hàng</a>
                </p>
                <p style={{marginBottom: 5}}>
                  <a href={void(0)}>Chính sách đổi trả hàng</a>
                </p>
                <p style={{marginBottom: 5}}>
                  <a href={void(0)}>Chính sách thanh toán</a>
                </p>
                <p style={{marginBottom: 5}}>
                  <a href={void(0)}>Chính sách bảo mật</a>
                </p>
              </div>
            </div>
          </div>
          <div id="col4">
            <div id="mini-container">
              <div id="content">
                <h2>LIÊN HỆ</h2>
              </div>
              <div id="icon-list">
                <li>
                  <i aria-hidden="true" className="fas fa-map-marker-alt" style={{color: '#ECE6E6'}} />
                  <span>Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội</span>
                </li>
                <li>
                  <i aria-hidden="true" className="fas fa-phone-alt" style={{color: '#ECE6E6'}} />
                  <span>0123456789</span>
                </li>
                <li>
                  <i aria-hidden="true" className="far fa-envelope" style={{color: '#ECE6E6'}} />
                  <span>candleinthewind@gmail.com</span>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
