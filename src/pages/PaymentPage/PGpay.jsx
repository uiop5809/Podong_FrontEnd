import React from "react";
import styled from "styled-components";

// 결제 요청 함수
export const requestPayment = () => {
  console.log("결제 요청 함수 호출"); // 결제 함수 호출 여부 확인
  const { IMP } = window; // 포트원 SDK 로드 확인
  if (!IMP) {
    console.error("포트원 SDK 로드 실패");
    return;
  }
  IMP.init("imp02101050"); // 포트원 가맹점 식별코드

  const data = {
    pg: "html5_inicis", // PG사명
    pay_method: "card", // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호 (중복되지 않도록 생성)
    name: "테스트 결제", // 결제명
    amount: 1000, // 결제 금액
    buyer_email: "test@test.com", // 구매자 이메일
    buyer_name: "홍길동", // 구매자 이름
    buyer_tel: "010-1234-5678", // 구매자 전화번호
    buyer_addr: "서울특별시 강남구 삼성동", // 구매자 주소
    buyer_postcode: "123-456", // 구매자 우편번호
  };

  // 결제 요청
  IMP.request_pay(data, callback);
};

// 결제 완료 후 콜백 함수
const callback = (response) => {
  const { success, error_msg } = response;
  if (success) {
    alert("결제가 완료되었습니다!");
  } else {
    alert(`결제에 실패하였습니다: ${error_msg}`);
  }
};

const Page = styled.div`
  margin: 64px 0;
`;

export default requestPayment;