class Character {
    constructor(name, job) {
        this.name = name;
        this.job = job;
        this.level = 1;
        this.advancementTier = 0; // 0: base, 1: first, 2: second, 3: third
        this.maxLevel = 120;
        // Initialize other stats and bonuses here
    }

    levelUp() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.manageAdvancements();
            // Other level up logic, such as stat growth
        }
    }

    manageAdvancements() {
        if (this.level === 30 && this.advancementTier === 0) {
            this.advancementTier = 1; // First advancement
            this.advanceJob();
        } else if (this.level === 65 && this.advancementTier === 1) {
            this.advancementTier = 2; // Second advancement
            this.advanceJob();
        } else if (this.level === 90 && this.advancementTier === 2) {
            this.advancementTier = 3; // Third advancement
            this.advanceJob();
        }
    }

    advanceJob() {
        // Logic to advance the job based on the current job and advancement tier
        // Define paths for warrior, knight, archer, rogue, mage, and priest
    }

    // Include other methods and functionalities as per the existing system
}