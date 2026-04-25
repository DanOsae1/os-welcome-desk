package com.osabros.welcomeDesk.serivce.impl;

import com.osabros.welcomeDesk.serivce.ValidationService;
import com.osabros.welcomeDesk.service.AskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
@Slf4j
public class AskServiceImpl implements AskService {

    private final ValidationService validationService;
    private final ChatClient ollamaChatClient;
    private final VectorStore vectorStore;
    private final SimpleLoggerAdvisor simpleLoggerAdvisor;


    @Override
    public Flux<String> answerQuestionStream(String question) {
        try {
            validationService.validateUserQuestion(question);

            return ollamaChatClient.prompt()
                    .system("""
                            You are a professional assistant representing Daniel Osae, a Senior Backend Engineer \
                            with 10 years of experience. Use the provided context from Daniel's CV to answer \
                            questions accurately and professionally about his career history, technical skills, \
                            education, certifications, and achievements. \
                            Speak in the third person about Daniel (e.g. "Daniel has..." or "Daniel's experience includes..."). \
                            If the answer cannot be found in the provided context, respond with \
                            "I don't have that information about Daniel."
                            
                            After every message 
                            """)
                    .user(question)
                    .advisors(QuestionAnswerAdvisor.builder(vectorStore)
                                    .searchRequest(SearchRequest.builder().similarityThreshold(0.2d).topK(100).build())
                                    .build(),
                            simpleLoggerAdvisor)
                    .stream()
                    .content();

        } catch (Exception e) {
            log.error("Error processing question: '{}'", question, e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public String answerQuestion(String question) {
        Prompt prompt = Prompt.builder()
                .content(question)
                .build();

        return ollamaChatClient.prompt(prompt)
                .advisors(QuestionAnswerAdvisor.builder(vectorStore)
                        .searchRequest(SearchRequest.builder().similarityThreshold(0.6d).topK(100).build())
                        .build())
                .call()
                .content();
    }
}
