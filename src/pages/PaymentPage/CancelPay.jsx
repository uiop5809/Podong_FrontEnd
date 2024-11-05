import React, { useEffect, useState } from "react";
import axios from "../../apis/AxiosInstance";

const CancelPay = ({ userId }) => {
  const [impUid, setImpUid] = useState(null);

  // userId에 따른 imp_uid 가져오기
  const fetchImpUid = async () => {
    try {
      const response = await axios.get(`/payment/list/${userId}`);
      const paymentData = response.data;

      console.log("Fetched Payment Data:", paymentData); // 전체 데이터를 확인

      // 배열의 첫 번째 객체의 impUid만 가져옵니다
      if (paymentData.length > 0 && paymentData[0].impUid) {
        setImpUid(paymentData[0].impUid);
      } else {
        console.error("impUid를 찾을 수 없습니다.");
        alert("impUid를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("impUid 가져오기 에러 발생:", error);
      alert("impUid를 가져오는 데 실패했습니다.");
    }
  };

  // 결제 취소 요청 핸들링
  const handleCancel = async () => {
    if (!impUid) return; // imp_uid가 없는 경우 실행 중지

    const confirm = window.confirm(`${impUid} / 결제를 취소하시겠습니까?`);
    if (confirm) {
      try {
        // Access token 요청
        const getToken = await axios({
          url: "/iamport/users/getToken",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            // eslint-disable-next-line no-undef
            imp_key: process.env.VITE_IMP_KEY,
            // eslint-disable-next-line no-undef
            imp_secret: process.env.VITE_IMP_SECRET,
          },
        });

        // 인증 토큰 추출
        const { access_token } = getToken.data.response;

        // 취소 요청
        await getCancelData(access_token, impUid);
      } catch (error) {
        console.error("토큰 추출 에러 발생:", error);
      }
    }
  };

  // 취소 요청 함수
  const getCancelData = async (access_token, imp_uid) => {
    try {
      const response = await axios.post(
        "/iamport/payments/cancel",
        {
          imp_uid: imp_uid, // 결제번호 (필수)
          cancel_request_amount: 1000,
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
    } catch (error) {
      console.error("결제 취소 에러 발생:", error);
      alert("결제 취소에 실패했습니다.");
    }
  };

  // 컴포넌트가 렌더링될 때 imp_uid를 먼저 가져오고 handleCancel 함수 실행
  useEffect(() => {
    fetchImpUid();
  }, []);

  useEffect(() => {
    if (impUid) {
      handleCancel();
    }
  }, [impUid]);

  return (
    <div>
      <p>결제 취소 요청 중...</p>
    </div>
  );
};

export default CancelPay;
