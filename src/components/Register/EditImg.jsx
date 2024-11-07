import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  margin-left: 78px;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 100%; 
  height: 110%;
  border-radius: 50%;
  object-fit: cover;
`;

const UploadImg = ({ imgPath, setImgPath }) => {
  const fileInputRef = useRef(null);

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

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <ImageContainer onClick={handleClick}>
        {imgPath instanceof File && (
          <StyledImage src={URL.createObjectURL(imgPath)} alt="애완동물 사진" />
        )}
      </ImageContainer>
      <HiddenInput
        type="file"
        ref={fileInputRef}
        accept="image/*" 
        onChange={addImage} 
      />
    </Container>
  );
};

export default UploadImg;
