import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";


const PetItemDetailPage = () => {
  const navigate = useNavigate();
  const {no} = useParams();// %% URL에서 글 번호(no)를 가져옴 %%
  const [itemDetail, setItemDetail] = useState({});

  useEffect(()=>{
    fetch(`http://localhost:8080/api/petItems/${no}`)
    .then((response) => response.json())
    .then((json) => {
      console.log("item 내용 :", json);
      setItemDetail(json);
    });
  },[no])
  return (
    <ItemTitle>
      <h1>나눔 상세보기 </h1>
      <p>글 번호: {itemDetail.petItemId}</p> 
      <p>제목: {itemDetail.name}</p>
      <p>내용: {itemDetail.description}</p>
    
    <button onClick={(e)=>{navigate("/petitemList")} }>게시글 목록</button>
    </ItemTitle>
  );
};

export default PetItemDetailPage;


const ItemTitle = styled.div`
  margin: 64px 25px 64px 25px;
`;