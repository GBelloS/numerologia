export function character(analysisDiv, character){
    const characterP = analysisDiv.appendChild(document.createElement('p'))
    characterP.classList.add('character')
    characterP.innerHTML = `
        <span class="label">Caráter</span>:
        ${character.completeNumber}
        <span class="gray">${character.number}</span>
    `;
}
