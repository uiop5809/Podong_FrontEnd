import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import PaymentAnimation from '../PaymentPage/PaymentAnimation.json';
import PropTypes from 'prop-types';
import axios from '../../apis/AxiosInstance';
import { IoMdSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const statuses = {
  inTransit: '배송 중',
  preparing: '배송 준비중',
  completed: '배송 완료',
};

const PaymentEnd = () => {
  const [buyer, setBuyer] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // 유저 정보를 가져오는 함수
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

    // 주문 목록을 가져오는 함수
    const fetchOrderList = async () => {
      try {
        const response = await axios.get(`/order/list/${userId}`);
        const formattedData = response.data.map(product => ({
          ...product,
          status: statuses[product.status] || '상태 없음',
        }));
        setProducts(formattedData);
      } catch (error) {
        console.error('주문 목록을 가져오는 중 오류 발생:', error);
      }
    };

    getInfo();
    fetchOrderList();
  }, []);

  const filteredProducts = products.filter(
    product =>
      product.productDTO.productTitle &&
      product.productDTO.productTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container>
      <ImageContainer>
        <Lottie animationData={PaymentAnimation} style={{ width: '250px', height: '250px' }} />
      </ImageContainer>
      <Header>
        우리응애가 좋아할 선물 <br />
        금방 도착할거에요!
      </Header>

      <ButtonContainer>
        <Button primary onClick={() => navigate('/')}>
          메인으로
        </Button>
        <Button>쇼핑 계속하기</Button>
      </ButtonContainer>

      <ThickDivider />

      {filteredProducts.map(product => (
        <OrderContainer key={product.orderId}>
          <DeliveryStatus>{statuses[product.status]}</DeliveryStatus>
          <OrderInfoWrap>
            <ImageWrapper>
              <ProductImage src={product.productDTO.productImage} alt="Product" />
            </ImageWrapper>
            <OrderDetails>
              <ShippingInfo>무료 배송</ShippingInfo>
              <ProductTitle>{product.productDTO.productTitle.replace(/<[^>]*>/g, '')}</ProductTitle>
              <OptionWrap>
                <ProductDetails>수량: {product.quantity}</ProductDetails>
                <Price>{product.productDTO.productLprice}원</Price>
              </OptionWrap>
            </OrderDetails>
          </OrderInfoWrap>
        </OrderContainer>
      ))}

      <ThickDivider />

      <Section>
        <SectionTitle>배송정보</SectionTitle>
        <ThinDivider />
        <DeliveryInfoRow label="수령인" value={buyer} />
        <DeliveryInfoRow label="휴대폰" value={phone} />
        <DeliveryInfoRow label="배송지" value={address} />
        <ThinDivider />
      </Section>

      <OrderDetailButton primary onClick={() => navigate('/orderList')}>
        주문 목록보기
      </OrderDetailButton>
    </Container>
  );
};

export default PaymentEnd;

const Container = styled.div`
  padding: 64px 0 80px;
`;

const Header = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0 20px;
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
  height: 8px;
  background-color: #f3f3f3;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ThinDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
`;

const OrderContainer = styled.div`
  padding: 0 20px;
  margin-top: 20px;
`;

const OrderInfoWrap = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 100px;
  margin-right: 15px;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const OrderDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const DeliveryStatus = styled.div`
  color: #ff6e00;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ShippingInfo = styled.div`
  color: #939393;
  font-size: 12px;
`;

const ProductTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 12px;
`;

const OptionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const ProductDetails = styled.div`
  font-size: 12px;
  color: #777;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const Section = styled.div`
  width: 100%;
  padding: 10px 0;
  text-align: left;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  padding: 0 20px;
`;

const DeliveryInfoRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  padding: 0 20px;
`;

const DeliveryLabel = styled.span`
  font-size: 14px;
  font-weight: bold;
  min-width: 80px;
`;

const DeliveryValue = styled.span`
  font-size: 14px;
  text-align: left;
  flex-grow: 1;
  font-size: 14px;
`;

const OrderDetailButton = styled(Button)`
  width: 90%;
  padding: 10px;
  margin: 0 auto;
  font-size: 14px;
  border-radius: 8px;
`;

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
