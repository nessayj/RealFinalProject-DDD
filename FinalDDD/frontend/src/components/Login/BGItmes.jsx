import React from "react";
import styled, { keyframes } from "styled-components";
import {ImageUrl1, ImageUrl2, ImageUrl3 } from "./imageURL";
import Marquee from "react-fast-marquee";

const Container = styled.div`
position: absolute;
top: 0%;
width: 100vw;
height: 100vh;
overflow: hidden;

`;

const ItemWrap = styled.div`
    overflow: hidden;
    min-width: 1400px;
    height: 100vh;
    /* min-height: 676px; */
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .marqueeStyle, .marqueeStyle2, .marqueeStyle3, .marqueeStyle4, .marqueeStyle5,.marqueeStyle6 {
        /* background-color: red; */
        height: 25%;
        min-height: 230px;
        width: 100%;
        position: relative;

    }
    .marqueeStyle {
        top: 40%;
        left: -34%;
    }
    .marqueeStyle2 {
        top: 20%;
        left: -20%;
    }
    .marqueeStyle3 {
        top: 20%;
        left: -6%;
    }
    .marqueeStyle4 {
        top: 0%;
        left: 8%;
    }
    .marqueeStyle5 {
        top: -30%;
        left: 22%;
    }
    .marqueeStyle6 {
        top: -50%;
        left: 36%;
    }

`;
const BlackBG = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .6;
`;


const Item = styled.div`
    width: 12rem;
    height: 16rem;
    /* background-color: blue; */
    margin: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;


    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        background-size: cover;

    }

`;



const BGItmes = () => {
    return(
        <Container>
        <ItemWrap>
            <Marquee direction="up" speed={15} className="marqueeStyle">
            {
                ImageUrl1.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }
            </Marquee>

            <Marquee direction="down" speed={15} className="marqueeStyle2">
            {
                ImageUrl2.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }
            </Marquee>
            <Marquee direction="up" speed={15} className="marqueeStyle3">
            {
                ImageUrl3.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }
            </Marquee>

            <Marquee direction="down"  speed={15} className="marqueeStyle4">
            {
                ImageUrl1.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }
            </Marquee>
            <Marquee direction="up" speed={15} className="marqueeStyle5">
            {
                ImageUrl2.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }
            </Marquee>

            <Marquee direction="down" speed={15} className="marqueeStyle6">
            {
                ImageUrl3.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }
            </Marquee>
        </ItemWrap>
            <BlackBG/>
</Container>
    )
}

export default BGItmes;
