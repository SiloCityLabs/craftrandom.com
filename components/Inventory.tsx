import React, { useState } from 'react';
import { Row, Col, Button, Image, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faGears, faClipboard } from '@fortawesome/free-solid-svg-icons';
//Css
import '../public/styles/components/Inventory.css';
//Types
import { MinecraftItem, MinecraftSettings } from '../types/Minecraft';
//Components
import Armor from './Inventory/Armor';
import Slots from './Inventory/Slots';
import CustomModal from './bootstrap/CustomModal';
//Helpers
import { setLocalStorage } from '../helpers/setLocalStorage';
//Utils
import { sendEvent } from "@/utils/gtag";

interface InventoryProps {
    seed: string;
    onClick: () => void;
    toggleCommand: () => void;
    settings: MinecraftSettings;
    invItems: MinecraftItem[];
}

function Inventory(props: InventoryProps) {
    //Roll Click
    const [reRollCount, setReRollCount] = useState(0);
    const handleRollClick = () => {
        props.onClick();
        setReRollCount(prevCount => prevCount + 1);
    };
    //Settings
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => setShowModal(!showModal);
    const handleSave = () => {
        sendEvent("button_click", {
            button_id: "saveSettings",
            label: "InventorySaveSettings",
            category: "Inventory",
        });

        props.settings.rangeValue = rangeValue;
        props.settings.rollArmor = rollArmor;
        setLocalStorage('craftRandomSettings', props.settings);
        handleModal();
    };
    //rangeValue
    const [rangeValue, setRangeValue] = useState(props.settings.rangeValue);

    const handleRangeChange = (event) => {
        setRangeValue(parseInt(event.target.value, 10));
    };
    //rollArmor
    const [rollArmor, setRollArmor] = useState(props.settings.rollArmor);

    const handleRollArmorChange = (event) => {
        setRollArmor(event.target.checked);
    };

    return (
        <div className="inventory-container">
            <div id='worldSeed' className='text-center'>
                <span className='fw-bold'>Seed: </span> {props.seed}
            </div>
            <hr />
            <div className="top-row">
                <Armor settings={props.settings} reRollCount={reRollCount} />
                <div className="skin-slot">
                    <Image
                        src={`/images/steve.webp`}
                        alt="steve"
                    />
                </div>
                <div className="off-hand-col">
                    <div className="off-hand">{/* Off-hand item */}</div>
                </div>
                <div className="actions">
                    <div className="top-actions">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Toggle Command</Tooltip>}
                        >
                            <Button
                                variant="light"
                                className="win98-button action-button"
                                onClick={props.toggleCommand}
                            >
                                <FontAwesomeIcon icon={faClipboard} size="2x" />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Settings</Tooltip>}
                        >
                            <Button
                                variant="light"
                                className="win98-button action-button"
                                onClick={handleModal}
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faGears} size="2x" />
                            </Button>
                        </OverlayTrigger>
                    </div>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>ReRoll Loadout</Tooltip>}
                    >
                        <Button
                            id='rollBtn'
                            variant="light"
                            className="win98-button action-button"
                            onClick={handleRollClick}
                        >
                            <FontAwesomeIcon icon={faDice} size="2x" />
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>
            <Slots items={props.invItems} />
            <CustomModal
                show={showModal}
                onClose={handleModal}
                onSave={handleSave}
                title="Settings"
            >
                <Row>
                    <Col>
                        <Form.Label htmlFor="rangeValue">Inventory Range ({rangeValue})</Form.Label>
                        <Form.Range
                            id="rangeValue"
                            min={0}
                            max={32}
                            value={rangeValue}
                            onChange={handleRangeChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="rollArmor">Always roll armor:</Form.Label>
                        <Form.Check
                            type="switch"
                            id="rollArmor"
                            onChange={handleRollArmorChange}
                            checked={rollArmor}
                        />
                    </Col>
                </Row>
            </CustomModal>
        </div>
    );
}

export default Inventory;