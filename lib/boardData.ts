import { Property, PropertyColor } from '@/types/game';

export const BOARD_SIZE = 40;

export const PROPERTIES: Property[] = [
  { id: 0, name: 'शुरू (START)', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 0 },
  { id: 1, name: 'Chandni Chowk', price: 60, rent: 2, rentWithHouse: [10, 30, 90, 160, 250], rentWithHotel: 250, houseCost: 50, hotelCost: 50, color: 'brown', group: 1, position: 1 },
  { id: 2, name: 'Community Chest', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 2 },
  { id: 3, name: 'Old Delhi', price: 60, rent: 4, rentWithHouse: [20, 60, 180, 320, 450], rentWithHotel: 450, houseCost: 50, hotelCost: 50, color: 'brown', group: 1, position: 3 },
  { id: 4, name: 'Income Tax', price: 0, rent: 200, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 4 },
  { id: 5, name: 'Mumbai Central', price: 200, rent: 25, rentWithHouse: [50, 100, 200], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'railroad', group: 9, position: 5 },
  { id: 6, name: 'Pune', price: 100, rent: 6, rentWithHouse: [30, 90, 270, 400, 550], rentWithHotel: 550, houseCost: 50, hotelCost: 50, color: 'lightblue', group: 2, position: 6 },
  { id: 7, name: 'Chance', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 7 },
  { id: 8, name: 'Jaipur', price: 100, rent: 6, rentWithHouse: [30, 90, 270, 400, 550], rentWithHotel: 550, houseCost: 50, hotelCost: 50, color: 'lightblue', group: 2, position: 8 },
  { id: 9, name: 'Ahmedabad', price: 120, rent: 8, rentWithHouse: [40, 100, 300, 450, 600], rentWithHotel: 600, houseCost: 50, hotelCost: 50, color: 'lightblue', group: 2, position: 9 },
  { id: 10, name: 'Jail', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 10 },
  { id: 11, name: 'Lucknow', price: 140, rent: 10, rentWithHouse: [50, 150, 450, 625, 750], rentWithHotel: 750, houseCost: 100, hotelCost: 100, color: 'pink', group: 3, position: 11 },
  { id: 12, name: 'Electric Company', price: 150, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'utility', group: 10, position: 12 },
  { id: 13, name: 'Kanpur', price: 140, rent: 10, rentWithHouse: [50, 150, 450, 625, 750], rentWithHotel: 750, houseCost: 100, hotelCost: 100, color: 'pink', group: 3, position: 13 },
  { id: 14, name: 'Nagpur', price: 160, rent: 12, rentWithHouse: [60, 180, 500, 700, 900], rentWithHotel: 900, houseCost: 100, hotelCost: 100, color: 'pink', group: 3, position: 14 },
  { id: 15, name: 'Howrah Station', price: 200, rent: 25, rentWithHouse: [50, 100, 200], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'railroad', group: 9, position: 15 },
  { id: 16, name: 'Hyderabad', price: 180, rent: 14, rentWithHouse: [70, 200, 550, 750, 950], rentWithHotel: 950, houseCost: 100, hotelCost: 100, color: 'orange', group: 4, position: 16 },
  { id: 17, name: 'Community Chest', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 17 },
  { id: 18, name: 'Chennai', price: 180, rent: 14, rentWithHouse: [70, 200, 550, 750, 950], rentWithHotel: 950, houseCost: 100, hotelCost: 100, color: 'orange', group: 4, position: 18 },
  { id: 19, name: 'Bangalore', price: 200, rent: 16, rentWithHouse: [80, 220, 600, 800, 1000], rentWithHotel: 1000, houseCost: 100, hotelCost: 100, color: 'orange', group: 4, position: 19 },
  { id: 20, name: 'Free Parking', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 20 },
  { id: 21, name: 'Kolkata', price: 220, rent: 18, rentWithHouse: [90, 250, 700, 875, 1050], rentWithHotel: 1050, houseCost: 150, hotelCost: 150, color: 'red', group: 5, position: 21 },
  { id: 22, name: 'Chance', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 22 },
  { id: 23, name: 'Surat', price: 220, rent: 18, rentWithHouse: [90, 250, 700, 875, 1050], rentWithHotel: 1050, houseCost: 150, hotelCost: 150, color: 'red', group: 5, position: 23 },
  { id: 24, name: 'Delhi', price: 240, rent: 20, rentWithHouse: [100, 300, 750, 925, 1100], rentWithHotel: 1100, houseCost: 150, hotelCost: 150, color: 'red', group: 5, position: 24 },
  { id: 25, name: 'New Delhi Station', price: 200, rent: 25, rentWithHouse: [50, 100, 200], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'railroad', group: 9, position: 25 },
  { id: 26, name: 'Gurgaon', price: 260, rent: 22, rentWithHouse: [110, 330, 800, 975, 1150], rentWithHotel: 1150, houseCost: 150, hotelCost: 150, color: 'yellow', group: 6, position: 26 },
  { id: 27, name: 'Noida', price: 260, rent: 22, rentWithHouse: [110, 330, 800, 975, 1150], rentWithHotel: 1150, houseCost: 150, hotelCost: 150, color: 'yellow', group: 6, position: 27 },
  { id: 28, name: 'Water Works', price: 150, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'utility', group: 10, position: 28 },
  { id: 29, name: 'Bandra (Mumbai)', price: 280, rent: 24, rentWithHouse: [120, 360, 850, 1025, 1200], rentWithHotel: 1200, houseCost: 150, hotelCost: 150, color: 'yellow', group: 6, position: 29 },
  { id: 30, name: 'Go To Jail', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 30 },
  { id: 31, name: 'South Mumbai', price: 300, rent: 26, rentWithHouse: [130, 390, 900, 1100, 1275], rentWithHotel: 1275, houseCost: 200, hotelCost: 200, color: 'green', group: 7, position: 31 },
  { id: 32, name: 'South Delhi', price: 300, rent: 26, rentWithHouse: [130, 390, 900, 1100, 1275], rentWithHotel: 1275, houseCost: 200, hotelCost: 200, color: 'green', group: 7, position: 32 },
  { id: 33, name: 'Community Chest', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 33 },
  { id: 34, name: 'Connaught Place', price: 320, rent: 28, rentWithHouse: [150, 450, 1000, 1200, 1400], rentWithHotel: 1400, houseCost: 200, hotelCost: 200, color: 'green', group: 7, position: 34 },
  { id: 35, name: 'Chennai Central', price: 200, rent: 25, rentWithHouse: [50, 100, 200], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'railroad', group: 9, position: 35 },
  { id: 36, name: 'Chance', price: 0, rent: 0, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 36 },
  { id: 37, name: 'Marine Drive', price: 350, rent: 35, rentWithHouse: [175, 500, 1100, 1300, 1500], rentWithHotel: 1500, houseCost: 200, hotelCost: 200, color: 'darkblue', group: 8, position: 37 },
  { id: 38, name: 'Luxury Tax', price: 0, rent: 100, rentWithHouse: [], rentWithHotel: 0, houseCost: 0, hotelCost: 0, color: 'none', group: 0, position: 38 },
  { id: 39, name: 'Juhu Beach', price: 400, rent: 50, rentWithHouse: [200, 600, 1400, 1700, 2000], rentWithHotel: 2000, houseCost: 200, hotelCost: 200, color: 'darkblue', group: 8, position: 39 },
];

export const PLAYER_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Light Salmon
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#85C1E2', // Sky Blue
];

export const INITIAL_MONEY = 1500;

