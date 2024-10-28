import React, { useState } from 'react';
import styled from 'styled-components';

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
  align-items: center; 
  color: #FF6E00;
  border-radius: 20px; 
  cursor: pointer;
  font-size: 10px;
  font-weight: bold; 
  transition: background-color 0.3s;
  margin-top : -15px;

  &:hover {
    background-color: #FFD3D3;
  }
`;

const HiddenInput = styled.input`
  display: none; 
`;

const ImageBox = styled.div`
  margin-top: 10px;
  padding: 4px;
  display: flex; 
  justify-content: center; 
`;

const UploadImg = ({ imgPath, setImgPath }) => {

  const addImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newPath = [URL.createObjectURL(files[0])]; 
      setImgPath(newPath);
    }
  };

  return (
    <Container>
      <ImageBox>
        {imgPath.length > 0 && ( 
          <img 
            src={imgPath[0]} 
            alt='애완동물 사진' 
            style={{
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              objectFit: 'cover' 
            }} 
          />
        )}
      </ImageBox>
      <InputFile htmlFor="inputForm">
        등록
        <HiddenInput
          className="inputFile"
          type="file"
          id="inputForm"
          onChange={addImage} 
        />
      </InputFile>
    </Container>
  );
};

export default UploadImg;
