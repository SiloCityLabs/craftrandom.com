import dataList from "../json/items.json";
import { randomListItem } from "./randomListItem";
import { MinecraftItem } from "../types/Minecraft";

export function fetchItems(amount: number): MinecraftItem[] {
    const items: MinecraftItem[] = [];

    for (let i = 0; i < amount; i++) {
        let newItem: MinecraftItem; // Declare newItem with type MinecraftItem
        do {
            newItem = randomListItem(dataList) as MinecraftItem;
        } while (items.includes(newItem));

        // Type guard to ensure newItem.additional_info is not undefined
        if (newItem.additional_info) {
            if (newItem.additional_info.stackable && newItem.additional_info.stackable === "Yes") {
                // Access max_stack_size safely, providing a default if undefined
                newItem.amount = Math.floor(Math.random() * (parseInt(newItem.additional_info.max_stack_size ?? '64', 10)));
            } else {
                newItem.amount = 1;
            }
        } else {
            // Handle the case where additional_info is undefined
            newItem.amount = 1;
        }

        items.push(newItem);
    }

    return items;
}