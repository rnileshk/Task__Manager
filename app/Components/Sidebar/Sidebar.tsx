"use client"

import { useGlobalState } from "@/app/Context/globalProvider";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { arrowLeft, bars, logout } from "@/app/utils/Icons";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";

function Sidebar() {
    const { theme, collapsed, collapseMenu } = useGlobalState();

    const { signOut } = useClerk();

    const { user } = useUser();

    const { firstName, lastName, imageUrl } = user || {
        firstName: "", 
        lastName: "", 
        imageUrl: ""
    };

    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (link:string) => {
        router.push(link);
    };

  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
        <button className="toggler-nav" onClick={collapseMenu}>{collapsed ? bars : arrowLeft}</button>
        <div className="profile">
            <div className="profile-overlay"></div>
            <div>
                <Image width={100} height={100} src={imageUrl} alt="Profile" />
            </div>
            <div className="user-btn absolute z-20 top-0 w-full h-full">
                <UserButton />
            </div>
            <h1 className="capitalize">
                {firstName} {lastName}
            </h1>
        </div>
        <ul className="nav-items">
            {menu.map((item) => {

                const link = item.link;

                return (
                <li
                    className={`nav-item ${pathname === link ? "active" : "" }`} 
                    onClick={() => {
                    handleClick(link);
                }}
                >
                    {item.icon}
                    <Link href={link}>{item.title}</Link>
                </li>
                );
            })}
        </ul>
        <div className="sign-out relative m-6">
            <Button 
                name={"Sign Out"}
                type="submit"
                padding={'0.4rem 0.8rem'}
                borderRad={"0.8rem"}
                fw={"500"}
                fs={"1.2rem"}
                background={"none"}
                icon={logout}
                click={() => {
                    signOut(() => router.push("/signin"));
                }}
            />
        </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav<{collapsed:boolean}>`
position: relative;
width: 13rem;
background-color: #212121;
border-right: 2px solid aqua;
border-radius: 1rem;
height: 100vh;

display: flex;
flex-direction: column;
justify-content: space-between;

color: #6c7983;


@media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;
    
    transition: all 0.3s cubic-bezier(0.53,0.21.0,1);
    transform: ${(props) => props.collapsed ? "translateX(-107%)" : "translateX(0)"};

    .toggler-nav{
        display: block !important;
    }
}


.toggler-nav{
    display: none;
    position: absolute;
    right: -66px;
    top: 5rem;
    padding: 0.8rem 0.9rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 1rem;
    top: 1.5rem;

    background-color: #212121;
    border-right: 2px solid rgba(249,249,249,0.08);
    border-bottom: 2px solid rgba(249,249,249,0.08);
    border-top: 2px solid rgba(249,249,249,0.08);
}

.user-btn {
        .cl-rootBox {
            width: 100%;
            height: 100%;

            .cl-userButtonBox{
                width: 100%;
                height: 100%;

                .cl-userButtonTrigger{
                    width: 100%;
                    height: 100%;
                }
            }
        }
}

.profile{
    margin: 1.5rem;
    position: relative;
    padding: 1rem 0.8rem;
    border-radious: 1rem;
    curser: pointer;


    font-weight: 500;
    color: #f8f8f8;

    display: flex;
    flex-direction: column;
    align-items: center;

    .profile-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px);
        z-index: 0;
        background: #181818;
        transition: all 0.55s linear;
        border-radius: 1rem;
        border: 2px solid aqua;

        opacity: 0.2;
    }
    h1{
        font-size: 1.2rem;
        display: flex;
        flex-direction: column;
    }
    .image,
    h1{
        position: relative;
        z-index: 1;
    }

    .image{
        flex-shrink: 0;
        display: inline-block;
        overflow: hidden;
        transition: all 0.5s ease;
        border-radius: 100%;

        height: 100px;
        width: 100px;
        img {
        border-radius: 100%;
        transition: all 0.5s ease;
        }
    }

    > h1{
        margin-left: 1rem;
        padding: 0.5rem;
        font-size: clamp(1.2rem, 4vw, 1.4rem);
        line-height: 100%;
    }

    &:hover {
        .profile-overlay {
        opacity: 1;
        border: 2px solid rgba(249,249,249,0.08);
        }

        img {
        transform: scale(1.1);
        }
    }
}
.nav-items{
    position: relative;
    padding: 0.6rem 1rem 0.6rem 2.1rem;
    margin: 0.3rem 0;
    gap: 1.5rem;

    display: grid;
    grid-template-columns: 1fr; 
    cursor: pointer;
    align-items: center;

    &::after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    background-color: rgba(149,149,149,0.03);
    z-index: 1;
    transition: all 0.3s easy-in-out;
    }

    &::before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    background-color: darkgreen;

    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    }

    a {
    font-weight: 500;
    transition: all 0.3s ease-in-out;
    z-index: 2;
    line-height: 0;
    }

    i {
    align-item: center;
    color: rgba(249,249,249,0.35);
    display: inline-flex;
    }

    .active {
    background-color: rgba(149,249,249,0.03);
    border-right: 5px solid blue;
    border-radius: 1rem;

    i,
    a {
        color: rgba(249,249,249,0.75);
        line-height: 0;
    }
    }

    .active::before {
    width: 0.3rem;
    }

    > button {
    margin: 1.5rem;
}
`;

export default Sidebar;