export const CalculateAccuracy = (typedLetters, correctLetters) =>
    `${Math.ceil((100 * correctLetters) / (typedLetters || 1))}%`;

export const CalculateCPM = (typedLetters) => `${Math.round(typedLetters)}CPM`;