import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LuSearch } from 'react-icons/lu';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { FcLike } from 'react-icons/fc';
import axios from '../../apis/AxiosInstance';
import { HiArrowSmDown } from 'react-icons/hi';

const PetItemListPage = () => {
  const navigate = useNavigate();
  const [petItemList, setPetItemList] = useState([]);
  const [comments, setComments] = useState([]);
  const [latest, setLatest] = useState(false);
  //게시글 목록 불러오기
  useEffect(() => {
    axios
      .get('/petItems')
      .then(response => {
        setPetItemList(response.data); // 응답 데이터 저장
        console.log('게시글 목록:', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // 좋아요 수 증가 함수
  const good = petItemId => {
    const updatedItemList = petItemList.map(item => {
      if (item.petItemId === petItemId) {
        const updatedGood = (item.good || 0) + 1;
        // 서버의 좋아요 수 업데이트 요청
        axios
          .put(`/petItems/${petItemId}`, { ...item, good: updatedGood })
          .then(response => {
            console.log('좋아요 업데이트:', response.data);
          })
          .catch(error => {
            console.error('좋아요 업데이트 실패:', error);
          });
        return { ...item, good: updatedGood };
      }
      return item;
    });
    setPetItemList(updatedItemList);
  };

  // 댓글 목록 불러오기
  useEffect(() => {
    axios
      .get(`/petItemComments`)
      .then(response => {
        setComments(response.data);
        console.log('댓글 목록 :', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // 최신순
  const handleLatest = () => {
    const sortList = [...petItemList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPetItemList(sortList);
    setLatest(true); //정렬 변경
  };

  return (
    <ItemTitle>
      <Search>
        <Box type="search" placeholder="단어를 입력하세요" />
        <LuSearch1 />
        <Buuttons>
          <ButtonCh onClick={handleLatest}>
            최신순
            <HiArrowSmDown1 />
          </ButtonCh>
          <BuWrite
            onClick={() => {
              navigate('/nanumList/write');
            }}>
            글 작성
          </BuWrite>
        </Buuttons>
      </Search>

      <All>전체 {petItemList.length.toLocaleString()}개</All>
      <RowLi>
        {petItemList.map(item => (
          <Lists
            key={item.petItemId}
            onClick={e => {
              e.preventDefault();
              navigate(`/nanumList/detail/${item.petItemId}`);
            }}>
            <ListImg src={`http://localhost:8080/uploads/${item.imageUrl}`} />
            <ListTitlesContainer>
              <ListTItle>{item.name}</ListTItle>
              <ListUser>작성자{item.user}</ListUser>
              <ListPrice>{item.price ? `${item.price.toLocaleString()}원` : <나눔>나눔</나눔>}</ListPrice>
              <ListDate>
                {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                })}
                <Icons>
                  <FcLike1
                    onClick={e => {
                      e.stopPropagation();
                      good(item.petItemId);
                    }}
                  />
                  {item.good || 0}
                  <Comment1 />
                  {comments.filter(comment => comment.petItem === item.petItemId).length}
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
  height: 100%;
  width: 100%;
  padding: 64px 25px 64px 25px;
  display: flex;
  flex-direction: column;
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
  border: 1px solid #f0f0f0;
  background-color: #f0f0f0;
  outline: none;
  &::placeholder {
    font-size: 12px; /* placeholder의 글씨 크기를 작게 설정 */
    color: #b3b3b3; /* 필요에 따라 placeholder 색상 변경 */
  }
`;
const HiArrowSmDown1 = styled(HiArrowSmDown)`
  font-size: 20px;
`;
const Search = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
`;
const LuSearch1 = styled(LuSearch)`
  position: absolute;
  top: 16px;
  bottom: 2px;
  left: 43%;
  border-radius: 15px;
  color: #b3b3b3;
`;
const ButtonCh = styled.button`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 3px 0px 3px 6px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const BuWrite = styled.button`
  width: 64px;
  height: 28px;
  font-size: 12px;
  display: flex;
  background-color: #ff6e00;
  border-radius: 8px;
  border: 1px solid #ff6e00;
  outline: none;
  transition: border-color 0.3s;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
`;
const All = styled.div`
  font-size: 12px;
  color: #8d8d8d;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const RowLi = styled.div`
  display: flex;
  flex-wrap: wrap; // 화면에 맞춰 자동 줄바꿈
  gap: 16px; // 각 Col 사이의 간격
  margin: 0 -8px; // Col 패딩 균등 조절
`;
const Lists = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 100px;
`;
const ListImg = styled.img`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 8px;
  flex-shrink: 0; /* 이미지 크기를 고정 */
  background-image: url(${props => props.src});
  background-size: cover; 
  background-position: center; 
  cursor: pointer;
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
  color: #8d8d8d;
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
  color: #ff6e00;
  align-self: center;
`;
const ListDate = styled.div`
  font-size: 10px;
  color: #8d8d8d;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;
const Icons = styled.div`
  font-size: 16px;
  color: #8d8d8d;
  margin-left: 5px;
`;
const FcLike1 = styled(FcLike)`
  font-size: 16px;
  cursor: pointer;
`;
const Comment1 = styled(IoChatbubbleEllipsesOutline)`
  font-size: 16px;
  margin-left: 10px;
`;
