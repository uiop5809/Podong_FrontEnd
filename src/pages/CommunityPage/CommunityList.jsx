import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../../apis/AxiosInstance";
import { images } from "../../components/Images";

const CommunityList = () => {
  const navigate = useNavigate();
  const [communityList, setCommunityList] = useState([]);
  const [filteredCommunityList, setFilteredCommunityList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("전체");
  const category = [
    { src: images.categoryAll, name: "전체" },
    { src: images.categoryFreedom, name: "자유" },
    { src: images.categoryDongNea, name: "동네" },
    { src: images.categoryExpert, name: "전문가" },
    { src: images.categoryAnonymity, name: "익명" },
    { src: images.categoryEvent, name: "이벤트" },
  ];

  // 게시글 목록 불러오기
  useEffect(() => {
    axios
      .get("/communities")
      .then((response) => {
        setCommunityList(response.data);
        setFilteredCommunityList(response.data);
        console.log("게시글 목록:", response.data);
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

  return (
    <ItemTitle>
      <Col>
        <CommunityText>고양이가 세상을 지배한다</CommunityText>
        <WriteBtn
          onClick={() => {
            navigate("/community/write");
          }}
        >
          글 작성
        </WriteBtn>
      </Col>
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
              <ListUser>작성자: {item.user}</ListUser>
              <ListDate>
                {new Date(item.createdAt).toLocaleDateString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}
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
const Col = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const CommunityText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 15px;
  font-weight: bold;
  color: #ff6e00;
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
  display: flex;
  justify-content: space-around;
  margin: 10px 0px 20px 0px;
  align-items: center;
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
