import React, { useState } from 'react';
import { type Session } from "next-auth";
import { IconButton, Button, ClickAwayListener, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { data } from '../../utils/data'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react';



function Sidebar() {
    const session = useSession();

    console.log(session);
    const [collapsed, setCollapsed] = useState(true);
    const route = useRouter().pathname;

    const handleOpenMenu = () => {
        setCollapsed(!collapsed);
    }

    const handleClickAway = () => {
        setCollapsed(true);
    };

    const renderMenuItems = () => {
        if (collapsed)
            return <div className='flex flex-col h-auto w-full'>
                {data.sidebar.menuItems.map((item: any, index: any) =>
                    <Link className='w-full' href={item.link} key={index}>
                        <IconButton className={`${route == item.link ? "active" : ""} w-full h-[70px] hover:bg-secondary rounded-none`} key={index}>
                            {item.icon}
                        </IconButton>
                    </Link>
                )}
            </div>;
        else
            return <div className='flex flex-col h-auto w-full'>
                {data.sidebar.menuItems.map((item: any, index: any) =>
                    <Link className='w-full' href={item.link} onClick={() => setCollapsed(true)} key={index}>
                        <Button className={`${route == item.link ? "active" : ""} w-full h-[80px] hover:bg-secondary rounded-none`} startIcon={item.icon} key={index}>
                            {item.titlePt}
                        </Button>
                    </Link>
                )}
            </div>;
    }

    const renderProfile = () => {
        if (collapsed) {
            if (session.data) {
                return <div className='w-full flex items-center flex-col bg-primary'>
                    <Divider component="p" className='bg-primary w-full mb-2' />
                    <img className='my-2 w-[40px] h-[40px] rounded-full' src={session.data.user?.image ? session.data.user?.image : '/default-profile.png'} alt="" />
                    {data.sidebar.menuSettingsLoggedIn.map((item: any, index: any) =>
                        <IconButton className='py-6 h-[30px] hover:bg-secondary w-full rounded-none' onClick={() => signOut()} key={index}>{item.icon}</IconButton>
                    )}
                </div>
            } else return <div className='w-full bg-primary'>
                <Divider component="p" className='bg-primary w-full' />
                {data.sidebar.menuSettingsLoggedOut.map((item: any, index: any) =>
                    <a href='auth/signin'><IconButton  className='py-6 h-[30px] hover:bg-secondary w-full rounded-none' key={index}>{item.icon}</IconButton></a>
                )}
            </div>
        }
        else {
            if (session.data) {
                return (
                    <div className='w-full h-[130px] flex flex-col items-center bg-primary'>
                        <Divider component="p" className='bg-primary w-full mb-3' />
                        <div className='flex w-full justify-around align-middle items-center'>
                            <img className='my-1 h-[100px] w-[100px] rounded-full mb-2' src={session.data.user?.image ? session.data.user?.image : '/default-profile.png'} alt="" />
                            <p>{session?.data?.user?.name}</p>
                            <div>
                                {data.sidebar.menuSettingsLoggedIn.map((item: any, index: any) =>
                                    <IconButton onClick={() => signOut()} className='hover:text-secondary ml-5 my-auto py-auto w-[15px] h-[15px] rounded-none' key={index}>{item.icon}</IconButton>
                                )}
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className='w-full flex flex-col items-center bg-primary'>
                        <Divider component="p" className='bg-primary w-full' />
                        <div className='flex flex-col w-full justify-around align-middle items-center'>
                            {data.sidebar.menuSettingsLoggedOut.map((item: any, index: any) =>
                                <Button className='w-full h-[60px] hover:bg-secondary rounded-none' startIcon={item.icon} key={index}>{item.titlePt}</Button>
                            )}
                        </div>
                    </div>
                )
            }
        }
    }

    return (
        <section>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={`fixed left-0 top-0 ${collapsed == true ? "w-[50px]" : "lg:w-1/6 md:w-1/4 sm:1/2"} flex justify-between items-center flex-col h-full rounded-tr-[10px] rounded-br-[10px] bg-component z-40`}>
                    {/* Header */}
                    <div className='w-full '>
                        <div className='flex justify-between flex-row w-full'>
                            <IconButton className='w-full bg-primary hover:bg-secondary rounded-none rounded-tr-[10px]' onClick={() => handleOpenMenu()}><MenuIcon /></IconButton>

                        </div>
                        <Divider component="p" className='bg-primary' />

                        {/* Menu Items */}
                        {renderMenuItems()}
                    </div>

                    {/* Profile */}
                    {renderProfile()}
                </div>
            </ClickAwayListener>
        </section>
    )
}

export default Sidebar