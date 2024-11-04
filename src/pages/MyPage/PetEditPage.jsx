import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { CatList, DogList } from '../../components/Register/PetData';
import SelectBox from '../../components/Register/SelectBox';
import DisplayPetImage from '../../components/Register/DisplayImg'; 
import { useParams } from 'react-router-dom';
import UploadImg from '../../components/Register/UploadImg';
import axios from "axios";

// 스타일 컴포넌트 설정
const ScrollableContainer = styled.div`
  max-height: 100%;
  border: 1px solid #ddd;
  margin: 64px 0;
  width: 100%; 
`; // 스크롤이 가능한 컨테이너

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
`; // 각 폼의 설명 텍스트

const StyledInput = styled.input`
  padding: 13px;
  margin-bottom: 8px;
  border: 1px solid #E4E4E4;
  border-radius: 5px; 
  font-size: 11px;
`; // 입력 필드 스타일

const SelectButtonContainer = styled.div`
  display: flex;
  gap: 8px; 
  margin-bottom: 8px;
`; // 선택 버튼 컨테이너

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
`; // 선택 버튼

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
`; // 등록 버튼

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

const PetEditPage = () => {
  const petId = 1;
  const navigate = useNavigate(); 

  const [imgPath, setImgPath] = useState(''); 
  const [selectedPetType, setSelectedPetType] = useState('');
  const [petName, setPetName] = useState(''); 
  const [birthdate, setBirthdate] = useState(''); 
  const [age, setAge] = useState(0); 
  const [selectedGender, setSelectedGender] = useState(null); 
  const [isNeutered, setIsNeutered] = useState(null); 
  const [isAllergic, setIsAllergic] = useState(null); 
  const [weight, setWeight] = useState(0); 
  const [userId, setUserId] = useState(''); 
  const [selectCatList, setSelectCatList] = useState(null); 
  const [selectDogList, setSelectDogList] = useState(null); 

  const handlePetTypeClick = (value) => setSelectedPetType(value);
  const handleGenderClick = (gender) => setSelectedGender(gender);
  const handleNeuteredClick = (value) => setIsNeutered(value);
  const handleAllergicClick = (value) => setIsAllergic(value);
  const handlePetNameChange = (e) => setPetName(e.target.value);
  const handleBirthdateChange = (e) => {
    const selectedDate = e.target.value;
    setBirthdate(selectedDate);
    setAge(calculateAge(selectedDate));
  };
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handleCatChange = (e) => setSelectCatList(e.target.value);
  const handleDogChange = (e) => setSelectDogList(e.target.value);
  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) setWeight(value);
  };

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/pets/${petId}`);
        const petData = response.data;
        
        if (petData) {
          setImgPath(`http://localhost:8080/uploads/${petData.petPicture}`);
          setPetName(petData.petName);
          setBirthdate(petData.birthdate);
          setAge(calculateAge(petData.birthdate));
          setSelectedPetType(petData.dogOrCat);
          setSelectedGender(petData.gender ? '남아' : '여아');
          setIsNeutered(petData.neutering ? '네' : '아니요');
          setIsAllergic(petData.petAllergy ? '네' : '아니요');
          setWeight(petData.petWeight);
          setUserId(petData.user);
          if (petData.dogOrCat === '고양이') {
            setSelectCatList(petData.petType);
          } else {
            setSelectDogList(petData.petType);
          }
        }
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };

    if (petId) {
      fetchPetData();
    }
  }, [petId]);

  const handleRegister = async (event) => {
    event.preventDefault(); 
    if (!validateForm()) return; 

    const formData = new FormData();
    formData.append('petName', petName);
    formData.append('birthdate', birthdate);
    formData.append('dogOrCat', selectedPetType);
    formData.append('gender', selectedGender === '남아');
    formData.append('neutering', isNeutered === '네');
    formData.append('petAllergy', isAllergic === '네');
    formData.append('petWeight', weight);
    formData.append('petAge', age); 
    formData.append('user', userId);
    formData.append('createdAt', new Date().toISOString()); 
    formData.append('updatedAt', new Date().toISOString()); // 수정 시간

    if (selectedPetType === '고양이') {
      formData.append('petType', selectCatList);
    } else if (selectedPetType === '강아지') {
      formData.append('petType', selectDogList);
    }
    
    if (imgPath) formData.append('image', imgPath);

    try {
      const response = await axios.put(`http://localhost:8080/api/pets/${petId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {
        alert('반려동물 수정이 완료되었습니다.');
        navigate('/userRegister');
      } else {
        alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error updating pet:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  const calculateAge = (birthdate) => {
    if (!birthdate) return 0;
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    if (!selectedPetType || !petName || !birthdate || !selectedGender || !weight || !userId) {
      alert('모든 필수 항목을 입력해주세요.');
      return false;
    }
    return true;
  };

  return (
    <ScrollableContainer>
      <Container>
      <UploadImg imgPath={imgPath} setImgPath={setImgPath} />
        <Label>어떤 반려동물과 함께하고 계신가요?</Label>
        <SelectButtonContainer>
          <SelectButton
            selected={selectedPetType === '강아지'} 
            onClick={() => handlePetTypeClick('강아지')}>
            강아지 
          </SelectButton>
          <SelectButton
            selected={selectedPetType === '고양이'} 
            onClick={() => handlePetTypeClick('고양이')}> 
            고양이
          </SelectButton>
        </SelectButtonContainer>

        <Label>이름</Label>
        <StyledInput
          placeholder="우리 응애 이름을 입력해주세요."
          value={petName || ''}
          onChange={handlePetNameChange}
          required
        />

        <Label>유저 ID</Label>
        <StyledInput
          placeholder="유저 ID를 입력해주세요."
          value={userId || ''}
          onChange={handleUserIdChange}
          required
        />

        {selectedPetType === '고양이' && (
          <>
            <Label>묘종</Label>
            <SelectBox
              options={CatList} 
              value={selectCatList || ""} 
              onChange={handleCatChange} 
              placeholder="묘종을 선택해주세요"
              required
            />
          </>
        )}

        {selectedPetType === '강아지' && (
          <>
            <Label>견종</Label>
            <SelectBox
              options={DogList} 
              value={selectDogList || ""} 
              onChange={handleDogChange} 
              placeholder="견종을 선택해주세요"
              required
            />
          </>
        )}

        <Label>생일</Label>
        <StyledInput 
          type="date"
          value={birthdate} 
          max={new Date().toISOString().split("T")[0]} 
          onChange={handleBirthdateChange}
        />
        <Label>나이: {age}세</Label>

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
          placeholder="몸무게를 입력해주세요(소수점 가능)"
          value={weight}
          onChange={handleWeightChange}
          required
        />

        <Label>알러지 여부</Label>
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

export default PetEditPage;
