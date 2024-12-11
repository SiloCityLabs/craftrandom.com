import { getArmorList } from "./getArmorList";
import { randomListItem } from "./randomListItem";
//Types
import { MinecraftItem } from '../types/Minecraft';

export function fetchArmorType(type: string = ""): MinecraftItem {
    const dataList = getArmorList(type);
    return randomListItem(dataList);
}
