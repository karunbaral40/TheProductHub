package com.producthubnepal.backend.controller;

import com.producthubnepal.backend.entity.Message;
import com.producthubnepal.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*") // Allows access from any frontend origin configuration
public class MessageRestController {

    @Autowired
    private MessageRepository messageRepository;

    /**
     * Submit an inbound message from the contact form
     * POST http://localhost:8080/api/messages
     */
    @PostMapping
    public ResponseEntity<Message> submitMessage(@RequestBody Message message) {
        try {
            Message savedMessage = messageRepository.save(message);
            return new ResponseEntity<>(savedMessage, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetch all client messages for the admin panel dashboard
     * GET http://localhost:8080/api/messages
     */
    @GetMapping
    public ResponseEntity<List<Message>> getAllMessages() {
        List<Message> messages = messageRepository.findAllByOrderBySubmittedAtDesc();
        if (messages.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    /**
     * Purge a specific message card from the ledger
     * DELETE http://localhost:8080/api/messages/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMessage(@PathVariable("id") Long id) {
        try {
            if (!messageRepository.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            messageRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}