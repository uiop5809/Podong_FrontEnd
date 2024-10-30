import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import UploadImg from '../../components/Register/UploadImg';
import axios from "axios";

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

const Label = styled.label`
  font-size: 10px;
  color: #B3B3B3;
  margin-bottom: 5px;
  margin-top: 8px;
`; // 각 폼 위에 설명 label

const StyledInput = styled.input`
  padding: 13px;
  margin-bottom: 8px;
  border: 1px solid #E4E4E4;
  border-radius: 5px; 
  font-size: 11px;
`; // 폼 input 

const SelectButtonContainer = styled.div`
  display: flex;
  gap: 8px; 
  margin-bottom: 8px;
`; // 버튼 선택 컨테이너

const SelectButton = styled.button`
  color: ${({ selected }) => (selected ? 'white' : 'black')}; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  border: 1px solid #E4E4E4;
  width: 100%; 
  height: 40px; 
  text-align: center; 
  border-radius: 5px; 
  background-color: ${({ selected }) => (selected ? '#FF6E00' : 'white')}; 
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;

  &:hover {
    background-color: #FF6E00;
    color: white; 
  }
`; // 버튼

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
`; // 마지막 등록 버튼

const LastComment = styled.span`
  font-size: 11px;
  color: #8D8D8D;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;

    &:hover {
      color: #FF6E00;
      font-weight: bold;
  }
`

//이미지 이름이랑 몸무게 알러지 여부에만 수정 가능하게
const PetRegisterPage = () => {
  const navigate = useNavigate(); 
  const [imgPath, setImgPath] = useState(''); //이미지
  const [petName, setPetName] = useState(''); // 이름 
  const [birthdate, setBirthdate] = useState(''); // 생일
  const [selectedGender, setSelectedGender] = useState(null); //성별
  const [isNeutered, setIsNeutered] = useState(null); //중성화
  const [isAllergic, setIsAllergic] = useState(null); // 알러지
  const [weight, setWeight] = useState(''); //몸무게
  const [userId, setUserId] = useState(''); // 유저 ID
  const [selectCatList, setSelectCatList] = useState(null); //cat list
  const [selectDogList, setSelectDogList] = useState(null); //dog list

  const handleGenderClick = (gender) => setSelectedGender(gender);
  const handleNeuteredClick = (value) => setIsNeutered(value);
  const handleAllergicClick = (value) => setIsAllergic(value);
  const handlePetNameChange = (e) => setPetName(e.target.value);
  const handleBirthdateChange = (e) => setBirthdate(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value);

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) setWeight(value);
  };

  const handleRegister = async (event) => {
    event.preventDefault(); 
    if (!validateForm()) return; 
  
    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }
  
    // 반려동물 정보 설정
    const petData = {
      petName: petName,
      petWeight: parseInt(weight), 
      neutering: isNeutered === '네', 
      petAllergy: isAllergic === '네', 
      gender: selectedGender === '남아', 
      createdAt: new Date().toISOString(), 
      user: parseInt(userId), 
      petAge: calculateAge(birthdate), 
    };
  
    // petData의 속성을 FormData에 추가
    for (const key in petData) {
      if (petData.hasOwnProperty(key)) {
        formData.append(key, petData[key]);
      }
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/pets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        alert('반려동물 등록이 완료되었습니다.');
        navigate('/userRegister'); 
        console.log('Pet data:', petData);
      } else {
        alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error registering pet:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };
  
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };
  const validateForm = () => {
    if (!selectedPetType) {
      alert('반려동물 종류를 선택해주세요.');
      return false;
    }
    if (!petName) {
      alert('이름을 입력해주세요.');
      return false;
    }
    if (!birthdate) {
      alert('생일을 입력해주세요.');
      return false;
    }
    if (!selectedGender) {
      alert('성별을 선택해주세요.');
      return false;
    }
    if (selectedPetType === '고양이' && !selectCatList) {
      alert('묘종을 선택해주세요.');
      return false;
    }
    if (selectedPetType === '강아지' && !selectDogList) {
      alert('견종을 선택해주세요.');
      return false;
    }
    if (!isNeutered) {
      alert('중성화 여부를 선택해주세요.');
      return false;
    }
    if (!weight) {
      alert('몸무게를 입력해주세요.');
      return false;
    }
    if (!isAllergic) {
      alert('알러지 여부를 선택해주세요.');
      return false;
    }
    return true;
  };
  
  return (
    <ScrollableContainer>
      <Container>
      <UploadImg imgPath={imgPath} setImgPath={setImgPath} />
        
        <Label>이름</Label>
        <StyledInput
          placeholder="우리 응애 이름을 입력해주세요."
          value={petName}
          onChange={handlePetNameChange}
          required
      />

        <Label>유저이름</Label>
          <StyledInput
            placeholder="유저이름을 입력해주세요."
            value={userId}
            onChange={handleUserIdChange}
            required
          />

        <Label>생일</Label>
        <StyledInput 
          type="date"
          value={birthdate} 
          onChange={handleBirthdateChange}
        />

        <Label>성별</Label>
        <SelectButtonContainer>
          <SelectButton
            selected={selectedGender === '남아'} 
            onClick={() => handleGenderClick('남아')}>
            남아
          </SelectButton>
          <SelectButton
            selected={selectedGender === '여아'} 
            onClick={() => handleGenderClick('여아')}>
            여아
          </SelectButton>
        </SelectButtonContainer>

        <Label>중성화 여부</Label>
        <SelectButtonContainer>
          <SelectButton
            selected={isNeutered === '네'} 
            onClick={() => handleNeuteredClick('네')}>
            네
          </SelectButton>
          <SelectButton
            selected={isNeutered === '아니요'} 
            onClick={() => handleNeuteredClick('아니요')}>
            아니요
          </SelectButton>
        </SelectButtonContainer>

        <Label>몸무게 (kg)</Label>
        <StyledInput
          placeholder="몸무게를 입력해주세요(소수점을 제외하고 입력해주세요)."
          value={weight}
          onChange={handleWeightChange}
          required
        />

        <Label>알러지 여부(선택)</Label>
        <SelectButtonContainer>
          <SelectButton
            selected={isAllergic === '네'} 
            onClick={() => handleAllergicClick('네')}>
            네
          </SelectButton>
          <SelectButton
            selected={isAllergic === '아니요'} 
            onClick={() => handleAllergicClick('아니요')}>
            아니요
          </SelectButton>
        </SelectButtonContainer>

        <RegisterButton onClick={handleRegister}>수정하기</RegisterButton>
      </Container>
    </ScrollableContainer>
  );
};

export default PetRegisterPage;