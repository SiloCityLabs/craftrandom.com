import React from 'react';
import { MinecraftItem } from '../../types/Minecraft';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface SlotsProps {
    items: MinecraftItem[];
}

const Slots: React.FC<SlotsProps> = ({ items }) => {
    let itemCount = 0;

    return (
        <div>
            {[...Array(4)].map((_, rowIndex) => (
                <div key={rowIndex} className="inv-row">
                    {Array.from({ length: 9 }).map((_, slotIndex) => (
                        <div key={slotIndex} className="inventory-slot">
                            <Image
                                src={`/images/items/${items[itemCount].image}`}
                                alt={items[itemCount].name}
                                className="mc-image"
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Slots;