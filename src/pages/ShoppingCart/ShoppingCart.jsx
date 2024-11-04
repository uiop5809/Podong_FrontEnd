import { useEffect, useState } from 'react';
import { useCart } from '../ShoppingCart/CartContext';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const { cart, loadCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const navigate = useNavigate();
  const userId = 5;

  // 장바구니 로드 시 가격 계산
  useEffect(() => {
    loadCart(userId);
  }, []);

  useEffect(() => {
    calculateTotalPrice(cart);
  }, [cart]);

  const calculateTotalPrice = cartItems => {
    const productTotal = cartItems.reduce((acc, item) => acc + item.productLprice * item.quantity, 0);
    setTotalProductPrice(productTotal);
  };

  const shippingCost = totalProductPrice >= 30000 ? 0 : 3000;
  const totalPaymentAmount = totalProductPrice + shippingCost;

  const updateQuantity = async (item, newQuantity) => {
    try {
      // 백엔드 API에 수량 업데이트 요청
      await axios.put(`http://localhost:8080/api/carts/${item.cartId}`, null, {
        params: { quantity: newQuantity },
      });
      // 업데이트된 장바구니 상태를 다시 불러옴
      loadCart(userId);
    } catch (error) {
      console.error('수량 업데이트 중 오류 발생:', error);
    }
  };

  const deleteItem = async cartId => {
    try {
      // 백엔드 API에 삭제 요청
      await axios.delete(`http://localhost:8080/api/carts/${cartId}`);
      // 업데이트된 장바구니 상태를 다시 불러옴
      loadCart(userId);
    } catch (error) {
      console.error('장바구니 항목 삭제 중 오류 발생:', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedItems.map(cartId => deleteItem(cartId)));
      setSelectedItems([]);
    } catch (error) {
      console.error('선택 삭제 중 오류 발생:', error);
    }
  };

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === cart.length ? [] : cart.map(item => item.cartId));
  };

  const handleSelectItem = productId => {
    setSelectedItems(
      selectedItems.includes(productId) ? selectedItems.filter(id => id !== productId) : [...selectedItems, productId],
    );
  };

  const goToPayMent = () => {
    navigate('/payment');
  };

  return (
    <CartContainer>
      <HeaderWrap>
        <FreeShippingBanner>30,000원 이상 구매시 무료배송</FreeShippingBanner>
        <ProgressContainer>
          <ProgressBar style={{ width: `${Math.min((totalProductPrice / 30000) * 100, 100)}%` }} />
        </ProgressContainer>
        <SelectionControls>
          <div>
            <input
              type="checkbox"
              checked={cart.length > 0 && selectedItems.length === cart.length}
              onChange={handleSelectAll}
            />
            <span>모두선택</span>
          </div>
          <ActionButtons>
            <ActionButton onClick={handleDeleteSelected}>선택삭제</ActionButton>
          </ActionButtons>
        </SelectionControls>
      </HeaderWrap>

      {cart.length === 0 ? (
        <EmptyMessage>장바구니가 비어 있습니다.</EmptyMessage>
      ) : (
        <>
          <ItemsContainer>
            <ItemsTitle>배송상품</ItemsTitle>
            {cart.map(item => (
              <CartItem key={item.productId}>
                <ClickWrap>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.productId)}
                    onChange={() => handleSelectItem(item.productId)}
                  />
                  <DeleteButton onClick={() => deleteItem(item.cartId)}>
                    <MdClose size={18} />
                  </DeleteButton>
                </ClickWrap>
                <ItemWrap>
                  <ItemImage src={item.productImage} alt={item.productTitle} />
                  <ItemDetails>
                    <ItemTitle>{item.productTitle.replace(/<[^>]*>/g, '')}</ItemTitle>
                    <ItemInfo>
                      <ItemPrice>{item.productLprice.toLocaleString()}원</ItemPrice>
                      <Quantity>
                        <QuantityButton
                          onClick={() => updateQuantity(item, item.quantity - 1)}
                          disabled={item.quantity === 1}>
                          -
                        </QuantityButton>
                        <QuantityValue>{item.quantity}</QuantityValue>
                        <QuantityButton onClick={() => updateQuantity(item, item.quantity + 1)}>+</QuantityButton>
                      </Quantity>
                    </ItemInfo>
                  </ItemDetails>
                </ItemWrap>
              </CartItem>
            ))}
          </ItemsContainer>
          <SummaryContainer>
            <Line />
            <MoneyWrap>
              <ProductPrice>
                <div>상품금액</div>
                <div>{totalProductPrice.toLocaleString()}원</div>
              </ProductPrice>
              <DeliveryPrice>
                <div>배송비</div>
                <div>{shippingCost.toLocaleString()}원</div>
              </DeliveryPrice>
            </MoneyWrap>
            <TotalAmount>
              <div>총 결제 금액:</div>
              <div>{totalPaymentAmount.toLocaleString()}원</div>
            </TotalAmount>
            <BtnWrap>
              <OrderButton onClick={goToPayMent}>주문하기</OrderButton>
            </BtnWrap>
          </SummaryContainer>
        </>
      )}
    </CartContainer>
  );
};

export default ShoppingCart;

const CartContainer = styled.div`
  margin: 64px auto;
`;

const HeaderWrap = styled.div`
  padding: 20px;
  border-top: 10px solid #f5f5f5;
  border-bottom: 10px solid #f5f5f5;
`;

const FreeShippingBanner = styled.div`
  font-size: 12px;
  color: #8d8d8d;
  margin-bottom: 10px;
`;

const ProgressContainer = styled.div`
  background: #eee;
  height: 5px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ProgressBar = styled.div`
  background: #ff6e00;
  height: 100%;
  width: 60%;
  border-radius: 5px;
`;

const SelectionControls = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  div {
    display: flex;
    align-items: center;

    input {
      margin-right: 5px;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  color: #8d8d8d;
  font-size: 12px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  margin-top: 30px;
  font-size: 16px;
  color: #888;
`;

const ItemsContainer = styled.div`
  padding: 0 20px 245px;
  margin-bottom: 20px;
`;

const ItemsTitle = styled.div`
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const ClickWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #8d8d8d;
  font-size: 18px;

  &:hover {
    color: #000000;
  }
`;

const ItemWrap = styled.div`
  display: flex;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 8px 0;
`;

const ItemTitle = styled.h3`
  font-size: 12px;
  margin: 0;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemPrice = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0 0;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b8b2b2;
  border-radius: 4px;
`;

const QuantityButton = styled.button`
  width: 18px;
  height: 18px;
  font-size: 15px;
  line-height: 1;
  transition: background-color 0.3s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
`;

const QuantityValue = styled.div`
  width: 30px;
  padding: 5px 0;
  text-align: center;
  font-size: 12px;
`;

const SummaryContainer = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 10;
  padding-bottom: 80px;
  background-color: #ffffff;
  border-top: 1px solid #d9d9d9;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  @media (min-width: 375px) {
    width: 375px;
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;

const Line = styled.div`
  background-color: #d9d9d9;
  margin: 10px auto;
  border-radius: 20px;
  width: 40%;
  height: 5px;
`;

const MoneyWrap = styled.div`
  width: 90%;
  margin: 0 auto;
  font-size: 12px;
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const DeliveryPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding-top: 10px;
  font-size: 14px;
  font-weight: bold;
  margin: 0 auto;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderButton = styled.button`
  width: 90%;
  padding: 12px 20px;
  margin-top: 15px;
  background-color: #ff6e00;
  color: #fff;
  text-align: center;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e65c00;
  }
`;
