'use client';

import { useState } from 'react';
import { Player } from '@/types/game';
import PlayerSetup from '@/components/PlayerSetup';
import Game from '@/components/Game';

export default function Home() {
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const handleStartGame = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    setGameOver(false);
    setWinner(null);
  };

  const handleGameOver = (winningPlayer: Player) => {
    setGameOver(true);
    setWinner(winningPlayer);
  };

  const handleRestart = () => {
    setPlayers(null);
    setGameOver(false);
    setWinner(null);
  };

  if (!players) {
    return <PlayerSetup onStartGame={handleStartGame} />;
  }

  return <Game initialPlayers={players} onGameOver={handleGameOver} onRestart={handleRestart} />;
}
