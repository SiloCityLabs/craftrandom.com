import dataList from "../json/tool_type.json";
import { randomListItem } from "./randomListItem";

export function fetchToolType(): string {
    return randomListItem(dataList);
}
