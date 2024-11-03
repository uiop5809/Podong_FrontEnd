import React from "react";
import axios from "axios";

const CancelPay = () => {
  // 결제 취소 함수
  const handleCancel = async () => {
    const imp_uid = "imp_624092379683"; // 테스트용 결제번호
    const confirm = window.confirm(`${imp_uid} / 결제를 취소하시겠습니까?`);
    if (confirm) {
      try {
        // Access token 요청
        const getToken = await axios({
          url: "/iamport/users/getToken",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            imp_key: "6424817121242405",
            imp_secret: "Qxc7mtPG7i3Rp0s2g4t9ftrE90QkD1jB32mmYIKQIaYyAdjAYFLD2Q9Ff7aA4KLSa7abVuXcut47ZTQ9",
          },
        });

        // 인증 토큰 추출
        const { access_token } = getToken.data.response;

        // 취소 요청
        await getCancelData(access_token, imp_uid);
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
          imp_uid: "imp_624092379683", // 결제번호 (필수)
          cancel_request_amount: 1000
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

  return (
    <div>
      <button onClick={handleCancel}>환불하기</button>
    </div>
  );
};

export default CancelPay;
