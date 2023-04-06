package com.example.mdbookcreator;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class TomlGenerator {
    private String tomlTemplatePath;

    public TomlGenerator(String tomlTemplatePath) {
        this.tomlTemplatePath = tomlTemplatePath;
    }

    public void generateTomlFiles(List<Book> books) throws IOException {
        String tomlTemplate = readFile(tomlTemplatePath);
        for (Book book : books) {
            String tomlContent = tomlTemplate
                    .replaceAll("\\{\\{author\\}\\}", book.getAuthor())
                    .replaceAll("\\{\\{title\\}\\}", book.getTitle())
                    .replaceAll("\\{\\{description\\}\\}", book.getDescription())
                    .replaceAll("\\{\\{language\\}\\}", book.getLanguage())
                    .replaceAll("\\{\\{githubRepo\\}\\}", book.getGithubRepo())
                    .replaceAll("\\{\\{cname\\}\\}", book.getCname());
            String filename = "book.toml";
            String language = book.getLanguage();
            writeToFile(tomlContent, language, filename);
        }
    }

    private String readFile(String path) throws IOException {
        Path filePath = Paths.get(path);
        byte[] fileBytes = Files.readAllBytes(filePath);
        return new String(fileBytes);
    }

    private void writeToFile(String content, String language, String filename) throws IOException {
        Path directoryPath = Paths.get("output", language);
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }
        Path filePath = directoryPath.resolve(filename);
        Files.write(filePath, content.getBytes());
    }


}
