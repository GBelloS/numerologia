export const
    alphabetNumbers = [
        1,2,3,4,5,6,7,8,9,1,2,3,4,
        5,6,7,8,9,1,2,3,4,5,6,7,8
    ],
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

export function letterToNumber(letter) {
    return alphabetNumbers[letter.codePointAt()-65];
}
export function numberToReducted(number, previousSum = null) {
    const numberObject = {
        completeNumber: previousSum ?? number,
        number
    }, digits = number.toString().split('');
    
    if (digits.length == 1) {
        return numberObject;
    } else {
        const digitSum = digits.reduce(
                (a,d)=>+d+a,0
            );
        return numberToReducted(digitSum, number);
    }
}
export function numberToMasterReducted(number, previousSum = null) {
    const numberObject = {
        completeNumber: previousSum ?? number,
        number
    }, digits = number.toString().split('');
    
    if (digits.length == 1) {
        return numberObject;
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
            return numberToMasterReducted(digitSum, number);

        } else if ( [11,22,33,44].includes(number) ) {
            return numberObject;

        } else {
            throw Error(
                'Um novo número repetido apareceu!'
            );
        }
    }
}

export function nameAsObject(words) {
    const wordObjects = words.split(' ').map(word=>{
        const letterObjects = word.split('').map(letter=>({
            letter,
            number: letterToNumber(letter)
        }));
        return {
            word,
            letters: letterObjects,
            numberObject: numberToMasterReducted(
                letterObjects.map(
                    letterObject => letterObject.number
                ).join('')
            )
        };
    });
    return {
        words: wordObjects,
        numberObject: numberToMasterReducted(wordObjects.map(
            wordObject => wordObject.numberObject.number
        ).join(''))
    };
}
export function dateAsObject(date) {
    const dateArray = [
        ['day',date.getUTCDate()],
        ['month',date.getUTCMonth()+1],
        ['year',date.getUTCFullYear()]
    ].map(date=>{
        date[1] = {
            date: date[1],
            numberObject: numberToMasterReducted(date[1])
        };
        return date;
    });
    return {
        date: Object.fromEntries(dateArray),
        numberObject: numberToMasterReducted(dateArray.map(
            date => date[1].numberObject.number
        ).join(''))
    };
}
export function pyramid(numbers,signal) {
    const
        pyramidHeight = numbers.length,
        pyramidBase = numbers.length*2-1,
        pyramid = [Array(pyramidBase).fill().map(
            (e,index)=>
                index%2? '': numbers[index/2]
        )];
    
    if (!signal)
        for (let i=1; i<pyramidHeight; i++) {
            pyramid[i] = pyramid[i-1].map( (column,i,line)=>
                column !== ''||
                ['', undefined].includes(line[i - 1])||
                ['', undefined].includes(line[i + 1])?
                '':
                numberToReducted(line[i-1] + line[i+1]).number
            );
        }
    else
        for (let i=1; i<pyramidHeight; i++) {
            pyramid[i] = pyramid[i-1].map( (column,i,line)=>
                column !== ''||
                ['', undefined].includes(line[i - 1])||
                ['', undefined].includes(line[i + 1])?
                '':
                Math.abs(line[i-1] - line[i+1])
            );
        }
    
    return pyramid;
}
export function nameAsPyramid(size,name) {
    const analyzedName=
        name.replaceAll(' ','').slice(0,size).split('');
    
    return pyramid(analyzedName.map(
        letter=>letterToNumber(letter)
    ));
}
export function pinnacles(dateObject){
    const
        day = dateObject.date.day.numberObject.number,
        month = dateObject.date.month.numberObject.number,
        year = dateObject.date.year.numberObject.number;

    return{
        pinnacles: [
            ...pyramid([month,day,year])
                .slice(1)
                .flat()
                .filter(number=>number),
            numberToReducted(month+year).number
        ],
        challenges: [
            ...pyramid([month,day,year],-1)
                .slice(1)
                .flat()
                .filter(number=>number),
            Math.abs(month-year)
        ]
    };
}
