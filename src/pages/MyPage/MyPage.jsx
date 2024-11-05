import React, { useState, useEffect, useRef } from 'react';
import { RxAvatar } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight, MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { images } from '../../components/Images';

const ScrollableContainer = styled.div`
  max-height: 100%;
  border: 1px solid #ddd;
  margin: 64px 0;
  width: 100%; 
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%; 
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
`;

const StyledAvatar = styled(RxAvatar)`
  font-size: 24px;
  color: #FF6E00;
  width: 64px;
  height: 64px;
  margin-top: 36px;
  margin-left: 40px;
  margin-bottom: 21px;
`;

const UserInfo = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 5%;
  text-align: left; 
`;

const UserCommunityInfo = styled.span`
  font-size: 11px;
  color: #8D8D8D;
  margin-top: 10px;
  margin-left: 5%;
  text-align: left; 
`;


const EditButton = styled.button` 
  width: 67px;
  height: 22px;
  background-color: #FFEFEF; 
  color: #FF6E00;
  border: none;
  border-radius: 20px; 
  cursor: pointer;
  font-size: 9px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 3px;
  padding: 5px 10px;
  transition: background-color 0.3s;

  &:hover { 
    background-color: #FFD3D3;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background-color: #F5F5F5;
`;

const PetProfile = styled.div`
  min-width: 290px;
  height: 180px;
  background-color: #FFFFFF;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const PetInfoFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PetInfoSecondRow = styled.div`
  display: flex;
  margin-top: 10px;
`;

const PetDetailInfo = styled.div`
  margin-top: 23px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const PetProfileEditButton = styled.button`
  background-color: #FFEFEF;
  color: #FF6E00;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 8px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FFD3D3;
  }
`;

const PetAddButton = styled.button`
  background-color: #FFEFEF;
  color: #FF6E00;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 8px;
  margin-left:50px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FFD3D3;
  }
`;


const OrderBagImage = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
`

const OrderReviewImage = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
`


const OrderPointImage = styled.img`
  width: 20px;
  height: 20px;
  margin-left:2px;
  margin-bottom: 5px;
  margin-top: 10px;
`

const OrderCouponImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 16px;
  margin-bottom: 5px;
  margin-top: 10px;
`

const Coupon = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 9px;
  margin-left: 2px;
  color:#818181;
`

const ActivePetName = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: #FF6E00;
  margin-bottom: 7px;
`;

const ActivePetType = styled.p`
  font-size: 10px;
  color: #A9A9A9;
`;

const CardScrollableContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: 90%;
  gap: 20px;
  padding: 10px;
  margin: 0 auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const OrderIconContainer =  styled.div`
  display: flex;
  flex-direction: column;
  font-size: 9px;
  margin-left: 10px;
  color:#818181;
`

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  ${({ direction }) => direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
`;

const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 16px;
  margin-top: 20px;
`;

const UserActiveInfo = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-top: 18px;
`;

const PetNameComment = styled.p`
  font-size:15px;
  font-weight: bold;
`;

const ActivityText = styled.p`
  font-size: 9px;
  font-weight: normal;
  color: #000;
  margin-left: 6px;
  margin-top:1px;
`;

const UserActiveList = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 8px; 
`;

const MissingHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
`

const StyledArrowRight = styled(MdOutlineKeyboardArrowRight)`
  margin-left: 5px; 
  margin-top:1px;
  color: #8D8D8D;
`

const MissingDetail = styled.div`
  display: flex;
  flex-direction:row;
  font-size: 9px;
  margin-top: 13px;
`

const MissingIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 10px; 
  margin-right: 4px;
`
const MissingInfo = styled.div`
  width: 100%;
  height: 81px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 18px;
  margin-top: 18px;
`
const MissingRegisterBtn = styled.button`
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 8px;
  cursor: pointer;
  margin-right: 20px;
  font-weight: normal;

  &:hover {
    color: black;
    font-weight: bold;
  }
`;

const PetEditBtn = styled.button`
  background-color:white;
  color:black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 8px;
  font-weight: normal;
  transition: background-color 0.3s;

  &:hover {
    color: black;
    font-weight: bold;
  }
`;

const PetButton = styled.div`
  display: flex;
  flex-direction:row;
  margin-top: 10px;
`

const LastComment = styled.span`
  font-size: 11px;
  color: #8D8D8D;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 70px;
  cursor: pointer;

    &:hover {
      color: #FF6E00;
      font-weight: bold;
  }
`
const NoPetsMessage = styled.p`
  font-size: 12;
  font-weight: bold;
  margin-top: 70px;
`

function MyPage() {
  const navigate = useNavigate();

  const [filteredPets, setFilteredPets] = useState([]);
  const [allPets, setAllPets] = useState([]);
  const cardContainerRef = useRef();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDataAndPets = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('유저데이터 없음');
        return;
      }

      try {
        const userResponse = await axios.get(`http://localhost:8080/api/user/${userId}`);
        setUserData(userResponse.data);

        const petsResponse = await axios.get('http://localhost:8080/api/pets');
        setAllPets(petsResponse.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserDataAndPets();
  }, []);

  useEffect(() => {
    const userId = parseInt(localStorage.getItem('userId'), 10);
    if (allPets.length > 0 && userId) {
      const userPets = allPets.filter(pet => pet.user === userId);
      setFilteredPets(userPets);
    }
  }, [allPets]);

  const userId = localStorage.getItem('userId'); 

  const userActivities = [
    { src: images.myActivity, alt: "내 활동", text: "내 활동" },
    { src: images.bogwan, alt: "보관 게시글", text: "보관 게시글" },
    { src: images.imseeJeojang, alt: "결제내역", text: "결제내역" },
    { src: images.alert, alt: "알림 목록", text: "알림 목록" },
    { src: images.hide, alt: "숨긴 게시글", text: "숨긴 게시글" },
    { src: images.blockHand, alt: "차단 목록", text: "차단 목록" }
  ];


  const scroll = (direction) => {
    const { current } = cardContainerRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -current.clientWidth : current.clientWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <ScrollableContainer>
      <Container>
        <MainContainer>
          <StyledAvatar />

              <UserInfo>
                {userData ? userData.nickname : '불러오는 중...'}
                <EditButton onClick={() => navigate(`/myPage/${userId}/editUserRegister/${userId}`)}>
                  수정
                </EditButton>
              </UserInfo>

        </MainContainer>

        <SubContainer>
          <CardScrollableContainer>
            <ArrowButton direction="left" onClick={() => scroll('left')}>
              <MdOutlineArrowBack />
            </ArrowButton>

            <CardContainer ref={cardContainerRef}>
              {filteredPets.length > 0 ? (
                filteredPets.map((pet) => (
                  <PetProfile key={pet.id}>
                    <PetInfoFirstRow>
                      <PetNameComment>우리응애 프로필</PetNameComment>
                      <PetAddButton onClick={() => navigate(`/myPage/${userId}/petRegister`)}>추가</PetAddButton>
                    </PetInfoFirstRow>

                    <PetInfoSecondRow>
                      <FaCircleUser size={80} style={{ marginTop: '18px' }} />
                      <PetDetailInfo>
                        <ActivePetName>{pet.petName}응애</ActivePetName>
                        <ActivePetType>{pet.petType} | {pet.petAge}살</ActivePetType>
                        <ActivePetType>{pet.petWeight}kg</ActivePetType>
                        <PetButton>
                        <MissingRegisterBtn onClick={() => navigate(`/myPage/${userId}/missingRegister/${pet.petId}`)}>
                          실종등록
                        </MissingRegisterBtn>
                          <PetEditBtn onClick={() => navigate(`/myPage/${userId}/editPetRegister/${pet.petId}`)}>
                            수정
                          </PetEditBtn>
                        </PetButton>
                      </PetDetailInfo>
                    </PetInfoSecondRow>
                  </PetProfile>
                ))
              ) : (
                <NoPetsMessage>
                  <p>등록된 펫이 없습니다.</p>
                  <PetAddButton onClick={() => navigate('/petRegister')}>펫 등록하기</PetAddButton>
                </NoPetsMessage>
              )}
            </CardContainer>
            <ArrowButton direction="right" onClick={() => scroll('right')}>
              <MdOutlineArrowForward />
            </ArrowButton>
          </CardScrollableContainer>

          <OrderContainer>
            <OrderIconContainer>
              <OrderBagImage src={images.bag} alt="주문내역" />
              <span>주문내역 </span>
            </OrderIconContainer>
            <OrderIconContainer>
              <OrderReviewImage src={images.review} alt="결제내역" />
              <span>결제내역</span>
            </OrderIconContainer>
            <OrderIconContainer>
              <OrderPointImage src={images.point} alt="포인트" />
              <span>포인트</span>
            </OrderIconContainer>
            <OrderIconContainer>
              <OrderCouponImage src={images.coupon} alt="쿠폰" />
              <Coupon>쿠폰</Coupon>
            </OrderIconContainer>
          </OrderContainer>

          <UserActiveInfo>
            <MissingHeader>집사생활<StyledArrowRight /></MissingHeader>         
            {userActivities.map((activity, index) => (
              <UserActiveList key={index}>
                <StyledImage src={activity.src} alt={activity.alt} />
                <ActivityText>{activity.text}</ActivityText>
              </UserActiveList>
            ))}
          </UserActiveInfo>

          <MissingInfo>
            <MissingHeader>
              <p>실종현황</p> 
              <StyledArrowRight />
            </MissingHeader>
            <MissingDetail>
              <MissingIcon src={images.missing} alt="실종현황" /> 확인하기
            </MissingDetail>
          </MissingInfo>

          <MissingInfo>
            <MissingHeader>
              <p>산책</p> 
              <StyledArrowRight />
            </MissingHeader>
            <MissingDetail>
              <MissingIcon src={images. calendar} alt="산책일지" /> 산책일지
            </MissingDetail>
          </MissingInfo>
          <LastComment onClick={() => {
            alert('성공적으로 로그아웃 되었습니다');
            navigate('/');
          }}>
            로그아웃
          </LastComment>
        </SubContainer>
      </Container>
    </ScrollableContainer>
  );
}

export default MyPage;