import React from "react";
import styled from "styled-components";

const MissingPetAlert = ({ pet, distance, isOpen, onClose }) => {
  if (!pet || !isOpen) return null;

  return (
    <>
      <AlertDialog open={isOpen} onClick={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {distance}m 반경 내에 실종된 반려동물이 있습니다!
            </AlertDialogTitle>
            <AlertDialogDescription>
              <PetImage src={pet.image} alt={pet.name} />
              <PetInfo>
                <PetName>{pet.name}</PetName>
                <PetDescription>{pet.description}</PetDescription>
                <PetRadius>
                  반경 {pet.radius}m 이내에서 실종되었습니다
                </PetRadius>
              </PetInfo>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <button onClick={onClose}>확인</button>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MissingPetAlert;

const AlertDialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

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

const AlertDialogContent = styled.div`
  background: white;
  max-width: 24rem;
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const AlertDialogTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #f97316; /* orange-500 */
`;

const AlertDialogDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const PetImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fb923c; /* orange-400 */
`;

const PetInfo = styled.div`
  flex: 1;
`;

const PetName = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937; /* gray-900 */
`;

const PetDescription = styled.p`
  font-size: 0.875rem;
  color: #4b5563; /* gray-600 */
`;

const PetRadius = styled.p`
  font-size: 0.875rem;
  color: #2563eb; /* blue-600 */
  margin-top: 0.5rem;
`;
