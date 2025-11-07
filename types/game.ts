export type PropertyColor =
  | 'brown'
  | 'lightblue'
  | 'pink'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'green'
  | 'darkblue'
  | 'railroad'
  | 'utility'
  | 'none';

export interface Property {
  id: number;
  name: string;
  price: number;
  rent: number;
  rentWithHouse: number[];
  rentWithHotel: number;
  houseCost: number;
  hotelCost: number;
  color: PropertyColor;
  group: number;
  position: number;
}

export interface Player {
  id: string;
  name: string;
  money: number;
  position: number;
  properties: number[];
  inJail: boolean;
  jailTurns: number;
  getOutOfJailCards: number;
  color: string;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  properties: Property[];
  dice: [number, number];
  doublesCount: number;
  gameStarted: boolean;
  gameOver: boolean;
  winner: Player | null;
  lastAction: string;
}

export type GameAction =
  | { type: 'ROLL_DICE' }
  | { type: 'MOVE_PLAYER'; steps: number }
  | { type: 'BUY_PROPERTY'; propertyId: number }
  | { type: 'PAY_RENT'; propertyId: number; amount: number }
  | { type: 'BUY_HOUSE'; propertyId: number }
  | { type: 'BUY_HOTEL'; propertyId: number }
  | { type: 'END_TURN' }
  | { type: 'GO_TO_JAIL' }
  | { type: 'GET_OUT_OF_JAIL' }
  | { type: 'PASS_GO' }
  | { type: 'INIT_GAME'; players: Player[] };

