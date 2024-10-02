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

let currentPlayer = 'cross'; // Startspieler

function init() {
    render(); // Das Spielfeld wird beim Laden der Seite gerendert
}

function render() {
    let container = document.getElementById('container');
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];

            // Anzeige des aktuellen Wertes im Feld
            let displayValue = value === 'cross' ? createAnimatedCross() : value === 'circle' ? createAnimatedCircle() : '';

            let className = value === null ? '' : value; // Setzt die Klasse auf circle oder cross
            html += `<td id="cell-${index}" class="${className}" onclick="setField(${index})">${displayValue}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    container.innerHTML = html; // Rendert das HTML in den Container
}

function setField(index) {
    if (fields[index] === null) { // Nur setzen, wenn das Feld leer ist
        fields[index] = currentPlayer; // Setzt den aktuellen Spieler (circle oder cross)

        // Animation nur für das aktuelle Feld ausführen
        animateField(index);

        // Wechsel zwischen den Spielern
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
    }
}

function animateField(index) {
    const td = document.getElementById(`cell-${index}`); // Korrekte Zelle direkt anhand der ID auswählen
    if (fields[index] === 'cross') {
        td.innerHTML = createAnimatedCross(); // Fülle das Feld mit der Cross-Animation
    } else if (fields[index] === 'circle') {
        td.innerHTML = createAnimatedCircle(); // Fülle das Feld mit der Circle-Animation
    }
}