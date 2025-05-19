// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title 音樂版權與授權合約
contract MusicLicense {

    // 歌曲結構：包含 IPFS 檔案位置、名稱、擁有者、價格與授權次數
    struct Song {
        string ipfsHash;
        string name;
        address owner;
        uint price;
        uint licenseCount;
    }

    // 所有歌曲的清單
    Song[] public songs;

    // 授權紀錄：每首歌對應哪些地址曾經購買過授權
    mapping(uint => address[]) public licenseRecords;

    // 上傳歌曲（由創作者使用）
    function uploadSong(string memory _ipfsHash, string memory _name, uint _price) external {
        songs.push(Song({
            ipfsHash: _ipfsHash,
            name: _name,
            owner: msg.sender,
            price: _price,
            licenseCount: 0
        }));
    }

    // 取得特定歌曲資訊
    function getSong(uint index) public view returns (string memory, string memory, address, uint, uint) {
        Song memory song = songs[index];
        return (song.ipfsHash, song.name, song.owner, song.price, song.licenseCount);
    }

    // 授權歌曲（由買方使用）
    function licenseSong(uint index) external payable {
        Song storage song = songs[index];
        require(msg.value >= song.price, "Insufficient payment");
        payable(song.owner).transfer(song.price);
        song.licenseCount += 1;
        licenseRecords[index].push(msg.sender);
    }

    // 查詢某首歌的所有授權者
    function getLicensees(uint index) public view returns (address[] memory) {
        return licenseRecords[index];
    }

    // 總歌曲數（前端可用來跑迴圈）
    function getTotalSongs() public view returns (uint) {
        return songs.length;
    }
}
