// Interactive CLI with  Node.js for create a book using a mdbook template builded by me
// Its create all directories and files for you
// Its creates the number of chapters according to what is answered in the question 'How many chapters does your book have?'
// Its create a book.toml file for you using the file present at .pt/book.toml as example
// Its create a README.md file for you if you dont have one
// Its create a SUMMARY.md file for you if you dont have one
// Its create a LICENSE file for you if you dont have one
// Its create a .gitignore file whit the path 'book'
// Its import the index.hbs present at example/theme/index.hbs and css file at example/theme/css/*
// Its will allways create the home page that will be showed before the book. Importing the home page files present at ./home/*
// Its will create the ./translations whit the same structure of the ./src
// Whitout the inquirer module


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

// Clear the terminal
clear();

// Print the title
console.log(
    chalk.yellow(
        figlet.textSync('   EBOOK GENERATOR', { horizontalLayout: 'full' })
    )
);

const questions = [
    { key: 'book_name', text: 'What is the name of your book?' },
    { key: 'book_author', text: 'What is the author of your book?' },
    { key: 'book_description', text: 'What is the description of your book?' },
    { key: 'book_chapters', text: 'How many chapters does your book have?' },
    { key: 'book_license', text: 'What is the license of your book?' },
    { key: 'book_git', text: 'What is the git repository of your book?' },
    { key: 'book_language', text: 'What is the language of your book?' },
    { key: 'book_domain', text: 'Do you have a domain name for your book (Y/N)?' },
    { key: 'book_translations', text: 'Do you want to add translations to your book (Y/N)?' },
];

let responses = {};

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



