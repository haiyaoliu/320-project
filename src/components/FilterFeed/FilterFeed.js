import React from "react";

import { Posts } from "./FilterPost/FilterPost";
import { Container } from "react-bootstrap";
import "./FilterFeed.css"

function FilterFeed(props) {

    console.log(props.location)
    return (
        <div >
            <Container fluid>
                <Posts filterValue={props.location} />
            </Container>
        </div>
    );
}

export default FilterFeed;