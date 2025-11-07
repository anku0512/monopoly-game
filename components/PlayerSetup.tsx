'use client';

import { useState } from 'react';
import { Player } from '@/types/game';
import { PLAYER_COLORS } from '@/lib/boardData';
import { createPlayer } from '@/lib/gameLogic';

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void;
}

export default function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);

  const handleNumPlayersChange = (num: number) => {
    setNumPlayers(num);
    const newNames = Array(num).fill('').map((_, i) => playerNames[i] || '');
    setPlayerNames(newNames);
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStart = () => {
    if (playerNames.every(name => name.trim() !== '')) {
      const players = playerNames.map((name, index) =>
        createPlayer(name.trim(), `player-${index}`, PLAYER_COLORS[index])
      );
      onStartGame(players);
    }
  };

  const canStart = numPlayers >= 2 && numPlayers <= 8 && playerNames.every(name => name.trim() !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎲 Monopoly
        </h1>
        <p className="text-center text-gray-600 mb-8">Set up your game</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Players (2-8)
          </label>
          <input
            type="number"
            min="2"
            max="8"
            value={numPlayers}
            onChange={(e) => handleNumPlayersChange(parseInt(e.target.value) || 2)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Player Names
          </label>
          {Array.from({ length: numPlayers }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: PLAYER_COLORS[index] }}
              />
              <input
                type="text"
                placeholder={`Player ${index + 1} name`}
                value={playerNames[index] || ''}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleStart}
          disabled={!canStart}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
            canStart
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

