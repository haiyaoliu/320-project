import React from "react";

import { Posts } from "./FilterPost/FilterPost";
import { Container } from "react-bootstrap";
import "./FilterFeed.css"

function FilterFeed(props) {

    return (
        <div >
            <Container fluid>
                <Posts forceUpdateValue={props.forceUpdateValue} filterValue={props.location} />
            </Container>
        </div>
    );
}

export default FilterFeed;