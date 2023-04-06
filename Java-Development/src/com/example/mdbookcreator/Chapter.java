package com.example.mdbookcreator;


import java.util.ArrayList;
import java.util.List;

public class Chapter {
    private String title;
    private List<String> files;
    private List<String> images;
    private String content;

    public Chapter(String title) {
        this.title = title;
        this.files = new ArrayList<String>();
        this.images = new ArrayList<String>();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getFiles() {
        return files;
    }

    public void addFile(String file) {
        files.add(file);
    }

    public List<String> getImages() {
        return images;
    }

    public void addImage(String image) {
        images.add(image);
    }

    public String getContent() {
        return this.content;
    }
}
