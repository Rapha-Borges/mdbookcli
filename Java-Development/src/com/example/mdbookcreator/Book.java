package com.example.mdbookcreator;

import java.util.ArrayList;
import java.util.List;

public class Book {
    private String title;
    private String author;
    private String description;
    private String language;
    private List<Chapter> chapters;
    private String githubRepo;
    private String cname;
    private int numChapters;

    public Book(String author, String title, String description, String language, int numChapters, String githubRepo, String cname) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.language = language;
        this.chapters = new ArrayList<>(numChapters);
        this.githubRepo = githubRepo;
        this.cname = cname;
    }
    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = String.valueOf(language);
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void addChapter(Chapter chapter) {
        chapters.add(chapter);
    }

    public String getGithubRepo() {
        return githubRepo;
    }

    public String getCname() {
        return cname;
    }

    public int getNumChapters() {
        return this.numChapters;
    }

}