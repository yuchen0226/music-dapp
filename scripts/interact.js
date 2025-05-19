const hre = require("hardhat");

async function main() {
  // 取得部署後的合約工廠
  const MusicLicense = await hre.ethers.getContractFactory("MusicLicense");
  const musicLicense = await MusicLicense.deploy();
  await musicLicense.waitForDeployment();

  console.log(`合約地址: ${musicLicense.target}`);

  // 上傳一首歌曲
  await musicLicense.uploadSong("QmTestHash123456789", "MyFirstSong", hre.ethers.parseEther("0.01"));
  console.log("✅ 歌曲已上架");

  // 取得第一首歌資訊
  const song = await musicLicense.getSong(0);
  console.log("🎵 歌曲資訊：");
  console.log(`名稱: ${song[1]}`);
  console.log(`IPFS Hash: ${song[0]}`);
  console.log(`價格: ${hre.ethers.formatEther(song[3])} ETH`);

  // 模擬另一位使用者授權該歌曲（使用 hardhat 第二個帳號）
  const [owner, user2] = await hre.ethers.getSigners();
  const musicFromUser2 = musicLicense.connect(user2);

  await musicFromUser2.licenseSong(0, {
    value: hre.ethers.parseEther("0.01")
  });
  console.log("✅ 使用者2 授權成功");

  // 查詢授權紀錄
  const licensees = await musicLicense.getLicensees(0);
  console.log("📜 授權者清單：", licensees);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
