import React from 'react';
import styled from 'styled-components';

const OrderDetail = () => {
  return (
    <Container>
      <Header>개냥이네</Header>
      <ProductInfoWrap>
        <OrderTitle>주문 목록 확인</OrderTitle>
        <Wrap>
          <ProductImage src="https://via.placeholder.com/100" alt="Product" />
          <ProductDetails>
            <ProductName>공주가 되는 드레스</ProductName>
            <OrderDate>24.10.17</OrderDate>
            <Quantity>수량: 1개 / 색상: 베이지 XL</Quantity>
            <Price>37,000원</Price>
          </ProductDetails>
        </Wrap>
      </ProductInfoWrap>
      <DeliveryInfo>
        <SectionTitle>배송 정보</SectionTitle>
        <InfoRow>
          <Label>수령인:</Label>
          <Value>고창준</Value>
        </InfoRow>
        <InfoRow>
          <Label>휴대폰:</Label>
          <Value>010-1234-1234</Value>
        </InfoRow>
        <InfoRow>
          <Label>주소:</Label>
          <Value>[01234] 서울시 엘지주 유재동 LG-1</Value>
        </InfoRow>
        <InfoRow>
          <Label>배송메모:</Label>
          <Value>[경비실 인입] 빨리 가져다 주세요 환기 좀 나깐</Value>
        </InfoRow>
      </DeliveryInfo>
      <PaymentInfo>
        <SectionTitle>결제 정보</SectionTitle>
        <InfoRow>
          <Label>총 상품 금액:</Label>
          <Value>37,000원</Value>
        </InfoRow>
        <InfoRow>
          <Label>총 배송비:</Label>
          <Value>5,000원</Value>
        </InfoRow>
        <InfoRow>
          <Label>포인트 사용:</Label>
          <Value>(-5,000원)</Value>
        </InfoRow>
      </PaymentInfo>
      <LastInfoRow>
        <LastLabel>최종 결제 금액:</LastLabel>
        <LastTotalPrice>32,000원</LastTotalPrice>
      </LastInfoRow>
      <ButtonWrapper>
        <CancelButton>주문 취소</CancelButton>
        <InquireButton>문의하기</InquireButton>
      </ButtonWrapper>
    </Container>
  );
};

export default OrderDetail;

const Container = styled.div`
  padding: 64px 0 80px;
`;

const Header = styled.div`
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 17px;
  font-weight: bold;
`;

const OrderTitle = styled.div`
  margin-bottom: 20px;
  font-weight: bold;
`;

const ProductInfoWrap = styled.div`
  padding: 0 20px;
  margin-bottom: 20px;
`;

const Wrap = styled.div`
  display: flex;
`;

const ProductImage = styled.img`
  width: 100px;
  height: auto;
  margin-right: 10px;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const OrderDate = styled.div`
  color: #888;
`;

const Quantity = styled.div``;

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

const PaymentInfo = styled.div`
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
