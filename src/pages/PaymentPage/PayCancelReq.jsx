import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../../apis/AxiosInstance';
import CancelPay from './CancelPay';
import { useParams, useNavigate } from 'react-router-dom';

const StyledH1 = styled.h1`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

const StyledH2 = styled.h2`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 10px;
`;

const OrderCancellationWrapper = styled.div`
  min-height: 100vh;
  padding: 64px 20px 80px;
`;

const CancelItem = styled.div`
  margin-bottom: 20px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;

  input {
    margin-right: 10px;
  }

  label {
    display: flex;
    align-items: center;
    position: relative;

    img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
    }

    div {
      display: flex;
      flex-direction: column;

      p {
        margin: 0;
      }

      p:last-child {
        align-self: flex-end;
        margin-top: 10px;
      }
    }
  }
`;

const CancelReason = styled.div`
  margin-bottom: 20px;

  select {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d1d1d1;
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
      border-color: #ff6e00;
      box-shadow: 0 0 5px rgba(255, 110, 0, 0.5);
      outline: none;
    }
  }

  textarea {
    margin-top: 10px;
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d1d1d1;
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
    resize: none;

    &:focus {
      border-color: #ff6e00;
      box-shadow: 0 0 5px rgba(255, 110, 0, 0.5);
      outline: none;
    }
  }
`;

const RefundInfo = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const RefundDetails = styled.div`
  .refund-amount {
    font-size: 18px;
    font-weight: bold;
    color: #ff6e00;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .refund-detail {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    span {
      font-size: 14px;
    }
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const CancelButton = styled.button`
  background-color: #ff6e00;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkorange;
  }
`;

function PayCancelReq() {
  const [orderDetail, setOrderDetail] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [detailedReason, setDetailedReason] = useState('');
  const [isCancelRequested, setIsCancelRequested] = useState(false);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`/order/detail/${orderId}`);
        setOrderDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('주문 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchOrderDetail();
  }, []);

  const handleReasonChange = e => {
    setCancelReason(e.target.value);
  };

  const handleDetailedReasonChange = e => {
    setDetailedReason(e.target.value);
  };

  const handleCancel = () => {
    setIsCancelRequested(true);
  };

  if (!orderDetail) {
    return <div>Loading...</div>;
  }

  const { productDTO } = orderDetail;

  return (
    <OrderCancellationWrapper>
      <CancelItem>
        <StyledH1>취소 상품</StyledH1>
        <Divider />
        <ItemInfo>
          <input type="checkbox" id="item1" />
          <label>
            <img src={productDTO.productImage} alt="Product" />
            <div>
              <p>{productDTO.productTitle.replace(/<[^>]*>/g, '')}</p>
              <p>{productDTO.productLprice}원</p>
            </div>
          </label>
        </ItemInfo>
        <Divider />
      </CancelItem>
      <CancelReason>
        <StyledH2>취소 사유</StyledH2>
        <select value={cancelReason} onChange={handleReasonChange}>
          <option value="">사유를 선택해주세요.</option>
          <option value="change_mind">단순 고객 변심</option>
          <option value="wrong_item">잘못된 상품 주문</option>
          <option value="change_option">상품 옵션 변경</option>
          <option value="time_delivery">배송 지연</option>
          <option value="change_paymethod">결제 수단 변경</option>
          <option value="other">기타</option>
        </select>
        <textarea
          placeholder="상세 사유를 상세하게 입력해주세요."
          value={detailedReason}
          onChange={handleDetailedReasonChange}
        />
      </CancelReason>
      <Divider />
      <RefundInfo>
        <RefundDetails>
          <div className="refund-amount">
            <span>최종 환불 금액</span>
            <span>{productDTO.productLprice}원</span>
          </div>
          <Divider />
          <div className="refund-detail">
            <span>환불 요청금액</span>
            <span>{productDTO.productLprice}원</span>
          </div>
          <div className="refund-detail">
            <span>상품액</span>
            <span>{productDTO.productLprice}원</span>
          </div>
          <div className="refund-detail">
            <span>배송비</span>
            <span>0원</span>
          </div>
          <div className="refund-detail">
            <span>총 차감금액</span>
            <span>0원</span>
          </div>
          <div className="refund-detail">
            <span>반품 배송비</span>
            <span>0원</span>
          </div>
          <div className="refund-detail">
            <span>쿠폰 및 배송 할인비</span>
            <span>0원</span>
          </div>
        </RefundDetails>
      </RefundInfo>
      <CancelButton onClick={handleCancel}>결제 취소</CancelButton>

      {isCancelRequested && <CancelPay userId />}
    </OrderCancellationWrapper>
  );
}

export default PayCancelReq;
