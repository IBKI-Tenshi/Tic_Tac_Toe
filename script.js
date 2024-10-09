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

// Definiert alle Gewinnkombinationen
const winningCombinations = [
    [0, 1, 2], // obere Zeile
    [3, 4, 5], // mittlere Zeile
    [6, 7, 8], // untere Zeile
    [0, 3, 6], // linke Spalte
    [1, 4, 7], // mittlere Spalte
    [2, 5, 8], // rechte Spalte
    [0, 4, 8], // diagonale von oben links nach unten rechts
    [2, 4, 6]  // diagonale von oben rechts nach unten links
];


let currentPlayer = 'cross'; // Startspieler

function init() {
    const restartContainer = document.getElementById('restart-container');
    if (restartContainer) {
        restartContainer.style.display = 'none'; // Blendet den Restart-Container aus
    }
    updateCurrentPlayer();
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

function updateCurrentPlayer() {
    const playerIndicator = document.getElementById("player-indicator");
    if (currentPlayer === 'cross') {
        playerIndicator.textContent = 'Kreuz';  // Text für Kreuz
        playerIndicator.style.color = "#FCBF05"; // Gelb für Kreuz
    } else {
        playerIndicator.textContent = 'Kreis';  // Text für Kreis
        playerIndicator.style.color = "#00B0EF"; // Blau für Kreis
    }
}

function setField(index) {
    if (fields[index] === null) { // Nur setzen, wenn das Feld leer ist
        fields[index] = currentPlayer; // Setzt den aktuellen Spieler (circle oder cross)

        // Animation nur für das aktuelle Feld ausführen
        animateField(index);

        // Überprüfen, ob das Spiel beendet ist
        const gameResult = isGameFinished(); // Prüft, ob das Spiel zu Ende ist
        if (gameResult) {
            const winningCombination = getWinningCombination(); // Diese Funktion gibt die Gewinnerkombination zurück
            showWinner(winningCombination); // Zeigt den weißen Strich an
            showRestartButton(); // Zeigt den Restart-Button nach dem Spielende an
            return; // Beendet die Funktion, um weitere Züge zu verhindern
        }

        // Wechsel zwischen den Spielern
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
        updateCurrentPlayer();
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

function isGameFinished() {
    // Prüft jede Gewinnkombination
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        // Überprüft, ob alle drei Felder gleich und nicht null sind
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return fields[a]; // Gibt den Gewinner ('cross' oder 'circle') zurück
        }
    }

    // Prüft, ob alle Felder belegt sind (Unentschieden)
    if (fields.every(field => field !== null)) {
        return 'draw'; // Gibt 'draw' zurück, wenn alle Felder belegt sind, aber kein Gewinner
    }

    // Das Spiel ist noch nicht zu Ende
    return null;
}

function showWinner(winningCombination) {
    const container = document.getElementById('container');
    const [firstCell, , lastCell] = winningCombination.map(i => document.getElementById(`cell-${i}`).getBoundingClientRect());
    
    // Berechnung der Start- und Endpunkte der Linie
    const [startX, startY] = [firstCell.left + firstCell.width / 2 - container.getBoundingClientRect().left,
                               firstCell.top + firstCell.height / 2 - container.getBoundingClientRect().top];
    
    // Füge eine Verlängerung hinzu, damit die Linie länger als die Zellen ist
    const extension = 20; // Verlängert die Linie um 20 Pixel
    const [endX, endY] = [
        lastCell.left + lastCell.width / 2 + Math.sign(lastCell.left - firstCell.left) * extension - container.getBoundingClientRect().left,
        lastCell.top + lastCell.height / 2 + Math.sign(lastCell.top - firstCell.top) * extension - container.getBoundingClientRect().top
    ];

    // Erstelle eine SVG-Linie und die Animation
    const lineSvg = `
        <svg style="position: absolute; top: ${container.getBoundingClientRect().top}px; left: ${container.getBoundingClientRect().left}px; width: ${container.offsetWidth}px; height: ${container.offsetHeight}px; z-index: 10;">
            <line x1="${startX}" y1="${startY}" x2="${startX}" y2="${startY}" stroke="white" stroke-width="5" stroke-linecap="round">
                <animate attributeName="x2" from="${startX}" to="${endX}" dur="500ms" fill="freeze" />
                <animate attributeName="y2" from="${startY}" to="${endY}" dur="500ms" fill="freeze" />
            </line>
        </svg>
    `;
    
    container.insertAdjacentHTML('beforeend', lineSvg);
}

function getWinningCombination() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination; // Gibt die Gewinnerkombination zurück
        }
    }
    return null; // Keine Gewinnerkombination gefunden
}

function showRestartButton() {
    const restartContainer = document.getElementById('restart-container');
    if (restartContainer) {
        restartContainer.style.display = 'block'; // Zeigt den Restart-Container an
    }
}

function restartGame() {
    fields = [null, null, null, null, null, null, null, null, null]; // Setzt die Felder zurück
    document.querySelector('svg').remove(); // Entfernt die Linie bei einem Sieg, falls vorhanden
    currentPlayer = 'cross'; // Setzt den Startspieler zurück
    init(); // Startet das Spiel neu
}
