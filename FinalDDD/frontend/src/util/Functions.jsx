import axios from "axios";

const KH_DOMAIN = "http://localhost:8111"

// 이 프로젝트 전역에서 두루 쓰이는 함수를 모아놓았습니다.
const Functions = {
    getMemberId : () => {
      return window.localStorage.getItem("memberId")
    },
    getLoginStatus : () => {
      return window.localStorage.getItem("isLogin")
    },


    fetchMemberDate : async (memberId, setMemberData, MyPageApi) => {
      try {
        const memberInfoResponse = await MyPageApi.info(memberId);
        setMemberData(memberInfoResponse.data)
        if (memberInfoResponse.status === 200 && setMemberData){
        }
      } catch (e) {
        console.log(e);
      }
    },

    //accessToken 세터
    setAccessToken : (accessToken) => {
        window.localStorage.setItem("accessToken", accessToken);
      },
    //accessToken 게터
    getAccessToken : () => {
        // console.log('겟엑세스토큰함수 작동여부')
        // console.log( '2번째 줄 ' + window.localStorage.getItem("accessToken"))
        return window.localStorage.getItem("accessToken");
      },
    //refreshToken 세터
    setRefreshToken : (refreshToken) => {
        window.localStorage.setItem("refreshToken", refreshToken);
    },
    //refreshToken 게터
    getRefreshToken : () =>{
        return window.localStorage.getItem("refreshToken");
    },

    //  헤더에 AccessToken 설정하는 함수
    setAuthorizationHeader : () => {
        const accessToken = Functions.getAccessToken();
        // console.log('funtions 함수내 엑세스토큰 :  '+ accessToken)
        // const test1 = axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // console.log('test1입니다 ' + test1)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // const test2 = axios.defaults.headers.common['Content-Type'] = 'application/json';
        // console.log('test2입니다 ' + test2)
        axios.defaults.headers.common['Content-Type'] = 'application/json';

      },

    // 토큰 재발급 함수
    tokenRenewal: async() => {
        const token = {
          refreshToken : Functions.getRefreshToken()
        }
        const rsp = await axios.post(KH_DOMAIN + "/auth/token", token)
        Functions.setAccessToken(rsp.data.accessToken);
        Functions.setAuthorizationHeader();
      },

    // 401 에러시 토큰 재발급 함수 실행하는 함수
    handleApiError: async(error) => {
    //   if (error.response && error.response.status === 401) {
    //     // 토큰이 만료되었거나 유효하지 않은 경우
    //     await Functions.tokenRenewal();
    //   } else {
        // 그 외의 오류 처리
        console.error('API 요청 오류:', error);
        // window.location.href = '/login';
        // 에러 메시지를 표시하거나 기타 처리를 수행
    //   }
    }

}

export default Functions;