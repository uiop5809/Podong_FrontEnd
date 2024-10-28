import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { MdPhotoCamera } from 'react-icons/md';

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

    console.log('data = ', data);

    //글 등록
    fetch('http://localhost:8080/api/petItems', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    })
      .then(response => response.json())
      .then(json => console.log('등록 data : ', json));
    e.target.reset(); // 폼의 모든 입력값 초기화
  }

  function handleSubmit(e) {
    e.preventDefault(); //새로고침 방지
    handleCreateClick(e);
  }

  return (
    <ItemTitle>
      <MainTitle>
        <button
          onClick={() => {
            navigate('/petitemList');
          }}>
          <HiArrowLeft size={20} />
        </button>
        <H1>판매 글 작성</H1>
      </MainTitle>
      <form onSubmit={handleSubmit}>
        <label>
          유저 : <br />
          <input name="user" type="text" required />
        </label>
        <br />
        <LableImg>
          <input type="file" style={{ display: 'none' }} name="imageUrl" multiple={true} />
          <ImgNo>0/5</ImgNo>
          <MdPhotoCamera1 />
        </LableImg>
        <br />
        <label>
          <Title>제목 </Title>
          <Box name="name" type="text" required placeholder="제목을 입력해주세요" />
        </label>
        <Title>거래 방식</Title>
        <input type="radio" name="status" value="0" checked />
        나눔
        <input type="radio" name="status" value="1" />
        판매
        <ButtonRow>
          <ButtonPan>판매하기</ButtonPan>
          <ButtonNa>나눔하기</ButtonNa>
        </ButtonRow>
        <Box name="price" type="text" placeholder="금액을 입력해주세요" />
        <label>
          <Title> 설명 </Title>
          <Textarea name="description" required placeholder="공유하고 싶은 내용을 작성해주세요" />
        </label>
        <br />
        <Div>욕설 광고등 운영저책 위반 시 제재를 받으실 수 있습니다</Div>
        <BuWrite type="submit">작성 완료</BuWrite>
      </form>
    </ItemTitle>
  );
};

export default PetItemPage;

const ItemTitle = styled.div`
  margin: 64px 25px 64px 25px;
`;

const MainTitle = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Title = styled.div`
  font-size: 15px;
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
  border: 1px solid #e4e4e4;
  outline: none;
  transition: border-color 0.3s;
  &::placeholder {
    font-size: 10px; /* placeholder의 글씨 크기를 작게 설정 */
    color: #e4e4e4; /* 필요에 따라 placeholder 색상 변경 */
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
  border: 1px solid #e4e4e4;
  outline: none;
  transition: border-color 0.3s;
  &::placeholder {
    font-size: 10px; /* placeholder의 글씨 크기를 작게 설정 */
    color: #e4e4e4; /* 필요에 따라 placeholder 색상 변경 */
  }
`;
const BuWrite = styled.button`
  width: 100%;
  height: 45px;
  display: flex;
  background-color: #ff6e00;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ff6e00;
  outline: none;
  transition: border-color 0.3s;
  align-items: center;
  justify-content: center;
  color: white;
`;
const ButtonRow = styled.div`
  display: flex; // 플렉스 박스 레이아웃으로 설정
  gap: 10px; // 버튼 간의 간격
`;
const ButtonNa = styled.button`
  width: 85px;
  height: 30px;
  display: flex;
  background-color: white;
  border: 0.3px solid #ff6e00;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: #ff6e00;
  &:hover {
    background-color: #ff6e00; /* 호버 시 배경색 */
    color: white; /* 호버 시 텍스트 색상 */
  }
`;
const ButtonPan = styled.button`
  width: 85px;
  height: 30px;
  display: flex;
  background-color: white;
  border: 0.3px solid #ff6e00;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: #ff6e00;
  &:hover {
    background-color: #ff6e00; /* 호버 시 배경색 */
    color: white; /* 호버 시 텍스트 색상 */
  }
`;
const Div = styled.div`
  font-size: 10px;
  font-weight: bold;
  width: 100%;
  height: 20px;
  display: flex;
  background-color: #ffefef;
  padding: 15px;
  border-radius: 5px;
  outline: none;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
  color: #e04f4b;
`;
const ImgNo = styled.p`
  background-color: white;
  border-radius: 8px;
  padding-top: 25px;
  font-size: 10px;
  color: #8d8d8d;
  border: 1px solid #e4e4e4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
`;
const MdPhotoCamera1 = styled(MdPhotoCamera)`
  position: absolute;
  font-size: 20px;
  top: 18px;
  left: 23px;
  color: #8d8d8d;
`;

const LableImg = styled.label`
  position: relative;
  display: flex;
`;
