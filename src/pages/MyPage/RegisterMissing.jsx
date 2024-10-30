import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  margin-top: 5%;
  margin-left: 4%;
`; 
const MapContainer = styled.div`
  width: 100%;
  height: 250px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
`; // 지도

const LocationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubTitle = styled.label`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  flex-grow: 1; 
  margin-top: 5px;
`; 

const InputContainer = styled.div`
  position: relative; 
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 110px 10px 10px;
  border: 1px solid #E4E4E4;
  border-radius: 5px; 
  font-size: 11px;
  margin-bottom: 10px;
`; // 폼 input 

const AddressContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 10px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const EditButton = styled.button`
  position: absolute;
  right: 10px;
  top: 40%;
  transform: translateY(-50%);
  background-color: #FFEFEF; 
  color: #FF6E00;
  border: none;
  border-radius: 8px; 
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  width: 61px;
  height: 22px;
  padding: 5px 10px;
  transition: background-color 0.3s;

  &:hover { 
    background-color: #FFD3D3;
  }
`; // 수정버튼

const ImageContainer = styled.input`
  width: 125px;
  height: 125px;
  border: 1px solid #E4E4E4;
  border-radius: 8px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #E4E4E4;
  border-radius: 5px; 
  font-size: 11px;
  resize: none; 
  height: 100px; 
`; 

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
  margin-bottom: 20px;

  &:hover {
    background-color: #FF6E00;
    color: white; 
  }
`; // 마지막 저장 버튼

const RegisterMissing = () => {
  const navigate = useNavigate(); 
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');

  const handleDateChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    let formattedValue = '';

    if (value.length > 4) {
      formattedValue += value.substring(0, 4); // 연도
      formattedValue += '-';
      if (value.length > 6) {
        formattedValue += value.substring(4, 6); // 월
        formattedValue += '-';
        formattedValue += value.substring(6, 8); // 일
      } else if (value.length > 4) {
        formattedValue += value.substring(4, 6); // 월
      }
    } else {
      formattedValue += value; // 연도
    }

    setDate(formattedValue);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    if (value.length <= 11) { // 최대 11자리로 제한
      setPhone(value);
    }
  };

  return (
    <ScrollableContainer>
      <Container>
        <MapContainer />
        <LocationContainer>
          <SubTitle>실종된 위치</SubTitle>
          <InputContainer>
            <StyledInput placeholder="위치 입력" />
            <EditButton>수정</EditButton>
          </InputContainer>
        </LocationContainer>

        <AddressContainer>
          <SubTitle>실종된 날짜</SubTitle>
          <DateContainer>
            <StyledInput
              type="text"
              value={date}
              onChange={handleDateChange}
              placeholder='YYYY-MM-DD 형태로 입력하세요'
            />
          </DateContainer>
        </AddressContainer>

        <LocationContainer>
          <SubTitle>아이 이름</SubTitle>
          <InputContainer>
            <StyledInput placeholder="아이 이름을 입력해주세요" />
            <EditButton>수정</EditButton>
          </InputContainer>
        </LocationContainer>

        <LocationContainer>
          <SubTitle>휴대폰 번호</SubTitle>
          <InputContainer>
            <StyledInput
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="휴대폰 번호를 입력해주세요" 
            />
            <EditButton>수정</EditButton>
          </InputContainer>
        </LocationContainer>

        <AddressContainer>
          <SubTitle>사진 등록</SubTitle>
          <ImageContainer type='file' />
        </AddressContainer>

        <AddressContainer>
          <SubTitle>아이 특징</SubTitle>
          <InputContainer>
            <StyledTextarea 
              placeholder="최대한 자세하게 작성해주세요."
            />
          </InputContainer>
        </AddressContainer>

        <RegisterButton 
          onClick={() => {
            alert("저장 되었습니다");
            navigate('/missingSave');
          }} 
        >
          저장하기
        </RegisterButton>
      </Container>
    </ScrollableContainer>
  );
};

export default RegisterMissing;
