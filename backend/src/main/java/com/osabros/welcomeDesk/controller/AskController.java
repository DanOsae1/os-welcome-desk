package com.osabros.welcomeDesk.controller;

import com.osabros.welcomeDesk.service.AskService;
import io.github.bucket4j.Bucket;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/ask")
@RequiredArgsConstructor
@Slf4j
public class AskController {

    private final AskService askService;
    private final Bucket bucket;

    @GetMapping
    public ResponseEntity<Flux<String>> getAnswer(@RequestParam("question") String question) {
        log.info("Received question: '{}'", question);
        if (bucket.tryConsume(1)) {
            return ResponseEntity.ok(askService.answerQuestionStream(question));
        } else {
            log.warn("Rate limit exceeded for question: '{}'", question);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Flux.just("Rate limit exceeded. Please try again later."));
        }
    }
}
