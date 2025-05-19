import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./MusicLicense.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // <-- 請務必替換！

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [songName, setSongName] = useState("");
  const [priceEth, setPriceEth] = useState("");
  const [songs, setSongs] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const musicContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
      setContract(musicContract);
    } else {
      alert("請先安裝 MetaMask");
    }
  };

  const handleUpload = async () => {
    if (!contract) return alert("尚未連接合約");
    try {
      const priceWei = ethers.parseEther(priceEth);
      const tx = await contract.uploadSong(ipfsHash, songName, priceWei);
      await tx.wait();
      alert("✅ 歌曲上架成功！");
      setIpfsHash("");
      setSongName("");
      setPriceEth("");
      fetchSongs(); // 重新載入歌曲清單
    } catch (err) {
      console.error(err);
      alert("❌ 上架失敗");
    }
  };

  const fetchSongs = async () => {
    if (!contract) return;
    try {
      const total = await contract.getTotalSongs();
      const songList = [];
      for (let i = 0; i < Number(total); i++) {
        const s = await contract.getSong(i);
        songList.push({
          index: i,
          name: s[1],
          ipfs: s[0],
          price: ethers.formatEther(s[3]),
          count: s[4],
        });
      }
      setSongs(songList);
    } catch (err) {
      console.error("❌ 無法載入歌曲清單", err);
    }
  };

  const handleLicense = async (index, price) => {
    if (!contract) return;
    try {
      const tx = await contract.licenseSong(index, {
        value: ethers.parseEther(price),
      });
      await tx.wait();
      alert("✅ 授權成功！");
      fetchSongs(); // 更新授權次數
    } catch (err) {
      console.error(err);
      alert("❌ 授權失敗");
    }
  };

  useEffect(() => {
    if (contract) fetchSongs();
  }, [contract]);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎵 音樂授權平台</h1>

      <button onClick={connectWallet}>
        {walletAddress ? `錢包已連接：${walletAddress.slice(0, 6)}...` : "連接 MetaMask"}
      </button>

      <hr />

      <h2>📤 上架歌曲</h2>
      <input placeholder="IPFS Hash" value={ipfsHash} onChange={e => setIpfsHash(e.target.value)} />
      <input placeholder="歌曲名稱" value={songName} onChange={e => setSongName(e.target.value)} />
      <input placeholder="授權價格 (ETH)" value={priceEth} onChange={e => setPriceEth(e.target.value)} />
      <br />
      <button onClick={handleUpload}>上架</button>

      <hr />
      <h2>📄 已上架歌曲</h2>
      {songs.map(song => (
        <div key={song.index} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <p>🎶 名稱：{song.name}</p>
          <p>📦 IPFS Hash：{song.ipfs}</p>
          <p>💰 價格：{song.price} ETH</p>
          <p>🧾 授權次數：{song.count.toString()}</p>
          <button onClick={() => handleLicense(song.index, song.price)}>購買授權</button>
        </div>
      ))}
    </div>
  );
}

export default App;
