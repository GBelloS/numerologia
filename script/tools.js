export const
    vowels = ['A','E','I','O','U'],
    consonants = [
        'B','C','D','F','G','H','J',
        'K','L','M','N','P','Q','R',
        'S','T','V','W','X','Y','Z'
    ];

export function filterLetters(filter, name) {
    return name.split('').filter(letter=>
        letter == ' ' || filter.includes(letter)
    ).join('');
}

export * as convert from "./tools/convert.js";
export * as abstract from "./tools/abstract.js";
