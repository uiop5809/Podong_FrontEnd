import React, { useState } from 'react';
import styled from 'styled-components';
import CancelPay from "./CancelPay";

const StyledH2 = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
`;

const OrderCancellationWrapper = styled.div`
  padding: 20px;
  margin-top: 64px;
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 13px;
`;

const CancelItem = styled.div`
  margin-bottom: 20px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }

  label {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }

    div {
      p {
        margin: 0;
      }
    }
  }
`;

const CancelReason = styled.div`
  margin-bottom: 20px;

  select {
    width: 100%;
    margin-top: 10px;
    border-radius: 8px;
  }

  textarea {
    margin-top: 10px;
    width: 100%;
    height: 100px;
    border-radius: 8px;
  }
`;

const RefundInfo = styled.div`
  margin-bottom: 20px;
`;

const RefundDetails = styled.div`
  .refund-detail {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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
  const [cancelReason, setCancelReason] = useState('');
  const [detailedReason, setDetailedReason] = useState('');
  const [isCancelRequested, setIsCancelRequested] = useState(false);

  const handleReasonChange = (e) => {
    setCancelReason(e.target.value);
  };

  const handleDetailedReasonChange = (e) => {
    setDetailedReason(e.target.value);
  };

  const handleCancel = () => {
    setIsCancelRequested(true);
  };

  return (
    <OrderCancellationWrapper>
      <OrderInfo>
        <span>주문일시</span>
        <span>24.10.17</span>
      </OrderInfo>
      <CancelItem>
        <StyledH2>취소 사유 선택</StyledH2>
        <Divider />
        <ItemInfo>
          <input type="checkbox" id="item1" />
          <label>
            <div>
              <p>상품명, 상품사진 등등 db</p>
              <p>상품가격 db</p>
            </div>
          </label>
        </ItemInfo>
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
          <div className="refund-detail">
            <span>환불 금액</span>
            <span>37,000원</span>
          </div>
          <div className="refund-detail">
            <span>상품액</span>
            <span>37,000원</span>
          </div>
          <div className="refund-detail">
            <span>배송비</span>
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
