import React from "react";
import styled from "styled-components";

const missingPets = [
  {
    id: 1,
    name: "몽이",
    image: "/api/placeholder/100/100",
    location: { lat: 33.450701, lng: 126.570667 },
    description: "갈색 포메라니안, 3살, 암컷",
    radius: 500, // 반경 500m
  },
  {
    id: 2,
    name: "또리",
    image: "/api/placeholder/100/100",
    location: { lat: 37.52919295798161, lng: 127.07758707184594 },
    description: "흰색 말티즈, 5살, 수컷",
    radius: 3000, // 반경 300m
  },
];

const MissingPetAlert = ({ pet, distance, isOpen, onClose }) => {
  if (!pet) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-orange-500">
            {distance}m 반경 내에 실종된 반려동물이 있습니다!
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex items-center gap-4 mt-4">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-orange-400"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">
                  {pet.name}
                </p>
                <p className="text-sm text-gray-600">{pet.description}</p>
                <p className="text-sm text-blue-600 mt-2">
                  반경 {pet.radius}m 이내에서 실종되었습니다
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MissingPetAlert;

const AlertDialog = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
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

const AlertDialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
