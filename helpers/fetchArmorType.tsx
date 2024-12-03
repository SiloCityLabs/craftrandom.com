import { getArmorList } from "./getArmorList";
import { randomListItem } from "./randomListItem";

export function fetchArmorType(type: string = ""): string {
    const dataList = getArmorList(type);
    return randomListItem(dataList);
}
