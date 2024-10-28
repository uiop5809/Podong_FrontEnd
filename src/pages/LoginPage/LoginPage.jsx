import styled from "styled-components";
import { images } from "../../components/Images";

const LoginPage = () => {
    const handleKakaoLogin = () => {
        const REST_API_KEY = 'f0fb0454cb68748fc7a9707be176e0c7';
        const REDIRECT_URI = 'http://localhost:8080/test';

        // 카카오 인증 URL로 리다이렉트
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    };

    return (
        <Container>
            <Image src={images.loginDogCat} alt="로그인 화면 강아지와 고양이 그림" />
            <Title>지금 가입하면 5천원 즉시 할인!</Title>
            <Subtitle>우리 댕냥이 엄마쇼핑 시작해볼까요?</Subtitle>
            <KakaoButton onClick={handleKakaoLogin}>카카오 계정으로 로그인</KakaoButton>
            <OtherMethodButton>다른 방법으로 시작하기</OtherMethodButton>
            <SkipButton>일단 둘러보기</SkipButton>
        </Container>
    );
};


export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  padding: 20px; 
`;

const Image = styled.img`
  width: 150px;
  height: auto;
  margin-top: 30px;
  margin-bottom: 20px; 
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px; 
  color: #000000;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 30px; 
  text-align: center;
`;

const Button = styled.button`
  width: 300px;
  padding: 12px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  margin-bottom: 15px;

  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
`;

const KakaoButton = styled(Button)`
  background-color: #fee500;
  color: #000000;

  &:hover {
    background-color: #ffd600;
    transform: scale(1.05); /* 살짝 커지는 효과 */
  }
`;

const OtherMethodButton = styled(Button)`
  background-color: #f5f5f5;
  color: #666666;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.05); /* 살짝 커지는 효과 */
  }
`;

const SkipButton = styled.p`
  font-size: 14px;
  color: #888888;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 70px; /* 위와의 간격 */
  margin-bottom: 80px; /* 아래 간격을 더 늘림 */
`;


