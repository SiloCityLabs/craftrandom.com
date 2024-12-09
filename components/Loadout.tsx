import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
//Components
import MinecraftInventory from "../components/MinecraftInventory";
import CustomAlert from "./bootstrap/CustomAlert";
//Helpers
import { generateSeed } from "../helpers/generateSeed";
import { fetchItems } from "../helpers/fetchItems";
import { MinecraftItem } from '../types/Minecraft';
import { truncate } from "fs/promises";

function Loadout() {
    const [containerClass, setContainerClass] = useState("hidden");
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
        fetchLoadoutData(setData, setContainerClass);
    }, []);

    const handleClick = () => {
        fetchLoadoutData(setData, setContainerClass);
    };

    const toggleCommand = () => {
        setShowCode(!showCode);
    };

    const [showCode, setShowCode] = useState(true);
    const codeRef = useRef<HTMLPreElement>(null); // Reference for the code block
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
                <MinecraftInventory seed={seed} onClick={handleClick} toggleCommand={toggleCommand} invItems={items} />
                {showCode && <hr />}
                {showCode && ( // Conditionally render the code row
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


function fetchLoadoutData(setData, setContainerClass) {
    try {
        const items: MinecraftItem[] = fetchItems();
        console.log('Loadout Items: ', items);
        const seed = generateSeed();
        let code = '/give @s ';

        items.forEach((item: MinecraftItem) => {
            code += `${item.item_id} `;
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
