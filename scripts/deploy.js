const hre = require("hardhat");

async function main() {
  // 取得合約工廠（Contract Factory）
  const MusicLicense = await hre.ethers.getContractFactory("MusicLicense");

  // 部署合約
  const musicLicense = await MusicLicense.deploy();

  // 等待部署完成（這一行非常重要）
  await musicLicense.waitForDeployment();

  // 顯示部署後的合約地址
  console.log(`🎵 MusicLicense 合約部署成功！地址: ${musicLicense.target}`);
}

// 錯誤處理
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
