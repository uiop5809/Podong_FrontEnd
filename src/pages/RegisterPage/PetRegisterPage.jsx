import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import SelectBox from '../../components/Register/SelectBox';
import UploadImg from '../../components/Register/UploadImg';

const ScrollableContainer = styled.div`
  max-height: 100%;
  border: 1px solid #ddd;
  margin: 64px 0;
`; // 스크롤 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%; 
  margin-top: 5%;
  margin-left: 5%;
`; // 전체 컨테이너 


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
  width: 172px; 
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
  width: 335px;
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

const PetRegisterPage = () => {
  const navigate = useNavigate(); 
  const [imgPath, setImgPath] = useState([]); //이미지
  const [selectedPetType, setSelectedPetType] = useState(''); // 고양이 or 강아지
  const [selectedGender, setSelectedGender] = useState(null); // 성별 
  const [isNeutered, setIsNeutered] = useState(null); // 중성화 
  const [isAllergic, setIsAllergic] = useState(null); // 알러지 여부
  const [weight, setWeight] = useState(''); // 몸무게

  const [selectCatList, setSelectCatList] = useState(null); // 고양이 리스트 
  const [selectDogList, setSelectDogList] = useState(null); // 강아지 리스트

  const handlePetTypeClick = (value) => {
    setSelectedPetType(value); 
  }

  const handleGenderClick = (gender) => {
    setSelectedGender(gender); 
  };

  const handleNeuteredClick = (value) => {
    setIsNeutered(value);
  };

  const handleAllergicClick = (value) => {
    setIsAllergic(value);
  };

  const handleCatChange = (e) => {
    setSelectCatList(e.target.value);
  };

  const handleDogChange = (e) => {
    setSelectDogList(e.target.value);
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      setWeight(value);
    }
  };
  
  const CatList = [
    { value: 'korean', label: '세상에 하나뿐인 코숏' },
    { value: 'russian-blue', label: '러시안 블루' },
    { value: 'persian', label: '페르시안' },
    { value: 'siamese', label: '샴' },
    { value: 'turkish-angora', label: '터키쉬 앙고라' },
    { value: 'abyssinian', label: '아비시니안' },
    { value: 'american-shorthair', label: '아메리칸 숏헤어' },
    { value: 'norwegian-forest', label: '노르웨이 숲' },
    { value: 'ragdoll', label: '랙돌' },
    { value: 'scottish-fold', label: '스코티시 폴드' },
    { value: 'bengal', label: '뱅갈' },
    { value: 'maine-coon', label: '메인 쿤' },
    { value: 'sphynx', label: '스핑크스' },
    { value: 'british-shorthair', label: '브리티쉬 숏헤어' },
  ];
  
  const DogList = [
    { value: 'korean-jindo', label: '진돗개' },
    { value: 'golden-retriever', label: '골든 리트리버' },
    { value: 'labrador-retriever', label: '래브라도 리트리버' },
    { value: 'poodle', label: '푸들' },
    { value: 'bulldog', label: '불독' },
    { value: 'beagle', label: '비글' },
    { value: 'shih-tzu', label: '시츄' },
    { value: 'pomeranian', label: '포메라니안' },
    { value: 'dachshund', label: '닥스훈트' },
    { value: 'corgi', label: '웰시 코기' },
    { value: 'chihuahua', label: '치와와' },
    { value: 'siberian-husky', label: '시베리안 허스키' },
    { value: 'shiba-inu', label: '시바견' },
    { value: 'samoyed', label: '사모예드' },
    { value: 'yorkshire-terrier', label: '요크셔 테리어' },
    { value: 'maltese', label: '말티즈' },
    { value: 'bichon-frise', label: '비숑 프리제' },
    { value: 'border-collie', label: '보더 콜리' },
    { value: 'pug', label: '퍼그' },
    { value: 'rottweiler', label: '로트와일러' },
    { value: 'boxer', label: '복서' },
    { value: 'maltipoo', label: '말티푸' },
    { value: 'unique-mix', label: '세상에 하나뿐인 믹스' },
  ];
  
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
        <StyledInput placeholder="우리 응애 이름을 입력해주세요." required/>

        {selectedPetType === '고양이' && (
          <>
            <Label>묘종</Label>
            <SelectBox
              options={CatList} 
              value={selectCatList} 
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
              value={selectDogList} 
              onChange={handleDogChange} 
              placeholder="견종을 선택해주세요"
              required
            />
          </>
        )}

        <Label>생일</Label>
        <StyledInput type="date" />

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
          placeholder="몸무게를 입력해주세요."
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

        <RegisterButton onClick={() => navigate('/user-register')}>
          등록하기 
        </RegisterButton>
      </Container>
    </ScrollableContainer>
  );
};

export default PetRegisterPage;
