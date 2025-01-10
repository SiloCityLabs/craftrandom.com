'use client';

import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
//Components
import Inventory from "../components/Inventory";
import CustomAlert from "./bootstrap/CustomAlert";
//Helpers
import { generateSeed } from "../helpers/generateSeed";
import { fetchItems } from "../helpers/fetchItems";
import { getLocalStorage } from "../helpers/getLocalStorage";
import { setLocalStorage } from "../helpers/setLocalStorage";
//Types
import { MinecraftItem, MinecraftSettings } from "../types/Minecraft";
//Utils
import { sendEvent } from "@/utils/gtag";

const defaultSettings: MinecraftSettings = {
    rangeValue: 36,
    showCommand: true,
    rollArmor: true
};

function Loadout() {
    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState<MinecraftSettings>(defaultSettings);
    const [showCommand, setShowCommand] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const codeRef = useRef<HTMLPreElement>(null);
    const [loadout, setLoadout] = useState<{
        seed: string;
        items: MinecraftItem[];
        code: string;
    }>({
        seed: "",
        items: [],
        code: "",
    });

    const generateLoadout = async (currentSettings: MinecraftSettings) => {
        sendEvent("button_click", {
            button_id: "generateLoadout",
            label: "InventoryGenerateLoadout",
            category: "Inventory",
        });

        try {
            const items = fetchItems(currentSettings.rangeValue);
            const seed = generateSeed();
            const code = generateGiveCommand(items);

            setLoadout({ seed, items, code });
        } catch (error: any) {
            console.error("Error generating loadout:", error.message);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const fetchData = async () => {
            const storedSettings = getLocalStorage('craftRandomSettings') ?? settings;
            const completeSettings = { ...defaultSettings, ...storedSettings };

            setSettings(completeSettings);
            setShowCommand(completeSettings.showCommand);

            await generateLoadout(completeSettings);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const generateGiveCommand = (items: MinecraftItem[]) => {
        return '/give @s ' + items.map(item => `${item.item_id} ${item.amount > 1 ? item.amount : ''}`).join(' ');
    };

    const toggleCommand = () => {
        const updatedSettings = { ...settings, showCommand: !showCommand };
        setSettings(updatedSettings);
        setLocalStorage('craftRandomSettings', updatedSettings);
        setShowCommand(updatedSettings.showCommand);
    };

    const handleCopyCode = () => {
        sendEvent("button_click", {
            button_id: "handleCopyCode",
            label: "InventoryCopyCode",
            category: "Inventory",
        });

        if (codeRef.current) {
            navigator.clipboard.writeText(codeRef.current.textContent || "");
            setShowAlert(true);
        }
    };

    const handleClick = () => {
        generateLoadout(settings);
    };

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <Container id="random-class" className="shadow-lg p-3 bg-body rounded">
            {showAlert && (
                <CustomAlert
                    show={showAlert}
                    variant="success"
                    message="Code copied to clipboard!"
                    onClose={() => setShowAlert(false)}
                />
            )}
            <Inventory
                seed={loadout.seed}
                onClick={handleClick}
                toggleCommand={toggleCommand}
                invItems={loadout.items}
                settings={settings}
            />
            {showCommand && <hr />}
            {showCommand && (
                <Row id="give-command" className="justify-content-md-center">
                    <Col md={8}>
                        <code ref={codeRef}>{loadout.code}</code>
                    </Col>
                    <Col xs={12} className="text-center mt-2">
                        <Button variant="minecraft" onClick={handleCopyCode}>
                            Copy Code
                        </Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Loadout;