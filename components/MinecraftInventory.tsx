import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faGears, faClipboard } from '@fortawesome/free-solid-svg-icons';
//Css
import '../public/styles/components/MinecraftInventory.css'; // Import your CSS file
//Types
import { MinecraftItem, MinecraftSettings } from '../types/Minecraft';
//Components
import CustomModal from './bootstrap/CustomModal';
//Helpers
import { setLocalStorage } from '../helpers/setLocalStorage';

interface InventoryProps {
    seed: string;
    onClick: () => void;
    toggleCommand: () => void;
    settings: MinecraftSettings;
    invItems?: MinecraftItem[];
}

function MinecraftInventory(props: InventoryProps) {
    let itemCount = 0;
    const inventorySlots = 27; // Number of inventory slots
    const craftingSlots = 9; // Number of crafting slots
    const armorSlots = 4; // Number of armor slots
    const offhandSlot = 1; // Offhand slot

    const renderInventorySlots = (): JSX.Element[] => {
        const inventory_slots: JSX.Element[] = [];
        for (let i = 0; i < inventorySlots; i++) {
            pushToArr(inventory_slots, props, i, itemCount, 'inventory');
            itemCount++;
        }
        return inventory_slots;
    };

    const renderCraftingSlots = (): JSX.Element[] => {
        const crafting_slots: JSX.Element[] = [];
        for (let i = 0; i < craftingSlots; i++) {
            pushToArr(crafting_slots, props, i, itemCount, 'crafting');
            itemCount++;
        }
        return crafting_slots;
    };

    const renderArmorSlots = (): JSX.Element[] => {
        const slots: JSX.Element[] = [];
        for (let i = 0; i < armorSlots; i++) {
            slots.push(
                <Row key={`armor-slot-${i}`}>
                    <Col xs={12} className="armor-slot d-flex align-items-center justify-content-center"></Col>
                </Row>
            );
        }
        return slots;
    };

    //Settings
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => setShowModal(!showModal);
    const handleSave = () => {
        props.settings.rangeValue = rangeValue;
        setLocalStorage('craftRandomSettings', props.settings);
        handleModal();
    };
    //Range
    const [rangeValue, setRangeValue] = useState(props.settings.rangeValue); // Initial value

    const handleRangeChange = (event) => {
        setRangeValue(parseInt(event.target.value, 10));
    };


    return (
        <Container className="minecraft-inventory">
            <Row className="seed">
                <Col className='text-center'><span className='fw-bold'>Seed: </span> {props.seed}</Col>
            </Row>
            <hr />
            <Row className="armor-and-offhand">
                <Col xs={1} className="armor-slots">
                    {renderArmorSlots()}
                </Col>

                <Col xs={4} className="player-skin">
                </Col>
                <Col xs={1} className="offhand-slot mt-auto"></Col>
                <Col xs={5} className="d-flex flex-column justify-content-between">
                    <Row id="settings">
                        <Col xs={6}>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Toggle Command</Tooltip>}
                            >
                                <Button
                                    variant="light" // Use a light variant as a base
                                    className="win98-button w-100"
                                    onClick={props.toggleCommand}
                                    size="lg"
                                >
                                    <FontAwesomeIcon icon={faClipboard} size="2x" />
                                </Button>
                            </OverlayTrigger>
                        </Col>
                        <Col xs={6}>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Settings</Tooltip>}
                            >
                                <Button
                                    variant="light" // Use a light variant as a base
                                    className="win98-button w-100"
                                    onClick={handleModal}
                                    size="lg"
                                >
                                    <FontAwesomeIcon icon={faGears} size="2x" />
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row id="roll">
                        <Col>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>ReRoll Loadout</Tooltip>}
                            >
                                <Button
                                    variant="light" // Use a light variant as a base
                                    className="win98-button w-100"
                                    onClick={props.onClick}
                                    size="lg"
                                >
                                    <FontAwesomeIcon icon={faDice} size="2x" />
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="inventory-grid">
                {renderInventorySlots()}
            </Row>
            <Row className="crafting-grid">
                {renderCraftingSlots()}
            </Row>
            <CustomModal
                show={showModal}
                onClose={handleModal}
                onSave={handleSave} // Pass the handleSave function
                title="Settings"
            >
                <Row>
                    <Col>
                        <Form.Label htmlFor="my-range">My Range ({rangeValue})</Form.Label>
                        <Form.Range
                            id="my-range"
                            min={0} // Set minimum value
                            max={36} // Set maximum value
                            value={rangeValue}
                            onChange={handleRangeChange}
                        />
                    </Col>
                </Row>
            </CustomModal>
        </Container>
    );
}

function pushToArr(
    arr: JSX.Element[],
    props: InventoryProps,
    i: number,
    itemCount: number,
    type: string
) {
    arr.push(
        <Col
            key={`${type}-slot-${i}`}
            xs={1}
            className={`${type}-slot d-flex align-items-center justify-content-center`}
        >
            {props.invItems && props.invItems[itemCount] && (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id={`${type}-tooltip-${i}`}> {/* Add unique ID to Tooltip */}
                            {props.invItems[itemCount].name}
                            {props.invItems[itemCount].amount && props.invItems[itemCount]?.amount > 1 && (
                                <>
                                    {" "} - {props.invItems[itemCount].amount}
                                </>
                            )}
                        </Tooltip>
                    }
                >
                    <Image
                        src={`/images/items/${props.invItems[itemCount].image}`}
                        alt={props.invItems[itemCount].name}
                        className="mc-image"
                    />
                </OverlayTrigger>
            )}
        </Col>
    );
}

export default MinecraftInventory;