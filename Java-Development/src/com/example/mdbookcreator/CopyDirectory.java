package com.example.mdbookcreator;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class CopyDirectory {
    public static void copy(Path sourceDirectory, Path targetDirectory) throws IOException {
        Files.walk(sourceDirectory)
                .forEach(source -> {
                    Path target = targetDirectory.resolve(sourceDirectory.relativize(source));
                    try {
                        Files.copy(source, target);
                    } catch (IOException e) {
                        System.err.println("Failed to copy " + source + " to " + target + ": " + e.getMessage());
                    }
                });
    }
}
