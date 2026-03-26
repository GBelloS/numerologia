export function birthday(analysisDiv, birthdayObject){
    const birthday = analysisDiv.appendChild(document.createElement('div'))
    birthday.classList.add('birthday')

    const dates = ['day','month','year'].map(date=>{
        const div = document.createElement('div');
        div.classList.add('date')

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('reduction','reduction-0')
        dateDiv.innerText = `${birthdayObject.date[date].date}`.padStart(2,0);
        
        const dateFullNumberDiv = document.createElement('div');
        dateFullNumberDiv.classList.add('reduction','reduction-1')
        dateFullNumberDiv.innerText = birthdayObject.date[date].numberObject.completeNumber;

        const wordNumberDiv = document.createElement('div');
        wordNumberDiv.classList.add('reduction','reduction-2')
        wordNumberDiv.innerText = birthdayObject.date[date].numberObject.number;

        div.append(dateDiv, dateFullNumberDiv, wordNumberDiv);
        return div;
    });

    birthday.append(...Array(dates.length*2-1).fill('&nbsp;').map((space,i)=>{
        if (i%2) {
            const div = document.createElement('div');
            div.classList.add('date')
            div.innerHTML = `
                <span>${space}</span>
                <span>${space}</span>
            `;
            return div;
        } else {
            return dates[i/2]
        }
    }))
}
