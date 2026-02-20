class Settings {
    constructor() {
        this.audio = {
            masterVolume: 1.0,
            bgmVolume: 0.5,
            sfxVolume: 0.5,
            muted: false
        };
        this.display = {
            resolution: '1920x1080',
            quality: 'high',
            fullscreen: false,
            fps: 60,
            particleEffects: true
        };
        this.gameplay = {
            difficulty: 'normal',
            autoSave: true,
            showTutorials: true
        };
        this.controls = {
            keyBindings: {
                jump: 'Space',
                moveLeft: 'A',
                moveRight: 'D',
                crouch: 'C'
            },
            mouseSensitivity: 0.5
        };
        this.ui = {
            language: 'en',
            fontSize: 'medium',
            uiScale: 1.0
        };
        this.accessibility = {
            colorBlindMode: false,
            highContrast: false,
            subtitles: true
        };
    }

    setVolume(bgm, sfx, master) {
        this.audio.bgmVolume = bgm;
        this.audio.sfxVolume = sfx;
        this.audio.masterVolume = master;
    }

    setQuality(quality) {
        this.display.quality = quality;
    }

    toggleFullscreen() {
        this.display.fullscreen = !this.display.fullscreen;
    }

    setDifficulty(difficulty) {
        this.gameplay.difficulty = difficulty;
    }

    setLanguage(language) {
        this.ui.language = language;
    }

    setKeyBinding(action, key) {
        this.controls.keyBindings[action] = key;
    }

    resetToDefaults() {
        // Reset to initial values
        this.constructor();
    }

    save() {
        localStorage.setItem('gameSettings', JSON.stringify(this.toJSON()));
    }

    load() {
        const settings = JSON.parse(localStorage.getItem('gameSettings'));
        if (settings) {
            Object.assign(this, settings);
        }
    }

    toJSON() {
        return {
            audio: this.audio,
            display: this.display,
            gameplay: this.gameplay,
            controls: this.controls,
            ui: this.ui,
            accessibility: this.accessibility
        };
    }
}

// Exporting the Settings class for use in other modules
export default Settings;
