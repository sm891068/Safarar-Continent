/**
 * 聖殿系統模組 (Temple System Module)
 * @module Temple
 * @description 城鎮建築之一，提供復活、祝福、淨化等神聖服務
 */

export class Temple {
  constructor(data = {}) {
    this.id = data.id || 'temple_001';
    this.name = data.name || '光明聖殿';
    this.level = data.level || 1;
    this.deity = data.deity || 'light';
    
    this.services = {
      resurrection: { available: true, baseCost: 500, level: 1 },
      blessing: { available: true, baseCost: 100, duration: 3600, level: 1 },
      purification: { available: true, baseCost: 50, level: 1 },
      donation: { available: true, level: 1 }
    };
    
    this.clergy = data.clergy || this.initializeClergy();
    this.reputation = data.reputation || 0;
    this.activeBlessings = data.activeBlessings || [];
  }

  initializeClergy() {
    return [
      { id: 'priest_main', name: '大祭司', type: 'high_priest', services: ['resurrection', 'blessing', 'donation'] },
      { id: 'priest_healer', name: '治療祭司', type: 'healer', services: ['purification', 'blessing'] },
      { id: 'priest_scholar', name: '學者祭司', type: 'scholar', services: ['donation', 'blessing'] }
    ];
  }

  resurrect(character, player, resType = 'basic') {
    if (!character) return { success: false, message: '角色不存在' };
    if (character.stats && character.stats.hp > 0) return { success: false, message: '角色還活著，無需復活' };

    const levelMultiplier = character.level || 1;
    const typeMultiplier = resType === 'full' ? 2 : 1;
    const cost = Math.floor(this.services.resurrection.baseCost * levelMultiplier * typeMultiplier);

    if (!player.inventory || player.inventory.gold < cost) {
      return { success: false, message: '金幣不足', requiredGold: cost };
    }

    player.inventory.gold -= cost;

    if (resType === 'full') {
      character.stats.hp = character.stats.maxHp;
      character.stats.mp = character.stats.maxMp;
    } else {
      character.stats.hp = Math.floor(character.stats.maxHp * 0.5);
      character.stats.mp = Math.floor(character.stats.maxMp * 0.5);
    }

    if (character.statusEffects) {
      character.statusEffects = character.statusEffects.filter(e => e.type !== 'negative' && e.type !== 'debuff');
    }

    this.reputation += 5;

    return {
      success: true,
      message: `${character.name} 已復活！`,
      type: resType,
      costPaid: cost,
      hp: character.stats.hp,
      mp: character.stats.mp
    };
  }

  giveBlessing(character, player, blessingType = 'strength') {
    const blessings = {
      strength: { name: '力量祝福', cost: 100, duration: 3600, effects: { attack: 1.15, critDamage: 1.1 }, description: '攻擊力+15%，暴擊傷害+10%' },
      vitality: { name: '生命祝福', cost: 100, duration: 3600, effects: { maxHp: 1.2, defense: 1.1 }, description: '最大生命+20%，防禦力+10%' },
      wisdom: { name: '智慧祝福', cost: 100, duration: 3600, effects: { magic: 1.15, maxMp: 1.2 }, description: '魔法攻擊+15%，最大魔力+20%' },
      protection: { name: '守護祝福', cost: 150, duration: 3600, effects: { defense: 1.2, magicDefense: 1.2, evasion: 1.1 }, description: '雙防+20%，閃避+10%' },
      fortune: { name: '幸運祝福', cost: 120, duration: 3600, effects: { luck: 1.3, critRate: 1.15, itemDrop: 1.2 }, description: '幸運+30%，暴擊率+15%，掉寶率+20%' }
    };

    const blessing = blessings[blessingType];
    if (!blessing) return { success: false, message: '未知的祝福類型' };
    if (!player.inventory || player.inventory.gold < blessing.cost) return { success: false, message: '金幣不足', requiredGold: blessing.cost };

    const existingBlessing = this.activeBlessings.find(b => b.type === blessingType && b.characterId === character.id);
    if (existingBlessing) {
      existingBlessing.expiresAt = Date.now() + blessing.duration * 1000;
      return { success: true, message: `${blessing.name}已刷新`, refreshed: true };
    }

    player.inventory.gold -= blessing.cost;
    this.applyBlessingEffects(character, blessing.effects);

    this.activeBlessings.push({
      id: `blessing_${Date.now()}`,
      characterId: character.id,
      type: blessingType,
      name: blessing.name,
      effects: blessing.effects,
      expiresAt: Date.now() + blessing.duration * 1000,
      appliedAt: Date.now()
    });

    this.reputation += 2;

    return {
      success: true,
      message: `獲得了${blessing.name}！`,
      blessing: blessing,
      costPaid: blessing.cost,
      duration: blessing.duration
    };
  }

