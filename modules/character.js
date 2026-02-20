const characterSystem = {
    currentLevel: 1,
    levelCap: 10,
    experience: 0,
    jobs: {
        base: ['warrior', 'knight', 'archer', 'rogue', 'mage', 'priest'],
        advancements: {
            warrior: ['Champion', 'Berserker'],
            knight: ['Paladin', 'Templar'],
            archer: ['Ranger', 'Sniper'],
            rogue: ['Assassin', 'Shadow'],
            mage: ['Sorcerer', 'Warlock'],
            priest: ['Bishop', 'Cleric']
        }
    },
    experienceTable: {
        // Example experience needed for each level
        1: 100,
        2: 200,
        3: 300,
        4: 400,
        5: 500,
        6: 600,
        7: 700,
        8: 800,
        9: 900,
        10: 1000
    },
    levelUp: function() {
        if (this.currentLevel < this.levelCap) {
            this.currentLevel++;
            this.statGrowth();
            console.log(`Level Up! You are now level ${this.currentLevel}`);
            if (this.currentLevel === 30) {
                this.jobAdvancement();
            }
        } else {
            console.log('Maximum level reached.');
        }
    },
    statGrowth: function() {
        // Example stat growth, can be adjusted
        console.log('Stats have grown for level ' + this.currentLevel);
    },
    addExperience: function(exp) {
        this.experience += exp;
        while (this.experience >= this.experienceTable[this.currentLevel]) {
            this.experience -= this.experienceTable[this.currentLevel];
            this.levelUp();
        }
    },
    jobAdvancement: function() {
        console.log('Job advancement available at level 30!');
    }
};

module.exports = characterSystem;