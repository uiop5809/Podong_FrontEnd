import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { images } from '../../components/Images';
import { useNavigate, useParams } from 'react-router-dom';
import UploadImg from '../../components/Register/UploadImg';
import PopupDom from '../../components/Register/PopUpDom';
import PopupPostCode from '../../components/Register/PopupPostCode';
import axios from '../../apis/AxiosInstance';

const ScrollableContainer = styled.div`
  max-height: 100%;
  border: 1px solid #ddd;
  margin: 64px 0;
`; //스크롤

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-left: 5%;
`; // 전체 컨테이너

const Description = styled.label`
  font-size: 13px;
  font-weight: 570;
  line-height: 1.7;
  margin-bottom: 15px;
  margin-top: 5%;
  word-break: keep-all;
`; // 사용자 인사

const WelcomeContainer = styled.div`
  margin-bottom: 20px;
  margin-top: 10px;
`;

const WelcomeComment = styled.span`
  color: black;
`;

const FirstComment = styled.span`
  color: #ff6e00;
`;

const HightLight = styled.span`
  color: #ff6e00;
`; // 사용자 인사 중 하이라이트

const Label = styled.label`
  font-size: 10px;
  color: #b3b3b3;
  margin-bottom: 10px;
  margin-top: 5px;
`; // 각 폼 레이블

const KakaoEmail = styled.input`
  padding: 13px 13px;
  margin-bottom: 8px;
  border: 1px solid #818181;
  border-radius: 5px;
  font-size: 11px;
  background-color: #eeeeee;
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

const StyledInput = styled.input`
  padding: 13px 50px 13px 13px;
  width: 100%;
  margin-top: 4px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  font-size: 11px;
`; //입력 폼

const PostSearchContainer = styled.input`
  padding: 13px 13px;
  margin-bottom: 8px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  font-size: 11px;
  background-color: white;
  width: 65%;
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const SearchAddressButton = styled.button`
  position: absolute;
  width: 100px;
  height: 40px;
  top: 43px;
  right: 5px;
  transform: translateY(-50%);
  background-color: #ffefef;
  color: #ff6e00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  padding: 5px 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd3d3;
  }
`;

const Divider = styled.div`
  background-color: #f7f7f7;
  margin-top: 16px;
  width: 100%;
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
  color: #8d8d8d;
  margin-bottom: 10px;
`; //각 알람 설명

const AlertAgreementDescription = styled.div`
  margin-top: 10px;
  font-size: 8px;
  color: #ff6e00;
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

const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const PhonenumberInputrequired = styled.input`
  padding: 13px 13px;
  margin-bottom: 8px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  font-size: 11px;
  background-color: white;
  width: 65%;
`;

const PhoneNumberAuthorization = styled.button`
  position: absolute;
  width: 100px;
  height: 40px;
  top: 43px;
  right: 5px;
  transform: translateY(-50%);
  background-color: #ffefef;
  color: #ff6e00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  padding: 5px 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd3d3;
  }
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
  margin-bottom: 10px;
  margin-left: 40%;
  margin-top: 10px;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
    transition: background-color 0.5s;
  }

  > .toggle--checked {
    background-color: #ff6e00;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: left 0.5s;
  }

  > .toggle--checked {
    left: 27px;
  }
`; //토글 버튼

const SecondToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 41%;
  margin-top: 15px;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
    transition: background-color 0.5s;
  }

  > .toggle--checked {
    background-color: #ff6e00;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: left 0.5s;
  }

  > .toggle--checked {
    left: 27px;
  }
`;

const ThirdToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 100px;
  margin-top: 20px;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
    transition: background-color 0.5s;
  }

  > .toggle--checked {
    background-color: #ff6e00;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
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
  border: 1px solid #e4e4e4;
  width: 330px;
  height: 43px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 200px;
  margin-left: 20px;

  &:hover {
    background-color: #ff6e00;
    color: white;
  }
`; // 저장버튼

