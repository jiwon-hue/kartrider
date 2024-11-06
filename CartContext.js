import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// 다른 컴포넌트에서 CartContext를 쉽게 사용할 수 있도록 커스텀 훅 생성
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // 컴포넌트가 마운트될 때 세션 스토리지에서 장바구니 데이터 불러오기
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 장바구니 데이터가 변경될 때 세션 스토리지에 저장
  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // 상품을 장바구니에 추가하는 함수
  const addToCart = (data_barcode, data_description, data_price) => {
    const newProduct = {
      barcode: data_barcode,
      name: data_description,
      price: data_price,
      
      quantity: 1
    };

    // 동일한 바코드의 제품이 이미 장바구니에 있는지 확인
    setCart((prevCart) => {
      // 기존 제품의 인덱스 확인
      const existingProductIndex = prevCart.findIndex((item) => item.barcode === data_barcode);

      if (existingProductIndex !== -1) {
        // 이미 장바구니에 있는 경우, 수량 및 가격 추가
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
          price: data_price*(updatedCart[existingProductIndex].quantity + 1)
        };
        return updatedCart;
      } else {
        // 새로운 제품 추가
        return [...prevCart, newProduct];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
