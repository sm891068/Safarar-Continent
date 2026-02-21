const gameState = {
    saveSlots: [
        { id: 1, characterName: null, timestamp: null },
        { id: 2, characterName: null, timestamp: null },
        { id: 3, characterName: null, timestamp: null }
    ]
};

function updateSaveSlotsDisplay() {
    const slotsContainer = document.getElementById('save-slots');
    slotsContainer.innerHTML = '';
    gameState.saveSlots.forEach(slot => {
        const timestampDisplay = slot.timestamp ? new Date(slot.timestamp).toUTCString() : 'Empty';
        const slotElement = document.createElement('div');
        slotElement.className = 'save-slot';
        slotElement.innerHTML = `<p>Slot ${slot.id}: ${slot.characterName || 'No Character'} - Last Saved: ${timestampDisplay}</p>`;
        slotElement.onclick = () => selectSaveSlot(slot.id);
        slotsContainer.appendChild(slotElement);
    });
}

function selectSaveSlot(slotId) {
    const slot = gameState.saveSlots.find(s => s.id === slotId);
    if (slot.characterName) {
        loadCharacter(slot);
    } else {
        saveCharacter(slot);
    }
}

function formatTimestampDisplay(timestamp) {
    return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
}

function navigateBackToMainMenu() {
    window.location.href = 'main-menu.html';
}