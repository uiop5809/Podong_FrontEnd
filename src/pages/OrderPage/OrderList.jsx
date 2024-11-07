import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import axios from "../../apis/AxiosInstance";
import { useNavigate } from "react-router-dom";

const statuses = {
  inTransit: "배송 중",
  preparing: "배송 준비중",
  completed: "배송 완료",
};

const OrderList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // 주문 목록을 가져오는 함수
  const fetchOrderList = async () => {
    try {
      const response = await axios.get(`/order/list/${userId}`);
      const formattedData = response.data.map((product) => ({
        ...product,
        status: statuses[product.status] || "상태 없음",
      }));
      setProducts(formattedData);
    } catch (error) {
      console.error("주문 목록을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.productDTO.productTitle &&
      product.productDTO.productTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <SearchBarWrapper>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="상품명 / 브랜드명으로 검색하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </SearchInputWrapper>
      </SearchBarWrapper>

      {filteredProducts.map((product) => (
        <OrderContainer key={product.orderId}>
          <OrderDate>{product.date}</OrderDate>
          <OrderCard>
            <DeliveryStatus>{statuses.inTransit}</DeliveryStatus>
            <OrderInfoWrap>
              <ImageWrapper>
                <ProductImage
                  src={product.productDTO.productImage}
                  alt="Product"
                />
              </ImageWrapper>
              <OrderDetails>
                <ShippingInfo>무료 배송</ShippingInfo>
                <ProductTitle>
                  {product.productDTO.productTitle.replace(/<[^>]*>/g, "")}
                </ProductTitle>
                <OptionWrap>
                  <ProductDetails>수량: {product.quantity}</ProductDetails>
                  <Price>{product.productDTO.productLprice}원</Price>
                </OptionWrap>
              </OrderDetails>
            </OrderInfoWrap>
            <ButtonWrapper>
              <OrderButton>배송 조회</OrderButton>
              <OrderButton>재구매</OrderButton>
              <OrderButton
                onClick={() =>
                  navigate(`/orderList/orderDetail/${product.orderId}`, {
                    state: { quantity: product.quantity },
                  })
                }
              >
                주문 상세
              </OrderButton>
            </ButtonWrapper>
          </OrderCard>
        </OrderContainer>
      ))}
    </Container>
  );
};

export default OrderList;

const Container = styled.div`
  padding: 64px 0px 80px;
`;

const SearchBarWrapper = styled.div`
  background-color: #f5f5f5;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 36px 12px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

const SearchIcon = styled(IoMdSearch)`
  position: absolute;
  width: 25px;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #939393;
  font-size: 18px;
`;

const OrderContainer = styled.div`
  padding: 0 20px;
  margin-top: 20px;
`;

const OrderDate = styled.div`
  font-weight: bold;
`;

const OrderCard = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 0;
  margin-bottom: 15px;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  margin-top: 10px;
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 8px;
  font-size: 12px;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    background-color: #f8f8f8;
  }
`;
