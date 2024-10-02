let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

function init() {
    render(); // Das Spielfeld wird beim Laden der Seite gerendert
}

let currentPlayer = 'cross'; // Startspieler

function render() {
    let container = document.getElementById('container');
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];

            // Weist die entsprechende Klasse zu (circle oder cross)
            let displayValue = '';
            if (value === 'cross') {
                displayValue = createAnimatedCross();
            } else if (value === 'circle') {
                displayValue = createAnimatedCircle();
            }

            let className = value === null ? '' : value; // Setzt die Klasse auf circle oder cross
            html += `<td class="${className}" onclick="setField(${index})">${displayValue}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    container.innerHTML = html; // Rendert das HTML in den Container
}

function setField(index) {
    if (fields[index] === null) { // Nur setzen, wenn das Feld leer ist
        fields[index] = currentPlayer; // Setzt den aktuellen Spieler (circle oder cross)

        // Wechsel zwischen den Spielern
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';

        render(); // Nach dem Setzen wird das Spielfeld neu gerendert
    }
}





