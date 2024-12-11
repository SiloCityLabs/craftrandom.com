import React, { useEffect, useState } from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
//helpers
import { fetchArmorType } from '@/helpers/fetchArmorType';

const Armor: React.FC = () => {
    const armor = {
        helmet: fetchArmorType('helmet'),
        chestplate: fetchArmorType('chestplate'),
        leggings: fetchArmorType('leggings'),
        boots: fetchArmorType('boots'),
    };

    console.log('armor', armor);

    return (
        <div className="armor-slots-col">
            {Object.entries(armor).map(([slot, armorItem]) => (
                <div key={slot} className="armor-slots">
                    {armorItem && (
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
            ))}
        </div>
    );
};

export default Armor;