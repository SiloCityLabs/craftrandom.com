export type MinecraftItem = {
    name: string;
    image: string;
    item_id: string;
    amount: number;
    additional_info: MinecraftItemAddInfo;
}

type MinecraftItemAddInfo = {
    diggable?: string;
    hardness?: string;
    material?: string;
    max_stack_size?: string;
    min_max_state_ids?: string;
    numerical_id?: string;
    stackable?: string;
}

export type MinecraftSettings = {
    rangeValue: number;
    showCommand: boolean;
    rollArmor: boolean;
}

export type InventoryArmor = {
    helmet: MinecraftItem | null;
    chestplate: MinecraftItem | null;
    leggings: MinecraftItem | null;
    boots: MinecraftItem | null;
    shield: MinecraftItem | null;
}