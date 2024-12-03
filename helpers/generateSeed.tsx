export function generateSeed(): string {
    let numberString = '';
    for (let i = 0; i < 19; i++) {
        numberString += Math.floor(Math.random() * 10);
    }

    // Determine if the number should be negative
    if (Math.random() < 0.5) {
        numberString = '-' + numberString;
    }

    return numberString;
}