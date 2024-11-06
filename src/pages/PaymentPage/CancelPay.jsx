import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

const CancelPay = () => {
  const [userId, setUserId] = useState(null);
  const [merchantId, setMerchantId] = useState(null);
  const [impUid, setImpUid] = useState(null);
  const [payAmount, setPayAmount] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();
  

  // 페이지가 렌더링되면 userId를 받아옴
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("userId를 찾을 수 없습니다.");
      alert("userId를 찾을 수 없습니다.");
    }
  }, []);

  // userId가 설정되면 fetchImpUid 실행
  useEffect(() => {
    if (userId) {
      fetchImpUid();
    }
  }, [userId]);

  // fetchImpUid 함수
  const fetchImpUid = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/payment/list/${userId}`);
      const paymentData = response.data;

      console.log("Fetched Payment Data:", paymentData);

      if (paymentData.length > 0 && paymentData[0].impUid) {
        setImpUid(paymentData[0].impUid);
        setMerchantId(paymentData[0].merchantId);
        setPayAmount(paymentData[0].payAmount);
      } else {
        console.error("impUid를 찾을 수 없습니다.");
        alert("impUid를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("impUid 가져오기 에러 발생:", error);
      alert("impUid를 가져오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (impUid && payAmount) {
      handleCancel(impUid, payAmount);
    }
  }, [impUid, payAmount]);


  // 결제 취소 요청 핸들링
  const handleCancel = async (impUid, payAmount) => {
    if (!impUid) return;

    const confirm = window.confirm(`${impUid} / 결제를 취소하시겠습니까?`);
    if (confirm) {
      try {
        // Access token 요청
        const getToken = await axios({
          url: "/iamport/users/getToken",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            imp_key: import.meta.env.VITE_IMP_KEY,
            imp_secret: import.meta.env.VITE_IMP_SECRET,
          },
        });

        const { access_token } = getToken.data.response;

        // 취소 요청
        await getCancelData(access_token, impUid, payAmount);
      } catch (error) {
        console.error("토큰 추출 에러 발생:", error);
      }
    }
  };

  // 취소 요청 함수
  const getCancelData = async (access_token, impUid, payAmount) => {
    try {
      const response = await axios.post(
        "/iamport/payments/cancel",
        {
          imp_uid: impUid,
          cancel_request_amount: payAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log("결제 취소 완료:", response.data);
      alert("결제가 취소되었습니다.");
      console.log(merchantId, impUid);
      await axios.get(`${import.meta.env.VITE_BASE_URL}/payment/cancel`, {
        params:{
          id : merchantId,
          iamUid : impUid,
        }
        });

      navigate(`/paymentCancelDone/${orderId}`);
      
    } catch (error) {
      console.error("결제 취소 에러 발생:", error);
      alert("결제 취소에 실패했습니다.");
    }
  };

  return (
      <CancelPayContent>
        <CancelPayMessage>결제 취소 요청 중...</CancelPayMessage>
      </CancelPayContent>
  );
};

export default CancelPay;

const CancelPayContent = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CancelPayMessage = styled.p`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #ff6b6b;
`;