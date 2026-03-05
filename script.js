const
    alphabetNumbers = [
        1,2,3,4,5,6,7,8,9,1,2,3,4,
        5,6,7,8,9,1,2,3,4,5,6,7,8
    ],
    vowels = ['A','E','I','O','U'],
    consonants = [
        'B','C','D','F','G','H','J',
        'K','L','M','N','P','Q','R',
        'S','T','V','W','X','Y','Z'
    ]

function number(letter) {
    return alphabetNumbers[letter.codePointAt()-65];
}
function reducted(number) {
    const digits = number.toString().split('');
    
    if (digits.length == 1) {
        return number;
    } else {
        const
            uniqueDigits = digits.filter(
                (d,i,a) => i==a.indexOf(d)
            ),
            diffDigitsAmount = uniqueDigits.length;


        if (diffDigitsAmount > 1) {

            const digitSum = digits.reduce(
                (a,d)=>+d+a,0
            );
            return reducted(digitSum);

        } else if ( [11,22,33,44].includes(number) ) {

            return number;

        } else {

            throw Error(
                'Um novo número repetido apareceu!'
            );
            
        }
    }
}
function wordObjects(name) {
    return name.split(' ').map(word=>{
        const letterObjects = word.split('').map(letter=>({
            letter,
            number: number(letter)
        }));
        return {
            word,
            letterObjects,
            number: reducted(
                letterObjects.reduce((a,o) => a+o.number, 0)
            )
        }
    });
}
function nameFilter(filter, name) {
    return name.split('').filter(letter=>
        letter == ' ' || filter.includes(letter)
    ).join('')
}
