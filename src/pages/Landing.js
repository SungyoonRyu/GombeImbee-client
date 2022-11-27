import styled from "styled-components";

import { LandingHeader, LandingOne } from "../components/landing";

export default function Landing() {
    return (
        <StLandingCont>
            <LandingHeader />
            <LandingOne />
        </StLandingCont>
    );
}

const StLandingCont = styled.div`
    margin: auto;
    align: center;

    width: 80%;
`;