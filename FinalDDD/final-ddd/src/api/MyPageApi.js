import axios from "axios";
import Functions from "../util/Functions";
//const HEADER = { "Content-type": "application/json" };

const updateProfileField = async (memberId, fieldName, fieldValue) => {
    try {
      Functions.setAuthorizationHeader(); // 헤더에 토큰을 넣는 함수
      return await axios.post(`/mypage/${memberId}/${fieldName}`, {
        id: memberId,
        [fieldName]: fieldValue
      });
    } catch (error) {
      console.log("error입니다. ");
      // await Functions.handleApiError(error);  // api 에러 401을 받으면 로컬에 저장된 리프레쉬 토큰을 보내 액세스 토큰을 재발급 받는 axios 요청을 보내는 함수(await 필수)
      // return await axios.get(DDD_DOMAIN + `/mypage/info?email=${storageEmail}`); // 요청 재실행
    }
  };

const MyPageApi = {

    // 회원 정보 가져오기 
    info: async (memberId) => {
        try {
        Functions.setAuthorizationHeader(); // 헤더에 토큰을 넣는 함수
        return await axios.get(`/mypage/${memberId}`); // 요청 리턴
        } catch (error) {
        console.log("error입니다. ");
        }
    },

    // 정보 변경 닉네임 중복 체크
    nicknamedup: async (memberId, inputNick) => {
        const nicknamedupCheck = {
        nickname: inputNick,
        }
        return await axios.post( `/mypage/${memberId}/nicknamedup`, nicknamedupCheck);
    },

    // 닉네임 변경
    nickname: (memberId, inputNick) => updateProfileField(memberId, 'nickname', inputNick),

    // 이름 변경
    name: (memberId, inputName) => updateProfileField(memberId, 'name', inputName),

    // 연락처 변경
    tel: (memberId, inputTel) => updateProfileField(memberId, 'tel', inputTel),

    // 인스타그램 변경
    instagram: (memberId, inputInst) => updateProfileField(memberId, 'instagram', inputInst),

    // 소개글 변경
    introduce: (memberId, inputIntro) => updateProfileField(memberId, 'introduce', inputIntro),


    
};

const DiaryApi = {

    info: async (memberId) => {
        try {
        Functions.setAuthorizationHeader(); // 헤더에 토큰을 넣는 함수
        return await axios.get(`/mypage/${memberId}/diary`); // 요청 리턴
        } catch (error) {
        console.log("error입니다. ");
        }
    },


    save : async(memberId, exhibitNo, ratingStarValue, inputComment) => {
        ratingStarValue = parseFloat(ratingStarValue);

        try{
            const diaryCheck = {
                memberId : memberId,
                exhibitionNo : exhibitNo,
                comment : inputComment,
                rateStar : ratingStarValue
            }
            console.log(ratingStarValue)
            return await axios.post(`/mypage/${memberId}/diary/${exhibitNo}`, diaryCheck)

        } catch (error) {
            console.log("error입니다. ");
            
        }
    }, 
}

export {MyPageApi, DiaryApi};
