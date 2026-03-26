export function feat(analysisDiv, featObject, featText){
    const characterP = analysisDiv.appendChild(document.createElement('p'))
    characterP.classList.add('feat')
    characterP.innerHTML = `
        <span class="label">${featText}</span>:
        ${featObject.completeNumber}
        <span class="gray">${featObject.number}</span>
    `;
}
