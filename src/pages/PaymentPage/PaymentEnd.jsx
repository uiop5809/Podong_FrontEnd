import React, { useEffect, useState, useLocation } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import PaymentAnimation from '../PaymentPage/PaymentAnimation.json';
import PropTypes from 'prop-types';
import axios from '../../apis/AxiosInstance';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  max-width: 600px;
  margin: auto;
`;

const PaymentEndHeader = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Header = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: ${props => (props.primary ? '#ff6e00' : 'white')};
  color: ${props => (props.primary ? 'white' : '#ff6e00')};
  border: ${props => (props.primary ? 'none' : '2px solid #ff6e00')};
  padding: 8px 45px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
  flex: 1;
  white-space: nowrap;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => (props.primary ? '#e66e00' : '#e66e00')};
    color: white;
  }
`;

const ThickDivider = styled.div`
  width: 100%;
  height: 12px;
  background-color: #f3f3f3;
  margin: 2px 0;
`;

const ThinDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
`;

const Section = styled.div`
  width: 100%;
  padding: 10px 0;
  text-align: left;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
`;

const OrderInfoRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
`;

const OrderLabel = styled.span`
  font-weight: bold;
  color: #555;
  min-width: 80px;
`;

const OrderValue = styled.span`
  color: #333;
  text-align: right;
  flex-grow: 1;
  font-size: 14px;
`;

const DeliveryInfoRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
`;

const DeliveryLabel = styled.span`
  font-weight: bold;
  color: #555;
  min-width: 80px;
`;

const DeliveryValue = styled.span`
  color: #333;
  text-align: left;
  flex-grow: 1;
  font-size: 14px;
`;

const AddressInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
`;

const AddressInput = styled.input`
  border: none;
  flex-grow: 1;
  padding: 8px;
  font-size: 14px;
`;

const EditButton = styled.button`
  background-color: #ffefef;
  color: #ff6e00;
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 9px;

  &:hover {
    background-color: #e66e00;
  }
`;

const OrderDetailButton = styled(Button)`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 64px;
  max-width: 600px;
`;

// 주문 정보 Row 컴포넌트
const OrderInfoRow = ({ label, value }) => {
  return (
    <OrderInfoRowContainer>
      <OrderLabel>{label}</OrderLabel>
      <OrderValue>{value}</OrderValue>
    </OrderInfoRowContainer>
  );
};

OrderInfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

// 배송 정보 Row 컴포넌트
const DeliveryInfoRow = ({ label, value }) => {
  return (
    <DeliveryInfoRowContainer>
      <DeliveryLabel>{label}</DeliveryLabel>
      <DeliveryValue>{value}</DeliveryValue>
    </DeliveryInfoRowContainer>
  );
};

DeliveryInfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};



const PaymentEnd = () => {
  const [buyer, setBuyer] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // const location = useLocation();
  // const userId = location.state?.userId || localStorage.getItem('userId');
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(`/user/${userId}`);
        const userData = response.data;
        console.log('User Data:', userData);
        setBuyer(userData.nickname);
        setPhone(userData.phoneNumber);
        setAddress(userData.address);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getInfo();
  }, []);

  return (
    <Container>
      <PaymentEndHeader>주문 완료</PaymentEndHeader>

      <ImageContainer>
        <Lottie animationData={PaymentAnimation} style={{ width: '250px', height: '250px' }} />
      </ImageContainer>
      <Header>
        우리응애가 좋아할 선물 <br />
        금방 도착할게요!
      </Header>

      {/* 버튼들 */}
      <ButtonContainer>
        <Button primary>메인으로</Button>
        <Button>쇼핑 계속하기</Button>
      </ButtonContainer>

      <ThickDivider />

      {/* 주문 목록 */}
      <Section>
        <SectionTitle>주문 목록 확인</SectionTitle>
        <ThinDivider />
        <OrderInfoRow label="공주가 되는 드레스" value="37,000원" />
        <OrderInfoRow label="수량: 1개 / 옵션: 노란색 XL" value="무료배송" />
      </Section>

      <ThickDivider />

      {/* 배송 정보 */}
      <Section>
        <SectionTitle>배송정보</SectionTitle>
        <ThinDivider />
        <DeliveryInfoRow label="수령인" value={buyer} />
        <DeliveryInfoRow label="휴대폰" value={phone} />
        <DeliveryInfoRow label="배송지" value={address} />

      </Section>

      <OrderDetailButton primary>주문상세보기</OrderDetailButton>
    </Container>
  );
};

export default PaymentEnd;
