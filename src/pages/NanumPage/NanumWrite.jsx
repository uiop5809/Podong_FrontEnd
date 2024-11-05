import styled from 'styled-components';
import { MdPhotoCamera } from 'react-icons/md';
import axios from '../../apis/AxiosInstance';
import { useEffect, useState } from 'react';


const PetItemPage = () => {
  const [selectedSaleType, setSelectedSaleType] = useState(''); // 버튼 판매 or 나눔
  const [showPriceBox, setShowPriceBox] = useState(false); // 가격 입력 박스 표시 여부
  const [uploadedImage, setUploadedImage] = useState(''); //미리보기 이미지
  const [name, setName] = useState(''); // 제목
  const [description, setDescription] = useState(''); // 내용
  const [price, setPrice] = useState(''); // 판매가격
  const [user, setUser] = useState(''); // 유저
  const [imageUrl, setImageUrl] = useState(null); // 사진 파일
  const [sharing, setSharing] = useState(''); // 나눔 . 판매 여부
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); 
      
      if (!userId) {

        console.error('User ID not found in local storage');
        return;
      }
    }
  });
  const handleSubmit = async e => {
    e.preventDefault(); // 새로고침 방지
    setLoading(true);

    // FormData 객체 생성
    const formData = new FormData();
    // const createdAt = new Date().toISOString();
    // formData.append('createdAt', createdAt); // 현재 시간 추가
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('user', user);
    formData.append('sharing', sharing);
    if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }

    try {
      const response = await axios.post('/petItems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('등록 data : ', response.data);
      alert('등록 성공', response.data);
      setName('');
      setDescription('');
      setPrice('');
      setUser('');
      setSharing('');
      setImageUrl(null); // 이미지 URL 초기화
      setUploadedImage(null); // 미리보기 이미지 초기화
    } catch (error) {
      console.error('오류 발생:', error);
      alert('오류 발생:');
      setName('');
      setDescription('');
      setPrice('');
      setUser('');
      setSharing('');
      setImageUrl(null); // 이미지 URL 초기화
      setUploadedImage(null); // 미리보기 이미지 초기화
    } finally {
      setLoading(false);
    }
  };
  // 파일 선택 핸들러
  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]; // 첫 번째 파일만 선택
      setImageUrl(file);
      setUploadedImage(URL.createObjectURL(file));
      if (file.length > 1) {
        alert('최대 1장의 이미지만 선택할 수 있습니다.');
        return;
      }
    }
  };

  const handleSaleTypeClick = type => {
    setSelectedSaleType(type);
    setSharing(type === '판매' ? 1 : 0);
    setShowPriceBox(type === '판매'); // '판매' 선택 시만 가격 입력 박스 표시
    setPrice(type === '판매' ? '' : '0');
  };

  return (
    <ItemTitle>
      <Form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="user">
            유저 : <br />
            <input id="user" value={user} type="number" onChange={e => setUser(e.target.value)} required />
          </label> */}
          <br />
          <LableImg htmlFor="imageUrl">
            <input type="file" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" id="imageUrl" />
            {uploadedImage ? (
              <ImgPreview
                src={uploadedImage} // 미리보기 이미지를 보여줌
                alt="미리보기"
              />
            ) : (
              <>
                <ImgNo>0/1</ImgNo>
                <MdPhotoCamera1 />
              </>
            )}
          </LableImg>
          <br />
          <label htmlFor="name">
            <Title>제목 </Title>
            <Box
              id="name"
              value={name}
              type="text"
              onChange={e => setName(e.target.value)}
              required
              placeholder="제목을 입력해주세요"
            />
          </label>
          <Title>거래 방식</Title>
          <ButtonRow>
            <SelectButton
              onClick={() => handleSaleTypeClick('판매')}
              selected={selectedSaleType === '판매'}
              onChange={() => handleSaleTypeClick('판매')}>
              판매하기
            </SelectButton>
            <SelectButton onClick={() => handleSaleTypeClick('나눔')} selected={selectedSaleType === '나눔'}>
              나눔하기
            </SelectButton>
          </ButtonRow>
          {showPriceBox && (
            <div id="Box">
              <Box
                value={price}
                id="price"
                type="number"
                onChange={e => setPrice(e.target.value)}
                placeholder="금액을 입력해주세요"
              />
            </div>
          )}
          <label htmlFor="description">
            <Title> 설명 </Title>
            <Textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              placeholder="공유하고 싶은 내용을 작성해주세요"
            />
          </label>
          <br />
        </div>
        <SubmitBtn>
          <Div>욕설 광고등 운영저책 위반 시 제재를 받으실 수 있습니다</Div>
          <BuWrite type="submit" disabled={loading}>
            {loading ? '등록중...' : '작성 완료'}
          </BuWrite>
        </SubmitBtn>
      </Form>
    </ItemTitle>
  );
};

export default PetItemPage;

const ItemTitle = styled.div`
  display: column;
  width: 100%;
  height: 100vh;
  padding: 64px 25px 64px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ImgPreview = styled.img`
  border-radius: 8px;
  width: 65px;
  height: 65px;
  margin-right: 10px;
  object-fit: cover; /* 이미지 비율 유지 */
  opacity: 0.7;
  border: 2px solid #8d8d8d;
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
const SelectButton = styled.div`
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e4e4e4;
  width: 172px;
  height: 40px;
  text-align: center;
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? '#FF6E00' : 'white')};
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;

  &:hover {
    background-color: #ff6e00;
    color: white;
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
  width: 65px;
`;
const Form = styled.form`
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
`;
const SubmitBtn = styled.div`
  position: absolute;
  bottom:0px;
  width: 100%;
  justify-content: flex-end;
`;
