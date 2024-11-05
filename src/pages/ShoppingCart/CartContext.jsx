import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const loadCart = async userId => {
    try {
      const response = await axios.get(`http://localhost:8080/api/carts/user/${userId}`);
      setCart(response.data);
    } catch (error) {
      console.error('장바구니 로드 중 오류 발생:', error);
      alert('장바구니 항목을 불러오는 중 오류가 발생했습니다.');
    }
  };

  const addToCart = async item => {
    try {
      await axios.post(`http://localhost:8080/api/carts`, item);
      loadCart(item.userId); // 장바구니를 다시 로드하여 갱신
    } catch (error) {
      console.error('장바구니 추가 중 오류 발생:', error);
    }
  };

  const updateCartQuantity = async (cartId, quantity, userId) => {
    try {
      await axios.put(`http://localhost:8080/api/carts/${cartId}`, null, {
        params: { quantity },
      });
      loadCart(userId); // 장바구니를 다시 로드하여 갱신
    } catch (error) {
      console.error('수량 업데이트 중 오류 발생:', error);
    }
  };

  const deleteCartItem = async (cartId, userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carts/${cartId}`);
      loadCart(userId); // 장바구니를 다시 로드하여 갱신
    } catch (error) {
      console.error('장바구니 항목 삭제 중 오류 발생:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loadCart, addToCart, updateCartQuantity, deleteCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
