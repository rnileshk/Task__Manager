"use client"

import { useGlobalState } from "@/app/Context/globalProvider";
import React from "react";
import styled from "styled-components";

interface Props {
    icon?: React.ReactNode;
    name?: string;
    background: string;
    padding?: string;
    borderRad?: string;
    fw?: string;
    fs?: string;
    click?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    border?: string;
}


function Button({
    icon,
    name,
    background,
    padding,
    borderRad,
    fw,
    fs,
    click,
    type,
    border,
}: Props) {
    const theme = useGlobalState();

  return (
    <ButtonStyled
    type={type}
    style={{
        background: background,
        padding: padding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontWeight: fw || "500",
        fontSize: fs,
        border: border || "none",
    }}
    theme={theme}
    onClick={click}
    >
        {icon && icon}
        {name}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
position: relative;
display: flex;
align-items: center;
color: #fff;
z-index: 5;
curser: pointer;

transition: all 0.55s ease-in-out;

i{
    margin-right: 0.5rem;
    color: #f8f8f8;
    font-size: 1rem;
    transition: all 0.55s ease-in-out;
}

&::hover {
    color: #f8f8f8;
    i{
        color: #f8f8f8;
    }
}
`;

export default Button;