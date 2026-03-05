import * as tools from "./tools.js";

document.getElementById('generateBtn')
    .addEventListener('click',function(){
        const
            analyzedName=
                document.getElementById('name')
                    .value.toUpperCase(),
            
            character = tools.nameNumber(analyzedName),
            mission = tools.nameNumber(
                tools.nameFilter(tools.vowels, analyzedName)
            ),
            personality = tools.nameNumber(
                tools.nameFilter(tools.consonants, analyzedName)
            ),

            analyzedBirthday=
                document.getElementById('birthday')
                    .value.split('/')
                    .map(number=>+number),
            birthdayNumbers = analyzedBirthday.map(
                number=>tools.masterReducted(number)
            ),

            origin = tools.dateNumber(birthdayNumbers),
            nature = tools.dateNumber(birthdayNumbers.slice(0,1)), //day

            pinnacles = tools.pinnacles(birthdayNumbers),
            pyramid = tools.namePyramid(9,analyzedName),
            quantities = {};//desandou...
        
        const
            nameWords = tools.wordObjects(analyzedName).map(word=>{
                const wordDiv = document.createElement('div');
                wordDiv.append(...word.letterObjects.map(letter=>{
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
                    wordNumberDiv = document.createElement('div');
                wordNumberDiv.innerText = word.number;
                div.append(wordDiv,wordNumberDiv);

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
