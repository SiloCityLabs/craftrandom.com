import React from "react";
import Head from "next/head";
import { Container, Row, Col } from 'react-bootstrap';
import Header from "../components/Header";
import Loadout from "../components/Loadout";
import MinecraftInventory from "../components/MinecraftInventory";

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
      <MinecraftInventory />

    </>
  );
}
