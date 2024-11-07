import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CatList, DogList } from "../../components/Register/PetData";
import SelectBox from "../../components/Register/SelectBox";
import UploadImg from "../../components/Register/UploadImg";
import axios from "../../apis/AxiosInstance";
import { ScrollableContainer, Container, Label } from "./CommonStyle";

const StyledInput = styled.input`
  padding: 13px;
  margin-bottom: 8px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  font-size: 11px;
`; // 폼 input

const SelectButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`; // 버튼 선택 컨테이너

const SelectButton = styled.button`
  color: ${({ selected }) => (selected ? "white" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e4e4e4;
  width: 100%;
  height: 40px;
  text-align: center;
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? "#FF6E00" : "white")};
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;

  &:hover {
    background-color: #ff6e00;
    color: white;
  }
`; // 버튼

const RegisterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e4e4e4;
  width: 100%;
  height: 43px;
  text-align: center;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 20px;

  &:hover {
    background-color: #ff6e00;
    color: white;
  }
`; // 마지막 등록 버튼

const LastComment = styled.span`
  font-size: 11px;
  color: black;
  text-align: center;
  cursor: pointer;
  margin-bottom: 80px;
  &:hover {
    color: #ff6e00;
    font-weight: bold;
  }
`;

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const PetRegisterPage = () => {
  const navigate = useNavigate();
  const [imgPath, setImgPath] = useState("");
  const [selectedPetType, setSelectedPetType] = useState("");
  const [petName, setPetName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [isNeutered, setIsNeutered] = useState(null);
  const [isAllergic, setIsAllergic] = useState(null);
  const [weight, setWeight] = useState("");
  const [userId, setUserId] = useState(null);
  const [selectCatList, setSelectCatList] = useState(null);
  const [selectDogList, setSelectDogList] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    setBirthdate("2020-01-01");
  }, []);

  const handlePetTypeClick = (value) => setSelectedPetType(value);
  const handleGenderClick = (gender) => setSelectedGender(gender);
  const handleNeuteredClick = (value) => setIsNeutered(value);
  const handleAllergicClick = (value) => setIsAllergic(value);
  const handlePetNameChange = (e) => setPetName(e.target.value);
  const handleBirthdateChange = (e) => setBirthdate(e.target.value);
  const handleCatChange = (e) => setSelectCatList(e.target.value);
  const handleDogChange = (e) => setSelectDogList(e.target.value);
  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) setWeight(value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    if (imgPath) {
      formData.append("image", imgPath);
    }

    const petData = {
      user: userId,
      petName: petName,
      dogOrCat: selectedPetType,
      petType: selectedPetType === "고양이" ? selectCatList : selectDogList,
      petWeight: parseInt(weight),
      neutering: isNeutered === "네",
      petAllergy: isAllergic === "네",
      gender: selectedGender === "남아",
      createdAt: new Date().toISOString(),
      petAge: calculateAge(birthdate),
    };

    for (const key in petData) {
      if (petData.hasOwnProperty(key)) {
        formData.append(key, petData[key]);
      }
    }

    try {
      const response = await axios.post("/pets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        navigate("/");
      } else {
        alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const validateForm = () => {
    if (!selectedPetType) {
      alert("반려동물 종류를 선택해주세요.");
      return false;
    }
    if (!petName) {
      alert("응애 이름을 입력해주세요.");
      return false;
    }
    if (!birthdate) {
      alert("생일을 입력해주세요.");
      return false;
    }
    if (!selectedGender) {
      alert("성별을 선택해주세요.");
      return false;
    }
    if (selectedPetType === "고양이" && !selectCatList) {
      alert("묘종을 선택해주세요.");
      return false;
    }
    if (selectedPetType === "강아지" && !selectDogList) {
      alert("견종을 선택해주세요.");
      return false;
    }
    if (!isNeutered) {
      alert("중성화 여부를 선택해주세요.");
      return false;
    }
    if (!weight) {
      alert("몸무게를 입력해주세요.");
      return false;
    }
    if (!isAllergic) {
      alert("알러지 여부를 선택해주세요.");
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
            selected={selectedPetType === "강아지"}
            onClick={() => handlePetTypeClick("강아지")}
          >
            강아지
          </SelectButton>
          <SelectButton
            selected={selectedPetType === "고양이"}
            onClick={() => handlePetTypeClick("고양이")}
          >
            고양이
          </SelectButton>
        </SelectButtonContainer>

        <Label>이름</Label>
        <StyledInput
          placeholder="우리 응애 이름을 입력해주세요."
          value={petName}
          onChange={handlePetNameChange}
          required
        />

        {selectedPetType === "고양이" && (
          <>
            <Label>묘종</Label>
            <SelectBox
              options={CatList.map((cat, index) => ({
                key: `cat-${index}`,
                value: cat.value,
                label: cat.label,
              }))}
              value={selectCatList}
              onChange={handleCatChange}
              placeholder="묘종을 선택해주세요"
              required
            />
          </>
        )}

        {selectedPetType === "강아지" && (
          <>
            <Label>견종</Label>
            <SelectBox
              options={DogList.map((dog, index) => ({
                key: `dog-${index}`,
                value: dog.value,
                label: dog.label,
              }))}
              value={selectDogList}
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
          max={getCurrentDate()}
          onChange={handleBirthdateChange}
        />
        <Label>성별</Label>
        <SelectButtonContainer>
          <SelectButton
            selected={selectedGender === "남아"}
            onClick={() => handleGenderClick("남아")}
          >
            남아
          </SelectButton>
          <SelectButton
            selected={selectedGender === "여아"}
            onClick={() => handleGenderClick("여아")}
          >
            여아
          </SelectButton>
        </SelectButtonContainer>

        <Label>중성화 여부</Label>
        <SelectButtonContainer>
          <SelectButton
            selected={isNeutered === "네"}
            onClick={() => handleNeuteredClick("네")}
          >
            네
          </SelectButton>
          <SelectButton
            selected={isNeutered === "아니요"}
            onClick={() => handleNeuteredClick("아니요")}
          >
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
            selected={isAllergic === "네"}
            onClick={() => handleAllergicClick("네")}
          >
            네
          </SelectButton>
          <SelectButton
            selected={isAllergic === "아니요"}
            onClick={() => handleAllergicClick("아니요")}
          >
            아니요
          </SelectButton>
        </SelectButtonContainer>

        <RegisterButton onClick={handleRegister}>등록하기</RegisterButton>
        <LastComment onClick={() => navigate("/")}>예비 집사입니다</LastComment>
      </Container>
    </ScrollableContainer>
  );
};

export default PetRegisterPage;
