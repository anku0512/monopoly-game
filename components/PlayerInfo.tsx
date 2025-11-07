'use client';

import { Player, Property } from '@/types/game';
import { PROPERTIES } from '@/lib/boardData';

interface PlayerInfoProps {
  player: Player;
  isCurrentPlayer: boolean;
  allProperties: Property[];
}

export default function PlayerInfo({ player, isCurrentPlayer, allProperties }: PlayerInfoProps) {
  const playerProperties = allProperties.filter(p => player.properties.includes(p.id));

  return (
    <div
      className={`
        rounded-lg p-4 border-2 transition-all
        ${isCurrentPlayer ? 'border-yellow-400 shadow-lg scale-105' : 'border-gray-300'}
        ${isCurrentPlayer ? 'bg-yellow-50' : 'bg-white'}
      `}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-6 h-6 rounded-full border-2 border-gray-800"
          style={{ backgroundColor: player.color }}
        />
        <h3 className={`font-bold ${isCurrentPlayer ? 'text-lg' : 'text-base'}`}>
          {player.name}
          {isCurrentPlayer && ' (Your Turn)'}
        </h3>
      </div>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-600">Money:</span>
          <span className="font-semibold text-green-600">₹{player.money}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Properties:</span>
          <span className="font-semibold">{playerProperties.length}</span>
        </div>
        {player.inJail && (
          <div className="text-red-600 font-semibold">In Jail ({player.jailTurns} turns)</div>
        )}
      </div>
      {playerProperties.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Properties:</div>
          <div className="flex flex-wrap gap-1">
            {playerProperties.map(prop => (
              <span
                key={prop.id}
                className="text-xs px-2 py-1 rounded bg-gray-100"
                title={prop.name}
              >
                {prop.name.substring(0, 15)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

