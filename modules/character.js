/**
 * 角色系統模組 - 薩法拉爾大陸
 * Character System Module
 * 
 * 功能特性：
 * - 等級上限：Lv.10（轉職前）→ Lv.100（轉職後）
 * - 轉職系統：Lv.30 解鎖
 * - 六大職業：戰士、騎士、弓手、盜賊、法師、牧師
 * - 每個職業有兩條轉職路線
 */

export class Character {
  constructor(data = {}) {
    // ========== 基礎資訊 ==========
    this.id = data.id || this.generateId();
    this.name = data.name || '冒險者';
    this.job = data.job || 'warrior';
    this.advancedJob = data.advancedJob || null;
    this.gender = data.gender || 'male';
    this.level = data.level || 1;
    this.maxLevel = 10; // 初始等級上限
    this.experience = data.experience || 0;
    this.experienceToNext = this.calculateExpToNext(this.level);
    
    // ========== 轉職相關 ==========
    this.canAdvance = false;
    this.advanceLevel = 30;
    this.hasAdvanced = data.hasAdvanced || false;
    
    // ========== 基礎屬性 ==========
    this.stats = {
      hp: data.stats?.hp || 100,
      maxHp: data.stats?.maxHp || 100,
      mp: data.stats?.mp || 50,
      maxMp: data.stats?.maxMp || 50,
      attack: data.stats?.attack || 10,
      defense: data.stats?.defense || 5,
      magic: data.stats?.magic || 5,
      magicDefense: data.stats?.magicDefense || 5,
      speed: data.stats?.speed || 10,
      luck: data.stats?.luck || 5,
      critRate: data.stats?.critRate || 5,
      critDamage: data.stats?.critDamage || 150,
      evasion: data.stats?.evasion || 5,
      accuracy: data.stats?.accuracy || 95
    };
    
    // ========== 裝備、技能、符文 ==========
    this.equipment = {
      weapon: null,
      armor: null,
      helmet: null,
      gloves: null,
      boots: null,
      accessory1: null,
      accessory2: null
    };
    
    this.skills = data.skills || [];
    this.runes = data.runes || [];
    this.statusEffects = data.statusEffects || [];
    
    // 應用職業加成
    this.applyJobBonus();
  }
  
