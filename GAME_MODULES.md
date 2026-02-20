# 🎮 Safarar Continent - 遊戲模組架構

## 📋 目錄結構

```
Safarar-Continent/
│
├── 📁 css/                          # 樣式表模組
│   ├── main.css                     # 主樣式表
│   ├── variables.css                # CSS 變數定義
│   ├── animations.css               # 動畫效果
│   ├── responsive.css               # 響應式設計
│   └── components/                  # 組件樣式
│       ├── buttons.css
│       ├── menus.css
│       └── particles.css
│
├── 📁 js/                           # JavaScript 模組
│   ├── main.js                      # 主入口文件
│   ├── config.js                    # 遊戲配置
│   ├── utils.js                     # 工具函數
│   ├── particles/                   # 粒子系統
│   │   ├── DustParticle.js
│   │   ├── MicroDust.js
│   │   └── Rune.js
│   ├── ui/                          # UI 模組
│   │   ├── Menu.js
│   │   ├── Button.js
│   │   └── FateRing.js
│   └── game/                        # 遊戲邏輯
│       ├── GameState.js
│       ├── SaveManager.js
│       └── EventSystem.js
│
├── 📁 scenes/                       # 場景模組
│   ├── main-menu/                   # 主選單場景
│   │   ├── index.html
│   │   ├── menu.js
│   │   └── menu.css
│   ├── character-creation/          # 角色創建場景
│   │   ├── index.html
│   │   ├── character-creation.js
│   │   └── character-creation.css
│   ├── town/                        # 城鎮場景
│   │   ├── index.html
│   │   ├── town.js
│   │   └── town.css
│   └── building-interior/           # 建築內部場景
│       ├── index.html
│       ├── interior.js
│       └── interior.css
│
├── 📁 assets/                       # 資源文件
│   ├── images/                      # 圖片資源
│   │   ├── backgrounds/
│   │   ├── characters/
│   │   ├── icons/
│   │   └── ui/
│   ├── sounds/                      # 音效資源
│   │   ├── bgm/
│   │   ├── sfx/
│   │   └── voice/
│   └── fonts/                       # 字體文件
│       ├── Cinzel/
│       └── CrimsonText/
│
├── 📁 data/                         # 數據文件
│   ├── game-data.json               # 遊戲數據
│   ├── characters.json              # 角色數據
│   ├── items.json                   # 物品數據
│   ├── dialogue.json                # 對話數據
│   └── quests.json                  # 任務數據
│
├── 📁 components/                   # 可重用組件
│   ├── Modal.js
│   ├── Tooltip.js
│   ├── ProgressBar.js
│   └── Notification.js
│
├── 📁 docs/                         # 設計文件
│   ├── main_menu_design_specification.md
│   ├── character_creation_design_specification.md
│   ├── ui_design_system.md
│   ├── town_scene_design_specification.md
│   └── building_interior_ui_specification.md
│
├── index.html                       # 主入口頁面
├── README.md                        # 專案說明
├── GAME_MODULES.md                  # 模組架構文檔（本文件）
└── LICENSE                          # 授權文件
```

---

## 🧩 核心模組說明

### 1️⃣ **主選單模組** (Main Menu Module)

**路徑**: `scenes/main-menu/`

**功能**:
- 遊戲啟動畫面
- 六大功能入口
- 粒子動畫系統
- 命運之環互動

**主要文件**:
- `menu.js` - 選單邏輯
- `menu.css` - 選單樣式
- 依賴: `particles/`, `ui/Menu.js`

**API**:
```javascript
class MainMenu {
  constructor(options)
  init()
  show()
  hide()
  updateActiveButton(index)
}
```

---

### 2️⃣ **角色創建模組** (Character Creation Module)

**路徑**: `scenes/character-creation/`

**功能**:
- 職業選擇（戰士、法師、弓箭手、治療師）
- 性別選擇
- 角色命名
- 外觀自定義
- 初始屬性分配

**主要文件**:
- `character-creation.js` - 創建邏輯
- `character-creation.css` - 創建樣式
- 依賴: `game/GameState.js`

**數據結構**:
```javascript
Character {
  id: String
  name: String
  job: "warrior" | "mage" | "archer" | "healer"
  gender: "male" | "female"
  level: Number
  stats: {
    hp: Number
    mp: Number
    attack: Number
    defense: Number
    magic: Number
    speed: Number
  }
  inventory: Array
  equipment: Object
}
```

