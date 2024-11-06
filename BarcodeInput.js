import React, { useState } from 'react';
import { useCart } from './CartContext';
import dataRes from '../database';

function BarcodeInput() {
  const [barcode, setBarcode] = useState('');
  const { addToCart } = useCart();

  // 바코드 입력 시 호출되는 함수
  const handleBarcodeChange = (e) => {
    setBarcode(e.target.value);
  };

  // 바코드 입력 후 상품을 장바구니에 추가하는 함수
  const handleBarcodeSubmit = async (e) => {
    e.preventDefault();
    if (barcode) {
      try {
        // database.js에서 바코드 정보를 불러오는 함수 호출
        const data = await dataRes(barcode);
        if (data) {
          const { barcode: data_barcode, description: data_description, price: data_price } = data;

          // 상품을 장바구니에 추가
          addToCart(data_barcode, data_description, data_price);
        } else {
          console.error('No data found for the given barcode');
        }

        // 입력 필드 초기화
        setBarcode('');
      } catch (error) {
        console.error('Error in barcode submission:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleBarcodeSubmit}>
      <input
        type="text"
        value={barcode}
        onChange={handleBarcodeChange}
        placeholder="바코드 번호 입력"
      />
      <button type="submit">상품 추가</button>
    </form>
  );
}

export default BarcodeInput;
