package com.example.mdbookcreator;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class CreateDirectory {
    private static final String BASE_OUTPUT_DIR = "output";

    public static void createDirectoriesFromBooksList(BookCreator bookCreator) throws IOException {
        for (Book book : bookCreator.getBooks()) {
            // Cria o diretório de saída base
            Path baseOutputDir = Paths.get(BASE_OUTPUT_DIR);
            Files.createDirectories(baseOutputDir);

            // Cria o diretório de saída do idioma
            Path languageDir = baseOutputDir.resolve(book.getLanguage());
            Files.createDirectories(languageDir);

            // Cria os diretórios de capítulos
            for (int i = 0; i < book.getNumChapters(); i++) {
                String chapterDirName = String.format("chapter-%d", i + 1);
                Path chapterDir = languageDir.resolve(chapterDirName);
                Files.createDirectories(chapterDir);
            }
        }
    }
}
