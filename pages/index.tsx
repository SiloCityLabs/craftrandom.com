import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Loadout from "../components/Loadout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Craft Random</title>
        <meta
          name="description"
          content="CraftRandom is a simple, yet powerful tool designed to generate a randomized Minecraft inventory."
        />
        <meta
          name="keywords"
          content="Minecraft, Minecraft game, Minecraft download, Minecraft server, Minecraft mods, Minecraft skins, Minecraft texture packs, Minecraft gameplay,
          Minecraft updates, Minecraft news, Minecraft community, Play Minecraft, Java Edition, Bedrock Edition, Minecraft 1.19, Minecraft 1.20, Survival mode,
          Creative mode, Adventure mode, Spectator mode, Hardcore mode, Redstone, Nether, End, Enchanting, Brewing, Farming, Building, Mining, Crafting, Creepers,
          Zombies, Skeletons, Endermen, Villagers, Iron Golems, Vanilla server, Modded server, PvP server, Survival server, Creative server, Mini-games server,
          Minecraft forums, Minecraft Discord, Minecraft builders, Minecraft YouTubers, Minecraft streamers, how to build a house in Minecraft,
          best Minecraft servers for beginners, Minecraft redstone tutorials, download Minecraft skins, latest Minecraft update news"
        />
      </Head>
      <Header />
      <Loadout />
    </>
  );
}
