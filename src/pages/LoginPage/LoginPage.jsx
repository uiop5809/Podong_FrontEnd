import React, { useEffect } from 'react';
import styled from "styled-components";
import { images } from "../../components/Images";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const jwtToken = queryParams.get('jwtToken');
    const accessToken = queryParams.get('accessToken');
    const refreshToken = queryParams.get('refreshToken');
    const userId = queryParams.get('userId');

    console.log('Received tokens from URL:', { jwtToken, accessToken, refreshToken });

    if (jwtToken && accessToken && refreshToken) {
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId',userId);
      console.log('Tokens saved to localStorage:', { jwtToken, accessToken, refreshToken });

      fetchUserId(jwtToken); // jwtToken을 fetchUserId 함수에 전달
    } else {
      console.log('Tokens not found in URL');
    }
  }, [location, navigate]);

  const fetchUserId = async (jwtToken) => {
    try {
        const response = await axios.get('http://localhost:8080/api/users', {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        // 서버 응답 데이터 확인
        console.log('Server response:', response.data);

        // userId가 서버에서 제대로 전달됐는지 확인하고 로컬 스토리지에 저장
        const userId = response.data.userId; // 서버 응답에서 userId 가져오기
        if (userId) {
            localStorage.setItem('userId', userId);
            console.log('User ID saved to localStorage:', userId);
        } else {
            console.error('User ID is missing in server response');
        }
    } catch (error) {
        console.error("Error fetching user ID:", error);
    }
};

  const handleKakaoLogin = () => {
    const REST_API_KEY = 'f0fb0454cb68748fc7a9707be176e0c7';
    const REDIRECT_URI = 'http://localhost:8080/test';
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return (
    <Container>
      <Image src={images.loginDogCat} alt="로그인 화면 강아지와 고양이 그림" />
      <Title>지금 가입하면 5천원 즉시 할인!</Title>
      <Subtitle>우리 댕냥이 엄마쇼핑 시작해볼까요?</Subtitle>
      <KakaoButton onClick={handleKakaoLogin}>카카오 계정으로 로그인</KakaoButton>
      <OtherMethodButton>다른 방법으로 시작하기</OtherMethodButton>
      <SkipButton onClick={() => navigate('/home')}>일단 둘러보기</SkipButton>
    </Container>
  );
};

export default LoginPage;

// 스타일링 코드

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
  margin-top: 70px;
  margin-bottom: 80px;
`;
