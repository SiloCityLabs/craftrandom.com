'use client';

import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
//Components
import MinecraftInventory from "../components/MinecraftInventory";
import CustomAlert from "./bootstrap/CustomAlert";
//Helpers
import { generateSeed } from "../helpers/generateSeed";
import { fetchItems } from "../helpers/fetchItems";
import { getLocalStorage } from "../helpers/getLocalStorage";
import { setLocalStorage } from "../helpers/setLocalStorage";
//Types
import { MinecraftItem, MinecraftSettings } from "../types/Minecraft";

const defaultSettings: MinecraftSettings = { rangeValue: 36, showCommand: true };

function Loadout() {
    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState<MinecraftSettings>(defaultSettings);
    const [containerClass, setContainerClass] = useState("hidden");
    const [showCommand, setShowCommand] = useState(true);
    const codeRef = useRef<HTMLPreElement>(null); // Reference for the code block
    const [showAlert, setShowAlert] = useState<{ show: boolean; variant?: string; message?: string }>({
        show: false,
    });
    const [data, setData] = useState<{
        seed: string;
        items: MinecraftItem[]; // Correct type for items
        code: string;
    }>({
        seed: "",
        items: [], // Initialize as an empty array
        code: "",
    });


    useEffect(() => {
        const fetchData = async () => {
            const storedSettings = getLocalStorage('craftRandomSettings') ?? settings;

            setSettings(storedSettings);
            setShowCommand(storedSettings.showCommand);

            await fetchLoadoutData(setData, setContainerClass, storedSettings); // Wait for data fetching
            setIsLoading(false); // Update isLoading after data is fetched
        };

        fetchData();
    }, []);

    //Hide/Show Command
    const toggleCommand = () => {
        settings.showCommand = !showCommand;
        setLocalStorage('craftRandomSettings', settings);
        setShowCommand(settings.showCommand);
    };

    const handleCopyCode = () => {
        if (codeRef.current) {
            navigator.clipboard.writeText(codeRef.current.textContent || "");
            // Show a success message
            setShowAlert({
                show: true,
                variant: 'success',
                message: 'Code copied to clipboard!'
            });
        }
    };

    const {
        seed,
        items,
        code
    } = data;

    const handleClick = () => {
        fetchLoadoutData(setData, setContainerClass, settings);
    };

    // Render loading state while fetching data
    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <>
            <Container
                id="random-class"
                className={`${containerClass} shadow-lg p-3 bg-body rounded`}
            >
                <CustomAlert
                    variant={showAlert.variant || 'info'}
                    message={showAlert.message || ''}
                    show={showAlert.show}
                    onClose={() => setShowAlert({
                        show: false
                    })}
                />
                <MinecraftInventory seed={seed} onClick={handleClick} toggleCommand={toggleCommand} invItems={items} settings={settings} />
                {showCommand && <hr />}
                {showCommand && ( // Conditionally render the code row
                    <Row id="give-command" className="justify-content-md-center">
                        <Col md={8}>
                            <code ref={codeRef}>
                                {code}
                            </code>
                        </Col>
                        <Col xs={12} className="text-center mt-2">
                            <Button variant="minecraft" onClick={handleCopyCode}>
                                Copy Code
                            </Button>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
}


function fetchLoadoutData(setData, setContainerClass, craftSettings) {
    try {
        const items: MinecraftItem[] = fetchItems(craftSettings.rangeValue);
        const seed = generateSeed();
        let code = '/give @s ';

        items.forEach((item: MinecraftItem) => {
            code += `${item.item_id} ${item.amount > 1 ? item.amount : ''} `;
        });


        setData({
            seed,
            items,
            code
        });
        setContainerClass("");
    } catch (error: any) {
        console.error(error.message); // Handle errors centrally
    }
}


export default Loadout;
