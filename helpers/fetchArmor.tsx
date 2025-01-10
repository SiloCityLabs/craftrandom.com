//helpers
import { fetchArmorType } from '@/helpers/fetchArmorType';
//types
import { InventoryArmor, MinecraftItem } from "../types/Minecraft";

export function fetchArmor(rollArmor: boolean): InventoryArmor {
    let armor: InventoryArmor = {
        helmet: null,
        chestplate: null,
        leggings: null,
        boots: null,
        shield: null
    };

    const shield: MinecraftItem = {
        "name": "Shield",
        "image": "shield.png",
        "item_id": "minecraft:shield",
        "amount": 1,
        "additional_info": {
            "numerical_id": "442",
            "stackable": "No"
        }
    };

    if (rollArmor) {
        armor = {
            helmet: fetchArmorType('helmet'),
            chestplate: fetchArmorType('chestplate'),
            leggings: fetchArmorType('leggings'),
            boots: fetchArmorType('boots'),
            shield: shield
        };
    } else {
        armor = {
            helmet: Math.random() < 0.5 ? fetchArmorType('helmet') : null,
            chestplate: Math.random() < 0.5 ? fetchArmorType('chestplate') : null,
            leggings: Math.random() < 0.5 ? fetchArmorType('leggings') : null,
            boots: Math.random() < 0.5 ? fetchArmorType('boots') : null,
            shield: Math.random() < 0.5 ? shield : null,
        };
    }

    return armor;
}