package com.osabros.welcomeDesk.serivce.impl;

import com.osabros.welcomeDesk.serivce.ValidationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ValidationServiceImpl implements ValidationService {
    @Override
    public void validateUserQuestion(String question) {
        log.info("Validating user question: '{}'", question);
        if (question == null || question.trim().isEmpty() || !containsValidCharacters(question)) {
            log.error("Constraint violation: Question cannot be null, empty, or contain invalid characters. Received: '{}'", question);
            throw new IllegalArgumentException("Question cannot be null or empty.");
        }
    }

    private boolean containsValidCharacters(String question) {
        return question.matches("^[a-zA-Z0-9 .,!?]+$");
    }
}
