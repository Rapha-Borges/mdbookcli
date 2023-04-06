// Interactive CLI with  Node.js for create a book using a mdbook template

// Importing the modules
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const path = require('path');
const { exec } = require('child_process');
const readline = require('readline');
const { exit } = require('process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    { key: 'book_name', text: 'What is the name of your book?' },
    { key: 'book_author', text: 'What is the author of your book?' },
    { key: 'book_description', text: 'What is the description of your book?' },
    { key: 'book_chapters', text: 'How many chapters does your book have?' },
    { key: 'book_git', text: 'What is the git repository of your book?' },
    { key: 'book_language', text: 'What is the language of your book?' },
    { key: 'book_domain', text: 'Do you have a domain name for your book (Y/N)?' },
    { key: 'book_translations', text: 'Do you want to add translations to your book (Y/N)?' },
];

let responses = {};

// Functions

// Function to create a directory receiving a path as parameter that can be used to create a directory in any place
function createDirectory(path, dirname) {
    const directoryPath = `${path}/${dirname}`;
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
        console.log(`Directory '${dirname}' created in '${path}'`);
    } else {
        console.log(`Directory '${dirname}' already exists in '${path}'`);
    }
}

// Function to create a file receiving a path, a filename and a optional content as parameter that can be used to create a file in any place
function createFile(path, filename, content) {
    const filePath = `${path}/${filename}`;
    if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, content, function (err) {
            if (err) throw err;
            console.log(`File '${filename}' created in '${path}'`);
        });
    } else {
        console.log(`File '${filename}' already exists in '${path}'`);
    }
}

// Function to create the book.toml 
function createBookTomlFile() {
    fs.writeFile('output/book/book.toml', `[book]
authors = ["${responses.book_author}"]
language = "${responses.book_language}"
description = "${responses.book_description}"
multilingual = false
src = "src"
title = "${responses.book_name}"

[output.html]
git-repository-url = "${responses.book_git}"
edit-url-template = "${responses.book_git}/edit/main/pt/{path}"
CNAMES = ["${responses.book_domain_name}"]
additional-css = ["theme/css/style.css", "theme/css/mdbook-admonish.css"]
additional-js = ["theme/js/script.js"]

[output.html.search]
limit-results = 20
use-boolean-and = true
boost-title = 2
boost-hierarchy = 2
boost-paragraph = 1
expand = true
heading-split-level = 2

[preprocessor]

[preprocessor.admonish]
command = "mdbook-admonish"
assets_version = "2.0.0" # do not edit: managed by "mdbook-admonish install"

[output.html.fold]
enable = true    # whether or not to enable section folding
level = 0         # the depth to start folding
`, function (err) {
        if (err) throw err;
        console.log('book.toml file created');
    });
}

// Function to create the book.toml for multilingual books
function createBookTomlFileMultilingual() {
    fs.writeFile('output/book/book.toml', `[book]
authors = ["${responses.book_author}"]
language = "${responses.book_language}"
description = "${responses.book_description}"
multilingual = false
src = "src"
title = "${responses.book_name}"

[output.html]
git-repository-url = "${responses.book_git}"
edit-url-template = "${responses.book_git}/edit/main/pt/{path}"
CNAMES = ["${responses.book_domain_name}"]
additional-css = ["theme/css/style.css", "theme/css/mdbook-admonish.css"]
additional-js = ["theme/js/script.js"]

[output.html.search]
limit-results = 20
use-boolean-and = true
boost-title = 2
boost-hierarchy = 2
boost-paragraph = 1
expand = true
heading-split-level = 2

[preprocessor]

[preprocessor.admonish]
command = "mdbook-admonish"
assets_version = "2.0.0" # do not edit: managed by "mdbook-admonish install"
[output.html.fold]
enable = true    # whether or not to enable section folding
level = 0         # the depth to start folding`, function (err) {
        if (err) throw err;
        console.log('book.toml file created');
    });
}

// Function to copy directories
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function (entry) {
        var entry_src = path.join(src, entry);
        var entry_dest = path.join(dest, entry);
        if (fs.lstatSync(entry_src).isDirectory()) {
            copyDir(entry_src, entry_dest);
        } else {
            fs.copyFileSync(entry_src, entry_dest);
        }
    });
}

