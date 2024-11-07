import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { VscAccount } from "react-icons/vsc";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import axios from "../../apis/AxiosInstance";

const PetItemDetailPage = () => {
  const { no } = useParams();
  const [itemDetail, setItemDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState({});
  const [itemUserNickname, setItemUserNickname] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const itemResponse = await axios.get(`/petItems/${no}`);
        setItemDetail(itemResponse.data);

        const userResponse = await axios.get(`/user/${itemResponse.data.user}`);
        setItemUserNickname(userResponse.data.nickname);
      } catch (error) {
        console.error("Error fetching item or user data:", error);
      }
    };

    const fetchComments = async () => {
      try {
        // 댓글 목록 가져오기
        const commentsResponse = await axios.get(
          `/petItemComments?petItem=${no}`
        );
        const relevantComments = commentsResponse.data.filter(
          (item) => item.petItem === parseInt(no)
        );
        setComments(relevantComments);

        // 댓글 작성자들의 유저 정보 가져오기
        const userIds = [...new Set(relevantComments.map((item) => item.user))];
        const userResponses = await Promise.all(
          userIds.map((userId) => axios.get(`/user/${userId}`))
        );

        const userMap = {};
        userResponses.forEach((response) => {
          userMap[response.data.userId] = response.data.nickname;
        });
        setUsers(userMap);
      } catch (error) {
        console.error("Error fetching comments or user data:", error);
      } finally {
        setLoading(false); // 모든 로딩 완료 후 로딩 상태 해제
      }
    };

    setLoading(true);
    fetchItemDetail();
    fetchComments();
  }, [no]);

  // 좋아요 수 증가 함수
  const good = () => {
    const updatedGood = itemDetail.good + 1;
    axios
      .put(`/petItems/${no}`, {
        ...itemDetail,
        good: updatedGood,
      })
      .then((response) => {
        setItemDetail((prevDetail) => ({ ...prevDetail, good: updatedGood }));
      })
      .catch((error) => {
        console.error("좋아요 업데이트 실패:", error);
      });
  };

  // 댓글 등록
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    axios
      .post("/petItemComments", {
        petItem: no,
        user: userId,
        comment: newComment,
      })
      .then((response) => {
        setNewComment("");
        return axios.get(`/petItemComments?petItem=${no}`);
      })
      .then((response) => {
        const relevantComments = response.data.filter(
          (item) => item.petItem === parseInt(no)
        );
        setComments(relevantComments);
      })
      .catch((error) => {
        console.error("댓글 등록 실패:", error);
      });
  };

  // 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <Container>
      <ItemTitle>
        <ListImg src={itemDetail.imageUrl} alt={itemDetail.imageUrl} />
        <ImgBt>
          <ImgNo>1 / 5</ImgNo>
        </ImgBt>
        <User1>
          <VscAccount1 />
          작성자: {itemUserNickname || ""}
        </User1>
        <Title>제목: {itemDetail.name}</Title>
        <Icons>
          <LikeCommentBox>
            <Like1
              onClick={() => {
                good();
              }}
            />
            {itemDetail.good || 0}
            <Comment1 />
            {comments.length}
          </LikeCommentBox>
          <div>
            <ListPrice>
              {itemDetail.price ? (
                `${itemDetail.price.toLocaleString()}원`
              ) : (
                <나눔>나눔</나눔>
              )}
            </ListPrice>
          </div>
        </Icons>
        <Contents>작성글: {itemDetail.description}</Contents>
        <Line />
        <CommentST>
          {comments.map((item) => (
            <div key={item.petItemCommentId}>
              <User2>
                <VscAccount1 />
                작성자: {users[item.user] || ""}
                <ListDate>
                  {new Date(item.createdAt).toLocaleDateString("ko-KR", {
                    timeZone: "Asia/Seoul",
                  })}
                </ListDate>
              </User2>
              <Comment>{item.comment}</Comment>
            </div>
          ))}
        </CommentST>
      </ItemTitle>
      <CommentFrom onSubmit={handleCommentSubmit}>
        <CommentCC
          type="text"
          name="comment"
          placeholder="댓글을 달아주세요."
          value={newComment}
          onChange={handleCommentChange}
          required
        />
        <CommentSubmit type="submit">등록</CommentSubmit>
      </CommentFrom>
    </Container>
  );
};

export default PetItemDetailPage;

const ItemTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 64px 25px 0px 25px;
`;

const ListImg = styled.img`
  width: 100%;
  height: 300px;
  background-color: #d9d9d9;
  border-radius: 10px;
  flex-shrink: calc(); /* 이미지 크기를 고정 */
  background-image: url(${(props) => props.src}); /* 이미지 URL 설정 */
  background-size: cover; /* 이미지를 채우도록 설정 */
  background-position: center; /* 이미지 중앙 정렬 */
`;
const ImgBt = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
`;
const ImgNo = styled.button`
  background-color: #8d8d8d;
  border-radius: 30px;
  font-size: 8px;
  color: white;
  border: 1px solid #8d8d8d;
  width: 35px;
  height: 20px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const User1 = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: 10px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  margin: 10px 0px 10px 0px;
`;
const ListPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  width: 100%;
  color: black;
`;
const 나눔 = styled.p`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  width: 100%;
  color: #ff6e00;
  justify-content: end;
`;
const Icons = styled.div`
  font-size: 16px;
  color: #8d8d8d;
  display: flex;
  justify-content: space-between;
`;
const Like1 = styled(FiHeart)`
  font-size: 16px;
  color: red;
`;
const Comment1 = styled(IoChatbubbleEllipsesOutline)`
  margin-left: 10px;
`;
const Contents = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Line = styled.div`
  border-top: 1px solid #ff6e00;
  margin: 10px 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LikeCommentBox = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  font-size: 14px;
`;

const CommentST = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const User2 = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  color: #333;
`;

const VscAccount1 = styled(VscAccount)`
  font-size: 18px;
  margin-right: 5px;
  color: #ff6e00;
  align-items: center;
  justify-content: center;
`;

const ListDate = styled.div`
  font-size: 10px;
  color: #888;
  margin-left: 10px;
`;

const Comment = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
`;

const CommentFrom = styled.form`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  bottom: 0px;
  margin-top: 10px;
  margin-bottom: 70px;
  padding: 0 20px;
`;

const CommentCC = styled.input`
  height: 40px;
  width: 100%;
  display: flex;
  border-style: none;
  outline: none;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 0px 15px;
  font-size: 14px;
  transition: background-color 0.3s ease;
  &:focus {
    background-color: #e6e6e6;
  }
`;

const CommentSubmit = styled.button`
  height: 40px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 0px 10px;
  cursor: pointer;
  background-color: #ff6e00;
  color: white;
  border: none;
  border-radius: 15px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e65c00;
  }
`;
