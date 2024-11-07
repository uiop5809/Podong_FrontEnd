import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ScrollableContainer = styled.div`
  max-height: 100%;
  overflow-y: auto; 
  margin: 64px 0;
`; // 스크롤 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%; 
  margin-top: 30%;
  margin-left: 5%;
  overflow-y: auto; 
`; // 전체 컨테이너 

const MentionContainer = styled.div`
  text-align: center;
  margin-bottom: 50px;
`; 

const SaveMention = styled.div`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 30px;
  text-align: center;
`; 

const SaveConfirm = styled.span`
  font-size: 17px;
  font-weight: bold;
  word-break: keep-all;
  color: #FF6E00;
  line-height: 1.7;
`;  

const MentionBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius:5px;
  height: 250px;
  margin-bottom: 20%;
  text-align: center;
  padding-top:30px;
  padding:20px;
  background-color: #F5F5F5;
`; 

const Recommendation = styled.div`
  font-size:15px;
  font-weight:bold;
  margin-bottom: 30px;
`

const RecommendationDescription = styled.div`
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  line-height: 1.4;
  word-break: keep-all;
  margin-bottom: 30px;
`

const AlertRecommendation = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #FF0000;
`

const RegisterButton = styled.button`
  display: flex;
  justify-content: center; 
  align-items: center; 
  border: 1px solid #E4E4E4;
  width: 100%;
  height: 43px; 
  text-align: center; 
  border-radius: 8px; 
  margin-top: 10px;
  margin-bottom: 10%;

  &:hover {
    background-color: #FF6E00;
    color: white; 
  }
`;


const RegisterMissingSavePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); 
  return (
    <ScrollableContainer>
      <Container>
        <MentionContainer>
          <SaveMention>
            정보가 저장되었습니다.<br />
          </SaveMention>
          <SaveConfirm>
            아이가 빠르게 가족의 품으로 돌아갈 수 있도록 
            발바닥천국이 최선을 다하겠습니다.
          </SaveConfirm>
        </MentionContainer>
        <MentionBox>
          <Recommendation>
            추천
          </Recommendation>
          <RecommendationDescription>
            다른 견주가 내가 강아지를 잃어버린 위치 주변에 있을 때, 알림을 보내드려요. 알림을 받은 견주는 해당 위치를 주의 깊게 살펴보게 됩니다.<br /><br />
            아이를 발견하면, 즉시 강아지가 세상을 지배한다님에게 발견 알림이 갑니다.
          </RecommendationDescription>
          <AlertRecommendation>
            알림을 켜두는 것을 추천드려요
          </AlertRecommendation>
        </MentionBox>
        <RegisterButton onClick={() => navigate(`/myPage/${userId}`)}>
          마이페이지로
        </RegisterButton>
      </Container>  
    </ScrollableContainer>
  );
}

export default RegisterMissingSavePage;
