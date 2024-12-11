import helmetList from "../json/armor/helmet.json";
import chestplateList from "../json/armor/chestplate.json";
import leggingsList from "../json/armor/leggings.json";
import bootsList from "../json/armor/boots.json";
import horseList from "../json/armor/horse.json";

const data: Record<string, any> = {
    helmet: helmetList,
    chestplate: chestplateList,
    leggings: leggingsList,
    boots: bootsList,
    horse: horseList,
};

export function getArmorList(game: string): any {
    return data[game] || {};
}
