package com.DDD.controller;




import com.DDD.dto.MemberDto;
import com.DDD.dto.MessageDTO;
import com.DDD.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/message")
@RequiredArgsConstructor
public class MessageController {
    @Autowired
    private  final MessageService messageService;

    // 메세지 보내기
    @PostMapping("/sendMsg")
    public ResponseEntity<String> sendMsg(@RequestBody MessageDTO messageDTO) {
        String senderId = messageDTO.getSenderId();
        String receiverId = messageDTO.getReceiverId();
        String title = messageDTO.getTitle();
        String contents = messageDTO.getContents();

        boolean success = messageService.sendMessage(senderId, receiverId, title, contents);

        if (success) {
            return ResponseEntity.ok("메세지가 성공적으로 보내졌습니다🫶🏻");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("메세지 보내기에 실패하셨습니다😝😝");
        }

    }

    // 받은메세지 보기
    @GetMapping("/receiveMsgList")
    public List<MessageDTO> getAllReceiveMsg(@RequestParam("receiverId") String receiverId) {
        return messageService.receiveMessageList(receiverId);
    }

    // 보낸메세지 보기
    @GetMapping("/sendMsgList")
    public List<MessageDTO> getAllSendMsg(@RequestParam("senderId") String senderId) {
        return messageService.sendMessageList(senderId);
    }
}
