export type MinecraftItem = {
    name: string;
    image: string;
    item_id: string;
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