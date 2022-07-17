import React from 'react'
import './index.css'
export default function Page5k() {
    const onReadMore = () => {
        let more = document.querySelectorAll('.more');
        for (let i = 0; i < more.length; i++) {
            more[i].addEventListener('click', function () {
                more[i].parentNode.classList.toggle('active');
            })
        }
    }
    return (
        <>
            <div className="body">
                <img className="img5k" src={require('../../images/5k.jpg')} alt="5k" />

                <div className="container">
                    <div className="card">
                        <div className="icon">
                            <img src={require('../../images/khautrang.jpg')} alt="khautrang" />
                        </div>
                        <div className="content">
                            <h3>Khẩu Trang</h3>
                            <p>Đeo khẩu trang vải thường xuyên tại nơi công cộng, nơi tập trung đông người; đeo khẩu trang y tế tại các cơ sở y tế, khu cách ly.</p>
                        </div>
                        <a className="more" onClick={onReadMore} />
                    </div>
                    <div className="card">
                        <div className="icon">
                            <img src={require('../../images/khukhuan.jpg')} alt="khautrang" />
                        </div>
                        <div className="content">
                            <h3>Khử Khuẩn</h3>
                            <p>Rửa tay thường xuyên bằng xà phòng hoặc dung dịch sát khuẩn tay. Vệ sinh các bề mặt/ vật dụng thường xuyên tiếp xúc (tay nắm cửa, điện thoại, máy tính bảng, mặt bàn, ghế…). Giữ vệ sinh, lau rửa và để nhà cửa thông thoáng.</p>
                        </div>
                        <a className="more" onClick={onReadMore} />
                    </div>
                    <div className="card">
                        <div className="icon">
                            <img src={require('../../images/khaibaoyte.jpg')} alt="khautrang" />
                        </div>
                        <div className="content">
                            <h3>Khai Báo Y Tế</h3>
                            <p>Thực hiện khai báo y tế trên App NCOVI; cài đặt ứng dụng BlueZone tại địa chỉ https://www.bluezone.gov.vnđể được cảnh báo nguy cơ lây nhiễm COVID-19.

                                Khi có dấu hiệu sốt, ho, khó thở hãy gọi điện cho đường dây nóng của Bộ Y tế 19009095 hoặc đường dây nóng của y tế địa phương để được tư vấn, hỗ trợ, hướng dẫn đi khám bệnh đảm bảo an toàn.</p>
                        </div>
                        <a className="more" onClick={onReadMore} />
                    </div>
                    <div className="card">
                        <div className="icon">
                            <img src={require('../../images/khoangcach.jpg')} alt="khautrang" />
                        </div>
                        <div className="content">
                            <h3>Khoảng Cách</h3>
                            <p>Giữ khoảng cách khi tiếp xúc với người khác.</p>
                        </div>
                        <a className="more" onClick={onReadMore} />
                    </div>
                    <div className="card">
                        <div className="icon">
                            <img src={require('../../images/tutap.jpg')} alt="khautrang" />
                        </div>
                        <div className="content">
                            <h3>Không Tụ Tập</h3>
                            <p>Không tập trung đông người.</p>
                        </div>
                        <a className="more" onClick={onReadMore} />
                    </div>
                </div>
        </div>
        </>
    )
}
