package com.osabros.welcomeDesk.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/download-cv")
@RestController
@RequiredArgsConstructor
@Slf4j
public class DownloadController {

    private final ResourceLoader resourceLoader;
    private static final String FILENAME = "DanielCV2026.pdf";

    @GetMapping
    public ResponseEntity<Resource> downloadFile() {
        Resource resource = resourceLoader.getResource("classpath:" + FILENAME);
        if (resource.exists()) {
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            log.error("Resource not found: " + FILENAME);
            return ResponseEntity.notFound().build();
        }
    }
}
