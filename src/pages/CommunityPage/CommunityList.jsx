import axios from '../../apis/AxiosInstance';
import { useEffect, useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { images } from '../../components/Images';

const CommunityList = () => {
  const navigate = useNavigate();
  const [comunityList, setComunityList] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeCategory, setActiveCategory] = useState('전체');
  const category = [
    { src: images.categoryAll, name: '전체' },
    { src: images.categoryFreedom, name: '자유' },
    { src: images.categoryDongNea, name: '동네' },
    { src: images.categoryExpert, name: '전문가' },
    { src: images.categoryAnonymity, name: '익명' },
    { src: images.categoryEvent, name: '이벤트' },
  ];

  useEffect(() => {
    axios
      .get('/communities')
      .then(response => {
        setComunityList(response.data); // 응답 데이터 저장
        console.log('게시글 목록:', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // 좋아요 수 증가 함수
  const good = postId => {
    const updatedItemList = comunityList.map(item => {
      if (item.postId === postId) {
        const updatedGood = (item.good || 0) + 1;
        // 서버의 좋아요 수 업데이트 요청
        axios
          .put(`/communities/${postId}`, { ...item, good: updatedGood })
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
    setComunityList(updatedItemList);
  };

  // 댓글 목록 불러오기
  useEffect(() => {
    axios
      .get(`/communityComments`)
      .then(response => {
        setComments(response.data);
        console.log('댓글 목록 :', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <ItemTitle>
      <Col>
        <CommunityText>고양이가 세상을 지배한다</CommunityText>
        <WriteBtn
          onClick={() => {
            navigate('/community/write');
          }}>
          글 작성
        </WriteBtn>
      </Col>
      <Category>
        {category.map((item, index) => (
          <CategoryBtn key={index} $active={activeCategory === item.name} onClick={() => setActiveCategory(item.name)}>
            <CategoryImg src={item.src} alt={item.name} />
            {item.name}
          </CategoryBtn>
        ))}
      </Category>
      <RowLi>
        {comunityList
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(item => (
            <Div key={item.postId}>
              <Lists
                onClick={e => {
                  e.preventDefault();
                  navigate(`/community/detail/${item.postId}`);
                }}>
                <ListImg src={`/${item.imageUrl}`} />
                <ListTitlesContainer>
                  <ListTItle>제목 : {item.title}</ListTItle>
                  <ListDate>
                    <ListUser>작성자{item.user}</ListUser>
                    <DI>
                      {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                        timeZone: 'Asia/Seoul',
                      })}
                      <Icons>
                        <FcLike1
                          onClick={e => {
                            e.stopPropagation();
                            good(item.postId);
                          }}
                        />
                        {item.good || 0}
                        <Comment1 />
                        {comments.filter(comment => comment.post === item.postId).length}
                      </Icons>
                    </DI>
                  </ListDate>
                </ListTitlesContainer>
              </Lists>
              <Hr>
                <hr />
              </Hr>{' '}
            </Div>
          ))}
      </RowLi>
    </ItemTitle>
  );
};

export default CommunityList;

const ItemTitle = styled.div`
  height: 100vh;
  width: 100%;
  padding: 64px 0px 64px 0px;
  display: flex;
  flex-direction: column;
`;
const Col = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const CommunityText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 15px;
`;
const WriteBtn = styled.button`
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
  margin-right: 15px;
`;
const Category = styled.div`
  width: 100%;
  height: 83px;
  padding: 10px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-around;
  margin: 10px 0px;
  align-items: center;
`;
const CategoryBtn = styled.div`
  display: flex;
  font-size:13px ;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? '1' : '0.5')};
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;
const CategoryImg = styled.img`
  width: 25px;
  height: 30px;
`;

const RowLi = styled.div`
  display: flex;
  flex-wrap: wrap; // 화면에 맞춰 자동 줄바꿈
  margin: 0px; // Col 패딩 균등 조절
`;
const Lists = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 50px;
  margin: 0px 25px;
`;
const ListImg = styled.img`
  width: 50px;
  height: 50px;
  background-color: #d9d9d9;
  margin-left: 20px;
  border-radius: 8px;
  flex-shrink: 0; /* 이미지 크기를 고정 */
  background-image: url(${props => props.src}); /* 이미지 URL 설정 */
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
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  align-self: center;
`;
const ListUser = styled.div`
  font-size: 10px;
  color: #8d8d8d;
  display: flex;
  /* width: 90%; */
  align-self: center;
  justify-content: flex-start;
`;
const ListDate = styled.div`
  font-size: 10px;
  color: #8d8d8d;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const DI = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
`;
const Icons = styled.div`
  font-size: 14px;
  color: #8d8d8d;
  margin-left: 5px;
`;
const FcLike1 = styled(FcLike)`
  font-size: 16px;
`;
const Hr = styled.div`
  width: 100%;
  color: #8d8d8d;
`;
const Comment1 = styled(IoChatbubbleEllipsesOutline)`
  font-size: 16px;
  margin-left: 10px;
`;