---

### 3️⃣ **城鎮場景模組** (Town Scene Module)

**路徑**: `scenes/town/`

**功能**:
- 城鎮地圖導航
- NPC 互動
- 商店系統
- 建築入口

**主要文件**:
- `town.js` - 城鎮邏輯
- `town.css` - 城鎮樣式
- 依賴: `game/EventSystem.js`

**子系統**:
- 地圖系統
- NPC 對話系統
- 任務系統
- 傳送系統

---

### 4️⃣ **建築內部模組** (Building Interior Module)

**路徊**: `scenes/building-interior/`

**功能**:
- 商店介面
- 旅館系統
- 公會大廳
- 鐵匠鋪

**主要文件**:
- `interior.js` - 建築邏輯
- `interior.css` - 建築樣式

**建築類型**:
- `shop` - 商店
- `inn` - 旅館
- `guild` - 公會
- `smithy` - 鐵匠鋪
- `temple` - 神廟

---

### 5️⃣ **粒子系統模組** (Particle System Module)

**路徑**: `js/particles/`

**功能**:
- 塵埃粒子
- 魔法符文
- 特效粒子

**類別**:

```javascript
// DustParticle.js
class DustParticle {
  constructor()
  reset()
  update()
  draw(ctx)
}

// MicroDust.js
class MicroDust {
  constructor()
  reset()
  update()
  draw(ctx)
}

// Rune.js
class Rune {
  constructor(symbols)
  reset()
  update()
  draw(ctx)
}
```

**配置**:
```javascript
PARTICLE_CONFIG = {
  dustCount: 60,
  microDustCount: 40,
  runeCount: 12,
  maxParticles: 150
}
```

---

### 6️⃣ **UI 組件模組** (UI Components Module)

**路徑**: `js/ui/` 和 `components/`

**基礎組件**:

#### **Menu.js** - 選單組件
```javascript
class Menu {
  constructor(items, options)
  addItem(item)
  removeItem(id)
  setActive(index)
  show()
  hide()
}
```

#### **Button.js** - 按鈕組件
```javascript
class Button {
  constructor(text, options)
  onClick(callback)
  setEnabled(enabled)
  createRipple()
}
```

#### **Modal.js** - 模態框
```javascript
class Modal {
  constructor(content, options)
  open()
  close()
  setContent(content)
}
```

#### **Tooltip.js** - 提示框
```javascript
class Tooltip {
  constructor(target, text, options)
  show()
  hide()
  updatePosition()
}
```

---

### 7️⃣ **遊戲狀態管理模組** (Game State Module)

**路徑**: `js/game/GameState.js`

**功能**:
- 全局遊戲狀態管理
- 場景切換
- 數據持久化

**狀態結構**:
```javascript
GameState {
  currentScene: String
  player: Character
  inventory: Array
  quests: Array
  achievements: Array
  settings: {
    volume: Number
    language: String
    difficulty: String
  }
  saveData: Object
}
```

**API**:
```javascript
class GameState {
  static getInstance()
  getState()
  setState(newState)
  updatePlayer(playerData)
  changeScene(sceneName)
  subscribe(callback)
}
```

---

### 8️⃣ **存檔管理模組** (Save Manager Module)

**路徑**: `js/game/SaveManager.js`

**功能**:
- 自動存檔
- 手動存檔
- 存檔加載
- 多存檔槽位

**API**:
```javascript
class SaveManager {
  static save(slotId)
  static load(slotId)
  static getSaveList()
  static deleteSave(slotId)
  static autoSave()
}
```

**存檔格式**:
```javascript
SaveFile {
  id: String
  timestamp: Number
  playtime: Number
  player: Character
  location: String
  progress: Number
  checksum: String
}
```

---

### 9️⃣ **事件系統模組** (Event System Module)

**路徑**: `js/game/EventSystem.js`

**功能**:
- 事件發布訂閱
- 遊戲事件管理
- 自定義事件

**事件類型**:
```javascript
EVENTS = {
  SCENE_CHANGE: "scene:change"
  PLAYER_LEVEL_UP: "player:levelup"
  ITEM_ACQUIRED: "item:acquired"
  QUEST_COMPLETE: "quest:complete"
  BATTLE_START: "battle:start"
  BATTLE_END: "battle:end"
}
```

