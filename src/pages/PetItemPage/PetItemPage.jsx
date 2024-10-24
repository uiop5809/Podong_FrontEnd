import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { images } from "../../components/Images";
import { GoArrowLeft } from "react-icons/go";

const PetItemPage = () => {
  const navigate = useNavigate();

  function handleCreateClick(e) {
    e.preventDefault(); // 새로고침 방지
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // 현재 시간을 createdAt, updatedAt으로 추가
    const now = new Date().toISOString();
    data.createdAt = now;
    // data.updatedAt = now;

    console.log("data = ", data);

    //글 등록
    fetch("http://localhost:8080/api/petItems", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log("등록 data : ", json));
      e.target.reset(); // 폼의 모든 입력값 초기화
  }

  function handleSubmit(e) {
    e.preventDefault(); //새로고침 방지
    handleCreateClick(e);
  }
  const [isClicked, setIsClicked] = useState(false); 

  const handleClick = () => {
    setIsClicked(!isClicked); //버튼 클릭시 상태 반전
  };
  return (
    <ItemTitle>
      <Row>
        <button onClick={() => {navigate("/petitemList");}}>
          <GoArrowLeft1 />
        </button>
        <H1>판매 글 작성</H1>
      </Row>
      <form onSubmit={handleSubmit}>
        <label>
          유저 : <br />
          <input name="user" type="text" required />
        </label><br />
        <label>
          이미지 첨부 : <br />
          <img src={images.cameraIcon} alt="카메라아이콘" />
          <input name="imageUrl" />
        </label><br />
        <br />
        <label>
          <Title>제목 </Title>
          <Box name="name" type="text" required  placeholder="제목을 입력해주세요"/>
        </label>
        <Title>거래 방식</Title>
        <Row>
          <Button1 right="15" isClicked={isClicked} onClick={handleClick}>판매하기</Button1>
          <Button1 isClicked={isClicked} onClick={handleClick}>나눔하기</Button1>
        </Row>
        <br />
        <label>
          <Title> 설명 </Title>
          <Textarea name="description" required placeholder="공유하고 싶은 내용을 작성해주세요"/>
        </label>
        <br />
        <label>
          나눔상태 : <br />
          <input type="checkbox" name="status" />
        </label>
        <br />
        <Div>욕설 광고등 운영저책 위반 시 제재를 받으실 수 있습니다</Div>
        <Button type="submit">작성 완료</Button>
      </form>
    </ItemTitle>
  );
};

export default PetItemPage;

const ItemTitle = styled.div`
  margin: 64px 25px 64px 25px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 1em;
  font-weight: bold;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  padding-left: 25%;
`;

const GoArrowLeft1 = styled(GoArrowLeft)`
  font-size: 2em;
`;
const Title = styled.div`
  font-size: 1em;
  font-weight: bold;
  display: flex;
  margin: 5px;
`;
const Box = styled.input`
  top: 0;
  width: 100%;
  height: 30px;
  margin: 10px 0px 15px 0px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-radius: 5px;
  border: 1px solid #E4E4E4;
  outline: none;
  transition: border-color 0.3s;
  &::placeholder {
    font-size: 0.7em; /* placeholder의 글씨 크기를 작게 설정 */
    color: #E4E4E4; /* 필요에 따라 placeholder 색상 변경 */
  }
`;
const Textarea = styled.textarea`
  margin: 10px 0px 15px 0px;
  width: 100%;
  height: 15em;
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #E4E4E4;
  outline: none;
  transition: border-color 0.3s;
  &::placeholder {
    font-size: 0.7em; /* placeholder의 글씨 크기를 작게 설정 */
    color: #E4E4E4; /* 필요에 따라 placeholder 색상 변경 */
  }
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  background-color: #FF6E00;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #FF6E00;
  outline: none;
  transition: border-color 0.3s;
  align-items: center;
  justify-content: center;
  color: white;
`;
const Button1 = styled.button`
  width: 7em;
  height: 35px;
  display: flex;
  background-color: white;
  border: 1px solid #8D8D8D;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  color: #8D8D8D;
  &:hover {
    background-color: #b8b8b8; /* 호버 시 배경색 */
    color: white; /* 호버 시 텍스트 색상 */
  }
  ${({isClicked}) => isClicked &&`
    background-color: #8D8D8D;
    color: white;
    border: 1px solid #8D8D8D;
  `}
  margin-right: ${(props) => (props.right ?`${props.right}px` : '0')};
`;
const Div = styled.div`
  font-size: 0.7em;
  width: 100%;
  height: 20px;
  display: flex;
  background-color: #FFEFEF;
  padding: 15px;
  border-radius: 6px;
  outline: none;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
  color: #E04F4B;
`;