import React, { useState } from "react";
import styled from "styled-components";
import BGItmes from "../components/Login/BGItmes";
import LoginModal from "../components/Login/loginModal";
import SignUpModal from "../components/Login/SignUpModal";
import ForgotPwModal from "../components/Login/ForgotPwModal";
import Agreement from "../components/Login/Agreement";
import PopupModal from "../components/Login/PopupModal";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
`;

const Login = () => {


    // showLogin이 1, 2, 3으로 변할 때 각자 modal창 보여줌
    const [showLogin, setShowLogin] = useState(0);
    
    const handleLoginModal0 = () => { // 로그인 창 + 뒤로가기
        setShowLogin(0);
        // console.log(showLogin)
      };
    const handleLoginModal1 = () => { // 비밀번호 찾기 창
        setShowLogin(1);
        // console.log(showLogin)
      };
    const handleLoginModal2 = () => { // 회원동의 창
        setShowLogin(2);
        // console.log(showLogin)
      };
    const handleLoginModal3 = () => { // 회원가입 창
        setShowLogin(3);
        // console.log(showLogin)
      };
    const handleLoginModal4 = () => { // 회원가입 완료 팝업
        setShowLogin(4);
        // console.log(showLogin)
      };

    return(
        <>
                <div>
                    <Container>
                        <BGItmes/>
                    </Container>
                    {showLogin === 0 && <LoginModal showPw={handleLoginModal1} showAgree={handleLoginModal2} />}
                    {showLogin === 1 && <ForgotPwModal showLogin={handleLoginModal0} />}
                    {showLogin === 2 && <Agreement showLogin={handleLoginModal0} showSignUp={handleLoginModal3} />}
                    {showLogin === 3 && <SignUpModal showLogin={handleLoginModal0} showPopup={handleLoginModal4} />}
                    {showLogin === 4 && <PopupModal showLogin={handleLoginModal0} />}
                </div>
        </>
    )
}

export default Login;