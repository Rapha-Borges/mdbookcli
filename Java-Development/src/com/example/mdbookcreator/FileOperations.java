package com.example.mdbookcreator;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class FileOperations {
    private final String language;
    private final ArrayList<Book> books;

    public FileOperations(ArrayList<Book> books) {
        this.books = books;
        this.language = books.get(0).getLanguage();
    }

    public void createDirectories() {
        // Create the output directory if it doesn't exist
        File outputDirectory = new File("output");
        if (!outputDirectory.exists()) {
            if (!outputDirectory.mkdir()) {
                System.out.println("Output directory creation failed.");
                return;
            }
        }

        // Loop through all books
        for (Book book : books) {
            String language = book.getLanguage();
            int numChapters = book.getChapters().size();

            // Create the language directory if it doesn't exist
            File languageDirectory = new File("output/" + language);
            if (!languageDirectory.exists()) {
                if (!languageDirectory.mkdir()) {
                    System.out.println("Language directory creation failed.");
                    return;
                }
            }

            // Create the chapters directory for each book
            for (int i = 0; i < numChapters; i++) {
                Chapter chapter = book.getChapters().get(i);

                File chapterDirectory = new File("output/" + language + "/chapter" + (i + 1));
                if (!chapterDirectory.exists()) {
                    if (!chapterDirectory.mkdir()) {
                        System.out.println("Failed to create chapter directory: chapter " + (i + 1));
                        return;
                    }
                }

                // Create the images directory for each chapter
                File chapterFile = new File("output/" + language + "/chapter" + (i + 1) + "/chapter.md");
                try {
                    FileWriter writer = new FileWriter(chapterFile);
                    writer.write(chapter.getContent());
                    writer.close();
                } catch (IOException e) {
                    System.out.println("Failed to create chapter file: chapter " + (i + 1));
                    e.printStackTrace();
                }

                // Create the files directory for each chapter
                File filesDirectory = new File("output/" + language + "/chapter" + (i + 1) + "/files");
                if (!filesDirectory.exists()) {
                    if (!filesDirectory.mkdir()) {
                        System.out.println("Files directory creation failed.");
                        return;
                    }
                }

                // Create the README.md file for each chapter
                File readmeChapterFile = new File("output/" + language + "/chapter" + (i + 1) + "/README.md");
                try {
                    if (!readmeChapterFile.createNewFile()) {
                        System.out.println("File already exists: " + readmeChapterFile.getName());
                    }
                } catch (IOException e) {
                    System.out.println("Failed to create file: " + readmeChapterFile.getName());
                    e.printStackTrace();
                }

                // Create the SUMMARY.md file for each chapter
                File summaryChapterFile = new File("output/" + language + "/chapter" + (i + 1) + "/SUMMARY.md");
                try {
                    if (!summaryChapterFile.createNewFile()) {
                        System.out.println("File already exists: " + summaryChapterFile.getName());
                    }
                } catch (IOException e) {
                    System.out.println("Failed to create file: " + summaryChapterFile.getName());
                    e.printStackTrace();
                }
            }

            // Create the SUMMARY.md file
            File summaryFile = new File("output/" + language + "/SUMMARY.md");
            try {
                if (!summaryFile.createNewFile()) {
                    System.out.println("File already exists: " + summaryFile.getName());
                }
            } catch (IOException e) {
                System.out.println("Failed to create file: " + summaryFile.getName());
                e.printStackTrace();
            }

            // Create the README.md file
            File readmeFile = new File("output/" + language + "/README.md");
            try {
                if (!readmeFile.createNewFile()) {
                    System.out.println("File already exists: " + readmeFile.getName());
                }
            } catch (IOException e) {
                System.out.println("Failed to create file: " + readmeFile.getName());
                e.printStackTrace();
            }

            // Create the BOOKSUMMARY.md file
            File booksummaryFile = new File("output/" + language + "/BOOKSUMMARY.md");
            try {
                if (!booksummaryFile.createNewFile()) {
                    System.out.println("File already exists: " + booksummaryFile.getName());
                }
            } catch (IOException e) {
                System.out.println("Failed to create file: " + booksummaryFile.getName());
                e.printStackTrace();
            }

            // Create the README.md file inside the chapters directory
            for (int i = 1; i <= numChapters; i++) {
                File chapterFile = new File("output/" + language + "/src/chapter" + i + "/README.md");
                try {
                    if (!chapterFile.createNewFile()) {
                        System.out.println("File already exists: " + chapterFile.getName());
                    }
                } catch (IOException e) {
                    System.out.println("Failed to create file: " + chapterFile.getName());
                    e.printStackTrace();
                }
            }
        }
    }
}
    
