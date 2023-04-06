package com.example.mdbookcreator;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;

public class Main {

    public static void main(String[] args) throws IOException {

        System.out.println("Current working directory: " + System.getProperty("user.dir"));

        BookCreator bookCreator = new BookCreator();

        ArrayList<Book> books = bookCreator.createBooks();

        CreateDirectory.createDirectoriesFromBooksList(bookCreator);

        try {
            TomlGenerator tomlGenerator = new TomlGenerator("template.toml");
            tomlGenerator.generateTomlFiles(books);
        } catch (IOException e) {
            System.err.println("Ocorreu um erro ao ler ou escrever um arquivo: " + e.getMessage());
        }


        CopyDirectory.copy(Paths.get("example/.github"), Paths.get("output/.github"));
        CopyDirectory.copy(Paths.get("example/theme"), Paths.get("output/theme"));
        CopyDirectory.copy(Paths.get("example/home"), Paths.get("output"));

//        StringBuilder sb = new StringBuilder();
//        String htmlContent = sb.toString();
//        String filePath = "output/index.html";
//        IndexGenerator.saveToFile(htmlContent, filePath);

        // TODO: Generate the mdbook format and publish it to Github Pages using Github
        // Actions
    }
}