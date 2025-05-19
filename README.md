# 🎵 MusicLicense DApp – 區塊鏈音樂授權平台

本專案是一個建立於區塊鏈之上的「音樂授權平台」，透過智慧合約與 IPFS 技術，實現去中心化、透明、安全的音樂版權上架與授權購買功能。

---

## 🔧 技術堆疊

- **Solidity**：撰寫智慧合約
- **Hardhat**：本地測試鏈與合約開發環境
- **React.js**：前端 UI 架構
- **ethers.js**：前端與區塊鏈互動工具
- **MetaMask**：錢包連接與交易簽名
- **IPFS**（概念）：用於音樂/元資料的去中心化儲存

---

## 📁 專案結構

```
music-dapp/
├── contracts/              # 智慧合約原始碼（MusicLicense.sol）
├── scripts/                # 部署與互動腳本
├── frontend/               # React 前端專案
│   ├── src/
│   │   └── MusicLicense.json # 合約 ABI
├── hardhat.config.js       # Hardhat 設定檔
└── README.md               # 專案說明文件
```

---

## 🚀 快速開始

### 1️⃣ 安裝依賴

```bash
npm install
cd frontend
npm install
```

### 2️⃣ 啟動本地區塊鏈節點

```bash
cd ..
npx hardhat node
```

### 3️⃣ 部署智慧合約

另開一個終端機：

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 4️⃣ 啟動 React 前端

```bash
cd frontend
npm start
```

---

## 🧪 功能介紹

### 🔹 上架歌曲
- 使用者輸入 IPFS Hash、歌曲名稱與授權價格
- 呼叫 `uploadSong()` 將資料寫入鏈上

### 🔹 顯示歌曲清單
- 從 `getTotalSongs()` 與 `getSong(index)` 撈出所有歌曲
- 顯示 IPFS、價格、授權次數

### 🔹 購買授權
- 呼叫 `licenseSong(index)` 並付款（ETH）
- 自動更新授權次數
- 交易由 MetaMask 進行簽署

---

## 📌 使用帳號（本地測試）

從 `npx hardhat node` 輸出的帳號與私鑰匯入 MetaMask  
每個帳號預設含 10000 ETH（測試用）

---

## 🔮 未來可擴充功能

- 授權證明 NFT（每筆授權發 SBT）
- 音樂上傳真實使用 IPFS（Web3.Storage / Pinata）
- 智能授權分潤 / 播放次數收費
- 音樂搜尋與分類、使用者帳號系統

---

## 👨‍💻 作者

本專案為區塊鏈應用課程專題作品，僅供教學與展示用途。