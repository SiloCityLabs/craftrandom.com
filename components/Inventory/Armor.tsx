import React, { useEffect, useState } from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
//helpers
import { fetchArmorType } from '@/helpers/fetchArmorType';
//Types
import { MinecraftItem, MinecraftSettings } from '../../types/Minecraft';

interface ArmorProps {
    settings: MinecraftSettings;
    reRollCount: number;
}

const Armor: React.FC<ArmorProps> = ({ settings, reRollCount }) => {
    const [armor, setArmor] = useState<Record<string, MinecraftItem | null>>({
        helmet: null,
        chestplate: null,
        leggings: null,
        boots: null,
    });

    useEffect(() => {
        const fetchData = () => {
            if (settings.rollArmor) {
                setArmor({
                    helmet: fetchArmorType('helmet'),
                    chestplate: fetchArmorType('chestplate'),
                    leggings: fetchArmorType('leggings'),
                    boots: fetchArmorType('boots'),
                });
            } else {
                setArmor({
                    helmet: Math.random() < 0.5 ? fetchArmorType('helmet') : null,
                    chestplate: Math.random() < 0.5 ? fetchArmorType('chestplate') : null,
                    leggings: Math.random() < 0.5 ? fetchArmorType('leggings') : null,
                    boots: Math.random() < 0.5 ? fetchArmorType('boots') : null,
                });
            }
        };

        fetchData();
    }, [reRollCount, settings.rollArmor]);

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