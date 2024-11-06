import React from 'react';
import styled from 'styled-components';
import { TbCameraHeart } from "react-icons/tb";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const InputFile = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #FFEFEF;
  color: #FF6E00;
  border-radius: 20px;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top: -80px;
  margin-left: 30px;
`;

const HiddenInput = styled.input`
  display: none;
`;
const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden; 
  background-color: #FFD3D3;
  display: flex;
  margin-left: 160px;
  justify-content: center;
  align-items: center;
`;
const StyledImage = styled.img`
  width: 100%; 
  height: 110%;
  border-radius: 50%;
  object-fit: cover;
`;

const CameraIcon = styled(TbCameraHeart)`
  color: white; 
  font-size: 50px;
`;

const UploadImg = ({ imgPath, setImgPath }) => {
  const addImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const fileType = file.type.split('/')[0];

      if (fileType === 'image') {
        setImgPath(file); 
      } else {
        alert('이미지 파일만 업로드 가능합니다.');
      }
    }
  };

  return (
    <Container>
      <ImageContainer>
        {imgPath instanceof File ? ( 
          <StyledImage src={URL.createObjectURL(imgPath)} alt="애완동물 사진" />
        ) : (
          <CameraIcon />
        )}
      </ImageContainer>
      <InputFile htmlFor="inputForm">
        수정
        <HiddenInput
          type="file"
          id="inputForm"
          accept="image/*" 
          onChange={addImage} 
        />
      </InputFile>
    </Container>
  );
};

export default UploadImg;