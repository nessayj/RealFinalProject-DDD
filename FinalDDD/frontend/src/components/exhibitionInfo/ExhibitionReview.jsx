import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import DDDApi from "../../api/DDDApi";
import Backdrop from "@mui/material/Backdrop";
import PageNation from "../../util/PageNation";
import {RiUserHeartLine} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../util/ConfirmModal";
import AlertBlue from "../../util/AlertBlue";
import MessageForm from "../Message/MessageForm";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .reviewBox {
        width: 60%;
        margin: 1em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
       .rating{
        display: flex;
        justify-content: left;
        margin: 0;
       }
        .textBox{
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin: 0;
        }
        input{
            width: 15rem;
            height: 1.5rem;
            margin-right: 0.5rem;
            border-radius: 0.3rem;

        }
        button {
            margin: 0;
            padding:0;
            width: 50px;
            border: none;
            border-radius: .5rem;
            background-color:#050E3D;
            color:  white;
            font-size: 0.8rem;
            font-weight: bold;
            height: 2rem;
        }
    }
    .review{
        width: 80%;
    }

    @media (max-width: 768px) {
      .reviewBox{
        flex-direction: column;
        margin: 0;
      .textBox{
        width: 100vw;
        margin-top: 1rem;
      }
        input{
          width: 80%;
        }
        button{
          margin: 0;
          width: 2rem;
          background-color: transparent;
          color: #050E3D;
        }
    }
  }

`;

const Review = styled.div`
    background-color: #F4F8FF;
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    margin: 1rem;
    padding: 1em;


    img{
        border-radius: 10rem;
        width: 5rem;
        height: 5rem;
        background-color: gray;
    }
    .memberInfo{
        margin-left: 3rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .name{
        margin-top: 0.5rem;
        font-weight: bold;
        font-size: 1rem;
    }
    .comment{
        font-size: 1rem;


    }
    .imgContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        cursor: pointer;
    }
    .hoverContent {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 1;
    cursor: pointer;

    p {
      margin: 0;
      cursor: pointer;
    }
    }
