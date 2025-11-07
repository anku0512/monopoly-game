'use client';

import { Property, Player } from '@/types/game';

interface PropertyCardProps {
  property: Property;
  owner?: Player;
  currentPlayer: Player;
  onBuy?: () => void;
  onBuyHouse?: () => void;
  onBuyHotel?: () => void;
}

export default function PropertyCard({
  property,
  owner,
  currentPlayer,
  onBuy,
  onBuyHouse,
  onBuyHotel,
}: PropertyCardProps) {
  if (property.price === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-300">
        <h3 className="font-bold text-lg mb-2">{property.name}</h3>
        <p className="text-gray-600 text-sm">
          {(property.name === 'GO' || property.name === 'शुरू (START)') && 'Collect ₹200 when you pass'}
          {property.name === 'Jail' && 'Just visiting'}
          {property.name === 'Free Parking' && 'Free space'}
          {property.name === 'Go To Jail' && 'Go directly to jail'}
          {property.name === 'Income Tax' && 'Pay ₹200'}
          {property.name === 'Luxury Tax' && 'Pay ₹100'}
          {property.name === 'Chance' && 'Draw a Chance card'}
          {property.name === 'Community Chest' && 'Draw a Community Chest card'}
        </p>
      </div>
    );
  }

  const isOwned = !!owner;
  const isOwnedByCurrentPlayer = owner?.id === currentPlayer.id;
  const canBuy = !isOwned && currentPlayer.money >= property.price;

  // Get icon based on property type
  const getPropertyIcon = () => {
    if (property.color === 'railroad') return '🚂';
    if (property.color === 'utility') return '⚡';
    if (property.name.includes('Mumbai') || property.name.includes('Delhi') || property.name.includes('Bangalore') || property.name.includes('Chennai') || property.name.includes('Kolkata')) {
      return '🏙️'; // Major city - building icon
    }
    if (property.name.includes('Beach') || property.name.includes('Drive') || property.name.includes('Place')) {
      return '🏛️'; // Premium area - monument icon
    }
    if (property.name.includes('Chowk') || property.name.includes('Old')) {
      return '🕌'; // Historical area - monument/scene
    }
    return '🏘️'; // Default - building icon
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-300"
      style={{
        borderTopColor: property.color !== 'none' ? getColorClass(property.color) : undefined,
        borderTopWidth: property.color !== 'none' ? '8px' : undefined,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-4xl">{getPropertyIcon()}</div>
        <h3 className="font-bold text-lg text-gray-900">{property.name}</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-bold text-gray-900">₹{property.price}</span>
        </div>
        
        {property.rent > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Rent:</span>
            <span className="font-bold text-gray-900">₹{property.rent}</span>
          </div>
        )}

        {property.houseCost > 0 && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">House Cost:</span>
              <span className="font-bold text-gray-900">₹{property.houseCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hotel Cost:</span>
              <span className="font-bold text-gray-900">₹{property.hotelCost}</span>
            </div>
          </>
        )}

        {isOwned && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Owner:</span>
              <div
                className="w-4 h-4 rounded-full border border-gray-800"
                style={{ backgroundColor: owner.color }}
              />
              <span className="font-semibold text-gray-900">{owner.name}</span>
            </div>
          </div>
        )}

        {!isOwned && canBuy && onBuy && (
          <button
            onClick={onBuy}
            className="w-full mt-3 py-2.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md text-gray-900"
            style={{ color: 'white' }}
          >
            Buy Property (₹{property.price})
          </button>
        )}

        {isOwnedByCurrentPlayer && property.houseCost > 0 && (
          <div className="mt-2 space-y-2">
            {onBuyHouse && (
              <button
                onClick={onBuyHouse}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-xs shadow-md"
              >
                Buy House (₹{property.houseCost})
              </button>
            )}
            {onBuyHotel && (
              <button
                onClick={onBuyHotel}
                className="w-full py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors text-xs shadow-md"
              >
                Buy Hotel (₹{property.hotelCost})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function getColorClass(color: string): string {
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
}

