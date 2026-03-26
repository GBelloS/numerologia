export function name(analysisDiv, analyzedNameObject){
    const nameTitle = analysisDiv.appendChild(document.createElement('div'))
    nameTitle.classList.add('name-title')

    const nameWords = analyzedNameObject.words.map(word=>{
        const div = document.createElement('div');
        div.classList.add('word-title')

        const wordDiv = document.createElement('div');
        wordDiv.classList.add('reduction','reduction-0')
        wordDiv.append(...word.letters.map(letter=>{
            const letterDiv = document.createElement('div');
            letterDiv.classList.add('letter-title')

            const letterSpan = document.createElement('span');
            letterSpan.innerText = letter.letter;

            const numberSpan = document.createElement('span');
            numberSpan.innerText = letter.number;

            letterDiv.append(letterSpan,numberSpan);
            return letterDiv;
        }));
        
        const wordFullNumberDiv = document.createElement('div');
        wordFullNumberDiv.classList.add('reduction','reduction-1')
        wordFullNumberDiv.innerText = word.numberObject.completeNumber;

        const wordNumberDiv = document.createElement('div');
        wordNumberDiv.classList.add('reduction','reduction-2')
        wordNumberDiv.innerText = word.numberObject.number;

        div.append(wordDiv,wordFullNumberDiv,wordNumberDiv);
        return div;
    });

    nameTitle.append(...Array(nameWords.length*2-1).fill('&nbsp;').map((space,i)=>{
        if (i%2) {
            const div = document.createElement('div');
            div.classList.add('word-title')
            div.innerHTML = `
                <span>${space}</span>
                <span>${space}</span>
            `;
            return div;
        } else {
            return nameWords[i/2]
        }
    }))
}
