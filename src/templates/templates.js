function createAnimatedCircle() {
    const strokeColor = "#00B0EF"; // Farbe
    const strokeWidth = 5; // Breite
    const circleDiameter = 70; // Durchmesser (Breite und Höhe)

    return `
        <svg width="${circleDiameter}" height="${circleDiameter}" viewBox="0 0 ${circleDiameter} ${circleDiameter}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"
                stroke-dasharray="188.4" stroke-dashoffset="188.4">
                <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="500ms" repeatCount="1" fill="freeze" />
            </circle>
        </svg>
    `;
}

function createAnimatedCross() {
    const strokeColor = "#00B0EF"; // Farbe
    const strokeWidth = 5; // Breite
    const xSize = 70; // Größe des Kreuzes

    return `
        <svg width="${xSize}" height="${xSize}" viewBox="0 0 ${xSize} ${xSize}" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="0" y2="${xSize}" stroke="${strokeColor}" stroke-width="${strokeWidth}">
                <animate attributeName="x2" from="0" to="${xSize}" dur="0.5s" fill="freeze" />
                <animate attributeName="y2" from="0" to="${xSize}" dur="0.5s" fill="freeze" />
            </line>
            <line x1="${xSize}" y1="0" x2="${xSize}" y2="${xSize}" stroke="${strokeColor}" stroke-width="${strokeWidth}">
                <animate attributeName="x2" from="${xSize}" to="0" dur="0.5s" fill="freeze" />
                <animate attributeName="y2" from="0" to="${xSize}" dur="0.5s" fill="freeze" />
            </line>
        </svg>
    `;
}

