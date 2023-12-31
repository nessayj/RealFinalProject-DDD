package com.DDD.repository;

import com.DDD.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long > {
    List<Message> findAllByReceiverId(Long receiverId);
    List<Message> findAllBySenderId(Long senderId);
}
