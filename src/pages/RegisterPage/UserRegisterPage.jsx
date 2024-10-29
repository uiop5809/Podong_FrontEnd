import React, { useState } from 'react';
import styled from 'styled-components';
import { images } from '../../components/Images';
import { useNavigate } from 'react-router-dom';
import PopupDom from '../../components/Register/PopUpDom';
import PopupPostCode from '../../components/Register/PopupPostCode';

const ScrollableContainer = styled.div`
  max-height: 100%;
  border: 1px solid #ddd;
  margin: 64px 0;
  width: 100%; 
`; //스크롤 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%; 
  margin-left: 5%;
`; 

const Description = styled.label`
  font-size: 13px;
  font-weight: 570;
  line-height: 1.7;
  margin-bottom: 15px;
  margin-top: 5%;
  word-break: keep-all;
`; // 사용자 인사 

const HightLight = styled.span`
  color: #FF6E00;
`; // 사용자 인사 중 하이라이트 

const Label = styled.label`
  font-size: 10px;
  color: #B3B3B3;
  margin-bottom: 10px;
  margin-top: 5px;
`; // 각 폼 레이블 

const KakaoEmail = styled.input`
  padding: 13px 13px;
  margin-bottom: 8px;
  border: 1px solid #818181;
  border-radius: 5px; 
  font-size: 11px;
  background-color: #EEEEEE;
  width: 100%;
`; //이메일 부분 disabled

const Icon = styled.img`
  position: absolute;
  top: 40%;
  left: 90%; 
  transform: translateY(-8px);
  width: 20px;
  height: 20px;
`; //카카오 아이콘

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`; // 입력하는 폼 전체 컨테이너 

const PostSearchContainer = styled.input`
  padding: 13px 13px;
  margin-bottom: 8px;
  border: 1px solid #E4E4E4;
  border-radius: 5px; 
  font-size: 11px;
  background-color: white;
  width: 60%;
`; 

const StyledInput = styled.input`
  padding: 13px 50px 13px 13px;
  width: 100%;
  margin-top: 4px;
  border: 1px solid #E4E4E4;
  border-radius: 5px;
  font-size: 11px;
`; //입력 폼

const SearchAddressButton = styled.button` 
  position: absolute;
  width: 100px;
  height: 40px;
  top: 43px;
  right: 5px;
  transform: translateY(-50%);
  background-color: #FFEFEF; 
  color: #FF6E00;
  border: none;
  border-radius: 5px; 
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  padding: 5px 10px;
  transition: background-color 0.3s;

  &:hover { 
    background-color: #FFD3D3;
  }
`;

const Divider = styled.div`
  background-color: #F7F7F7;
  margin-top:16px;
  width:100%;
  height: 20px;
`; //구분선

const SubTitle = styled.label`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
  flex-grow: 1; 
`; //앱푸시알림

const SubTitleList = styled.label`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 8px;
`; //각 알람 제목

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
`; //설명 컨테이너 

const SubDescription = styled.label`
  font-size: 10px;
  font-weight: light;
  color:#8D8D8D;
  margin-bottom: 10px;
`; //각 알람 설명 

const AlertAgreementDescription = styled.div`
  margin-top: 10px;
  font-size: 8px;
  color: #FF6E00;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const TextContainer = styled.div`
  display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  `;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const AlarmAgreementContainer = styled.div`
  display: flex;
  align-items: center;  
  position: relative;
  width: 100%;
  margin-top: 7%;
  margin-bottom: 8px;
`;

const FirstToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom:10px;
  margin-left: 40%;
  margin-top:10px;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);
    transition: background-color 0.5s; 
  }

  > .toggle--checked {
    background-color: #FF6E00;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition: left 0.5s; 
  }

  > .toggle--checked {
    left: 27px; 
  }
`; //토글 버튼

const SecondToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom:10px;
  margin-left: 41%;
  margin-top: 15px;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);
    transition: background-color 0.5s; 
  }

  > .toggle--checked {
    background-color: #FF6E00;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition: left 0.5s; 
  }

  > .toggle--checked {
    left: 27px; 
  }
`; 


const ThirdToggleContainer = styled.div`  position: relative;
cursor: pointer;
margin-bottom:10px;
margin-left: 100px;
margin-top:20px;

> .toggle-container {
  width: 50px;
  height: 24px;
  border-radius: 30px;
  background-color: rgb(233,233,234);
  transition: background-color 0.5s; 
}

> .toggle--checked {
  background-color: #FF6E00;
}

> .toggle-circle {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgb(255,254,255);
  transition: left 0.5s; 
}

> .toggle--checked {
  left: 27px; 
}
`; //토글 버튼


const RegisterButton = styled.button`
  display: flex;
  justify-content: center; 
  align-items: center; 
  border: 1px solid #E4E4E4;
  width: 90%;
  height: 43px; 
  text-align: center; 
  border-radius: 8px; 
  margin-bottom: 20px;
  margin-left: 20px;

  &:hover {
    background-color: #FF6E00;
    color: white; 
  }
