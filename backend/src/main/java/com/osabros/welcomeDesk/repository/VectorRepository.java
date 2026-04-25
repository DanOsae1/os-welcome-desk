package com.osabros.welcomeDesk.repository;

import com.osabros.welcomeDesk.exception.DocumentSaveError;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.ExtractedTextFormatter;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.pdf.config.PdfDocumentReaderConfig;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class VectorRepository {

    private final VectorStore vectorStore;
    private final ResourceLoader resourceLoader;

    public void saveFile(String fileName) throws DocumentSaveError {
        try {
            log.info("Saving vector file {}", fileName);
            Resource resource = resourceLoader.getResource("classpath:" + fileName);

            List<Document> documentReader = getDocumentsFromPdf(resource);

            log.info("Reading vector file {}", fileName);
            List<Document> documents = split((documentReader));

            log.info("Ingesting {} chunks from '{}'", documents.size(), fileName);
            vectorStore.accept(documents);
            log.info("File '{}' saved successfully to vector store.", fileName);
        } catch (Exception e) {
            log.error("Error saving file '{}' to vector store: {}", fileName, e.getMessage());
            throw new DocumentSaveError(e);
        }
    }

    private List<Document> getDocumentsFromTika(Resource resource) throws DocumentSaveError {
        TikaDocumentReader documentReader = new TikaDocumentReader(resource);
        return documentReader.read();
    }

    private List<Document> getDocumentsFromPdf(Resource resource) throws DocumentSaveError {
        PagePdfDocumentReader pdfReader = new PagePdfDocumentReader(resource,
                PdfDocumentReaderConfig.builder()
                        .withPageTopMargin(0)
                        .withPageExtractedTextFormatter(ExtractedTextFormatter.builder()
                                .withNumberOfTopTextLinesToDelete(0)
                                .build())
                        .withPagesPerDocument(1)
                        .build());
        return pdfReader.read();
    }

    private List<Document> split(List<Document> documents) {
        TokenTextSplitter splitter = TokenTextSplitter.builder()
                .withChunkSize(50)
                .withMinChunkSizeChars(1)
                .withMinChunkLengthToEmbed(1)
                .withMaxNumChunks(100000)
                .withKeepSeparator(true)
                .build();

        return splitter.apply(documents);
    }

    @PostConstruct
    public void init() {
        long start = System.currentTimeMillis();
        try {
            saveFile("DanielCV2026.pdf");
            long end = System.currentTimeMillis();
            log.info("Vector store in {} ms", end - start);
        } catch (Exception e) {
            log.error("Error initializing vector store {}", e.getMessage());
            throw new RuntimeException("Could not initialize vector store", e);
        }
        log.info("Vector store initialised in {} ms", System.currentTimeMillis() - start);
    }

}
