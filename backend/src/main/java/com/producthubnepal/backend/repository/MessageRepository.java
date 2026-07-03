package com.producthubnepal.backend.repository;

import com.producthubnepal.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    // Custom query to fetch messages in reverse chronological order (newest first)
    List<Message> findAllByOrderBySubmittedAtDesc();
}