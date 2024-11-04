import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { UseCart } from '../ShoppingCart/CartContext';

const ShoppingDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || null);
  const [quantity, setQuantity] = useState(1);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const { dispatch } = UseCart();
  const userId = 1; // 테스트용 더미 유저 ID

  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      fetchProduct();
    }
  }, [product, productId]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const addToCart = async () => {
    // 요청 전에 데이터 확인을 위한 로그 추가
    console.log('Adding to cart with data:', {
      product: product.productId,
      user: userId,
      quantity: quantity,
    });

    try {
      const response = await axios.post('/api/carts', {
        product: product.productId,
        user: userId,
        quantity: quantity,
      });

      if (response.status === 201) {
        // 201 Created 응답 확인
        alert('상품을 장바구니에 담았습니다!');
      } else {
        console.error('Unexpected response:', response);
      }
      setCartModalOpen(false);
    } catch (error) {
      console.error('장바구니 추가 중 오류 발생:', error.response?.data || error.message);
    }
  };

  const handlePurchaseConfirm = () => {
    setPurchaseModalOpen(false);
    navigate('/payment');
  };

  return (
    <DetailContainer>
      <ProductImage src={product?.productImage} alt={product?.productTitle} />
      <Title>{product?.productTitle?.replace(/<[^>]*>/g, '')}</Title>
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
        <Price>{Number(product?.productLprice).toLocaleString()}원</Price>
      </ReviewPriceWrap>
      <PurchaseWrap>
        <Quantity>
          <QuantityButton onClick={decreaseQuantity} disabled={quantity === 1}>
            -
          </QuantityButton>
          <QuantityValue>{quantity}</QuantityValue>
          <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
        </Quantity>
        <ShoppingCartButton onClick={() => setCartModalOpen(true)}>장바구니 담기</ShoppingCartButton>
        <PurchaseButton onClick={() => setPurchaseModalOpen(true)}>바로 구매</PurchaseButton>
      </PurchaseWrap>

      {/* 장바구니 모달 */}
      {isCartModalOpen && (
        <Modal>
          <ModalContent>
            <ModalText>장바구니에 담으시겠습니까?</ModalText>
            <ModalButton onClick={addToCart}>담기</ModalButton>
            <ModalCancelButton onClick={() => setCartModalOpen(false)}>취소</ModalCancelButton>
          </ModalContent>
        </Modal>
      )}

      {/* 바로 구매 모달 */}
      {isPurchaseModalOpen && (
        <Modal>
          <ModalContent>
            <ModalText>바로 구매하시겠습니까?</ModalText>
            <ModalButton onClick={handlePurchaseConfirm}>구매</ModalButton>
            <ModalCancelButton onClick={() => setPurchaseModalOpen(false)}>취소</ModalCancelButton>
          </ModalContent>
        </Modal>
      )}

      <ProductInfo>
        <InfoTitle>상품 정보</InfoTitle>
        <InfoTable>
          <tbody>
            <tr>
              <TableHeader>브랜드</TableHeader>
              <TableData>{product?.productBrand || '정보 없음'}</TableData>
            </tr>
            <tr>
              <TableHeader>카테고리</TableHeader>
              <TableData>
                {`${product?.productCategory1} > ${product?.productCategory2} > ${product?.productCategory3} > ${product?.productCategory4}`}
              </TableData>
            </tr>
          </tbody>
        </InfoTable>
      </ProductInfo>
    </DetailContainer>
  );
};

export default ShoppingDetail;

// 스타일 컴포넌트
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const ShoppingCartButton = styled.button`
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

const PurchaseButton = styled.button`
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
  height: 335px;
  border-radius: 8px;
  margin-bottom: 20px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  text-align: left;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 80px;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  margin: 0 auto;

  @media (min-width: 375px) {
    width: 375px;
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  background-color: #ff6e00;
  color: #fff;
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #e65c00;
  }
`;

const ModalCancelButton = styled.button`
  color: #ff6e00;
  padding: 8px 16px;
  margin: 5px;
  border: 1px solid #ff6e00;
  border-radius: 4px;

  &:hover {
    background-color: #ff6e00;
    color: #ffffff;
  }
`;
