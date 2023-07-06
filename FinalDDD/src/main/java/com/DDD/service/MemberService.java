package com.DDD.service;

import com.DDD.dto.MemberDto;
import com.DDD.entity.Member;
import com.DDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;


    // 이메일 중복 체크
    public boolean emailDupCk(String email) {
        return memberRepository.findByEmail(email).isEmpty();
    }

    // 닉네임 중복 체크
    public boolean nicknameDupCk(String nickname) {
        return memberRepository.findByNickname(nickname).isEmpty();
    }

    // 회원 정보 조회
    public MemberDto getMemberInfo(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        MemberDto memberDto = new MemberDto();

        memberDto.setEmail(member.getEmail());
        memberDto.setId(Long.valueOf(member.getId()));
        memberDto.setName(member.getName());
        memberDto.setTel(member.getTel());
        memberDto.setNickname(member.getNickname());
        memberDto.setInstagram(member.getInstagram());
        memberDto.setIntroduce(member.getIntroduce());
        memberDto.setBackgroundImg(member.getBackgroundImg());
        memberDto.setProfileImg(member.getProfileImg());

        return memberDto;
    }

    // 닉네임 변경
    public boolean newNickname(Long id, String nickname) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setNickname(nickname);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }

    // 이름 변경
    public boolean newName(Long id, String name) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setName(name);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }

    // 연락처 변경
    public boolean newTel(Long id, String tel) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setTel(tel);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }
    // 인스타그램 변경
    public boolean newInstagram(Long id, String instagram) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setInstagram(instagram);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }
    // 소개글 변경
    public boolean newIntroduce(Long id, String introduce) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setIntroduce(introduce);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }

    // 회원 탈퇴
    public Map<String, String> memberDelete(String email, String password){
        Map<String ,String> map = new HashMap<>();
        Optional<Member> member= memberRepository.findByEmail(email);
        if (member.isEmpty()) {
            map.put("memberDelete", "Nothing to delete.");
            return map;
        }
        if(passwordEncoder.matches(password, member.get().getPassword())){
            member.get().setActive(false);
            Member savedMember = memberRepository.save(member.get());
            log.info(savedMember.toString());
            map.put("memberDelete", "Deleted successfully");
            return map;
        }
        map.put("memberDelete", "Delete is Failed");
        return map;
    }



}