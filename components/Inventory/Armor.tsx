import React, { useEffect, useState } from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
//Types
import { InventoryArmor } from '../../types/Minecraft';

interface ArmorProps {
    armor: InventoryArmor;
}

const Armor: React.FC<ArmorProps> = ({ armor }) => {

    return (
        <div className="armor-slots-col">
            {Object.entries(armor).map(([slot, armorItem]) => {
                if (slot !== 'shield') {
                    return (
                        <div key={slot} className="armor-slots">
                            {armorItem && ( // Separate check for armorItem
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>{armorItem.name}</Tooltip>}
                                >
                                    <Image
                                        src={`/images/items/${armorItem.image}`}
                                        alt={armorItem.name}
                                        className="mc-image"
                                    />
                                </OverlayTrigger>
                            )}
                        </div>
                    );
                }
                return null; // Or you can omit the 'else' entirely
            })}
        </div>
    );
};

export default Armor;