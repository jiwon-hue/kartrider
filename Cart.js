import React from 'react';
import BarcodeInput from './BarcodeInput';
import { useCart } from './CartContext';

function Cart() {
  const { cart } = useCart();

  return (
    <div>
      <h1>장바구니 페이지</h1>
      <BarcodeInput />
      <h2>총금액</h2>
      
      <h2>장바구니 목록</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}원 - {item.quantity}개
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;