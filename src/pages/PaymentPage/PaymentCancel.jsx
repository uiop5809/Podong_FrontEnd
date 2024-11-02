// React Component (PaymentCancel.js)
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import PayCancelAnimation from '../PaymentPage/PayCancelAnimation.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  height: 100vh;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const CancelMessage = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const OrderNumber = styled.p`
  font-size: 14px;
  color: #999;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Item = styled.div`
  margin-bottom: 20px;
`;

const ItemTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Details = styled.div`
  margin-top: 10px;
`;

const Detail = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const TotalPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

const PaymentDetails = styled.div`
  margin-top: 20px;
`;

const PaymentAmount = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const PaymentMethod = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

const PaymentPG = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const PaymentPGnum = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const PaymentCard = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const PaymentBuyerName = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const PaymentBuyerAddr = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const PaymentBuyerPost = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const PaymentTotal = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

const PaymentCancel = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [content, setContent] = useState({});

  useEffect(() => {
    // Fetching data from another page or API
    const fetchData = async () => {
      // Simulating a data fetch
      const fetchedOrderNumber = '17423029019301231';
      const fetchedContent = {
        itemTitle: '환불된 상품 이름',
        totalPrice: '30,000원',
        details: [
          '사이즈 : S',
          '색상 : 빨간색',
          '###############',
          '상품에 대한 디테일 넣을 부분'
        ],
        paymentDetails: {
          paymentAmount: '30,000원',
          paymentMethod: '카드',
          paymentPG: 'KG이니시스',
          paymentPGnum: '1231241238588376',
          paymentCard: 'LG',
          paymentBuyerName: '고창준',
          paymentBuyerAddr: '서울시 엘지구 엘지동 1-1',
          paymentBuyerPost: '123-123'
        }
      };

      setOrderNumber(fetchedOrderNumber);
      setContent(fetchedContent);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <ImageContainer>
        <Lottie animationData={PayCancelAnimation} style={{ width: '250px', height: '250px' }} />
      </ImageContainer>
      <Header>
        <CancelMessage>결제가 취소되었어요</CancelMessage>
        <OrderNumber>주문번호 {orderNumber}</OrderNumber>
      </Header>
      <Content>
        <Item>
          <ItemTitle>{content.itemTitle}</ItemTitle>
          <TotalPrice>{content.totalPrice}</TotalPrice>
          <Details>
            {content.details && content.details.map((detail, index) => (
              <Detail key={index}>{detail}</Detail>
            ))}
          </Details>
        </Item>
        <PaymentDetails>
          <PaymentAmount>환불금액 : {content.paymentDetails?.paymentAmount}</PaymentAmount>
          <PaymentMethod>결제수단 : {content.paymentDetails?.paymentMethod}</PaymentMethod>
          <PaymentPG>PG사 : {content.paymentDetails?.paymentPG}</PaymentPG>
          <PaymentPGnum>PG승인번호 : {content.paymentDetails?.paymentPGnum}</PaymentPGnum>
          <PaymentCard>결제상세 : {content.paymentDetails?.paymentCard}</PaymentCard>
          <PaymentBuyerName>주문자 : {content.paymentDetails?.paymentBuyerName}</PaymentBuyerName>
          <PaymentBuyerAddr>주소 : {content.paymentDetails?.paymentBuyerAddr}  [ {content.paymentDetails?.paymentBuyerPost} ]</PaymentBuyerAddr>
        </PaymentDetails>
      </Content>
    </Container>
  );
};

export default PaymentCancel;
