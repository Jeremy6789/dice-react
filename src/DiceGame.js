import React, { useState } from 'react';

const Dice = ({ value, isRolling }) => {
  return (
    <div className={`dice dice-${value} ${isRolling ? 'shaking' : ''}`}>
      {/* 根據骰子點數來顯示圓點 */}
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
      <div className="dot dot-3"></div>
      <div className="dot dot-4"></div>
      <div className="dot dot-5"></div>
      <div className="dot dot-6"></div>
    </div>
  );
};

function DiceGame() {
  const [playerDice, setPlayerDice] = useState([1, 1]);
  const [hostDice, setHostDice] = useState([1, 1]);
  const [message, setMessage] = useState("");
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const newPlayerDice = [randomDice(), randomDice()];
      const newHostDice = [randomDice(), randomDice()];
      setPlayerDice(newPlayerDice);
      setHostDice(newHostDice);

      const playerTotal = newPlayerDice.reduce((acc, val) => acc + val, 0);
      const hostTotal = newHostDice.reduce((acc, val) => acc + val, 0);

      setRolling(false);
      
      if (playerTotal > hostTotal) {
        setMessage("恭喜你贏了！");
      } else if (playerTotal < hostTotal) {
        setMessage("很可惜你輸了~");
      } else {
        setMessage("平手！再試一次~");
      }
    }, 1000);
  };

  const randomDice = () => Math.floor(Math.random() * 6) + 1;

  return (
    <div className="game-container">
      <h1>擲骰子互動抽獎工具</h1>

      {/* 玩家區域 */}
      <div className="dice-container">
        <div className="dice-group">
          <h2>玩家骰子：</h2>
          <Dice value={playerDice[0]} isRolling={rolling} />
          <Dice value={playerDice[1]} isRolling={rolling} />
        </div>
        <h3>總分：{playerDice[0] + playerDice[1]}</h3>
      </div>

      {/* 關主區域 */}
      <div className="dice-container">
        <div className="dice-group">
          <h2>關主骰子：</h2>
          <Dice value={hostDice[0]} isRolling={rolling} />
          <Dice value={hostDice[1]} isRolling={rolling} />
        </div>
        <h3>總分：{hostDice[0] + hostDice[1]}</h3>
      </div>

      {/* 結果與按鈕 */}
      <h3>{message}</h3>
      <button onClick={rollDice} disabled={rolling}>擲骰子</button>
    </div>
  );
}

export default DiceGame;