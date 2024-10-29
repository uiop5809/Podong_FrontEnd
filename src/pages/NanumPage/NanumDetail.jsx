import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { VscAccount } from "react-icons/vsc";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";

const PetItemDetailPage = () => {
  const navigate = useNavigate();
  const {no} = useParams();// %% URL에서 글 번호(no)를 가져옴 %%
  const [itemDetail, setItemDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [counter,setCounter] =useState(0);
  
  useEffect(()=>{
    fetch(`http://localhost:8080/api/petItems/${no}`)
    .then((response) => response.json())
    .then((json) => {
      console.log("item 내용 :", json);
      setItemDetail(json);
    });
  },[no])

  useEffect(()=>{
    fetch(`http://localhost:8080/api/comments`)
    .then((response) => response.json())
    .then((json) => {
      console.log("댓글 :", json);
      setComments(json);
    });
  },[no])

  function good () {
    setCounter(counter+1);
    console.log("좋아요 :", counter)
  }

  return (
    <ItemTitle>
      <RowTi>
        <button onClick={() => {navigate("/petitemList");}}>
          <HiArrowLeft1 />
        </button>
        <H1>나눔</H1>
      </RowTi>
        
      <ListImg>{itemDetail.imageUrl}</ListImg>
      <ImgBt>
      <ImgNo>1 / 5</ImgNo>
      </ImgBt>
      <User1><VscAccount1/>작성자: {itemDetail.user}</User1>
      <Title>제목: {itemDetail.name}</Title>
      <Icons>
        <div>
          <Like1 onClick={()=>{good()}}/>{counter}
          <Comment1/>2
        </div>
        <div>
          <ListPrice> {(itemDetail.price ? `${itemDetail.price.toLocaleString()}원` : <나눔>나눔</나눔>)}</ListPrice>
        </div>
      </Icons>
      <Contents>작성글: {itemDetail.description}</Contents>
      <Line />
      {comments.map((item)=>(
      <div  key={item.commentId}>
      <User2><VscAccount1/>작성자: {item.length > 0 && item[0].user}
        <ListDate key={item.commentId}>
          {new Date(item.createdAt).toLocaleDateString('ko-KR', {
            timeZone: 'Asia/Seoul' 
          })}
        </ListDate>
      </User2>
        <Comment>{item.comment}</Comment>
        </div>
      ))}
    </ItemTitle>
  );
};

export default PetItemDetailPage;


const ItemTitle = styled.div`
  margin: 64px 25px 64px 25px;
`;
const RowTi = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;
const HiArrowLeft1 = styled(HiArrowLeft)`
  font-size: 20px;
  font-weight: bold;
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
const ListImg = styled.div`
  width: 100%;
  height: 300px;
  background-color: #D9D9D9;
  border-radius: 10px;
  flex-shrink: 0; /* 이미지 크기를 고정 */
  background-image: url(${(props) => props.src}); /* 이미지 URL 설정 */
  background-size: cover; /* 이미지를 채우도록 설정 */
  background-position: center; /* 이미지 중앙 정렬 */
`;
const ImgBt = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
`;
const ImgNo = styled.button`
  background-color: #8D8D8D;
  border-radius: 30px;
  font-size: 8px;
  color: white;
  border: 1px solid #8D8D8D;
  width: 35px;
  height: 20px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const User1 = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top:10px;
`;

const VscAccount1 = styled(VscAccount)`
  font-size: 12px;
  margin-right: 3px;
  align-items: center;
  justify-content:center ;
  `;
  const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  margin: 10px 0px 10px 0px;
`;
const ListPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  width: 100%;
`;
const 나눔 = styled.p`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  width: 100%;
  color: #FF6E00;
  justify-content: end;
`;
const Icons = styled.div`
  font-size: 16px;
  color: #8D8D8D;
  display: flex;
  justify-content: space-between;
`;
const Like1 = styled(FiHeart)`
  font-size: 16px;
  color: red;
`;
const Comment1 = styled(IoChatbubbleEllipsesOutline)`
  margin-left:10px;
`;
const Contents = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 10px;
`;
const Line = styled.hr`
  border: none;   
  border-top: 1px solid #FF6E00;
  margin-bottom: 20px;
`;
const User2 = styled.div`
  display: flex;
  align-items: center;
  
  font-size: 12px;
  margin-top:10px;
`;
const ListDate = styled.div`
  font-size: 8px;
  color: #8D8D8D;
  display: flex;
  margin-left: 5px;
  margin-top: 2px;
`;
const Comment = styled.div`
  font-size: 12px;
  display: flex;
  
`;