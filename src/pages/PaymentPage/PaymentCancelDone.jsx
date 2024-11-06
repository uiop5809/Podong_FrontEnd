import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import PayCancelAnimation from './PayCancelAnimation.json';
import { useParams } from 'react-router-dom';
import axios from '../../apis/AxiosInstance';

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
  margin-bottom: 0px;
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

const StyleStrong = styled.div`
  white-space: nowrap;
  width: 60px;
`;

const PaymentDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const PaymentDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const PaymentDetailTitle = styled(StyleStrong)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const PaymentDetailValue = styled.span`
  font-size: 12px;
  color: #666;
`;

const PaymentCancelDone = () => {
  const [content, setContent] = useState({});
  const { orderId } = useParams();
  const [payment, setPayment] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`/order/detail/${orderId}`);
        const orderDetail = response.data;
        const fetchedContent = {
          itemTitle: orderDetail.productDTO.productTitle.replace(/<[^>]*>/g, ''),
          totalPrice: `${orderDetail.productDTO.productLprice}원`,
          details: [],
        };
        setContent(fetchedContent);
      } catch (error) {
        console.error('주문 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  useEffect(() => {
    const fetchPaymentLog = async () => {
      try {
        const response = await axios.get(`/payment/list/${userId}`);
        if (response.data.length > 0) {
          setPayment(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching payment log:', error);
      }
    };

    fetchPaymentLog();
  }, [userId]);

  return (
    <Container>
      <ImageContainer>
        <Lottie animationData={PayCancelAnimation} style={{ width: '230px', height: '230px' }} />
      </ImageContainer>
      <Header>
        <CancelMessage>결제가 취소되었어요</CancelMessage>
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
        <PaymentDetailsContainer>
  {payment && (
    <>
      <PaymentDetailRow>
        <PaymentDetailTitle>결제 상태 :</PaymentDetailTitle>
        <PaymentDetailValue>{payment.payStatus}</PaymentDetailValue>
      </PaymentDetailRow>
      <PaymentDetailRow>
        <PaymentDetailTitle>주문 날짜 :</PaymentDetailTitle>
        <PaymentDetailValue>{new Date(payment.createdAt).toLocaleString()}</PaymentDetailValue>
      </PaymentDetailRow>
      <PaymentDetailRow>
        <PaymentDetailTitle>주문 번호 :</PaymentDetailTitle>
        <PaymentDetailValue>{payment.merchantId}</PaymentDetailValue>
      </PaymentDetailRow>
      <PaymentDetailRow>
        <PaymentDetailTitle>결제 수단 :</PaymentDetailTitle>
        <PaymentDetailValue>{payment.payMethod}</PaymentDetailValue>
      </PaymentDetailRow>
      <PaymentDetailRow>
        <PaymentDetailTitle>금액 :</PaymentDetailTitle>
        <PaymentDetailValue>{payment.payAmount.toLocaleString()} 원</PaymentDetailValue>
      </PaymentDetailRow>
      <PaymentDetailRow>
        <PaymentDetailTitle>카드명 :</PaymentDetailTitle>
        <PaymentDetailValue>{payment.cardName}</PaymentDetailValue>
      </PaymentDetailRow>
      <PaymentDetailRow>
        <PaymentDetailTitle>카드 번호 :</PaymentDetailTitle>
        <PaymentDetailValue>{payment.cardNumber}</PaymentDetailValue>
      </PaymentDetailRow>
      <PaymentDetailRow>
        <PaymentDetailTitle>할부 개월 수:</PaymentDetailTitle>
        <PaymentDetailValue>{payment.installmentMonths}</PaymentDetailValue>
      </PaymentDetailRow>
      <PaymentDetailRow>
        <PaymentDetailTitle>PG사명:</PaymentDetailTitle>
        <PaymentDetailValue>{payment.pg}</PaymentDetailValue>
      </PaymentDetailRow>
    </>
  )}
</PaymentDetailsContainer>
      </Content>
    </Container>
  );
};

export default PaymentCancelDone;
