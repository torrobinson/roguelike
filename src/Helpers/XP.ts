class XP {
    // Return the XP needed for the next level progression
    static getExperiencePointsRequired(currentLevel: number, starterXP: number = 4) {
        return starterXP + Math.pow(currentLevel, 2) / 2;
        //return starterXP + currentLevel / 4;
    }
}