const UserEditPage = () => {
  const [imgPath, setImgPath] = useState('');
  const [toggleStates, setToggleStates] = useState([false, false, false]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [zoneCode, setZoneCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileNickname, setProfileNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      try {
        const response = await axios.get(`/user/${userId}`);
        const userData = response.data;
        setNickname(userData.nickname);
        setProfileNickname(userData.profileNickname);
        setPhoneNumber(userData.phoneNumber);
        setAddress(userData.address);
        setDetailedAddress(userData.detailedAddress || '');
        setZoneCode(userData.zoneCode || '');
        setEmail(userData.accountEmail);
        setToggleStates([userData.health, userData.petCare, userData.missing]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const userId = localStorage.getItem('userId');

    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!nicknameRegex.test(nickname)) {
      alert('닉네임에는 특수문자를 사용할 수 없습니다. 다시 입력해 주세요.');
      setNickname('');
      return;
    }

    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('휴대폰 번호는 010-1234-5678 형식으로 입력해 주세요.');
      return;
    }

    try {
      await axios.put(`/user/${userId}`, {
        nickname,
        phoneNumber,
        address,
        detailedAddress,
        zoneCode,
        accountEmail: email,
        profileNickname: profileNickname || '기본 프로필 닉네임', // 기본값 설정
        health: toggleStates[0],
        petCare: toggleStates[1],
        missing: toggleStates[2],
      });
      alert('사용자 정보가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('Error updating user information:', error);
      alert('사용자 정보 업데이트 중 오류가 발생했습니다.');
    }
  };

  const openPostCode = () => setIsPopupOpen(true);
  const closePostCode = () => setIsPopupOpen(false);

  const toggleHandler = index => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
  };

  return (
    <ScrollableContainer>
      <Container>
        <Description>
          <WelcomeContainer>
            <WelcomeComment>안녕하세요</WelcomeComment>
            <FirstComment>{nickname}님🥳</FirstComment> {/* 카카오 프로필 닉네임 */}
          </WelcomeContainer>
          <HightLight>발바닥 천국</HightLight>과🐾 당신과 반려동물의 발걸음이 더 행복해지도록 정보를 등록해 보세요.
        </Description>
        <UploadImg imgPath={imgPath} setImgPath={setImgPath} />

        <Label>이메일</Label>
        <InputContainer>
          <KakaoEmail placeholder={email || '이메일을 입력해주세요'} disabled />
          <Icon src={images.kakaoIcon} alt="카카오 아이콘" />
        </InputContainer>

        <Label>닉네임</Label>
        <InputContainer>
          <StyledInput value={nickname} onChange={e => setNickname(e.target.value)} required />
        </InputContainer>

        <InputContainer>
          <Label>휴대폰 번호</Label>
          <PhoneContainer>
            <PhonenumberInputrequired
              placeholder="전화번호를 입력해주세요"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
            <PhoneNumberAuthorization>인증하기</PhoneNumberAuthorization>
          </PhoneContainer>
        </InputContainer>

        <InputContainer>
          <Label>주소</Label>
          <AddressContainer>
            <PostSearchContainer placeholder="우편번호" value={zoneCode} readOnly />
            <SearchAddressButton onClick={openPostCode}>주소검색</SearchAddressButton>
            <div id="popupDom">
              {isPopupOpen && (
                <PopupDom>
                  <PopupPostCode onClose={closePostCode} setAddress={setAddress} setZoneCode={setZoneCode} />
                </PopupDom>
              )}
            </div>
            <StyledInput
              placeholder="기본주소를 입력해주세요"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
            <StyledInput
              placeholder="상세 주소를 입력해주세요"
              value={detailedAddress}
              onChange={e => setDetailedAddress(e.target.value)}
              required
            />
          </AddressContainer>
        </InputContainer>
      </Container>
      <Divider />

      <Container>
        <AlarmAgreementContainer>
          <SubTitle>앱 푸시 알림</SubTitle>
        </AlarmAgreementContainer>

        <SubContainer>
          <TextContainer>
            <SubTitleList>우리응애 건강관리</SubTitleList>
            <DescriptionContainer>
              <SubDescription>예방접종일과 병원 정보를 빠르게 받아보세요!</SubDescription>
            </DescriptionContainer>
          </TextContainer>
          <FirstToggleContainer onClick={() => toggleHandler(0)}>
            <div className={`toggle-container ${toggleStates[0] ? 'toggle--checked' : ''}`} />
            <div className={`toggle-circle ${toggleStates[0] ? 'toggle--checked' : ''}`} />
          </FirstToggleContainer>
        </SubContainer>

        <SubContainer>
          <TextContainer>
            <SubTitleList>집사 생활</SubTitleList>
            <DescriptionContainer>
              <SubDescription>내가 작성한 글의 댓글을 빠르게 확인하세요!</SubDescription>
            </DescriptionContainer>
          </TextContainer>
          <SecondToggleContainer onClick={() => toggleHandler(1)}>
            <div className={`toggle-container ${toggleStates[1] ? 'toggle--checked' : ''}`} />
            <div className={`toggle-circle ${toggleStates[1] ? 'toggle--checked' : ''}`} />
          </SecondToggleContainer>
        </SubContainer>

        <SubContainer>
          <TextContainer>
            <SubTitleList>실종 알림</SubTitleList>
            <DescriptionContainer>
              <SubDescription>
                다른 아이의 등록된 실종 위치 근처에 도착하면 알림을 보내드려요
                <AlertAgreementDescription>가족의 품으로 가는 길, 도와주시면 감사하겠습니다*</AlertAgreementDescription>
              </SubDescription>
            </DescriptionContainer>
          </TextContainer>
          <ThirdToggleContainer onClick={() => toggleHandler(2)}>
            <div className={`toggle-container ${toggleStates[2] ? 'toggle--checked' : ''}`} />
            <div className={`toggle-circle ${toggleStates[2] ? 'toggle--checked' : ''}`} />
          </ThirdToggleContainer>
        </SubContainer>
      </Container>
      <RegisterButton onClick={handleUpdate}>저장하기</RegisterButton>
    </ScrollableContainer>
  );
};

export default UserEditPage;
