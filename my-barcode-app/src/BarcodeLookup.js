import React, { useState } from 'react';
import axios from 'axios';

function BarcodeLookup() {
  const [barcode, setBarcode] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  // 바코드 정보를 가져오는 함수
  const handleLookup = async () => {
    setError(null);
    setProductData(null);

    try {
      const response = await axios.get(`http://localhost:3000/get-barcode/${barcode}`);
      setProductData(response.data); // 데이터를 상태에 저장
    } catch (err) {
      setError('제품을 찾을 수 없음'); // 에러 메시지 설정
    }
  };

  return (
    <div>
      <h2>Barcode Lookup</h2>
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Enter barcode"
      />
      <button onClick={handleLookup}>조회</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {productData && (
        <div>
          <h3>Product Details:</h3>
          <p>바코드 : {productData.barcode}</p>
          <p>제품 : {productData.description}</p>
          <p>가격 : {productData.price}</p>
        </div>
      )}
    </div>
  );
}

export default BarcodeLookup;
