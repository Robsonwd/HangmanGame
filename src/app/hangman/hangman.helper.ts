import * as _ from 'underscore';

export namespace Hangman {

    // The possible letters for Hangman as a set.
    export function alphaSet(): Set<string> {
        const aCharCode: number = 'A'.charCodeAt(0);
        return new Set<string>(_.range(0, 26).map(i => String.fromCharCode(i + aCharCode)));
    }

    // Maximum guess count for Hangman.
    export function maxGuessess(): number {
        return 11;
    }

    // Generate a new guess list based on letter, current matches, and actual word.
    export function applyGuess(letter: string, guessList: Array<string>, hangList: Array<string>): Array<string> {

        if (hangList.indexOf(letter) > -1) {
            guessList.forEach(function (el, index, array) {
                // if letter matches to word
                if (hangList[index] == letter) {
                    guessList[index] = letter;
                }
                // if letter in uncovered
                else if (!(hangList[index] == letter) && !(guessList[index] == '_')) {
                    guessList[index] = hangList[index];
                }
                // if letter is wrong
                else {
                    guessList[index] = '_';
                }
            });

            return guessList;
        } else {
            return guessList;
        }
    }

    // Generate a new guess set based on letter, current set, and actual word.
    export function applyGuess_(letter: string, missedLetters: Array<string>, hangList: Array<string>): Array<string> {
        if (!(hangList.indexOf(letter) > -1) && !(missedLetters.indexOf(letter) > -1) && (alphaSet().has(letter))) {
            missedLetters.push(letter);
            return missedLetters;
        }
        else {
            return missedLetters;
        }
    }
}