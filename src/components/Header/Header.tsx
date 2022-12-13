import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/material'
import { data } from '../../utils/data';

type Props = {
  active: number,
  setActive: (val: number) => void
};

function Header(props: Props) {
  const router = useRouter();
  const [currentPage,setCurrentPage] = useState("");
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    if (currentPage === "futsal") setNavData(data.navbar.futsal);
    if (currentPage === "music") setNavData(data.navbar.music);
    if (currentPage === "education") setNavData(data.navbar.education);
    if (currentPage === "charity") setNavData(data.navbar.charity);
    if (currentPage === "about") setNavData(data.navbar.about);
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(router.pathname.substring(1));
    props.setActive(0);
  }, [router.pathname])

  const renderHomePageHeader: any = () => {
    return (
      <div className='flex py-10 text-center items-center justify-center fixed w-[100%] z-1 bg-white'>
        <Typography variant="h2" className='font-light text-tertiary uppercase'>
          Fundação Azalhas
        </Typography>
      </div>)
  }

  const renderHeader: any = () => {
    return (
      <div className='flex flex-row justify-center text-center items-center gap-10 py-10 border-b fixed w-[100%] z-10 bg-white'>
        {navData.map((item: any, index: any) => {
          return <button className={`${props.active === index ? "active-menu" : ""} text-xl font-medium text-tertiary uppercase transition-all hover:text-primary`}
            onClick={() => props.setActive(index)}
            key={index}>
            {item.textPt}
          </button>
        })}
      </div>
    )
  }

  return (
    <div>
      {router.pathname === '/' ? renderHomePageHeader() : renderHeader()}
    </div>
  )
}

export default Header