askQuestions().then(() => {
    // Create the book directory
    fs.mkdir('book', { recursive: true }, (err) => {
        if (err) throw err;
        console.log('book directory created');
    });

    // Create the src directory
    fs.mkdir('book/src', { recursive: true }, (err) => {
        if (err) throw err;
        console.log('book/src directory created');
    });

    // Create the book.toml file
    fs.writeFile('book/book.toml', `[book]
authors = ["${responses.book_author}"]
language = "${responses.book_language}"
description = "${responses.book_description}"
language = "${responses.book_language}"
multilingual = false
src = "src"
title = "${responses.book_name}"

[output.html]
git-repository-url = "${responses.book_git}"
edit-url-template = "${responses.book_git}/edit/main/pt/{path}"
CNAMES = ["${responses.book_domain_name}"]
additional-css = ["theme/css/style.css", "theme/css/mdbook-admonish.css"]
favicon = "favicon.ico"

[[output.i18n.translations]]
language = "${responses.book_translations_language}"
title = "${responses.book_translations_title}"
src = "translations/${responses.book_translations_language}"

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
    }
    );

    // Create the .gitignore file
    fs.writeFile('book/.gitignore', `book`, function (err) {
        if (err) throw err;
        console.log('.gitignore file created');
    }
    );

    // Create the number of characters folder specified by the user as characters
    for (let i = 0; i < responses.book_chapters; i++) {
        fs.mkdirSync(`book/src/chapter-${i + 1}`, { recursive: true }, (err) => {
            if (err) throw err;
            console.log(`book/src/chapter-${i + 1} directory created`);
        });
    }

    // Create the README.md files inside src/charapter${i} folder
    for (let i = 0; i < responses.book_chapters; i++) {
        fs.writeFile(`book/src/chapter-${i + 1}/README.md`, `# Chapter ${i + 1}`, function (err) {
            if (err) throw err;
            console.log(`Chapter ${i + 1} README.md file created`);
        }
        );
    }

    // Create the files folder inside src/charapter${i} folder
    for (let i = 0; i < responses.book_chapters; i++) {
        fs.mkdirSync(`book/src/chapter-${i + 1}/files`, { recursive: true }, (err) => {
            if (err) throw err;
            console.log(`book/src/chapter${i + 1}/files directory created`);
        });
    }

    // Create the image folder inside src/charapter${i} folder
    for (let i = 0; i < responses.book_chapters; i++) {
        fs.mkdirSync(`book/src/chapter-${i + 1}/images`, { recursive: true }, (err) => {
            if (err) throw err;
            console.log(`book/src/chapter${i + 1}/images directory created`);
        });
    }

    // Create the README.md file
    fs.writeFile('book/src/README.md', `# ${responses.book_name}
`, function (err) {
        if (err) throw err;
        console.log('book/src/README.md file created');
    }
    );

    // Create the SUMMARY.md file
    fs.writeFile('book/src/SUMMARY.md', `# Summary

- [Home](./home.md)
    `, function (err) {
        if (err) throw err;
        console.log('book/SUMMARY.md file created');
    }
    );

    // Create the BOOKSUMMARY.md file
    fs.writeFile('book/src/BOOKSUMMARY.md', `#[About](README.md)

#[Chapter 1](src/chapter-1/README.md)

#[Chapter 2](src/chapter-2/README.md)
    `, function (err) {
        if (err) throw err;
        console.log('BOOKSUMMARY.md file created');
    }
    );

    // If the user wants to create a translation run this part of the script
    if (responses.book_translations === 'yes' || responses.book_translations === 'Yes' || responses.book_translations === 'YES' || responses.book_translations === 'y' || responses.book_translations === 'Y') {
        // Create the translations directory
        fs.mkdir('book/src/translations', { recursive: true }, (err) => {
            if (err) throw err;
            console.log('book/src/translations directory created');
        });

        // Create the translations language directory
        fs.mkdir(`book/src/translations/${responses.book_translations_language}`, { recursive: true }, (err) => {
            if (err) throw err;
            console.log(`book/src/translations/${responses.book_translations_language} directory created`);
        });

        // Create the translations language number of chapters folder specified by the user as characters
        for (let i = 0; i < responses.book_chapters; i++) {
            fs.mkdir(`book/src/translations/${responses.book_translations_language}/chapter-${i + 1}`, { recursive: true }, (err) => {
                if (err) throw err;
                console.log(`book/src/translations/${responses.book_translations_language}/chapter-${i + 1} directory created`);
            });
        }

        // Create the translations language files folder inside src/translations/${language}/charapter${i} folder
        for (let i = 0; i < responses.book_chapters; i++) {
            fs.mkdir(`book/src/translations/${responses.book_translations_language}/chapter-${i + 1}/files`, { recursive: true }, (err) => {
                if (err) throw err;
                console.log(`book/src/translations/${responses.book_translations_language}/chapter${i + 1}/files directory created`);
            });
        }

        // Create the translations language image folder inside src/translations/${language}/charapter${i} folder
        for (let i = 0; i < responses.book_chapters; i++) {
            fs.mkdir(`book/src/translations/${responses.book_translations_language}/chapter-${i + 1}/images`, { recursive: true }, (err) => {
                if (err) throw err;
                console.log(`book/src/translations/${responses.book_translations_language}/chapter${i + 1}/images directory created`);
            });
        }

        // Create the directory book/src/translations/${language}/ if it doesn't exist then create the README.md file
        if (!fs.existsSync(`book/src/translations/${responses.book_translations_language}/README.md`)) {
            fs.writeFile(`book/src/translations/${responses.book_translations_language}/README.md`, `# ${responses.book_name}`, function (err) {
                if (err) throw err;
                console.log(`book/src/translations/${responses.book_translations_language}/README.md file created`);
            }
            );
        }

        // Create the directory book/src/translations/${language}/ if it doesn't exist then create the SUMMARY.md file
        if (!fs.existsSync(`book/src/translations/${responses.book_translations_language}/SUMMARY.md`)) {
            fs.writeFile(`book/src/translations/${responses.book_translations_language}/SUMMARY.md`, `# Summary`, function (err) {
                if (err) throw err;
                console.log(`book/src/translations/${responses.book_translations_language}/SUMMARY.md file created`);
            }
            );
        }

        // Create the directory book/src/translations/${language}/ if it doesn't exist then create the BOOKSUMMARY.md file
        if (!fs.existsSync(`book/src/translations/${responses.book_translations_language}/BOOKSUMMARY.md`)) {
            fs.writeFile(`book/src/translations/${responses.book_translations_language}/BOOKSUMMARY.md`, `#[About](README.md)`, function (err) {
                if (err) throw err;
                console.log(`book/src/translations/${responses.book_translations_language}/BOOKSUMMARY.md file created`);
            }
            );
        }
        
        // Create the translations language README.md files inside src/translatios/${language}/charapter${i} folder
        for (let i = 0; i < responses.book_chapters; i++) {
            fs.writeFile(`book/src/translations/${responses.book_translations_language}/chapter-${i + 1}/README.md`, `# Chapter ${i + 1}
        `, function (err) {
                if (err) throw err;
                console.log(`Chapter ${i + 1} README.md file created`);
            }
            );
        }
    }
});

// Copy directory function
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

// Copy the example/home folder to the / folder
copyDir('example/home', './home');

// Copy the example/theme folder to the /book/theme folder
copyDir('example/theme', 'book/theme');

// Copy the .github folder and all its content and subfolders to the root folder
copyDir('example/.github', './.github');