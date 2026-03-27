export function feat(analysisDiv, featObject, featText){
    const featP = analysisDiv.appendChild(document.createElement('p'))
    featP.classList.add('feat')
    featP.innerHTML = `
        <span class="label">${featText}</span>:
        ${featObject.completeNumber}
        <span class="gray">${featObject.number}</span>
    `;
}
