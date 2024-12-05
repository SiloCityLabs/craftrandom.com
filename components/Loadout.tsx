import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
//Helpers
import { generateSeed } from "../helpers/generateSeed";
import { fetchArmorType } from "../helpers/fetchArmorType";
import { fetchToolType } from "../helpers/fetchToolType";

function Loadout() {
    const [containerClass, setContainerClass] = useState("hidden");
    const [data, setData] = useState({
        seed: "",
        armor: {
            helmet: "",
            chestplate: "",
            legging: "",
            boot: "",
        },
        tools: {
            shovel: "",
            pickaxe: "",
            axe: "",
            hoe: "",
        }
    });

    useEffect(() => {
        fetchLoadoutData(setData, setContainerClass);
    }, []);

    const handleClick = async () => {
        fetchLoadoutData(setData, setContainerClass);
    };

    const {
        seed,
        armor,
        tools
    } = data;

    return (
        <>
            <Container
                id="random-class"
                className={`${containerClass} shadow-lg p-3 bg-body rounded`}
            >
                <Row className="justify-content-md-center mb-4">
                    <Col xs md="4" lg="3" className="text-center">
                        <span className="fw-bolder fs-5">Seed:</span> <br />
                        <span className="text-muted fs-6">{seed}</span>
                    </Col>
                </Row>
                <hr />
                <Row className="justify-content-md-center mb-5">
                    <Col xs md="6" lg="3" className="text-center">
                        <span className="fw-bolder fs-5">Helmet:</span> <br />
                        <span className="text-muted fs-6">{armor.helmet}</span>
                    </Col>
                    <Col xs md="6" lg="3" className="text-center">
                        <span className="fw-bolder fs-5">Chestplate:</span> <br />
                        <span className="text-muted fs-6">{armor.chestplate}</span>
                    </Col>
                    <Col xs md="6" lg="3" className="text-center">
                        <span className="fw-bolder fs-5">Leggings:</span> <br />
                        <span className="text-muted fs-6">{armor.legging}</span>
                    </Col>
                    <Col xs md="6" lg="3" className="text-center">
                        <span className="fw-bolder fs-5">Boots:</span> <br />
                        <span className="text-muted fs-6">{armor.boot}</span>
                    </Col>
                </Row>
                <hr />
                <Row className="justify-content-md-center mb-5">
                    <Col xs md="6" lg="3" className="text-center">
                        <span className="fw-bolder fs-5">Shovel:</span> <br />
                        <span className="text-muted fs-6">{tools.shovel}</span>
                    </Col>
                    <Col xs md="6" lg="3" className="text-center">
                        <span className="fw-bolder fs-5">Pickaxe:</span> <br />
                        <span className="text-muted fs-6">{tools.pickaxe}</span>
                    </Col>
                    <Col xs md="6" lg="3" className="text-center">
                        <span className="fw-bolder fs-5">Axe:</span> <br />
                        <span className="text-muted fs-6">{tools.axe}</span>
                    </Col>
                    <Col xs md="6" lg="3" className="text-center">
                        <span className="fw-bolder fs-5">Hoe:</span> <br />
                        <span className="text-muted fs-6">{tools.hoe}</span>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs md="8" lg="6" className="text-center">
                        <Button variant="minecraft" href="#" onClick={handleClick}>
                            Generate Loadout
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


async function fetchLoadoutData(setData, setContainerClass) {
    try {
        const seed = generateSeed();
        const armor = {
            helmet: fetchArmorType('helmet'),
            chestplate: fetchArmorType('chestplate'),
            legging: fetchArmorType('legging'),
            boot: fetchArmorType('boot'),
        }
        const tools = {
            shovel: fetchToolType() + ' Shovel',
            pickaxe: fetchToolType() + ' Pickaxe',
            axe: fetchToolType() + ' Axe',
            hoe: fetchToolType() + ' Hoe'
        }

        setData({
            seed,
            armor,
            tools
        });
        setContainerClass("");
    } catch (error: any) {
        console.error(error.message); // Handle errors centrally
    }
}


export default Loadout;
