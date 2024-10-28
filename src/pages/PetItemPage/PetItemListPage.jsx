import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowLeft, HiArrowSmDown } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";

const PetItemListPage = () => {
  const navigate = useNavigate();
  const [petItemList, setPetItemList] = useState([]); 
  const [counter, setCounter] = useState(0)

  function handleList() {
    fetch("http://localhost:8080/api/petItems")
      .then((response) => response.json())
      .then((json) => {
        console.log("게시글 목록:", json); 
        setPetItemList(json);
      });
  }

  useEffect(() => {   
    handleList();
  }, []);

  function good () {
    setCounter(counter+1);
    console.log("좋아요 :", counter)
  }

  return (
    <ItemTitle>
      <RowTi>
        <button onClick={() => {navigate("/");}}>
          <HiArrowLeft1 />
        </button>
        <H1>나눔</H1>
      </RowTi>
      
        <Search>
        <Box type="search" placeholder="단어를 입력하세요"/><LuSearch1 />
        <Buuttons>
          <ButtonCh>최신순<HiArrowSmDown1 /></ButtonCh>
          <BuWrite onClick={()=>{navigate("/petitem")}}>글 작성</BuWrite>
        </Buuttons>
        </Search>
      
      <All>전체 {(petItemList.length).toLocaleString()}개</All>
        <RowLi>
          {petItemList.map((item) => ( 
            <Lists  key={item.petItemId} 
              onClick={(e)=>{e.preventDefault();
              navigate(`/petitemDetail/${item.petItemId}`)}}>
              <ListImg>{item.imageUrl}</ListImg>
              <ListTitlesContainer>
                <ListTItle>{item.name}</ListTItle>
                <ListUser>작성자{item.user}</ListUser>
                <ListPrice>{(item.price ? `${item.price.toLocaleString()}원` : <나눔>나눔</나눔>)}</ListPrice>
                <ListDate>
                  {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                    timeZone: 'Asia/Seoul' 
                    })}
                  <Icons>
                    <FcLike1 onClick={(e)=>{e.stopPropagation();good()}} />{counter}
                    <Comment1/>2
                  </Icons>
                </ListDate>
              </ListTitlesContainer>
            </Lists>
          ))}
        </RowLi>
    </ItemTitle>
  );
};

export default PetItemListPage;

const ItemTitle = styled.div`
margin: 64px 25px 64px 25px;
`;

const RowTi = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right :20px ;
`;
const HiArrowLeft1 = styled(HiArrowLeft)`
  font-size: 20px;
  font-weight: bold;
  `;
const Buuttons = styled.div`
    position: absolute;
    right: 0px;
    flex-direction: row;
    display: flex; 
    gap: 5px;
    align-self: center;
  `;
const Box = styled.input`
  width: 50%;
  height: 30px;
  margin: 10px 0px 10px 0px;
  align-items: self-start;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #F0F0F0;
  background-color: #F0F0F0;
  outline: none;
  &::placeholder {
    font-size: 12px; /* placeholder의 글씨 크기를 작게 설정 */
    color: #B3B3B3; /* 필요에 따라 placeholder 색상 변경 */
  }
`;
const HiArrowSmDown1 = styled(HiArrowSmDown)`
  font-size: 20px;
`;
const Search = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content:space-between;             
`;
const LuSearch1 = styled(LuSearch)`
  position: absolute;
  top: 16px;
  bottom: 2px;
  left: 43%;
  border-radius: 15px;
  color: #B3B3B3;
`;
const ButtonCh = styled.button`
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 3px 0px 3px 6px;
    &:hover {
      background-color: #F0F0F0;
    }
`;
const BuWrite = styled.button`
  width: 64px;
  height: 28px;
  font-size: 12px;
  display: flex;
  background-color: #FF6E00;
  border-radius: 8px;
  border: 1px solid #FF6E00;
  outline: none;
  transition: border-color 0.3s;
  align-items: center;
  justify-content: center;
  color: white;
`;
const All = styled.div`
  font-size: 12px;
  color: #8D8D8D;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const RowLi = styled.div`
  display: flex;
  flex-wrap: wrap; // 화면에 맞춰 자동 줄바꿈
  gap: 16px;       // 각 Col 사이의 간격
  margin: 0 -8px;  // Col 패딩 균등 조절
`;
const Lists = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 100px;
`;
const ListImg = styled.div`
  width: 100px;
  height: 100px;
  background-color: #D9D9D9;
  border-radius: 8px;
  flex-shrink: 0; /* 이미지 크기를 고정 */
  background-image: url(${(props) => props.src}); /* 이미지 URL 설정 */
  background-size: cover; /* 이미지를 채우도록 설정 */
  background-position: center; /* 이미지 중앙 정렬 */
`;
const ListTitlesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 상하 간격 자동 배분 */
  padding: 5px;
`;
const ListTItle = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  align-self: center;
`;
const ListUser = styled.div`
  font-size: 12px;
  color: #8D8D8D;
  display: flex;
  width: 100%;
  align-self: center;
`;
const ListPrice = styled.div`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  width: 100%;
  align-self: center;
`;
const 나눔 = styled.p`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  width: 100%;
  color: #FF6E00;
  align-self: center;
`;
const ListDate = styled.div`
  font-size: 10px;
  color: #8D8D8D;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;
const Icons = styled.div`
  font-size: 16px;
  color: #8D8D8D;
  margin-left: 5px;
`;
const FcLike1 = styled(FcLike)`
  font-size: 16px;
`;
const Comment1 = styled(IoChatbubbleEllipsesOutline)`
  font-size: 16px;
  margin-left: 10px;
`;
