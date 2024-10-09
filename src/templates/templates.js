function createAnimatedCircle() {
    const strokeColor = "#00B0EF"; // Farbe
    const strokeWidth = 5; // Breite des Kreises

    return `
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: auto;">
            <circle cx="50" cy="50" r="40" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"
                stroke-dasharray="251.2" stroke-dashoffset="251.2">
                <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="300ms" repeatCount="1" fill="freeze" />
            </circle>
        </svg>
    `;
}


function createAnimatedCross() {
    const strokeColor = "#FCBF05"; // Farbe
    const strokeWidth = 5; // Breite des Kreuzes

    return `
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: auto;">
            <line x1="15" y1="15" x2="15" y2="15" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round">
                <animate attributeName="x2" from="15" to="85" dur="0.3s" fill="freeze" />
                <animate attributeName="y2" from="15" to="85" dur="0.3s" fill="freeze" />
            </line>
            <line x1="85" y1="15" x2="85" y2="15" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round">
                <animate attributeName="x2" from="85" to="15" dur="0.3s" fill="freeze" />
                <animate attributeName="y2" from="15" to="85" dur="0.3s" fill="freeze" />
            </line>
        </svg>
    `;
}




