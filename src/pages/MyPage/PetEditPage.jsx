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
  const { petId } = useParams();
  const navigate = useNavigate(); 
  const [imgPath, setImgPath] = useState(''); // 이미지 경로
  const [selectedPetType, setSelectedPetType] = useState(''); // 강아지 or 고양이
  const [petName, setPetName] = useState(''); // 이름 
  const [birthdate, setBirthdate] = useState(''); // 생일
  const [age, setAge] = useState(0); // 나이
  const [selectedGender, setSelectedGender] = useState(null); // 성별
  const [isNeutered, setIsNeutered] = useState(null); // 중성화 여부
  const [isAllergic, setIsAllergic] = useState(null); // 알러지 여부
  const [weight, setWeight] = useState(0); // 몸무게
  const [userId, setUserId] = useState(''); // 유저 ID
  const [selectCatList, setSelectCatList] = useState(null); // 고양이 종류 리스트
  const [selectDogList, setSelectDogList] = useState(null); // 강아지 종류 리스트

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

  // 데이터 가져오기
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/pets/${petId}`);
        console.log(response.data);
  
        const petData = response.data; // 단일 객체로 가정
        if (petData) {
          console.log(petData);
          console.log("http://localhost:8080/" + petData.petPicture);
          setImgPath("http://localhost:8080/" + petData.petPicture);
  
          console.log(petData.petPicture);
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
        } else {
          console.error('Pet data not found');
        }
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };
  
    if (petId) {
      fetchPetData();
    }
  }, [petId]);
  // 등록 함수
  const handleRegister = async (event) => {
    event.preventDefault(); 
    if (!validateForm()) return; 

  
    const formData = new FormData();

    if (imgPath) {
      formData.append('image', imgPath);
    }
  
    if (petData) {
      setPetId(petData.id); // 가져온 petId 설정
      setPetName(petData.petName); // 반려동물 이름
      setBirthdate(petData.birthdate); // 생일
      setAge(calculateAge(petData.birthdate)); // 나이 계산 후 설정
      setSelectedPetType(petData.dogOrCat); // 반려동물 종류 (고양이/강아지)
      setSelectedGender(petData.gender ? '남아' : '여아'); // 성별
      setIsNeutered(petData.neutering ? '네' : '아니요'); // 중성화 여부
      setIsAllergic(petData.petAllergy ? '네' : '아니요'); // 알러지 여부
      setWeight(petData.petWeight); // 몸무게
      setUserId(petData.user); // 유저 ID
    
      if (petData.dogOrCat === '고양이') {
        setSelectCatList(petData.petType); // 고양이 종류
      } else {
        setSelectDogList(petData.petType); // 강아지 종류
      }
    
      if (petData.petPicture) {
        setImgPath(`http://localhost:8080/${petData.petPicture}`); // 이미지 경로 설정
      }
    } else {
      console.error("No pet data found");
    }
    
    for (const key in petData) {
      if (petData.hasOwnProperty(key)) {
        formData.append(key, petData[key]);
      }
    }
  
    try {
      // petId가 유효한 정수인지 확인
      const parsedPetId = parseInt(petId, 10);
      if (isNaN(parsedPetId)) {
        throw new Error('Invalid petId');
      }
    
      const response = await axios.put(`http://localhost:8080/api/pets/${parsedPetId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        alert('반려동물 수정이 완료되었습니다.');
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
  
  // 생일 계산
  const calculateAge = (birthdate) => {

     if (!birthdate) return 0; // 생일이 없으면 0 반환
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  // 폼 유효성 검사
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
      alert('반려동물의 품종을 선택해주세요.');
      return false;
    }
    if (selectedPetType === '강아지' && !selectDogList) {
      alert('반려동물의 품종을 선택해주세요.');
      return false;
    }
    if (!weight) {
      alert('몸무게를 입력해주세요.');
      return false;
    }
    if (!isNeutered) {
      alert('중성화 여부를 선택해주세요.');
      return false;
    }
    if (!isAllergic) {
      alert('알러지 여부를 선택해주세요.');
      return false;
    }
    if (!userId) {
      alert('유저 ID를 입력해주세요.');
      return false;
    }
    return true;
  };

  
  return (
    <ScrollableContainer>
      <Container>
      <DisplayPetImage imgPath={imgPath} setImgPath={setImgPath} />
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

        <Label>유저이름</Label>
          <StyledInput
            placeholder="유저이름을 입력해주세요."
            value={userId || ''}
            onChange={handleUserIdChange}
            required
          />

        {selectedPetType === '고양이' && (
          <>
            <Label>묘종</Label>
            <SelectBox
              options={CatList} 
              value={selectCatList ||""} 
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

export default PetEditPage;