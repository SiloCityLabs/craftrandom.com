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
                    {Array.from({ length: 9 }, (_, slotIndex) => {
                        const currentItem = items[itemCount];
                        itemCount++;

                        if (currentItem) { // Check if currentItem is defined
                            return (
                                <div key={slotIndex} className="inventory-slot">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                {currentItem.name}
                                                {currentItem.amount && currentItem?.amount > 1 && (
                                                    <>
                                                        {" "}
                                                        - {currentItem.amount}
                                                    </>
                                                )}
                                            </Tooltip>
                                        }
                                    >
                                        <div>
                                            <Image
                                                src={`/images/items/${currentItem.image}`}
                                                alt={currentItem.name}
                                                className="mc-image"
                                            />
                                            {currentItem.amount && currentItem.amount > 1 && (
                                                <span className="amount-overlay">
                                                    {currentItem.amount}
                                                </span>
                                            )}
                                        </div>
                                    </OverlayTrigger>
                                </div>
                            );
                        } else {
                            return <div key={slotIndex} className="inventory-slot"></div>; // Empty slot
                        }
                    })}
                </div>
            ))}
        </div>
    );
};

export default Slots;