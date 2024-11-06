import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../apis/AxiosInstance';
import { FaUserCircle } from 'react-icons/fa';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`/order/detail/${orderId}`);
        setOrderDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('주문 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (!orderDetail) {
    return <div>Loading...</div>;
  }

  const { productDTO, userDTO } = orderDetail;

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}분`;
  };

  const totalProductPrice = productDTO.productLprice * (state?.quantity || orderDetail.quantity);
  const deliveryFee = totalProductPrice >= 30000 ? 0 : 3000;
  const finalPrice = totalProductPrice + deliveryFee - (orderDetail.pointUsed || 0);

  return (
    <Container>
      <ProfilePicture>
        {userDTO.userPicture ? (
          <UserImage src={userDTO.userPicture} alt={`${userDTO.profileNickname} profile`} />
        ) : (
          <FaUserCircle color="#ccc" size={30} />
        )}
        <ProfileNickName>{userDTO.profileNickname}</ProfileNickName>
      </ProfilePicture>
      <ProductInfoWrap>
        <OrderTitle>주문 상세 확인</OrderTitle>
        <Wrap>
          <ProductImage src={productDTO.productImage} alt="Product" />
          <ProductDetails>
            <ProductName>{productDTO.productTitle.replace(/<[^>]*>/g, '')}</ProductName>
            <OrderDate>{formatDate(userDTO.createdAt)}</OrderDate>
            <FlexWrap>
              <Quantity>수량: {state.quantity}개</Quantity>
              <Price>{productDTO.productLprice}원</Price>
            </FlexWrap>
          </ProductDetails>
        </Wrap>
      </ProductInfoWrap>
      <DeliveryInfo>
        <SectionTitle>배송 정보</SectionTitle>
        <InfoRow>
          <Label>수령인:</Label>
          <Value>{userDTO.profileNickname}</Value>
        </InfoRow>
        <InfoRow>
          <Label>휴대폰:</Label>
          <Value>{userDTO.phoneNumber}</Value>
        </InfoRow>
        <InfoRow>
          <Label>주소:</Label>
          <Value>{userDTO.address}</Value>
        </InfoRow>
      </DeliveryInfo>
      <PaymentInfo>
        <SectionTitle>결제 정보</SectionTitle>
        <InfoRow>
          <Label>총 상품 금액:</Label>
          <PaymentValue>{totalProductPrice}원</PaymentValue>
        </InfoRow>
        <InfoRow>
          <Label>총 배송비:</Label>
          <PaymentValue>{deliveryFee}원</PaymentValue>
        </InfoRow>
        <InfoRow>
          <Label>포인트 사용:</Label>
          <PaymentValue>{orderDetail.pointUsed ? `(-${orderDetail.pointUsed}원)` : '0원'}</PaymentValue>
        </InfoRow>
      </PaymentInfo>
      <LastInfoRow>
        <LastLabel>최종 결제 금액:</LastLabel>
        <LastTotalPrice>{finalPrice}원</LastTotalPrice>
      </LastInfoRow>
      <ButtonWrapper>
        <CancelButton onClick={() => navigate(`/payCancelReq/${orderId}`)}>주문 취소</CancelButton>
        <InquireButton>문의하기</InquireButton>
      </ButtonWrapper>
    </Container>
  );
};

export default OrderDetail;

const Container = styled.div`
  padding: 64px 0 80px;
`;

const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 17px;
  font-weight: bold;
`;

const ProfileNickName = styled.div`
  margin-left: 10px;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: cover;
`;

const OrderTitle = styled.div`
  margin-bottom: 20px;
  font-weight: bold;
`;

const ProductInfoWrap = styled.div`
  padding: 10px 20px 0;
  margin-bottom: 20px;
  border-top: 1px solid #ccc;
`;

const Wrap = styled.div`
  display: flex;
`;

const ProductImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 8px;
  margin-right: 10px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 0;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const OrderDate = styled.div`
  font-size: 12px;
  color: #888;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Quantity = styled.div`
  font-size: 12px;
`;

const Price = styled.div`
  font-weight: bold;
`;

const DeliveryInfo = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 0 20px 10px;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 5px;
`;

const Label = styled.span`
  width: 100px;
  color: #959595;
`;

const Value = styled.span`
  width: 100%;
`;

const PaymentValue = styled.span`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const PaymentInfo = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 0 20px 10px;
`;

const LastInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 20px;
`;

const LastLabel = styled.div`
  font-weight: bold;
`;

const LastTotalPrice = styled.span`
  font-weight: bold;
  color: #ff6e00;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  gap: 8px;
`;

const CancelButton = styled.button`
  border: 1px solid #ff6e00;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  color: #ff6e00;
`;

const InquireButton = styled.button`
  background-color: #ff6e00;
  width: 100%;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
`;
