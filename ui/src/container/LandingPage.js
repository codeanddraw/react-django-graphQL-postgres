import React from 'react';
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Typing from 'react-typing-animation';

const slideInLeft = keyframes`
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;
const slideOutLeft = keyframes`
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
`;
const Page = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 40%;
  left: 0;
  text-align: center;

  a {
    text-decoration: none;
    color: brown;
  }
`;
const LandingPageElm = styled(Page)`
  &.page-enter {
    animation: ${slideInLeft} 0.2s forwards;
  }
  &.page-exit {
    animation: ${slideOutLeft} 0.2s forwards;
  }
`;

function LandingPage() {
    return (
      <LandingPageElm>
            <Typing>
                Explore the world by continents 
                <Typing.Delay ms={1000} />
                , click on the continents to unravel.
            </Typing>
            <Link to="/map">Explore the  API →</Link>
      </LandingPageElm>
    );
  }
export default LandingPage;


  