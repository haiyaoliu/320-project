import React from "react";

import { Posts } from "./FilterPost/FilterPost";
import { Container } from "react-bootstrap";
import "./FilterFeed.css"

function FilterFeed(props) {

    return (
        <div >
            <Container fluid>
                <Posts filterValue={props.filterValue} />
            </Container>
        </div>
    );
}

export default FilterFeed;