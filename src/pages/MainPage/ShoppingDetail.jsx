import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

const ShoppingDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { product } = location.state || {};
  const [quantity, setQuantity] = useState(1);

  if (!product || product.productId !== productId) {
    return <NotFoundMessage>상품 정보를 찾을 수 없습니다.</NotFoundMessage>;
  }

  // 수량 증가 함수
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // 수량 감소 함수
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <DetailContainer>
      <ProductImage src={product.image} alt={product.title} />
      <Title>{product.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Title>
      <ReviewPriceWrap>
        <ReviewWrap>
          <Stars>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <FaStar key={index} color="#FFD700" />
              ))}
          </Stars>
          <Reviews>10개 후기</Reviews>
        </ReviewWrap>
        <Price>{Number(product.lprice).toLocaleString()}원</Price>
      </ReviewPriceWrap>
      <PurchaseWrap>
        <Quantity>
          <QuantityButton onClick={decreaseQuantity} disabled={quantity === 1}>
            -
          </QuantityButton>
          <QuantityValue>{quantity}</QuantityValue>
          <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
        </Quantity>
        <ShoppingCart>장바구니 담기</ShoppingCart>
        <PurchaseBtn>바로 구매</PurchaseBtn>
      </PurchaseWrap>
      <ProductInfo>
        <InfoTitle>상품 정보</InfoTitle>
        <InfoTable>
          <tbody>
            <tr>
              <TableHeader>브랜드</TableHeader>
              <TableData>{product.brand || '정보 없음'}</TableData>
            </tr>
            <tr>
              <TableHeader>제조사</TableHeader>
              <TableData>{product.maker || '정보 없음'}</TableData>
            </tr>
            <tr>
              <TableHeader>카테고리</TableHeader>
              <TableData>
                {`${product.category1} > ${product.category2} > ${product.category3} > ${product.category4}`}
              </TableData>
            </tr>
          </tbody>
        </InfoTable>
      </ProductInfo>
    </DetailContainer>
  );
};

export default ShoppingDetail;

// Styled components
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 48px auto 64px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ReviewPriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const ReviewWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Stars = styled.div`
  display: flex;
  color: #ffd700;
  margin-right: 8px;
`;

const Reviews = styled.span`
  font-size: 12px;
  color: #777;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const PurchaseWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b8b2b2;
  border-radius: 4px;
`;

const QuantityButton = styled.button`
  width: 25px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
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
  font-size: 16px;
`;

const ShoppingCart = styled.button`
  background-color: #fff;
  border: 1px solid #ff6e00;
  color: #ff6e00;
  padding: 8px 0;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6e00;
    color: #fff;
  }
`;

const PurchaseBtn = styled.button`
  background-color: #ff6e00;
  color: #fff;
  padding: 8px 0;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e65c00;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ProductInfo = styled.div`
  text-align: left;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const InfoTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  border: 1px solid #eee;
`;

const TableHeader = styled.th`
  text-align: center;
  padding: 8px;
  background-color: #f0f0f0;
  font-weight: normal;
  color: #555;
`;

const TableData = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
  color: #777;
`;

const NotFoundMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 50px;
`;
