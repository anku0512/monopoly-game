'use client';

import { Property, Player } from '@/types/game';
import { PROPERTIES } from '@/lib/boardData';

interface GameBoardProps {
  players: Player[];
  currentPlayer: Player;
  properties: Property[];
  dice: [number, number];
  hasRolled: boolean;
  onRollDice?: () => void;
  onBuyProperty?: () => void;
  onPayRent?: () => void;
  onEndTurn?: () => void;
  canBuy: boolean;
  canPayRent: boolean;
  canEndTurn: boolean;
  isDouble: boolean;
  currentProperty: Property;
  propertyOwner?: Player;
}

export default function GameBoard({ 
  players, 
  currentPlayer, 
  properties,
  dice,
  hasRolled,
  onRollDice,
  onBuyProperty,
  onPayRent,
  onEndTurn,
  canBuy,
  canPayRent,
  canEndTurn,
  isDouble,
  currentProperty,
  propertyOwner,
}: GameBoardProps) {
  const getPlayersAtPosition = (position: number): Player[] => {
    return players.filter(p => p.position === position);
  };

  const getPropertyOwner = (propertyId: number): Player | undefined => {
    return players.find(p => p.properties.includes(propertyId));
  };

  const getColorClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      brown: '#8B4513',
      lightblue: '#87CEEB',
      pink: '#FFB6C1',
      orange: '#FFA500',
      red: '#FF6B6B',
      yellow: '#FFD700',
      green: '#90EE90',
      darkblue: '#00008B',
      railroad: '#D3D3D3',
      utility: '#F0E68C',
    };
    return colorMap[color] || 'white';
  };

  const renderSquare = (position: number, orientation: 'horizontal' | 'vertical' | 'corner') => {
    const property = PROPERTIES[position];
    const playersHere = getPlayersAtPosition(position);
    const owner = property.price > 0 ? getPropertyOwner(property.id) : undefined;
    const isCurrentPosition = currentPlayer.position === position;

    const isCorner = orientation === 'corner';
    const isVertical = orientation === 'vertical';

    return (
      <div
        key={position}
        className={`
          relative border-2 border-gray-800 bg-white
          ${isCorner ? 'w-16 h-16' : isVertical ? 'w-14 h-10' : 'w-10 h-14'}
          flex ${isVertical ? 'flex-col' : 'flex-row'} items-center justify-center p-1
          ${isCurrentPosition ? 'ring-4 ring-yellow-400 ring-offset-1 z-10' : ''}
        `}
        style={{
          backgroundColor: property.color !== 'none' ? getColorClass(property.color) : 'white',
        }}
      >
        {isVertical ? (
          // Vertical squares (left and right sides)
          <>
            <div className="font-bold text-center leading-tight text-[9px] px-0.5 rotate-0">
              {property.name.length > 15 ? property.name.substring(0, 12) + '...' : property.name}
            </div>
            {property.price > 0 && (
              <div className="text-[8px] text-gray-600 mt-0.5">₹{property.price}</div>
            )}
            {owner && (
              <div
                className="absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-gray-800"
                style={{ backgroundColor: owner.color }}
              />
            )}
            <div className="absolute bottom-1 left-1 flex gap-0.5">
              {playersHere.map((player) => (
                <div
                  key={player.id}
                  className="w-3 h-3 rounded-full border-2 border-gray-800"
                  style={{ backgroundColor: player.color }}
                />
              ))}
            </div>
          </>
        ) : isCorner ? (
          // Corner squares
          <>
            <div className="font-bold text-center leading-tight text-[10px] px-1">
              {property.name.split(' ').slice(0, 2).join(' ')}
            </div>
            {property.price > 0 && (
              <div className="text-[9px] text-gray-600 mt-1">₹{property.price}</div>
            )}
            {owner && (
              <div
                className="absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-gray-800"
                style={{ backgroundColor: owner.color }}
              />
            )}
            <div className="absolute bottom-1 left-1 flex gap-0.5">
              {playersHere.map((player) => (
                <div
                  key={player.id}
                  className="w-3 h-3 rounded-full border-2 border-gray-800"
                  style={{ backgroundColor: player.color }}
                />
              ))}
            </div>
          </>
        ) : (
          // Horizontal squares (top and bottom rows)
          <>
            <div className="font-bold text-center leading-tight text-[8px] px-0.5" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              {property.name.length > 10 ? property.name.substring(0, 8) + '..' : property.name}
            </div>
            {property.price > 0 && (
              <div className="text-[7px] text-gray-600 mt-0.5">₹{property.price}</div>
            )}
            {owner && (
              <div
                className="absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-gray-800"
                style={{ backgroundColor: owner.color }}
              />
            )}
            <div className="absolute bottom-1 left-1 flex gap-0.5">
              {playersHere.map((player) => (
                <div
                  key={player.id}
                  className="w-3 h-3 rounded-full border-2 border-gray-800"
                  style={{ backgroundColor: player.color }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Traditional square board layout
  // Board structure (clockwise from START):
  // Bottom left: START (0)
  // Bottom row (left to right): 1-9
  // Bottom right: Jail (10)
  // Right side (bottom to top): 11-19
  // Top right: Free Parking (20)
  // Top row (right to left): 21-29
  // Top left: Go To Jail (30)
  // Left side (top to bottom): 31-39

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="relative bg-gray-100 p-2 rounded-lg shadow-2xl">
        <div className="grid grid-cols-11 gap-0" style={{ width: '700px', height: '700px' }}>
          {/* Top row: 20 (Free Parking) -> 21-29 -> 30 (Go To Jail) */}
          <div className="col-span-1">
            {renderSquare(20, 'corner')}
          </div>
          <div className="col-span-9 flex flex-row-reverse">
            {[29, 28, 27, 26, 25, 24, 23, 22, 21].map((pos) => (
              <div key={pos} className="flex-1">
                {renderSquare(pos, 'horizontal')}
              </div>
            ))}
          </div>
          <div className="col-span-1">
            {renderSquare(30, 'corner')}
          </div>

          {/* Middle rows: Left side (31-39), Center, Right side (19-11) */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
            <div key={row} className="contents">
              {/* Left side: positions 39 down to 31 */}
              <div className="col-span-1">
                {renderSquare(39 - row, 'vertical')}
              </div>

              {/* Center area */}
              {row === 4 ? (
                <div className="col-span-9 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 border-4 border-gray-800 flex items-center justify-center">
                  <div className="text-center p-4 w-full">
                    <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      🎲 MONOPOLY
                    </div>
                    
                    {/* Dice Section */}
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Dice</div>
                      {hasRolled ? (
                        <div className="flex gap-3 justify-center mb-3">
                          <div className="w-14 h-14 bg-white border-3 border-gray-800 rounded-lg shadow-lg flex items-center justify-center text-3xl font-bold text-gray-900">
                            {dice[0]}
                          </div>
                          <div className="w-14 h-14 bg-white border-3 border-gray-800 rounded-lg shadow-lg flex items-center justify-center text-3xl font-bold text-gray-900">
                            {dice[1]}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500 text-xs mb-3">Roll to start</div>
                      )}
                      
                      {!hasRolled && onRollDice && (
                        <button
                          onClick={onRollDice}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
                        >
                          Roll Dice
                        </button>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {hasRolled && (
                      <div className="space-y-2">
                        {canBuy && onBuyProperty && (
                          <button
                            onClick={onBuyProperty}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm shadow-md"
                          >
                            Buy {currentProperty.name} (₹{currentProperty.price})
                          </button>
                        )}
                        
                        {canPayRent && onPayRent && (
                          <button
                            onClick={onPayRent}
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm shadow-md"
                          >
                            Pay Rent
                          </button>
                        )}
                        
                        {canEndTurn && onEndTurn && (
                          <button
                            onClick={onEndTurn}
                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm shadow-md"
                          >
                            End Turn
                          </button>
                        )}
                        
                        {isDouble && (
                          <div className="text-center text-green-700 font-semibold text-xs">
                            Double! Roll again or end turn
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-gray-300">
                      <div className="text-xs text-gray-700 font-medium">
                        {currentPlayer.name}'s Turn
                      </div>
                      <div className="text-xs text-gray-600">
                        {PROPERTIES[currentPlayer.position].name}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-span-9 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 border-4 border-gray-800"></div>
              )}

              {/* Right side: positions 11 up to 19 */}
              <div className="col-span-1">
                {renderSquare(11 + row, 'vertical')}
              </div>
            </div>
          ))}

          {/* Bottom row: 10 (Jail) -> 9-1 -> 0 (START) */}
          <div className="col-span-1">
            {renderSquare(10, 'corner')}
          </div>
          <div className="col-span-9 flex">
            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((pos) => (
              <div key={pos} className="flex-1">
                {renderSquare(pos, 'horizontal')}
              </div>
            ))}
          </div>
          <div className="col-span-1">
            {renderSquare(0, 'corner')}
          </div>
        </div>
      </div>
    </div>
  );
}

