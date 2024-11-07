import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../../apis/AxiosInstance";
import { images } from "../../components/Images";
import { FcLike } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const CommunityList = () => {
  const navigate = useNavigate();
  const [communityList, setCommunityList] = useState([]);
  const [filteredCommunityList, setFilteredCommunityList] = useState([]);
  const [comments, setComments] = useState([]);
  const [userNicknames, setUserNicknames] = useState({});
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const category = [
    { src: images.categoryAll, name: "전체" },
    { src: images.categoryFreedom, name: "자유" },
    { src: images.categoryDongNea, name: "동네" },
    { src: images.categoryExpert, name: "전문가" },
    { src: images.categoryAnonymity, name: "익명" },
    { src: images.categoryEvent, name: "이벤트" },
  ];

  useEffect(() => {
    // 게시글 목록 불러오기
    axios
      .get("/communities")
      .then((response) => {
        setCommunityList(response.data);
        setFilteredCommunityList(response.data);
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
          .then((response) => {})
          .catch((error) => {
            console.error("좋아요 업데이트 실패:", error);
          });
        return { ...item, good: updatedGood };
      }
      return item;
    });
    setCommunityList(updatedItemList);
    setFilteredCommunityList(updatedItemList);
  };

  // 댓글 목록 불러오기
  useEffect(() => {
    axios
      .get(`/communityComments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // 카테고리 필터링 함수
  const filterByCategory = (selectedCategory) => {
    setActiveCategory(selectedCategory);
    if (selectedCategory === "전체") {
      setFilteredCommunityList(communityList);
    } else {
      const filteredList = communityList.filter(
        (item) => item.category === selectedCategory
      );
      setFilteredCommunityList(filteredList);
    }
  };

  // 검색어로 필터링하는 함수
  const handleSearch = () => {
    const filteredList = communityList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCommunityList(filteredList);
  };

  // 검색어가 변경될 때마다 필터링 업데이트
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredCommunityList(communityList);
    } else {
      handleSearch();
    }
  }, [searchQuery, communityList]);

  return (
    <ItemTitle>
      <Category>
        {category.map((item, index) => (
          <CategoryBtn
            key={index}
            $active={activeCategory === item.name}
            onClick={() => filterByCategory(item.name)}
          >
            <CategoryImg src={item.src} alt={item.name} />
            {item.name}
          </CategoryBtn>
        ))}
      </Category>
      <Col>
        <SearchBarWrap>
          <SearchInputWrap>
            <SearchInput
              type="text"
              placeholder="검색어 입력"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon onClick={handleSearch} />
          </SearchInputWrap>
          <WriteBtn
            onClick={() => {
              navigate("/community/write");
            }}
          >
            글 작성
          </WriteBtn>
        </SearchBarWrap>
      </Col>
      <RowLi>
        {filteredCommunityList.map((item) => (
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
                작성자: {userNicknames[item.user] || ""}
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
  padding: 64px 0 80px;
  display: flex;
  flex-direction: column;
`;
const Col = styled.div`
  width: 100%;
  padding: 0 18px;
`;

const SearchBarWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  width: 100%;
`;

const SearchInputWrap = styled.div`
  position: relative;
  width: 200px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 0px 8px 12px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #888;
    font-size: 12px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 10px;
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
`;
const Category = styled.div`
  width: 100%;
  height: 83px;
  margin-bottom: 10px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffefef;
`;
const CategoryBtn = styled.div`
  display: flex;
  font-size: 13px;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? "1" : "0.5")};
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
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 0 20px;
  gap: 20px;
`;
const Lists = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 50px;
`;
const ListImg = styled.img`
  width: 60px;
  height: 60px;
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
  margin-left: 5px;
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
  justify-content: space-between;
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
  margin-bottom: 1px;
`;
const Comment1 = styled(IoChatbubbleEllipsesOutline)`
  font-size: 16px;
  margin-left: 10px;
`;
