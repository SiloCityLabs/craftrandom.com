import dataList from "../json/items.json";
import { randomListItem } from "./randomListItem";

export function fetchItems(amount: number = 36): string[] {
    const items: string[] = [];

    for (let i = 0; i < amount; i++) {
        items.push(randomListItem(dataList));
    }

    return items;
}