`;


const ExhibitionReview = ({ data }) => {
    const navigate = useNavigate();
    const getId = window.localStorage.getItem("memberId");
    const isLogin = window.localStorage.getItem("isLogin");
    const exhibitNo = data.exhibitNo;

    // 별점
    const [stars, setStars] = useState(0);

    // 한줄평
    const [comment, setComment] = useState("");
    const handleCommentChange = (e) => {
      const newComment = e.target.value;
      setComment(newComment);
    };

    // 확인 모달
    const [openModal, setOpenModal] = useState(false);
    const openToModal = () => {
        setOpenModal(true);
    }

    const closeToModal = () => {
        setOpenModal(false);
    }
    // 한줄평작성
    const handleToComment = async () => {
      if (comment.trim() === "") {
        return; // 빈 문자열이면 함수 종료
      }
      // 로그인이 안되어있으면 로그인 모달띄움
      if (!isLogin) {
        openToWarnModal();
        return;
      }
      const result = await DDDApi.writeExhibitComment(getId, exhibitNo, stars, comment);
      const isOk = result.data;
      if (isOk) {
        setOpenModal(true);
        comments(); // 작성 후 한줄평 리스트초기화
        setTimeout(() => {
          setComment(""); // 한줄평 내용 초기화
          setOpenModal(false);
          setStars(0); // 별점 초기화
        }, 1000); // 0.8초 후에 모달을 닫음
      }
    };

    // 한줄평리스트
    const [commentList, setCommentList] = useState([]);
    const comments = async () => {
      try {
        const commentsList = await DDDApi.commentList(exhibitNo);
        setCommentList(commentsList.data);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      comments();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault(); // 폼의 기본 동작 막기
      await handleToComment(); // 한줄평 작성
    };

    // 페이지네이션
    //보여질 페이지 개수
    const ITEMS_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const pageCount = Math.ceil(commentList.length / ITEMS_PAGE); // 전체 페이지 수
    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = commentList.slice(offset, offset + ITEMS_PAGE);

    // 로그인 경고모달
    const [warnModal, setWarnModal] = useState(false);
    const openToWarnModal = () => {
      setWarnModal(true);
    }
    const closeWarnModal = () => {
      setWarnModal(false);
    }
    const goToLogin = () => {
      navigate("/login");
    }

    // 다른 멤버에게 쪽지보내기 또는 프로필 보기메뉴
    const [isHovered, setIsHovered] = useState(false);

    const openProfile = (memberId) => {
       // 로그인이 안되어있으면 로그인 모달띄움
      if (!isLogin) {
      setIsHovered(false);
      openToWarnModal();
      return;
    }
      navigate(`/mypage/${memberId}`);
    };

    const handleMouseEnter = () => {
      setIsHovered(!isHovered);
    };

    // 쪽지보내기로 props 보내기
    const [openMsg, setOpenMsg] = useState(false);
    const [receiver, setReceiver] = useState('');
    const [receiverName, setReceiverName] = useState('');


    const openToMsg = (receiverId, receiverName) =>{
      // 로그인이 안되어있으면 로그인 모달띄움
    if (!isLogin) {
      setIsHovered(false);
      openToWarnModal();
      return;
    }

      setIsHovered(false);
      setOpenMsg(true);
      setReceiver(receiverId);
      setReceiverName(receiverName);
    }
    const closeToMsg = () => {
      setOpenMsg(false);
    }



    const props = {
      icon: <RiUserHeartLine color="#FF69B4"/>,
      body:(
        <>
        <p>로그인 후 이용가능합니다🥺</p>
        <p style={{fontSize: "0.9rem"}}>확인을 누르시면 로그인페이지로 이동합니다.</p>
        </>
      ),
      button: [
        <button onClick={goToLogin}>확인</button>,
        <button onClick={closeWarnModal}>취소</button>
      ]

    }
    return (
      <Container>
        {openMsg && <MessageForm senderId={getId} receiverId={receiver} receiverName={receiverName} close={closeToMsg}/>}
        {openModal &&
        <Backdrop
        sx={{
            backgroundColor: 'transparent',
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            top: 0, // 팝업을 상단에 위치
        }}
        open={openToModal}
        onClick={closeToModal}
        >
            <AlertBlue />
        </Backdrop>
        }
        {warnModal && <ConfirmModal props={props}/>}
        <div className="reviewBox">
          <div className="rating">
            <Stack spacing={1}>
              <Rating
                name="half-rating"
                value={stars}
                onChange={(e, newValue) => {
                  setStars(newValue);
                }}
                precision={0.5}
              />
            </Stack>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="textBox">
              <input
                type="text"
                value={comment}
                placeholder="한줄평을 남겨보세요!"
                onChange={handleCommentChange}
              />
              <button type="submit">
                입력
              </button>
            </div>
          </form>
        </div>
        <div className="review">
          {currentPageData.map((e) => (
            <Review key={e.commentNo}>
              <div className="imgContainer">
              <img
              src={e.memberPic}
              alt=""
              onClick={handleMouseEnter}
            />
            {isHovered && (
              <div className="hoverContent">
                <p onClick={() => openToMsg(e.memberId, e.memberName)}>쪽지보내기</p>
                <p onClick={() => openProfile(e.memberId)}>프로필보기</p>
              </div>
            )}

                <div className="name">{e.memberName}</div>
              </div>

              <div className="memberInfo">
                <Rating name="read-only" value={e.starRates} readOnly />
                <div className="comment">{e.comment}</div>

              </div>
            </Review>
          ))}
        </div>
        <PageNation pageCount={pageCount} onPageChange={handlePageClick} selected={currentPage+1}  />
      </Container>
    );
  };

  export default ExhibitionReview;
