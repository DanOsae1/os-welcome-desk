package com.osabros.welcomeDesk.service;

import reactor.core.publisher.Flux;

public interface AskService {

    Flux<String> answerQuestionStream(String question);

    String answerQuestion(String question);
}
