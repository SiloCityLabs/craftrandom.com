import dataList from "../json/items.json";
import { randomListItem } from "./randomListItem";
import { MinecraftItem } from "../types/Minecraft";

export function fetchItems(amount: number = 36): MinecraftItem[] {
    const items: MinecraftItem[] = [];

    for (let i = 0; i < amount; i++) {
        let newItem;
        do {
            newItem = randomListItem(dataList);
        } while (items.includes(newItem)); // Check if item already exists

        items.push(newItem);
    }

    return items;
}