import * as convert from "./convert.js";

export function nameAsObject(words) {
    const wordObjects = words.split(' ').map(word=>{
        const letterObjects = word.split('').map(letter=>({
            letter,
            number: convert.letterToNumber(letter)
        }));
        return {
            word,
            letters: letterObjects,
            numberObject: convert.numberToMasterReducted(
                letterObjects.reduce(
                    (a,lo) => a+lo.number, 0
                )
            )
        };
    });
    return {
        words: wordObjects,

        numberObject: convert.numberToMasterReducted(wordObjects.reduce(
            (a,wo) => a+wo.numberObject.number, 0
        )),
        
        numberAmounts: wordObjects.reduce(
            (a,word) => word.letters.reduce((a,letter)=>{
                a[letter.number] = a[letter.number] + 1 || 1;

                return a;
            },a),
            {}
        )
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
            numberObject: convert.numberToMasterReducted(date[1])
        };
        return date;
    });
    return {
        date: Object.fromEntries(dateArray),
        numberObject: convert.numberToMasterReducted(dateArray.map(
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
                convert.numberToReducted(line[i-1] + line[i+1]).number
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
        letter=>convert.letterToNumber(letter)
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
            convert.numberToReducted(month+year).number
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
