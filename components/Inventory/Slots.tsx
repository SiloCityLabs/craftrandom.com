import React from 'react';

interface SlotsProps {
    // You can add props here if needed, like an array of items to display
    // items: Item[];
}

const Slots: React.FC<SlotsProps> = ({ /* items */ }) => {
    return (
        <div>
            {[...Array(4)].map((_, rowIndex) => (
                <div key={rowIndex} className="inv-row">
                    {Array.from({ length: 9 }).map((_, slotIndex) => (
                        <div key={slotIndex} className="inventory-slot">
                            {/* You can access items here using items[rowIndex * 9 + slotIndex] */}
                            {/* Example: {items[rowIndex * 9 + slotIndex]?.name} */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Slots;