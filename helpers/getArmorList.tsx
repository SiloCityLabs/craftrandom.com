import helmetList from "../json/armor/helmet.json";
import chestplateList from "../json/armor/chestplate.json";
import leggingList from "../json/armor/leggings.json";
import bootList from "../json/armor/boots.json";
import horseList from "../json/armor/horse.json";

const data: Record<string, any> = {
    helmet: helmetList,
    chestplate: chestplateList,
    legging: leggingList,
    boot: bootList,
    horse: horseList,
};

export function getArmorList(game: string): any {
    return data[game] || {};
}
