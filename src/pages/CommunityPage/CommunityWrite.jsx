import axios from '../../apis/AxiosInstance';
import styled from 'styled-components';
import { images } from '../../components/Images';
import { MdPhotoCamera } from 'react-icons/md';
import { useState } from 'react';

const CommunityWrite = () => {
  const [uploadedImage, setUploadedImage] = useState(''); //미리보기 이미지
  const [title, setTitle] = useState(''); // 제목
  const [contents, setContents] = useState(''); // 내용
  const [user, setUser] = useState(''); // 유저
  const [imageUrl, setImageUrl] = useState(null); // 사진 파일
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('전체');
  const category = [
    { src: images.categoryAll, name: '전체' },
    { src: images.categoryFreedom, name: '자유' },
    { src: images.categoryDongNea, name: '동네' },
    { src: images.categoryExport, name: '전문가' },
    { src: images.categoryAnonymous, name: '익명' },
    { src: images.categoryEvent, name: '이벤트' },
  ];

  const handleSubmit = async e => {
    e.preventDefault(); // 새로고침 방지
    setLoading(true);

    // FormData 객체 생성
    const formData = new FormData();
    // const createdAt = new Date().toISOString();
    // formData.append('createdAt', createdAt); // 현재 시간 추가
    formData.append('title', title);
    formData.append('contents', contents);
    formData.append('user', user);
    if (imageUrl) {
      formData.append('imageUrl', imageUrl); // 'imageUrl'는 Spring Boot에서 받을 필드 이름과 일치해야 합니다
    }

    try {
      const response = await axios.post('/communities', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('등록 data : ', response.data);
      alert('등록 성공', response.data);
      setTitle('');
      setContents('');
      setUser('');
      setImageUrl(null); // 이미지 URL 초기화
      setUploadedImage(null); // 미리보기 이미지 초기화
    } catch (error) {
      console.error('오류 발생:', error);
      alert('오류 발생:');
      setTitle('');
      setContents('');
      setUser('');
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

  return (
    <ItemTitle>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">
            유저 : <br />
            <input id="user" value={user} type="number" onChange={e => setUser(e.target.value)} required />
          </label>
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
          <label htmlFor="title">
            <Title>제목 </Title>
            <Box
              id="title"
              value={title}
              type="text"
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="제목을 입력해주세요"
            />
          </label>
          <Title>카테고리 </Title>
          <Category>
            {category.map((item, index) => (
              <CategoryBtn
                key={index}
                $active={activeCategory === item.name}
                onClick={() => setActiveCategory(item.name)}>
                <CategoryImg src={item.src} alt={item.name} />
                {item.name}
              </CategoryBtn>
            ))}
          </Category>
          <label>
            <Title> 설명 </Title>
            <Textarea
              id="contents"
              value={contents}
              onChange={e => setContents(e.target.value)}
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

export default CommunityWrite;

const ItemTitle = styled.div`
  display: column;
  height: 100dvh;
  width: 100%;
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
const Category = styled.div`
  width: 100%;
  height: 83px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  margin: 10px 0px;
`;
const CategoryBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ $active }) => ($active ? '1' : '0.5')};
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;
const CategoryImg = styled.img`
  width: 40px;
  height: 40px;
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
  flex-direction: column;
`;
const SubmitBtn = styled.div`
  margin-top: auto;
  margin-bottom: 0px;
`;
