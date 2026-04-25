package com.osabros.welcomeDesk.config;


import io.github.bucket4j.Bucket;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

@Configuration
public class RateLimitConfig {

    @Bean
    public Bucket bucket() {
        return Bucket.builder()
                .addLimit(li -> li.capacity(20)
                        .refillIntervally(10, Duration.of(5, ChronoUnit.MINUTES)))
                .build();
    }

}
