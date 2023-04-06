package com.example.mdbookcreator;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class BookCreator {
    private final Scanner scanner;
    private List<Book> books;

    public BookCreator() {
        scanner = new Scanner(System.in);
        this.books = new ArrayList<>();
    }

    public ArrayList<Book> createBooks() {
        // Prompt the user for the number of languages for the book
        System.out.println("To begin, enter the number of languages you want to create for the book.");
        int numLanguages = scanner.nextInt();
        scanner.nextLine();

        // Ask the first questions
        System.out.println("Author:");
        String author = scanner.nextLine();
        System.out.println("Number of chapters:");
        int numChapters = scanner.nextInt();
        scanner.nextLine();
        System.out.println("Github repo:");
        String githubRepo = scanner.nextLine();
        System.out.println("Cname:");
        String cname = scanner.nextLine();

        // Loop through each language and create a book
        for (int i = 1; i <= numLanguages; i++) {
            // Prompt the user for the book details
            System.out.println("Now enter the details for language " + i + ".");
            System.out.println("Title:");
            String title = scanner.nextLine();
            System.out.println("Description:");
            String description = scanner.nextLine();
            System.out.println("Language:");
            String language = scanner.nextLine();

            // Create a new book and add it to the array list
            Book book = new Book(author, title, description, language, numChapters, githubRepo, cname);
            books.add(book);
        }

        return (ArrayList<Book>) books;
    }

    public List<Book> getBooks() {
        return this.books;
    }
}
