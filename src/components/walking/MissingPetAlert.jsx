import React from "react";
import styled from "styled-components";
import { images } from "../Images";

const MissingPetAlert = ({ pet, distance, isOpen, onClose }) => {
  if (!pet || !isOpen) return null;

  return (
    <>
      <AlertDialog open={isOpen} onClick={onClose}>
        <AlertDialogContent>
          <AlertHeader>
            <AlertDialogTitle>
              산책 경로 {distance}m 반경 내에 <br />
              실종된 반려동물이 있습니다!
            </AlertDialogTitle>
            <CancelButton src={images.cancel} onClick={onClose} />
          </AlertHeader>
          <AlertDialogDescription>
            <PetInfo>
              <InfoBox>
                <Title>아이 이름</Title>
                <Info>{pet.name}</Info>
              </InfoBox>

              <InfoBox>
                <Title>휴대폰 번호</Title>
                <Info>{pet.phone}</Info>
              </InfoBox>

              <InfoBox>
                <ImageBox>
                  <Title>사진</Title>
                  <PetImage src={pet.image} alt={pet.name} />
                </ImageBox>
                <Description>{pet.description}</Description>
              </InfoBox>
            </PetInfo>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MissingPetAlert;

const AlertDialog = styled.div`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AlertDialogContent = styled.div`
  background: white;
  max-width: 20rem;
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const AlertDialogTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #f97316;
`;

const AlertDialogDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PetImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #fb923c;
`;

const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: #1f2937;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  div {
    width: 100%;
  }
`;

const Info = styled.div`
  font-size: 15px;
  color: #4b5563;
`;

const CancelButton = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;