  applyBlessingEffects(character, effects) {
    if (!character.stats) return;
    for (const [stat, multiplier] of Object.entries(effects)) {
      if (character.stats[stat] !== undefined) {
        character.stats[stat] = Math.floor(character.stats[stat] * multiplier);
      }
    }
  }

  purify(character, player) {
    const cost = this.services.purification.baseCost;
    if (!player.inventory || player.inventory.gold < cost) return { success: false, message: '金幣不足', requiredGold: cost };

    const negativeEffects = character.statusEffects?.filter(e => e.type === 'negative' || e.type === 'debuff' || e.type === 'curse');
    if (!negativeEffects || negativeEffects.length === 0) return { success: false, message: '沒有需要淨化的負面狀態' };

    player.inventory.gold -= cost;
    const removedCount = negativeEffects.length;
    character.statusEffects = character.statusEffects.filter(e => e.type !== 'negative' && e.type !== 'debuff' && e.type !== 'curse');
    this.reputation += 1;

    return {
      success: true,
      message: `成功淨化了 ${removedCount} 個負面狀態`,
      removedEffects: negativeEffects,
      costPaid: cost
    };
  }

  resurrectParty(characters, player, resType = 'basic') {
    const deadCharacters = characters.filter(c => c.stats && c.stats.hp <= 0);
    if (deadCharacters.length === 0) return { success: false, message: '沒有需要復活的角色' };

    const individualCost = deadCharacters.reduce((total, char) => {
      const levelMultiplier = char.level || 1;
      const typeMultiplier = resType === 'full' ? 2 : 1;
      return total + Math.floor(this.services.resurrection.baseCost * levelMultiplier * typeMultiplier);
    }, 0);

    const discount = 0.8;
    const totalCost = Math.floor(individualCost * discount);

    if (!player.inventory || player.inventory.gold < totalCost) {
      return { success: false, message: '金幣不足', requiredGold: totalCost, yourGold: player.inventory?.gold || 0 };
    }

    player.inventory.gold -= totalCost;

    const resurrectedCharacters = [];
    deadCharacters.forEach(character => {
      if (resType === 'full') {
        character.stats.hp = character.stats.maxHp;
        character.stats.mp = character.stats.maxMp;
      } else {
        character.stats.hp = Math.floor(character.stats.maxHp * 0.5);
        character.stats.mp = Math.floor(character.stats.maxMp * 0.5);
      }
      if (character.statusEffects) {
        character.statusEffects = character.statusEffects.filter(e => e.type !== 'negative' && e.type !== 'debuff');
      }
      resurrectedCharacters.push(character.name);
    });

    this.reputation += deadCharacters.length * 3;

    return {
      success: true,
      message: `成功復活了 ${deadCharacters.length} 名隊員！`,
      resurrectedCharacters: resurrectedCharacters,
      costPaid: totalCost,
      discount: '團隊復活享受8折優惠'
    };
  }

  donate(player, amount) {
    if (!player.inventory || player.inventory.gold < amount) return { success: false, message: '金幣不足' };
    if (amount < 10) return { success: false, message: '捐獻金額至少為 10 金幣' };

    player.inventory.gold -= amount;
    const reputationGain = Math.floor(amount / 10);
    this.reputation += reputationGain;

    return {
      success: true,
      message: `感謝您的慷慨捐獻！`,
      amount: amount,
      reputationGained: reputationGain
    };
  }

  updateBlessings() {
    const now = Date.now();
    this.activeBlessings = this.activeBlessings.filter(b => b.expiresAt > now);
  }

  upgrade(cost) {
    this.level++;
    Object.keys(this.services).forEach(service => {
      this.services[service].level++;
    });
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      deity: this.deity,
      services: this.services,
      clergy: this.clergy,
      reputation: this.reputation,
      activeBlessings: this.activeBlessings
    };
  }
}

export default Temple;
