import { GameState, Player, Property } from '@/types/game';
import { PROPERTIES, BOARD_SIZE, INITIAL_MONEY } from './boardData';

export function rollDice(): [number, number] {
  return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
}

export function isDouble(dice: [number, number]): boolean {
  return dice[0] === dice[1];
}

export function calculateRent(
  property: Property,
  owner: Player,
  allProperties: Property[],
  ownerProperties: Property[]
): number {
  if (property.color === 'railroad') {
    // Rent for railroads: 25, 50, 100, 200 based on number owned
    const railroadsOwned = ownerProperties.filter(p => p.color === 'railroad').length;
    return [25, 50, 100, 200][railroadsOwned - 1] || 200;
  }

  if (property.color === 'utility') {
    // Utilities: 4x or 10x dice roll based on number owned
    const utilitiesOwned = ownerProperties.filter(p => p.color === 'utility').length;
    // For simplicity, we'll use average dice roll of 7
    return utilitiesOwned === 1 ? 28 : 70;
  }

  // Regular properties
  const colorGroup = ownerProperties.filter(p => p.color === property.color && p.group === property.group);
  const hasMonopoly = colorGroup.length === getPropertiesInGroup(property.group).length;

  // Check for houses/hotels (simplified - in real game you'd track this)
  // For now, we'll use base rent or monopoly rent
  if (hasMonopoly) {
    return property.rent * 2; // Double rent with monopoly
  }

  return property.rent;
}

function getPropertiesInGroup(group: number): Property[] {
  return PROPERTIES.filter(p => p.group === group);
}

export function canBuyHouse(property: Property, owner: Player, allProperties: Property[]): boolean {
  if (property.houseCost === 0) return false; // Can't build on railroads, utilities, etc.
  
  const colorGroup = allProperties.filter(
    p => p.color === property.color && p.group === property.group
  );
  const ownedInGroup = colorGroup.filter(p => owner.properties.includes(p.id));
  
  // Must own all properties in color group
  if (ownedInGroup.length !== colorGroup.length) return false;
  
  // Check if player has enough money
  if (owner.money < property.houseCost) return false;
  
  return true;
}

export function canBuyHotel(property: Property, owner: Player, allProperties: Property[]): boolean {
  // Simplified - in real game you'd need 4 houses first
  return canBuyHouse(property, owner, allProperties) && owner.money >= property.hotelCost;
}

export function movePlayer(player: Player, steps: number): Player {
  let newPosition = (player.position + steps) % BOARD_SIZE;
  
  // Pass GO
  if (player.position + steps >= BOARD_SIZE) {
    return {
      ...player,
      position: newPosition,
      money: player.money + 200, // Collect ₹200 for passing START
    };
  }
  
  return {
    ...player,
    position: newPosition,
  };
}

export function checkGameOver(players: Player[]): Player | null {
  // Game ends when only one player has money/properties
  const playersWithAssets = players.filter(
    p => p.money > 0 || p.properties.length > 0
  );
  
  if (playersWithAssets.length === 1) {
    return playersWithAssets[0];
  }
  
  return null;
}

export function getPropertyAtPosition(position: number): Property {
  return PROPERTIES[position];
}

export function createPlayer(name: string, id: string, color: string): Player {
  return {
    id,
    name,
    money: INITIAL_MONEY,
    position: 0,
    properties: [],
    inJail: false,
    jailTurns: 0,
    getOutOfJailCards: 0,
    color,
  };
}

