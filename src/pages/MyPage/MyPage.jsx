import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
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


//두번째 section

const SubContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #F5F5F5;
  padding: 15px;
  box-sizing: border-box;
`;

const PetProfile = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column; 
  margin-bottom: 8px;
  background-color: #FFFFFF;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
`;

const PetProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-left: 5px;
  padding: 13px;
`;

const PetInfoFirstRow = styled.div`
  display: flex;
  flex-direction: row;
`; 

const PetInfo = styled.span`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  color:black;
`

const PetInfoSecondRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const PetDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-bottom: 17px;
  margin-top: 22px;
`

const PetProfileEditButton = styled.button` 
  width: 67px;
  height: 22px;
  margin-left: 46%;
  background-color: #FFEFEF; 
  color: #FF6E00;
  border: none;
  border-radius: 20px; 
  cursor: pointer;
  padding: 5px 10px 10px 10px; 
  font-size: 8px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover { 
    background-color: #FFD3D3;
  }
`;

const ActivePet = styled.p`
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #FF6E00;
`

const ActivePetName = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: black;
  margin-bottom: 8px;
`
const ActivePetType = styled.p`
  font-size: 8px;
  font-weight:light;
  line-height: 11px;
  color: #A9A9A9;
`

const StyledFaCircleUser = styled(FaCircleUser)`
  width: 61px;
  height: 61px;
  margin-top: 19px;
`;

const PetButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;

const RegisterMissing = styled.button`
  font-size: 10px;
  margin-left: 60px;
  margin-right:30%;

  &:hover { 
    color: #FF6E00;
  }
`
const AddPetButton = styled.button`
    font-size: 10px;

    &:hover { 
      color: #FF6E00;
  }
`


//세번째 section

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding: 16px;
  justify-content: space-between;
  background-color: #FFFFFF;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const OrderIconContainer =  styled.div`
  display: flex;
  flex-direction: column;
  font-size: 9px;
  margin-left: 10px;
  color:#818181;
`

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

const UserActiveInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  font-size: 9px;
  margin-top: 18px;
`//집사활동

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
  margin-bottom: 10px;
  margin-top: 11px;
`

const StyledImage = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 8px; 
`;

const MissingInfo = styled.div`
  width: 100%;
  height: 81px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 18px;
  margin-top: 18px;
`//실종현황 

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
`;

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
`;

function MyPage() {
  const navigate = useNavigate(); 

  return (
    <ScrollableContainer>
      <Container>
        <MainContainer>
          <StyledAvatar />
              <UserInfo>
                고양이가 세상을 구한다
                <EditButton onClick={() => navigate('/myPage/editUserRegister')}>수정</EditButton>
              </UserInfo>
        </MainContainer>

        <SubContainer>
          <PetProfile>
            <PetProfileContainer>
              <PetInfoFirstRow>
              <PetInfo>우리응애 프로필</PetInfo>
              <PetProfileEditButton onClick={()=> navigate(`/mypage/editPetRegister/${petId}`)}>수정</PetProfileEditButton>
              </PetInfoFirstRow>

              <PetInfoSecondRow>
              <StyledFaCircleUser />
              <PetDetailInfo>
                <ActivePet>현재 활동하는 응애</ActivePet>
                <ActivePetName>환타</ActivePetName>
                <ActivePetType>세상에 하나뿐인 코숏 <br/> 6년 1개월 | 4k</ActivePetType>
              </PetDetailInfo>
              </PetInfoSecondRow>

              <PetButtonContainer>
              <RegisterMissing onClick={() => navigate('/mypage/missingRegister')}>
                실종등록 
              </RegisterMissing>
              <AddPetButton onClick={() => navigate('/petRegister')}>
                응애추가
              </AddPetButton>
              </PetButtonContainer>
            </PetProfileContainer> {/*버튼 부분만 수정하면 될 것 같은데 ,,, 한숨 가득 */}
          </PetProfile>

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
            <MissingHeader>
              <p>집사생활</p> 
              <StyledArrowRight />
            </MissingHeader>
            <UserActiveList>
              <StyledImage src={images.myActivity} alt="내 활동" />
              <ActivityText>내 활동</ActivityText>
            </UserActiveList>
            <UserActiveList>
              <StyledImage src={images.bogwan} alt="보관 게시글" />
              <ActivityText>보관 게시글</ActivityText>
            </UserActiveList>
            <UserActiveList>
              <StyledImage src={images.imseeJeojang} alt="결제내역" />
              <ActivityText>결제내역</ActivityText>
            </UserActiveList>
            <UserActiveList>
              <StyledImage src={images.alert} alt="알림 목록" />
              <ActivityText>알림 목록</ActivityText>
            </UserActiveList>
            <UserActiveList>
              <StyledImage src={images.hide} alt="숨긴 게시글" />
              <ActivityText>숨긴 게시글</ActivityText>
            </UserActiveList>
            <UserActiveList>
              <StyledImage src={images.blockHand} alt="차단 목록" />
              <ActivityText>차단 목록</ActivityText>
            </UserActiveList>
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

        </SubContainer>
      </Container>
    </ScrollableContainer>
  )
}

export default MyPage;
