import axios from "../../apis/AxiosInstance";

// 결제 요청 함수
export const requestPayment = () => {
  const { IMP } = window; // 포트원 SDK 로드 확인
  if (!IMP) {
    console.error("포트원 SDK 로드 실패");
    return;
  }
  IMP.init("imp02101050"); // 포트원 가맹점 식별코드

  // 결제 요청
  IMP.request_pay(
    {
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
    },
    (rsp) => {
      if (rsp.success) {
        // 프론트에서 결}제가 완료되면
        console
          .log(axios.post(`/v1/order/payment/${rsp.imp_uid}`))
          .then((res) => {
            // 결제완료
          })
          .catch((error) => {
            // 에러발생시
          });
      } else {
        // 에러발생시
      }
    }
  );
};

export default requestPayment;