// Function to check if the files and folders were created
function checkFilesAndFolders() {
    // Check if the README.md file was created
    if (fs.existsSync('output/book/src/README.md')) {
        console.log('README.md file created');
    }

    // Check if the SUMMARY.md file was created
    if (fs.existsSync('output/book/src/SUMMARY.md')) {
        console.log('SUMMARY.md file created');
    }

    // Check if the BOOKSUMMARY.md file was created
    if (fs.existsSync('output/book/src/BOOKSUMMARY.md')) {
        console.log('BOOKSUMMARY.md file created');
    }

    // Check if the chapters folders were created
    for (let i = 0; i < responses.book_chapters; i++) {
        if (fs.existsSync(`output/book/src/chapter-${i + 1}`)) {
            console.log(`chapter-${i + 1} folder created`);
        }
    }

    // Check if the files folders were created
    for (let i = 0; i < responses.book_chapters; i++) {
        if (fs.existsSync(`output/book/src/chapter-${i + 1}/files`)) {
            console.log(`chapter-${i + 1}/files folder created`);
        }
    }

    // Check if the images folders were created
    for (let i = 0; i < responses.book_chapters; i++) {
        if (fs.existsSync(`output/book/src/chapter-${i + 1}/images`)) {
            console.log(`chapter-${i + 1}/images folder created`);
        }
    }

    // Check if the README.md files were created
    for (let i = 0; i < responses.book_chapters; i++) {
        if (fs.existsSync(`output/book/src/chapter-${i + 1}/README.md`)) {
            console.log(`chapter-${i + 1}/README.md file created`);
        }
    }

    // Check if the translations folder was created
    if (fs.existsSync('output/book/src/translations')) {
        console.log('translations folder created');
    }

    // Check if the translations language folder was created
    if (fs.existsSync(`output/book/src/translations/${responses.book_translations_language}`)) {
        console.log(`${responses.book_translations_language} folder created`);
    }

    // If the book.toml file was created run the function to finish the script
    if (fs.existsSync('output/book/book.toml')) {
        console.log('All files and folders created');
        finish();
    }

}

// Function to finish the process
function finish() {
    console.log(chalk.green('You can start writing your book!'));
    rl.close();
}

