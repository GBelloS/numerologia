const
    alphabetNumbers = [
        1,2,3,4,5,6,7,8,9,1,2,3,4,
        5,6,7,8,9,1,2,3,4,5,6,7,8
    ];

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
