'use client';

import { useState, useCallback } from 'react';
import { Player, Property, GameState } from '@/types/game';
import { PROPERTIES, BOARD_SIZE } from '@/lib/boardData';
import {
  rollDice,
  isDouble,
  movePlayer,
  calculateRent,
  canBuyHouse,
  canBuyHotel,
  checkGameOver,
  getPropertyAtPosition,
} from '@/lib/gameLogic';
import GameBoard from './GameBoard';
import PlayerInfo from './PlayerInfo';
import PropertyCard from './PropertyCard';

interface GameProps {
  initialPlayers: Player[];
  onGameOver: (winner: Player) => void;
  onRestart: () => void;
}

export default function Game({ initialPlayers, onGameOver, onRestart }: GameProps) {
  const [gameState, setGameState] = useState<GameState>({
    players: initialPlayers,
    currentPlayerIndex: 0,
    properties: PROPERTIES,
    dice: [0, 0],
    doublesCount: 0,
    gameStarted: true,
    gameOver: false,
    winner: null,
    lastAction: 'Game started!',
  });

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const currentProperty = getPropertyAtPosition(currentPlayer.position);
  const propertyOwner = gameState.players.find(p => p.properties.includes(currentProperty.id));

  const handleRollDice = useCallback(() => {
    if (gameState.gameOver) return;

    const dice = rollDice();
    const double = isDouble(dice);
    let newDoublesCount = double ? gameState.doublesCount + 1 : 0;

    if (newDoublesCount === 3) {
      setGameState(prev => {
        const newPlayers = [...prev.players];
        const player = { ...newPlayers[prev.currentPlayerIndex] };
        player.position = 10;
        player.inJail = true;
        player.jailTurns = 0;
        newPlayers[prev.currentPlayerIndex] = player;

        return {
          ...prev,
          players: newPlayers,
          dice,
          doublesCount: 0,
          lastAction: `${player.name} rolled three doubles! Go to jail!`,
        };
      });
      return;
    }

    if (currentPlayer.inJail) {
      if (double) {
        setGameState(prev => {
          const newPlayers = [...prev.players];
          const player = { ...newPlayers[prev.currentPlayerIndex] };
          player.inJail = false;
          player.jailTurns = 0;
          newPlayers[prev.currentPlayerIndex] = player;

          return {
            ...prev,
            players: newPlayers,
            dice,
            doublesCount: newDoublesCount,
            lastAction: `${player.name} rolled doubles and got out of jail!`,
          };
        });
      } else {
        setGameState(prev => {
          const newPlayers = [...prev.players];
          const player = { ...newPlayers[prev.currentPlayerIndex] };
          player.jailTurns += 1;

          if (player.jailTurns >= 3) {
            player.money -= 50;
            player.inJail = false;
            player.jailTurns = 0;
            newPlayers[prev.currentPlayerIndex] = player;

            return {
              ...prev,
              players: newPlayers,
              dice,
              doublesCount: 0,
              lastAction: `${player.name} paid ₹50 to get out of jail`,
            };
          } else {
            newPlayers[prev.currentPlayerIndex] = player;
            return {
              ...prev,
              players: newPlayers,
              dice,
              doublesCount: 0,
              lastAction: `${player.name} is still in jail (turn ${player.jailTurns}/3)`,
            };
          }
        });
      }
      return;
    }

    const totalSteps = dice[0] + dice[1];
    setGameState(prev => {
      const newPlayers = [...prev.players];
      let player = { ...newPlayers[prev.currentPlayerIndex] };
      
      const passedGo = player.position + totalSteps >= BOARD_SIZE;
      player = movePlayer(player, totalSteps);

      if (player.position === 30) {
        player.position = 10;
        player.inJail = true;
        player.jailTurns = 0;
      } else if (player.position === 4 || player.position === 38) {
        const taxAmount = player.position === 4 ? 200 : 100;
        player.money -= taxAmount;
      }

      newPlayers[prev.currentPlayerIndex] = player;

      const newProperty = getPropertyAtPosition(player.position);
      const owner = newPlayers.find(p => p.properties.includes(newProperty.id));

      let lastAction = `${player.name} rolled ${dice[0]} + ${dice[1]} = ${totalSteps}`;
      if (passedGo) {
        lastAction += ' and passed START (+₹200)';
      }
      if (newProperty.name === 'Go To Jail') {
        lastAction += ' - Go to Jail!';
      }

      return {
        ...prev,
        players: newPlayers,
        dice,
        doublesCount: newDoublesCount,
        lastAction,
      };
    });
  }, [gameState, currentPlayer]);

  const handleBuyProperty = useCallback(() => {
    if (gameState.gameOver || propertyOwner || currentProperty.price === 0) return;
    if (currentPlayer.money < currentProperty.price) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = { ...newPlayers[prev.currentPlayerIndex] };
      player.money -= currentProperty.price;
      player.properties = [...player.properties, currentProperty.id];
      newPlayers[prev.currentPlayerIndex] = player;

      const winner = checkGameOver(newPlayers);
      if (winner) {
        onGameOver(winner);
        return {
          ...prev,
          players: newPlayers,
          gameOver: true,
          winner,
          lastAction: `${player.name} bought ${currentProperty.name}`,
        };
      }

      return {
        ...prev,
        players: newPlayers,
        lastAction: `${player.name} bought ${currentProperty.name} for ₹${currentProperty.price}`,
      };
    });
  }, [gameState, currentPlayer, currentProperty, propertyOwner, onGameOver]);

  const handlePayRent = useCallback(() => {
    if (!propertyOwner || propertyOwner.id === currentPlayer.id) return;

    const ownerProperties = PROPERTIES.filter(p => propertyOwner.properties.includes(p.id));
    const rent = calculateRent(currentProperty, propertyOwner, PROPERTIES, ownerProperties);

    if (currentPlayer.money < rent) {
      setGameState(prev => {
        const newPlayers = [...prev.players];
        const player = { ...newPlayers[prev.currentPlayerIndex] };
        const owner = newPlayers.find(p => p.id === propertyOwner.id)!;
        
        owner.money += player.money;
        owner.properties = [...owner.properties, ...player.properties];
        player.money = 0;
        player.properties = [];

        const winner = checkGameOver(newPlayers);
        if (winner) {
          onGameOver(winner);
          return {
            ...prev,
            players: newPlayers,
            gameOver: true,
            winner,
            lastAction: `${player.name} went bankrupt!`,
          };
        }

        return {
          ...prev,
          players: newPlayers,
          lastAction: `${player.name} went bankrupt and lost to ${owner.name}!`,
        };
      });
      return;
    }

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = { ...newPlayers[prev.currentPlayerIndex] };
      const owner = newPlayers.find(p => p.id === propertyOwner.id)!;
      
      player.money -= rent;
      owner.money += rent;

      newPlayers[prev.currentPlayerIndex] = player;
      newPlayers[newPlayers.findIndex(p => p.id === owner.id)] = owner;

      return {
        ...prev,
        players: newPlayers,
        lastAction: `${player.name} paid ₹${rent} rent to ${owner.name}`,
      };
    });
  }, [gameState, currentPlayer, currentProperty, propertyOwner]);

  const handleEndTurn = useCallback(() => {
    if (gameState.gameOver) return;

    setGameState(prev => {
      const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      return {
        ...prev,
        currentPlayerIndex: nextIndex,
        doublesCount: 0,
        dice: [0, 0],
        lastAction: `Turn ended. ${prev.players[nextIndex].name}'s turn`,
      };
    });
  }, [gameState]);

  const handleBuyHouse = useCallback(() => {
    if (!canBuyHouse(currentProperty, currentPlayer, PROPERTIES)) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = { ...newPlayers[prev.currentPlayerIndex] };
      player.money -= currentProperty.houseCost;
      newPlayers[prev.currentPlayerIndex] = player;

      return {
        ...prev,
        players: newPlayers,
        lastAction: `${player.name} bought a house on ${currentProperty.name}`,
      };
    });
  }, [currentProperty, currentPlayer]);

  const handleBuyHotel = useCallback(() => {
    if (!canBuyHotel(currentProperty, currentPlayer, PROPERTIES)) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = { ...newPlayers[prev.currentPlayerIndex] };
      player.money -= currentProperty.hotelCost;
      newPlayers[prev.currentPlayerIndex] = player;

      return {
        ...prev,
        players: newPlayers,
        lastAction: `${player.name} bought a hotel on ${currentProperty.name}`,
      };
    });
  }, [currentProperty, currentPlayer]);

  const hasRolled = gameState.dice[0] > 0 && gameState.dice[1] > 0;
  const canEndTurn = hasRolled && !isDouble(gameState.dice);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white mb-2">🎲 Monopoly</h1>
          <div className="text-white bg-black bg-opacity-30 rounded-lg px-4 py-2 inline-block">
            {gameState.lastAction}
          </div>
        </div>

        {gameState.gameOver && gameState.winner && (
          <div className="bg-yellow-400 rounded-lg p-6 mb-4 text-center">
            <h2 className="text-3xl font-bold mb-2">🎉 Game Over!</h2>
            <p className="text-xl mb-4">{gameState.winner.name} wins!</p>
            <button
              onClick={onRestart}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Sidebar - Players */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-2">Players</h2>
            {gameState.players.map((player) => (
              <PlayerInfo
                key={player.id}
                player={player}
                isCurrentPlayer={player.id === currentPlayer.id}
                allProperties={PROPERTIES}
              />
            ))}
          </div>

          {/* Center - Game Board */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 shadow-2xl">
              <GameBoard
                players={gameState.players}
                currentPlayer={currentPlayer}
                properties={PROPERTIES}
                dice={gameState.dice}
                hasRolled={hasRolled}
                onRollDice={handleRollDice}
                onBuyProperty={!propertyOwner && currentProperty.price > 0 ? handleBuyProperty : undefined}
                onPayRent={propertyOwner && propertyOwner.id !== currentPlayer.id ? handlePayRent : undefined}
                onEndTurn={canEndTurn ? handleEndTurn : undefined}
                canBuy={!propertyOwner && currentProperty.price > 0 && currentPlayer.money >= currentProperty.price}
                canPayRent={!!(propertyOwner && propertyOwner.id !== currentPlayer.id)}
                canEndTurn={canEndTurn}
                isDouble={isDouble(gameState.dice) && hasRolled}
                currentProperty={currentProperty}
                propertyOwner={propertyOwner}
              />
            </div>
          </div>

          {/* Right Sidebar - Current Property */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Current Property</h2>
            <PropertyCard
              property={currentProperty}
              owner={propertyOwner}
              currentPlayer={currentPlayer}
              onBuy={!propertyOwner && currentProperty.price > 0 ? handleBuyProperty : undefined}
              onBuyHouse={
                propertyOwner?.id === currentPlayer.id && canBuyHouse(currentProperty, currentPlayer, PROPERTIES)
                  ? handleBuyHouse
                  : undefined
              }
              onBuyHotel={
                propertyOwner?.id === currentPlayer.id && canBuyHotel(currentProperty, currentPlayer, PROPERTIES)
                  ? handleBuyHotel
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