`; // 저장버튼

const UserEditPage = () => {
  const navigate = useNavigate(); 

  const [toggleStates, setToggleStates] = useState([false, false, false]);
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [address, setAddress] = useState('');
  const [zoneCode, setZoneCode] = useState('');

  const openPostCode = () => {
    setIsPopupOpen(true)
  }

  const closePostCode = () => {
    setIsPopupOpen(false)
  }

  const toggleHandler = (index) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index]; 
    setToggleStates(newToggleStates);
  };
  
  const handleRegister = () => {
    const nickname = document.querySelector('input[placeholder="닉네임을 입력해주세요"]').value;
    const addressInput = document.querySelector('input[placeholder="기본주소를 입력해주세요"]').value;

    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (!addressInput) {
      alert('주소를 입력해주세요.');
      return;
    }

    alert('사용자 정보가 등록되었습니다.');
    navigate('/');
  };


  return (
    <ScrollableContainer>
      <Container>
        <Description>
          <HightLight>발바닥 천국</HightLight>과🐾 당신의 반려동물 이야기를 시작해 볼까요?<br /> 정보를 입력해 주시면 더 행복한 발걸음을 만들어 드릴게요!
        </Description>
        <Label>이메일</Label>
        <InputContainer>
          <KakaoEmail placeholder="ttnqls0217@gmail.com" disabled />
          <Icon src={images.kakaoIcon} alt="카카오 아이콘" />
        </InputContainer>

        <Label>닉네임</Label>
        <InputContainer>
          <StyledInput placeholder="닉네임을 입력해주세요" required />
        </InputContainer>
        
        <InputContainer>
        <Label>주소</Label>
        <AddressContainer>
            <PostSearchContainer 
              placeholder="우편번호" 
              value={zoneCode} 
              readOnly 
            />
          <SearchAddressButton onClick={openPostCode}>주소검색</SearchAddressButton>
          <div id='popupDom'>
            {isPopupOpen && (
              <PopupDom>
                <PopupPostCode 
                  onClose={closePostCode} 
                  setAddress={setAddress} 
                  setZoneCode={setZoneCode} 
                />
            </PopupDom>
            )}
          </div>
          <StyledInput 
                placeholder="기본주소를 입력해주세요" 
                value={address} 
                readOnly
                required 
            />
            <StyledInput placeholder="상세 주소를 입력해주세요" required />
        </AddressContainer>
        </InputContainer>
      </Container>
      <Divider />

      <Container>
        <AlarmAgreementContainer>
          <SubTitle>
            앱 푸시 알림 
          </SubTitle>
        </AlarmAgreementContainer>

        <SubContainer>
          <TextContainer>
          <SubTitleList>우리응애 건강관리</SubTitleList>
          <DescriptionContainer>
            <SubDescription>예방접종일과 병원 정보를 빠르게 받아보세요!</SubDescription>
            </DescriptionContainer>
          </TextContainer>
          <FirstToggleContainer onClick={() => toggleHandler(0)}>
            <div className={`toggle-container ${toggleStates[0] ? "toggle--checked" : ""}`} />
            <div className={`toggle-circle ${toggleStates[0] ? "toggle--checked" : ""}`} />
          </FirstToggleContainer>
        </SubContainer>

        <SubContainer>
        <TextContainer>
        <SubTitleList>집사 생활</SubTitleList>
        <DescriptionContainer>
        <SubDescription>
          내가 작성한 글의 댓글을 빠르게 확인하세요!
        </SubDescription>
        </DescriptionContainer>
        </TextContainer>
        <SecondToggleContainer onClick={() => toggleHandler(1)}>
          <div className={`toggle-container ${toggleStates[1] ? "toggle--checked" : ""}`} />
          <div className={`toggle-circle ${toggleStates[1] ? "toggle--checked" : ""}`} />
        </SecondToggleContainer>
        </SubContainer>

        <SubContainer>
        <TextContainer>
        <SubTitleList> 실종 알림</SubTitleList>
        <DescriptionContainer>
        <SubDescription>
          다른 아이의 등록된 실종 위치 근처에 도착하면 알림을 보내드려요
          <AlertAgreementDescription>가족의 품으로 가는 길, 도와주시면 감사하겠습니다*</AlertAgreementDescription>
        </SubDescription>
        </DescriptionContainer>
        </TextContainer>
        <ThirdToggleContainer onClick={() => toggleHandler(2)}>
          <div className={`toggle-container ${toggleStates[2] ? "toggle--checked" : ""}`} />
          <div className={`toggle-circle ${toggleStates[2] ? "toggle--checked" : ""}`} />
        </ThirdToggleContainer>
        </SubContainer>
      </Container>
      <RegisterButton 
        onClick={handleRegister}>저장하기</RegisterButton>
    </ScrollableContainer>
  );
};

export default UserEditPage;