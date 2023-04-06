package com.example.mdbookcreator;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class IndexGenerator {
    private int numLanguages;

    public void main(String[] args) {
        StringBuilder sb = null;
        for (int i = 0; i < numLanguages; i++) {
            System.out.print("Enter the language: ");
            Scanner scanner = new Scanner(System.in);
            String language = scanner.next();

            sb = new StringBuilder();

            // Adiciona o conteúdo inicial do arquivo HTML
            sb.append("<!DOCTYPE HTML>\n");
            sb.append("<html lang=\"en\">\n");
            sb.append("    <head>\n");
            sb.append("      <meta charset=\"UTF-8\">\n");
            sb.append("      <title>Choose a language</title>\n");
            sb.append("      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n");
            sb.append("      <meta name=\"description\" content=\"\">\n");
            sb.append("      <link rel=\"stylesheet\" href=\"CSS/style.css\">\n");
            sb.append("      <meta name=\"HandheldFriendly\" content=\"true\"/>\n");
            sb.append("      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\">\n");
            sb.append("      <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n");
            sb.append("      <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">\n");
            sb.append("      <link rel=\"apple-touch-icon-precomposed\" sizes=\"152x152\" href=\"gitbook/images/apple-touch-icon-precomposed-152.png\">\n");
            sb.append("      <link rel=\"shortcut icon\" href=\"gitbook/images/favicon.ico\" type=\"image/x-icon\">\n");
            sb.append("    </head>\n");
            sb.append("    <body>\n");
            sb.append("        <div class=\"container\">\n");
            sb.append("            <div class=\"book-langs-index\" role=\"navigation\">\n");
            sb.append("                <div class=\"inner\">\n");
            sb.append("                    <h1>Choose a language</h1>\n");
            sb.append("                </div>\n");
            sb.append("            </div>\n");
            sb.append("            <table>\n");

            // Adiciona o trecho com o idioma e bandeira correspondentes
            sb.append("                <tr>\n");
            sb.append("                    <td>\n");
            sb.append("                        <a href=\"" + language + "/\" class=\"btn\">\n");
            sb.append("                            <div class=\"card\">\n");
            switch (language) {
                case "pt":
                    sb.append("🇧🇷 Português-Brasileiro");
                    break;
                case "en":
                    sb.append("🇺🇸 English");
                    break;
                case "es":
                    sb.append("🇪🇸 Español");
                    break;
                default:
                    sb.append("Unknown language");
                    break;
            }

            sb.append("\n");
            sb.append("                            </div>\n");
            sb.append("                        </a>\n");
            sb.append("                    </td>\n");
            sb.append("                </tr>\n");
        }
        sb.append("            </table>\n");
        sb.append("        </div>\n");
        sb.append("    </body>\n");
        sb.append("</html>\n");

        saveToFile(sb.toString(), "output/index.html");

        System.out.println("index.html generated successfully.");
    }

    public static void saveToFile(String content, String filePath) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write(content);
        } catch (IOException e) {
            System.out.println("An error occurred while generating the file.");
            e.printStackTrace();
        }
    }

    public String generateIndex(ArrayList<Book> books) {
        return null;
    }
}