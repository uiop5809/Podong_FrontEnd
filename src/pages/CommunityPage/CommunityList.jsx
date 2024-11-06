import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import axios from "../../apis/AxiosInstance";
import { HiArrowSmDown } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";

const CommunityList = () => {
  const navigate = useNavigate();
  const [communityList, setCommunityList] = useState([]);
  const [comments, setComments] = useState([]);
  const [latest, setLatest] = useState(false);
  const [userNicknames, setUserNicknames] = useState({});

  // 게시글 목록 불러오기
  useEffect(() => {
    axios
      .get("/communities")
      .then((response) => {
        setCommunityList(response.data);
        console.log("게시글 목록:", response.data);
        response.data.forEach((item) => {
          if (!userNicknames[item.user]) {
            fetchUserNickname(item.user);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // 사용자 닉네임 가져오기 함수
  const fetchUserNickname = (userId) => {
    axios
      .get(`/user/${userId}`)
      .then((response) => {
        setUserNicknames((prev) => ({
          ...prev,
          [userId]: response.data.nickname,
        }));
      })
      .catch((error) => {
        console.error("Error fetching user nickname:", error);
      });
  };

  // 좋아요 수 증가 함수
  const good = (postId) => {
    const updatedItemList = communityList.map((item) => {
      if (item.postId === postId) {
        const updatedGood = (item.good || 0) + 1;
        axios
          .put(`/communities/${postId}`, {
            ...item,
            good: updatedGood,
          })
          .then((response) => {
            console.log("좋아요 업데이트:", response.data);
          })
          .catch((error) => {
            console.error("좋아요 업데이트 실패:", error);
          });
        return { ...item, good: updatedGood };
      }
      return item;
    });
    setCommunityList(updatedItemList);
  };

  // 댓글 목록 불러오기
  useEffect(() => {
    axios
      .get(`/communityComments`)
      .then((response) => {
        setComments(response.data);
        console.log("댓글 목록 :", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // 최신순 정렬 함수
  const handleLatest = () => {
    const sortedList = [...communityList].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setCommunityList(sortedList);
    setLatest(true);
  };

  return (
    <ItemTitle>
      <Search>
        <Box type="search" placeholder="단어를 입력하세요" />
        <LuSearch1 />
        <Buttons>
          <ButtonCh onClick={handleLatest}>
            최신순
            <HiArrowSmDown1 />
          </ButtonCh>
          <BuWrite
            onClick={() => {
              navigate("/community/write");
            }}
          >
            글 작성
          </BuWrite>
        </Buttons>
      </Search>

      <All>전체 {communityList.length.toLocaleString()}개</All>
      <RowLi>
        {communityList.map((item) => (
          <Lists
            key={item.postId}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/community/detail/${item.postId}`);
            }}
          >
            <ListImg src={item.imageUrl} />
            <ListTitlesContainer>
              <ListTItle>{item.title}</ListTItle>
              <ListUser>
                작성자: {userNicknames[item.user] || "로딩 중..."}
              </ListUser>
              <ListDate>
                {new Date(item.createdAt).toLocaleDateString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}
                <Icons>
                  <FcLike1
                    onClick={(e) => {
                      e.stopPropagation();
                      good(item.postId);
                    }}
                  />
                  {item.good || 0}
                  <Comment1 />
                  {
                    comments.filter((comment) => comment.post === item.postId)
                      .length
                  }
                </Icons>
              </ListDate>
            </ListTitlesContainer>
          </Lists>
        ))}
      </RowLi>
    </ItemTitle>
  );
};

export default CommunityList;

const ItemTitle = styled.div`
  height: 100%;
  width: 100%;
  padding: 64px 25px 64px 25px;
  display: flex;
  flex-direction: column;
`;
const Buttons = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  gap: 5px;
`;
const Box = styled.input`
  width: 50%;
  height: 30px;
  margin: 10px 0px;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  background-color: #f0f0f0;
  outline: none;
  &::placeholder {
    font-size: 12px;
    color: #b3b3b3;
  }
`;
const HiArrowSmDown1 = styled(HiArrowSmDown)`
  font-size: 20px;
`;
const Search = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LuSearch1 = styled(LuSearch)`
  position: absolute;
  top: 16px;
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
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
`;
const All = styled.div`
  font-size: 12px;
  color: #8d8d8d;
  margin: 10px 0px;
`;
const RowLi = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0 -8px;
`;
const Lists = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 50px;
`;
const ListImg = styled.img`
  width: 50px;
  height: 50px;
  background-color: #d9d9d9;
  border-radius: 8px;
  flex-shrink: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;
const ListTitlesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  cursor: pointer;
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
const ListDate = styled.div`
  display: flex;
  font-size: 12px;
  color: #8d8d8d;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
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
