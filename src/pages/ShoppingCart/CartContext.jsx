import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

const initialState = [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.findIndex(item => item.productId === action.payload.productId);

      if (existingItemIndex >= 0) {
        // 기존 아이템이 있는 경우 수량을 누적
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + action.payload.quantity,
        };
        return updatedCart;
      }
      // 새로운 아이템 추가
      return [...state, action.payload];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.productId !== action.payload.productId);
    case 'INCREASE_QUANTITY': {
      return state.map(item =>
        item.productId === action.payload.productId ? { ...item, quantity: item.quantity + 1 } : item,
      );
    }
    case 'DECREASE_QUANTITY': {
      return state.map(item =>
        item.productId === action.payload.productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UseCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
