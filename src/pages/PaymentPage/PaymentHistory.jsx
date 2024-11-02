import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
`;

const Tab = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  &.active {
    background-color: #add8e6;
  }
`;

const Table = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

const TableHeader = styled.div`
  display: flex;
  background-color: #f0f0f0;
  padding: 10px;
  font-size: 10px;
  font-weight: bold;
`;

const TableBody = styled.div`
  padding: 10px;
  
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 11px;
`;

const TableHeaderCell = styled.div`
  flex: 1;
  display : flex;
  justify-content : center;
  text-align: center;
  font-weight: bold;
  padding: 6px;
`;

const TableCell = styled.div`
  flex: 1;
  text-align: left;
  padding: 5px;
  align-items: center;
`;

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [tabCounts, setTabCounts] = useState({ total: 0, completed: 0, cancelled: 0, failed: 0 });

  useEffect(() => {
    // 데이터 가져와야하는 부분
    const fetchData = async () => {
      const fetchedPayments = [
        {
          status: '완료',
          date: '24/10/23',
          orderNumber: 'merchant_1602...',
          productName: '공주가 되는 드레스',
          paymentMethod: '신용카드',
          amount: '37,000'
        }
      ];

      setPayments(fetchedPayments);

      // 탭 카운트 계산
      const total = fetchedPayments.length;
      const completed = fetchedPayments.filter(payment => payment.status === '완료').length;
      const cancelled = fetchedPayments.filter(payment => payment.status === '취소').length;
      const failed = fetchedPayments.filter(payment => payment.status === '실패').length;

      setTabCounts({ total, completed, cancelled, failed });
    };

    fetchData();
  }, []);

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
        <Tab>전체 {tabCounts.total}</Tab>
        <Tab className="active">결제완료 {tabCounts.completed}</Tab>
        <Tab>결제취소 {tabCounts.cancelled}</Tab>
        <Tab>결제실패 {tabCounts.failed}</Tab>
      </TabContainer>
      <Table>
        <TableHeader>
          <TableHeaderCell>결제상태</TableHeaderCell>
          <TableHeaderCell>주문날짜</TableHeaderCell>
          <TableHeaderCell>주문번호</TableHeaderCell>
          <TableHeaderCell>상품명</TableHeaderCell>
          <TableHeaderCell>결제수단</TableHeaderCell>
          <TableHeaderCell>금액</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {payments.map((payment, index) => (
            <TableRow key={index}>
              <TableCell>{payment.status}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.orderNumber}</TableCell>
              <TableCell>{payment.productName}</TableCell>
              <TableCell>{payment.paymentMethod}</TableCell>
              <TableCell>{payment.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PaymentHistory;
