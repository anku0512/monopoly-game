# 🎲 Monopoly Game

A classic Monopoly game built with Next.js, TypeScript, and Tailwind CSS. Play the standard Monopoly game with 2-8 players, no login required!

## Features

- ✅ Standard Monopoly rules
- ✅ 2-8 players support
- ✅ Property buying and selling
- ✅ Rent collection
- ✅ Houses and hotels
- ✅ Jail mechanics
- ✅ Bankruptcy handling
- ✅ Beautiful, responsive UI
- ✅ Fast and optimized performance

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Game Rules

### Setup
- Choose number of players (2-8)
- Enter player names
- Each player starts with ₹1,500

### Gameplay
- Roll dice to move around the board
- Buy properties when you land on them
- Pay rent when landing on owned properties
- Build houses and hotels to increase rent
- Collect ₹200 when passing START
- Go to jail on three doubles or landing on "Go to Jail"
- Game ends when only one player remains with assets

### Winning
- Last player with money and properties wins!

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
monopoly-game/
├── app/              # Next.js app directory
│   ├── page.tsx      # Main game page
│   └── layout.tsx    # Root layout
├── components/       # React components
│   ├── Game.tsx      # Main game component
│   ├── GameBoard.tsx # Board visualization
│   ├── PlayerInfo.tsx # Player status
│   ├── PlayerSetup.tsx # Game setup
│   └── PropertyCard.tsx # Property details
├── lib/              # Game logic
│   ├── boardData.ts  # Board and property data
│   └── gameLogic.ts  # Game mechanics
└── types/            # TypeScript types
    └── game.ts       # Game type definitions
```

## Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 19** - UI library

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
