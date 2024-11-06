import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../apis/AxiosInstance';

const Container = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  margin-top: 64px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  flex-wrap: nowrap;
  gap: 10px;
`;

const DateRangeInput = styled.input`
  padding: 5px;
  font-size: 11px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 0 0 auto;
  width: 90px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const SearchInput = styled.input`
  padding: 5px;
  font-size: 11px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  outline: none;
  width: 100%;
`;

const SearchButton = styled.button`
  padding: 5px;
  font-size: 11px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;
`;

const Tab = styled.div`
  padding: 7px 10px;
  font-size: 12px;
  background-color: #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  &.active {
    background-color: #add8e6;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 11px;
`;

const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyleStrong = styled.div`
  white-space: nowrap;
  width: 60px;
`;

const StyledSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PaymentHistory = () => {
  const userId = localStorage.getItem('userId');
  const [payments, setPayments] = useState([]);
  const [tabCounts, setTabCounts] = useState({ total: 0, completed: 0, cancelled: 0, failed: 0 });

  useEffect(() => {
    const fetchPaymentLogs = async () => {
      try {
        const response = await axios.get(`/payment/list/${userId}`);
        setPayments(response.data);

        // 탭 카운트 계산
        const total = response.data.length;
        const completed = response.data.filter(payment => payment.payStatus === '완료').length;
        const cancelled = response.data.filter(payment => payment.payStatus === '취소').length;
        const failed = response.data.filter(payment => payment.payStatus === '실패').length;

        setTabCounts({ total, completed, cancelled, failed });
      } catch (error) {
        console.error('Error fetching payment logs:', error);
      }
    };

    fetchPaymentLogs();
  }, [userId]);

  return (
    <Container>
      <SearchContainer>
        <DateRangeInput type="date" />
        <span> ~ </span>
        <DateRangeInput type="date" />
        <SearchInputContainer>
          <SearchInput type="text" placeholder="검색" />
          <SearchButton>Q</SearchButton>
        </SearchInputContainer>
      </SearchContainer>
      <TabContainer>
        <Tab className="active">전체 {tabCounts.total}</Tab>
        <Tab>결제완료 {tabCounts.completed}</Tab>
        <Tab>결제취소 {tabCounts.cancelled}</Tab>
        <Tab>결제실패 {tabCounts.failed}</Tab>
      </TabContainer>
      <CardContainer>
        {payments.map((payment, index) => (
          <Card key={index}>
            <CardItem>
              <StyleStrong>결제 상태 :</StyleStrong>
              <span>{payment.payStatus}</span>
            </CardItem>
            <CardItem>
              <StyleStrong>주문 날짜 :</StyleStrong>
              <span>{new Date(payment.createdAt).toLocaleString()}</span>
            </CardItem>
            <CardItem>
              <StyleStrong>주문 번호 :</StyleStrong>
              <span>{payment.merchantId}</span>
            </CardItem>
            <CardItem>
              <StyleStrong>상품명 :</StyleStrong>
              <StyledSpan>{payment.payName.replace(/<[^>]*>/g, '')}</StyledSpan>
            </CardItem>
            <CardItem>
              <StyleStrong>결제 수단 :</StyleStrong>
              <span>{payment.payMethod}</span>
            </CardItem>
            <CardItem>
              <StyleStrong>금액 :</StyleStrong>
              <span>{payment.payAmount.toLocaleString()} 원</span>
            </CardItem>
            <CardItem>
              <StyleStrong>카드명 :</StyleStrong>
              <span>{payment.cardName}</span>
            </CardItem>
            <CardItem>
              <StyleStrong>카드 번호 :</StyleStrong>
              <span>{payment.cardNumber}</span>
            </CardItem>
            <CardItem>
              <StyleStrong>할부 개월 수:</StyleStrong>
              <span>{payment.installmentMonths}</span>
            </CardItem>
            <CardItem>
              <StyleStrong>PG사명:</StyleStrong>
              <span>{payment.pg}</span>
            </CardItem>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default PaymentHistory;
