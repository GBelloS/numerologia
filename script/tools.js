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

export function number(letter) {
    return alphabetNumbers[letter.codePointAt()-65];
}
export function reducted(number) {
    const digits = number.toString().split('');
    
    if (digits.length == 1) {
        return number;
    } else {
        const digitSum = digits.reduce(
                (a,d)=>+d+a,0
            );
        return reducted(digitSum);
    }
}
export function masterReducted(number) {
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
            return masterReducted(digitSum);

        } else if ( [11,22,33,44].includes(number) ) {

            return number;

        } else {

            throw Error(
                'Um novo número repetido apareceu!'
            );
            
        }
    }
}

export function nameNumber(name) {
    const completeNumber=
        wordObjects(name)
            .map(word=>word.number)
            .reduce((a,n)=>a+n)
    
    return{
        completeNumber,
        number: masterReducted(completeNumber)
    }
}
export function dateNumber(dateNumber) {
    const completeNumber=
        dateNumber.reduce((a,n)=>a+n)
    
    return{
        completeNumber,
        number: masterReducted(completeNumber)
    }
}

export function wordObjects(name) {
    return name.split(' ').map(word=>{
        const letterObjects = word.split('').map(letter=>({
            letter,
            number: number(letter)
        }));
        return {
            word,
            letterObjects,
            number: masterReducted(
                letterObjects.reduce(
                    (a,o) => a+o.number,
                    0
                )
            )
        }
    });
}
export function nameFilter(filter, name) {
    return name.split('').filter(letter=>
        letter == ' ' || filter.includes(letter)
    ).join('');
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
                reducted(line[i-1] + line[i+1])
            )
        }
    else
        for (let i=1; i<pyramidHeight; i++) {
            pyramid[i] = pyramid[i-1].map( (column,i,line)=>
                column !== ''||
                ['', undefined].includes(line[i - 1])||
                ['', undefined].includes(line[i + 1])?
                '':
                Math.abs(line[i-1] - line[i+1])
            )
        }
    
    return pyramid;
}
export function namePyramid(size,name) {
    const analyzedName=
        name.replaceAll(' ','').slice(0,size).split('');
    
    return pyramid(analyzedName.map(
        letter=>number(letter)
    ))
}

export function pinnacles([day,month,year]){
    return{
        pinnacles: [
            ...pyramid([month,day,year])
                .slice(1)
                .flat()
                .filter(number=>number),
            reducted(month+year)
        ],
        challenges: [
            ...pyramid([month,day,year],-1)
                .slice(1)
                .flat()
                .filter(number=>number),
            Math.abs(month-year)
        ]
    }
}
