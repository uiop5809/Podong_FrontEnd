import React from 'react';
import styled from 'styled-components';
import { TbCameraHeart } from "react-icons/tb";

const ImageBox = styled.div`
  margin-top: 10px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-left: 32%;
  margin-top:20px;
  margin-bottom: 20px;
  background-color: #FFD3D3;
  overflow: hidden;
  border: 1px solid white;
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
`;

const CameraIcon = styled(TbCameraHeart)`
  color: white; 
  font-size: 50px;
`;

const DisplayPetImage = ({ imgPath }) => {
  return (
    <ImageBox>
      {imgPath ? (
        <StyledImage src={imgPath} alt="애완동물 사진" />
      ) : (
        <ImageContainer>
          <CameraIcon />
        </ImageContainer>
      )}
    </ImageBox>
  );
};

export default DisplayPetImage;