import * as tools from "./tools.js";

/*
document.getElementById('generateBtn')
    .addEventListener*/('click',function(){
        const
            analyzedName=
                document.getElementById('name')
                    .value.toUpperCase(),
            analyzedNameObject = tools.abstract.nameAsObject(analyzedName),
            nameVowelsObject = tools.abstract.nameAsObject(
                tools.filterLetters(tools.vowels, analyzedName)
            ),
            nameConsonantsObject = tools.abstract.nameAsObject(
                tools.filterLetters(tools.consonants, analyzedName)
            ),
            
            character = analyzedNameObject.numberObject,
            mission = nameVowelsObject.numberObject,
            personality = nameConsonantsObject.numberObject,

            analyzedBirthday=
                document.getElementById('birthday')
                    .valueAsDate,
            birthdayObject = tools.abstract.dateAsObject(analyzedBirthday),

            origin = birthdayObject.numberObject,
            nature = birthdayObject.date.day.numberObject,

            pinnacles = tools.abstract.pinnacles(birthdayObject),
            pyramid = tools.abstract.nameAsPyramid(9,analyzedName),
            quantities = {};//desandou...

        console.log({analyzedName,analyzedNameObject,nameVowelsObject,nameConsonantsObject,character,mission,personality,analyzedBirthday,birthdayObject,origin,nature,pinnacles,pyramid,quantities})

        const
            nameWords = tools.abstract.nameAsObject(analyzedName).words.map(word=>{
                const wordDiv = document.createElement('div');
                wordDiv.append(...word.letters.map(letter=>{
                    const
                        letterDiv = document.createElement('div'),
                        letterSpan = document.createElement('span'),
                        numberSpan = document.createElement('span');

                    letterSpan.innerText = letter.letter;
                    numberSpan.innerText = letter.number;
                    letterDiv.append(letterSpan,numberSpan);

                    return letterDiv;
                }));
                
                const
                    div = document.createElement('div'),
                    wordNumberDiv = document.createElement('div'),
                    wordFullNumberDiv = document.createElement('div');
                wordFullNumberDiv.innerText = word.numberObject.completeNumber;
                wordNumberDiv.innerText = word.numberObject.number;
                div.append(wordDiv,wordFullNumberDiv,wordNumberDiv);

                return div;
            }),
            h2 = document.body.appendChild(document.createElement('h2'))
        h2.classList.add('number-name')
        h2.append(...Array(nameWords.length*2-1).fill('&nbsp;').map((space,i)=>{
            if (i%2) {
                const div = document.createElement('div');
                div.innerHTML = `
                    <span>${space}</span>
                    <span>${space}</span>
                `;
                return div;
            } else {
                return nameWords[i/2]
            }
        }))
    })
()