  // ========== ID 生成 ==========
  generateId() {
    return `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // ========== 經驗值計算 ==========
  calculateExpToNext(level) {
    return Math.floor(100 * Math.pow(level, 1.5));
  }
  
  // ========== 職業設定 ==========
  static getJobConfig() {
    return {
      warrior: {
        name: '戰士',
        icon: '⚔️',
        description: '強大的近戰戰士，擅長物理攻擊與生存',
        bonuses: { maxHp: 1.3, attack: 1.2, defense: 1.15 },
        growth: { hp: 15, mp: 3, attack: 3, defense: 2, magic: 1, magicDefense: 1, speed: 1, luck: 1 },
        advancedJobs: [
          { id: 'berserker', name: '狂戰士', bonuses: { attack: 1.5, critDamage: 1.3 } },
          { id: 'weapon_master', name: '武器大師', bonuses: { attack: 1.3, accuracy: 1.4 } }
        ]
      },
      knight: {
        name: '騎士',
        icon: '🛡️',
        description: '堅韌的防禦者，保護隊友免受傷害',
        bonuses: { maxHp: 1.4, defense: 1.3, magicDefense: 1.2 },
        growth: { hp: 18, mp: 2, attack: 2, defense: 3, magic: 1, magicDefense: 2, speed: 1, luck: 1 },
        advancedJobs: [
          { id: 'paladin', name: '聖騎士', bonuses: { defense: 1.4, magicDefense: 1.3 } },
          { id: 'dark_knight', name: '黑暗騎士', bonuses: { attack: 1.3, defense: 1.2 } }
        ]
      },
      archer: {
        name: '弓手',
        icon: '🏹',
        description: '敏捷的遠程射手，擅長精準打擊',
        bonuses: { attack: 1.15, speed: 1.3, critRate: 1.5, accuracy: 1.2 },
        growth: { hp: 10, mp: 4, attack: 3, defense: 1, magic: 1, magicDefense: 1, speed: 3, luck: 2 },
        advancedJobs: [
          { id: 'sniper', name: '狙擊手', bonuses: { critRate: 2.0, accuracy: 1.5 } },
          { id: 'ranger', name: '遊俠', bonuses: { speed: 1.5, evasion: 1.4 } }
        ]
      },
      rogue: {
        name: '盜賊',
        icon: '🗡️',
        description: '隱秘的刺客，致命的暴擊與閃避',
        bonuses: { speed: 1.4, critRate: 1.6, critDamage: 1.3, evasion: 1.5 },
        growth: { hp: 8, mp: 4, attack: 2, defense: 1, magic: 1, magicDefense: 1, speed: 4, luck: 2 },
        advancedJobs: [
          { id: 'assassin', name: '刺客', bonuses: { critRate: 2.0, critDamage: 1.5 } },
          { id: 'shadow_dancer', name: '影舞者', bonuses: { evasion: 2.0, speed: 1.6 } }
        ]
      },
      mage: {
        name: '法師',
        icon: '🔮',
        description: '強大的魔法師，毀滅性的範圍傷害',
        bonuses: { maxMp: 1.5, magic: 1.4, magicDefense: 1.15 },
        growth: { hp: 7, mp: 8, attack: 1, defense: 1, magic: 4, magicDefense: 2, speed: 1, luck: 1 },
        advancedJobs: [
          { id: 'archmage', name: '大魔法師', bonuses: { magic: 1.6, maxMp: 1.4 } },
          { id: 'elementalist', name: '元素使', bonuses: { magic: 1.4, magicDefense: 1.3 } }
        ]
      },
      priest: {
        name: '牧師',
        icon: '✨',
        description: '神聖的治療者，支援與恢復專家',
        bonuses: { maxMp: 1.3, magic: 1.2, maxHp: 1.15 },
        growth: { hp: 9, mp: 7, attack: 1, defense: 1, magic: 3, magicDefense: 2, speed: 1, luck: 2 },
        advancedJobs: [
          { id: 'bishop', name: '主教', bonuses: { magic: 1.4, maxMp: 1.5 } },
          { id: 'oracle', name: '神諭者', bonuses: { luck: 2.0, magic: 1.3 } }
        ]
      }
    };
  }
  
  // ========== 應用職業加成 ==========
  applyJobBonus() {
    const config = Character.getJobConfig()[this.job];
    if (!config) return;
    
    this.jobInfo = {
      name: config.name,
      icon: config.icon,
      description: config.description
    };
    
    this.availableAdvancedJobs = config.advancedJobs;
    
    // 應用屬性加成
    for (const [stat, multiplier] of Object.entries(config.bonuses)) {
      if (this.stats[stat] !== undefined) {
        this.stats[stat] = Math.floor(this.stats[stat] * multiplier);
      }
    }
  }
  
  // ========== 獲得經驗值 ==========
  gainExperience(exp) {
    if (this.level >= this.maxLevel) {
      return {
        leveledUp: false,
        message: `已達到當前等級上限 Lv.${this.maxLevel}！`,
        needAdvancement: !this.hasAdvanced
      };
    }
    
    this.experience += exp;
    const levelUps = [];
    
    while (this.experience >= this.experienceToNext && this.level < this.maxLevel) {
      this.experience -= this.experienceToNext;
      this.level++;
      this.levelUp();
      levelUps.push(this.level);
      
      if (this.level < this.maxLevel) {
        this.experienceToNext = this.calculateExpToNext(this.level);
      }
    }
    
    return {
      leveledUp: levelUps.length > 0,
      levelsGained: levelUps,
      currentLevel: this.level,
      currentExp: this.experience,
      expToNext: this.experienceToNext
    };
  }
  
  // ========== 升級處理 ==========
  levelUp() {
    const config = Character.getJobConfig()[this.job];
    const growth = config.growth;
    
    // 屬性成長
    this.stats.maxHp += growth.hp;
    this.stats.hp = this.stats.maxHp;
    this.stats.maxMp += growth.mp;
    this.stats.mp = this.stats.maxMp;
    this.stats.attack += growth.attack;
    this.stats.defense += growth.defense;
    this.stats.magic += growth.magic;
    this.stats.magicDefense += growth.magicDefense;
    this.stats.speed += growth.speed;
    this.stats.luck += growth.luck;
    
    // 檢查轉職條件
    if (this.level >= this.advanceLevel && !this.hasAdvanced) {
      this.canAdvance = true;
    }
  }
  
  // ========== 執行轉職 ==========
  advanceJob(advancedJobId) {
    if (!this.canAdvance) {
      return { success: false, message: '尚未達到轉職條件（需要 Lv.30）' };
    }
    
    const validJob = this.availableAdvancedJobs.find(j => j.id === advancedJobId);
    if (!validJob) {
      return { success: false, message: '無效的轉職選擇' };
    }
    
    this.advancedJob = advancedJobId;
    this.hasAdvanced = true;
    this.canAdvance = false;
    this.maxLevel = 100;
    
    // 應用轉職加成
    for (const [stat, multiplier] of Object.entries(validJob.bonuses)) {
      if (this.stats[stat] !== undefined) {
        this.stats[stat] = Math.floor(this.stats[stat] * multiplier);
      }
    }
    
    return { 
      success: true, 
      message: `成功轉職為 ${validJob.name}！`,
      advancedJobName: validJob.name
    };
  }
  
  // ========== 獲取職業名稱 ==========
  getFullJobName() {
    const config = Character.getJobConfig()[this.job];
    let name = config.name;
    
    if (this.hasAdvanced && this.advancedJob) {
      const advJob = config.advancedJobs.find(j => j.id === this.advancedJob);
      if (advJob) {
        name += ` → ${advJob.name}`;
      }
    }
    
    return name;
  }
  
  // ========== 獲取狀態摘要 ==========
  getSummary() {
    return {
      id: this.id,
      name: this.name,
      job: this.getFullJobName(),
      icon: this.jobInfo.icon,
      level: this.level,
      maxLevel: this.maxLevel,
      experience: this.experience,
      experienceToNext: this.experienceToNext,
      canAdvance: this.canAdvance,
      hasAdvanced: this.hasAdvanced,
      stats: { ...this.stats }
    };
  }
  
  // ========== 序列化 ==========
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      job: this.job,
      advancedJob: this.advancedJob,
      gender: this.gender,
      level: this.level,
      maxLevel: this.maxLevel,
      experience: this.experience,
      canAdvance: this.canAdvance,
      hasAdvanced: this.hasAdvanced,
      stats: { ...this.stats },
      equipment: { ...this.equipment },
      skills: [...this.skills],
      runes: [...this.runes]
    };
  }
}

export default Character;
