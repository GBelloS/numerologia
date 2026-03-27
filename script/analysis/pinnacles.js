export function pinnacles(analysisDiv, pinnacles, origin){
    const table = analysisDiv.appendChild(document.createElement('table'));
    table.classList.add('pinnacles');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Desafios</th>
                <th>Pináculos</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    table.querySelector('tbody').append(...Array(4).fill(27).map((age,i)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pinnacles.challenges[i]}</td>
            <td>${pinnacles.pinnacles[i]}</td>
            <td>${
                i?age-origin.number+i*10:'～'
            } a ${
                i!==3?age+9-origin.number+i*10:'～'
            }</td>
        `; return tr;
    }));
}
