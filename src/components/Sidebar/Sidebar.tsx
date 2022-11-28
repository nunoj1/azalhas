import React, { useState } from 'react';
import { type Session } from "next-auth";
import { IconButton, Button, ClickAwayListener, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { data } from '../../utils/data'
import Link from 'next/link';

type Props = {
    session: Session | null
}

function Sidebar({ session }: Props) {
    const [collapsed, setCollapsed] = useState(true);

    const handleOpenMenu = () => {
        setCollapsed(!collapsed);
    }

    const handleClickAway = () => {
        setCollapsed(true);
    };

    const renderMenuItems = () => {
        if (collapsed)
            return <div className='flex flex-col h-auto w-full'>
                {data.menu.menuItems.map((item:any, index: any) => <Link className='w-full' href={item.link}><IconButton className=' w-full h-[70px] hover:bg-secondary rounded-none' key={index}>{item.icon}</IconButton></Link>)}
            </div>;
        else
            return <div className='flex flex-col h-auto w-full'>
                {data.menu.menuItems.map((item:any, index: any) => <Link className='w-full' href={item.link}><Button className='w-full h-[80px] hover:bg-secondary rounded-none' startIcon={item.icon} key={index}>{item.titlePt}</Button></Link>)}
            </div>;
    }

    const renderProfile = () => {
        if (collapsed) {
            if (session) {
                return <div className='w-full flex items-center flex-col bg-primary'>
                    <Divider component="p" className='bg-primary w-full mb-2' />
                    <img className='my-2 w-[40px] h-[40px] rounded-full' src='/default-profile.png' alt="" />
                    {data.menu.menuSettingsLoggedIn.map((item:any, index: any) => 
                        <IconButton className='py-6 h-[30px] hover:bg-secondary w-full rounded-none' key={index}>{item.icon}</IconButton>
                    )}
                </div>
            } else return <div className='w-full bg-primary'>
                <Divider component="p" className='bg-primary w-full' />
                {data.menu.menuSettingsLoggedOut.map((item:any, index: any) => 
                    <IconButton className='py-6 h-[30px] hover:bg-secondary w-full rounded-none' key={index}>{item.icon}</IconButton>
                )}
            </div>
        }
        else {
            if (session) {
                return (
                    <div className='w-full h-[130px] flex flex-col items-center bg-primary'>
                        <Divider component="p" className='bg-primary w-full mb-3' />
                        <div className='flex w-full justify-around align-middle items-center'>
                            <img className='my-1 h-[100px] w-[100px] rounded-full mb-2' src='/default-profile.png' alt="" />
                            <p>Anonymous</p>
                            <div>
                                {data.menu.menuSettingsLoggedIn.map((item:any, index: any) => 
                                    <IconButton className='hover:text-secondary ml-5 my-auto py-auto w-[15px] h-[15px] rounded-none' key={index}>{item.icon}</IconButton>
                                )}
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className='w-full h-[121px] flex flex-col items-center bg-primary'>
                        <Divider component="p" className='bg-primary w-full' />
                        <div className='flex flex-col w-full justify-around align-middle items-center'>
                        {data.menu.menuSettingsLoggedOut.map((item:any, index: any) => 
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
                <div className={`absolute left-0 top-0 ${collapsed == true ? "w-[50px]" : "lg:w-1/6 md:w-1/4 sm:1/2"} flex justify-between items-center flex-col h-full rounded-tr-[10px] rounded-br-[10px] bg-component`}>
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