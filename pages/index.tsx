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
          content="Craft Random Bro"
        />
        <meta
          name="keywords"
          content="minecraft, crafting"
        />
      </Head>
      <Header />
      <Loadout />
    </>
  );
}
