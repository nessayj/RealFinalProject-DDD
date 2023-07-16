import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {HiOutlineTicket} from 'react-icons/hi';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import SwipeableTemporaryDrawer from "../header/newNavi";
import Badge from '@mui/material/Badge';
import DDDApi from "../../api/DDDApi";

const IconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;


    .ticket-icon,  .login-icon {
        margin: 0.3rem 0.8rem 0.3rem;
        font-size: 1.5rem;
        border-radius: 2rem;
        /* background-color: red; */
        height: 2.4rem;
        width: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;
        transition: all 0.1s ease-in;
    }

    .login-icon,  .logout {
        display: flex;
        flex-direction: column;
        margin: 0;

        img{
            width: 100%;
            height: 100%;
            border-radius: inherit;
        }
    }
    /* .ticket-icon:hover, .navi:hover, .login-icon:hover{
        background-color: #f4f8ff;
        height: 2.4rem;
        width: 2.4rem;
    } */


    @media (max-width: 768px) {
        .ticket-icon,
        .login-icon {
            height: 40px;
            width: 40px;
            font-size: 1.4rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: inherit;
            }
        }
    }
`;
const LoginIconBox = styled.div`
  justify-content: center;
  margin: 0.3rem 0.8rem 0 0.3rem;
  /* background-color: red; */

  .logout {
    margin-top: 1rem;
    display: none;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
    font-weight: bold;
    background-color: #5eadf7;
    text-align: center;
    cursor: pointer;
  }

  &:hover .logout {
    display: block;
  }
`;



const Icons = () => {
    const { profileImg } = useStore();
    const loginState = window.localStorage.getItem("isLogin");
    const getId = window.localStorage.getItem("memberId");
    // 오늘 예약 건수 계산
    const [todayBookingCnt, setTodayBookingCnt] = useState(0);

    // console.log(profileImg)
    // console.log(loginState)

    const navigate = useNavigate();

    const onClickToLogin = () => {
        navigate("/login");
    }


    const removeLocalstorage = () =>{
        localStorage.removeItem("isLogin");
        localStorage.removeItem("storageEmail");
        localStorage.removeItem("memberId");
        localStorage.removeItem("accessToken");
        navigate('/')
    }

    useEffect(() => {
        const reservations = async () => {
          try {
            const reservationList = await DDDApi.myBookedList(getId);

            // 오늘 날짜와 일치하는 예약 건 수 계산
            const today = new Date().toISOString().split("T")[0];
            const todayBookings = reservationList.data.filter(
              (booking) => booking.bookingDate === today
            );
            setTodayBookingCnt(todayBookings.length);
            console.log("오늘예약한 에약건수 : " + todayBookings.length)
          } catch (e) {
            console.log(e);
          }
        };

        reservations();
      }, []);



    return (

        <IconBox>
            <div className="ticket-icon">
                {loginState ? (<Badge badgeContent={todayBookingCnt} color="primary" showZero>
                    <HiOutlineTicket/>
                </Badge>) : (<HiOutlineTicket/>) }
            </div>

        <LoginIconBox>
            <div className="login-icon" onClick={onClickToLogin}>
                    {loginState ?  (<img src={profileImg} alt="😫" />) : (<BsPersonCircle/>)}
                    {/* {loginState ?
                    (<img src="https://firebasestorage.googleapis.com/v0/b/real-final-project-ddd.appspot.com/o/%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84.png?alt=media&token=7d664c18-037d-4e60-9415-32f26fb0d430" alt="😫" />) :
                    (<FcDecision/>)} */}

                </div>

                    { loginState ?
                    <div className="logout" onClick={removeLocalstorage}>
                        {/* <FcDecision/> */}
                        로그아웃 </div> : null}
        </LoginIconBox>




            <div className="navi">
{/*                 <NavigateBar/> */}
                <SwipeableTemporaryDrawer/>
            </div>
        </IconBox>


    );
}

export default Icons;