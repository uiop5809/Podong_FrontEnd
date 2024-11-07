import styled from 'styled-components';
import { images } from '../../components/Images';
import { useNavigate } from 'react-router-dom';
import loginbtn from './loginbtn.png';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Image src={images.loginDogCat} alt="로그인 화면 강아지와 고양이 그림" />
      <Title>
        지금 가입하면 <StyledTitle>5천원 즉시 할인!</StyledTitle>{' '}
      </Title>
      <Subtitle>우리 댕냥이 엄마쇼핑 시작해볼까요?</Subtitle>
      <a href="https://ureca.store/api/oauth2/authorization/kakao">
        <img src={loginbtn} alt="카카오 계정으로 로그인" />
      </a>
      <OtherMethodButton>다른 방법으로 시작하기</OtherMethodButton>
      <SkipButton onClick={() => navigate('/')}>일단 둘러보기</SkipButton>
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

const StyledTitle = styled.span`
  color: #ff6e00;
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

const OtherMethodButton = styled(Button)`
  background-color: #f0f0f0;
  color: #b3b3b3;
  border-radius: 8px;
  margin-top: 5px;
  font-size: 14px;

  &:hover {
    background-color: #ff6e00;
    color: #ffffff;
  }
`;

const SkipButton = styled.p`
  font-size: 14px;
  color: #888888;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 70px;
  margin-bottom: 80px;
`;
