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
  margin-top: -20px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImageBox = styled.div`
  margin-top: 10px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #FFD3D3;
  overflow: hidden;
  border: 1px solid #FFD3D3;
`;

const StyledImage = styled.img`
  width: 110%;
  height: 110%;
  border-radius: 50%;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const UploadImg = ({ imgPath, setImgPath }) => {
  const addImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newPath = [URL.createObjectURL(files[0])];
      setImgPath(newPath);
    }
  };

const CameraIcon = styled(TbCameraHeart)`
  color: white; 
  font-size:50px;
`;

  return (
    <Container>
      <ImageBox>
        {imgPath.length > 0 ? (
          <StyledImage src={imgPath[0]} alt="애완동물 사진" />
        ) : (
          <ImageContainer>
          <CameraIcon />
          </ImageContainer>
        )}
      </ImageBox>
      <InputFile htmlFor="inputForm">
        등록
        <HiddenInput
          type="file"
          id="inputForm"
          onChange={addImage}
        />
      </InputFile>
    </Container>
  );
};

export default UploadImg;