// Function to ask the all the firts questions. If the user answer 'Y' or 'y' to the question 'Do you have a domain name for your book (Y/N)?' and 'Do you want to add translations to your book (Y/N)?' the function will ask the next question 'What is the language of your translation?' and 'What is the book title of your translation?' and 'What is the book description of your translation?' and 'What is the domain name of your book?' and save the answers in the responses object whit the key 'book_translations_language' and 'book_translations_title' and 'book_translations_description' and 'book_domain_name' whit all the other answers inside the let responses = {}; object
function askQuestions() {
    return new Promise((resolve, reject) => {
        let question = questions.shift();
        rl.question(`${question.text} `, (answer) => {
            responses[question.key] = answer;
            if (question.key === 'book_domain') {
                if (answer === 'Y' || answer === 'y') {
                    rl.question(`What is the domain name of your book? `, (answer) => {
                        responses['book_domain_name'] = answer;
                        if (questions.length > 0) {
                            askQuestions().then(resolve);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    if (questions.length > 0) {
                        askQuestions().then(resolve);
                    } else {
                        resolve();
                    }
                }
            } else if (question.key === 'book_translations') {
                if (answer === 'Y' || answer === 'y') {
                    rl.question(`What is the language of your translation? `, (answer) => {
                        responses['book_translations_language'] = answer;
                        rl.question(`What is the book title of your translation? `, (answer) => {
                            responses['book_translations_title'] = answer;
                            rl.question(`What is the book description of your translation? `, (answer) => {
                                responses['book_translations_description'] = answer;
                                if (questions.length > 0) {
                                    askQuestions().then(resolve);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });
                } else {
                    if (questions.length > 0) {
                        askQuestions().then(resolve);
                    } else {
                        resolve();
                    }
                }
            } else {
                if (questions.length > 0) {
                    askQuestions().then(resolve);
                } else {
                    resolve();
                }
            }
        });
    });
}

// Function to create the book
function createBook() {
    // Create the output directory
    createDirectory('.', 'output');

    // Create the book directory
    createDirectory('output', 'book');

    // Create the directory for the language specified by the user
    createDirectory('output/book/', responses.book_language);

    // Create the src directory
    createDirectory('output/book', 'src');

    // Create the book.toml file
    if (responses.book_translations.toLowerCase() === 'y' || responses.book_translations.toLowerCase() === 'yes') {
        createBookTomlFileMultilingual();
    } else {
        createBookTomlFile();
    }

    // Create the number of characters folder specified by the user as characters
    for (let i = 0; i < responses.book_chapters; i++) {
        createDirectory('output/book/src', `chapter-${i + 1}`);
    }

    // Create the README.md files inside src/charapter${i} folder
    for (let i = 0; i < responses.book_chapters; i++) {
        createFile(`output/book/src/chapter-${i + 1}`, 'README.md', `# Chapter ${i + 1}`);
    }

    // Create the files folder inside src/charapter${i} folder
    for (let i = 0; i < responses.book_chapters; i++) {
        createDirectory(`output/book/src/chapter-${i + 1}`, 'files');
    }

    // Create the image folder inside src/charapter${i} folder
    for (let i = 0; i < responses.book_chapters; i++) {
        createDirectory(`output/book/src/chapter-${i + 1}`, 'images');
    }

    // Create the README.md file
    createFile('output/book/src', 'README.md', `# ${responses.book_name}`);

    // Create the SUMMARY.md file
    createFile('output/book/src', 'SUMMARY.md', `# Summary

- [About](README.md)`);

    // Create the BOOKSUMMARY.md file
    createFile('output/book/src', 'BOOKSUMMARY.md', `# Summary

- [About](README.md)`);

    // If the user wants to create a translation run this part of the script
    if (responses.book_translations.toLowerCase() === 'y' || responses.book_translations.toLowerCase() === 'yes') {
        // Create the translations language directory
        createDirectory('output/book/src/', responses.book_translations_language);

        // Create the translations language number of chapters folder specified by the user as characters
        for (let i = 0; i < responses.book_chapters; i++) {
            createDirectory(`output/book/src/${responses.book_translations_language}`, `chapter-${i + 1}`);
        }

        // Create the translations language files folder inside src/${language}/charapter${i} folder
        for (let i = 0; i < responses.book_chapters; i++) {
            createDirectory(`output/book/src/${responses.book_translations_language}/chapter-${i + 1}`, 'files');
        }

        // Create the translations language image folder inside src/${responses.book_translations_language}/charapter${i} folder
        for (let i = 0; i < responses.book_chapters; i++) {
            createDirectory(`output/book/src/${responses.book_translations_language}/chapter-${i + 1}`, 'images');
        }
        // Create the README.md file inside directory book/src/${responses.book_translations_language}
        createFile(`output/book/src/${responses.book_translations_language}`, 'README.md', `# ${responses.book_name}`);

        // Create the SUMMARY.md file at directory book/src/${responses.book_translations_language}
        createFile(`output/book/src/${responses.book_translations_language}`, 'SUMMARY.md', `# Summary

- [About](README.md)`);

        // Create the BOOKSUMMARY.md file at directory book/src/${responses.book_translations_language}
        createFile(`output/book/src/${responses.book_translations_language}`, 'BOOKSUMMARY.md', `# Summary

[About](README.md)`);

        // Create the translations language README.md files inside output/book/src/${language}/charapter${i} folder
        for (let i = 0; i < responses.book_chapters; i++) {
            createFile(`output/book/src/${responses.book_translations_language}/chapter-${i + 1}`, 'README.md', `# Chapter ${i + 1}`);
        }
    }
    // Copy the example/home folder to the / folder
    copyDir('example/home', 'output/home');

    // Copy the example/theme folder to the /book/theme folder
    copyDir('example/theme', 'output/book/theme');

    // Copy the .github folder and all its content and subfolders to the root folder
    copyDir('example/.github', 'output/.github');
}

// Clear the terminal
clear();

// Print the title
console.log(
    chalk.yellow(
        figlet.textSync('   EBOOK GENERATOR', { horizontalLayout: 'full' })
    )
);

askQuestions().then(createBook).then(checkFilesAndFolders);