**API**:
```javascript
class EventSystem {
  static on(eventName, callback)
  static off(eventName, callback)
  static emit(eventName, data)
  static once(eventName, callback)
}
```

---

## 🔄 模組間依賴關係

```
main.js
  ├── config.js
  ├── utils.js
  ├── GameState.js
  │   ├── SaveManager.js
  │   └── EventSystem.js
  ├── scenes/
  │   ├── main-menu/
  │   │   ├── Menu.js
  │   │   ├── Button.js
  │   │   ├── FateRing.js
  │   │   └── particles/
  │   │       ├── DustParticle.js
  │   │       ├── MicroDust.js
  │   │       └── Rune.js
  │   ├── character-creation/
  │   │   └── GameState.js
  │   ├── town/
  │   │   └── EventSystem.js
  │   └── building-interior/
  │       └── GameState.js
  └── components/
      ├── Modal.js
      ├── Tooltip.js
      └── Notification.js
```

---

## 📦 模組加載策略

### **方式一: ES6 Modules**
```javascript
// main.js
import { GameState } from './js/game/GameState.js';
import { MainMenu } from './scenes/main-menu/menu.js';
import { DustParticle } from './js/particles/DustParticle.js';
```

### **方式二: 動態加載**
```javascript
async function loadScene(sceneName) {
  const module = await import(`./scenes/${sceneName}/index.js`);
  return module.default;
}
```

### **方式三: 預加載**
```javascript
const PRELOAD_MODULES = [
  'js/game/GameState.js',
  'js/game/EventSystem.js',
  'js/ui/Menu.js'
];

async function preloadModules() {
  await Promise.all(
    PRELOAD_MODULES.map(path => import(`./${path}`))
  );
}
```

---

## 🎯 模組開發規範

### **命名規範**
- 文件名: `kebab-case` (例: `character-creation.js`)
- 類名: `PascalCase` (例: `class GameState`)
- 函數名: `camelCase` (例: `function updateState()`)
- 常量: `UPPER_SNAKE_CASE` (例: `const MAX_LEVEL = 99`)

### **註釋規範**
```javascript
/**
 * 遊戲狀態管理器
 * @class GameState
 * @description 管理全局遊戲狀態和數據持久化
 */
class GameState {
  /**
   * 更新玩家數據
   * @param {Object} playerData - 玩家數據對象
   * @returns {boolean} 更新是否成功
   */
  updatePlayer(playerData) {
    // 實現代碼
  }
}
```

### **錯誤處理**
```javascript
try {
  const saveData = SaveManager.load(slotId);
  GameState.setState(saveData);
} catch (error) {
  console.error('Failed to load save:', error);
  Modal.show('存檔讀取失敗', error.message);
}
```

---

## 🚀 模組擴展指南

### **添加新場景**
1. 在 `scenes/` 創建新文件夾
2. 創建 `index.html`, `scene.js`, `scene.css`
3. 在 `GameState.js` 註冊場景
4. 實現場景類別：
```javascript
export class NewScene {
  constructor() {
    this.name = 'new-scene';
  }
  
  init() { /* 初始化 */ }
  update() { /* 更新邏輯 */ }
  render() { /* 渲染 */ }
  destroy() { /* 清理 */ }
}
```

### **添加新粒子效果**
1. 在 `js/particles/` 創建新類別
2. 繼承基礎粒子類別
3. 實現 `update()` 和 `draw()` 方法
4. 在配置中註冊

### **添加新UI組件**
1. 在 `components/` 創建新組件文件
2. 實現標準生命週期方法
3. 導出組件類別
4. 在需要的場景中導入使用

---

## 📊 性能優化建議

1. **懶加載**: 僅在需要時加載模組
2. **資源池**: 重用對象而非創建新對象
3. **事件委託**: 減少事件監聽器數量
4. **Canvas 優化**: 使用離屏 Canvas
5. **數據緩存**: 緩存頻繁訪問的數據

---

## 🔒 安全注意事項

1. **存檔驗證**: 使用 checksum 驗證存檔完整性
2. **輸入過濾**: 清理用戶輸入防止 XSS
3. **數據加密**: 敏感數據加密存儲
4. **版本控制**: 處理不同版本的存檔兼容性

---

這份文檔定義了 Safarar Continent 的完整模組架構，為未來的開發提供清晰的指導方針。