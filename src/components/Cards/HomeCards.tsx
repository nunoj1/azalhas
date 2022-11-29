import { Icon, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { data } from '../../utils/data';


function HomeCards() {
    return (
        <div className='w-full h-full mt-[12vh]'>
            <div className="cards-container grid grid-cols-3 gap-4">
                {data.home.categories.map((item:any, index:any) => {return (
                    <Link href={item.link} 
                    className={`card relative w-full h-96 rounded-lg flex flex-col justify-center items-center text-center drop-shadow-xl transition ease-out delay-150 border border-component hover:border-primary`} 
                    key={index}>
                            <img className='w-full h-[90%] object-cover rounded-t-lg relative transition ease-out delay-150' 
                            src={item.img}/>
                            <Typography variant='h6' className='h-[10%] w-full bg-mainbg rounded-b-lg text-tertiary uppercase'>{item.titlePt}</Typography>
                    </Link>
                )
                })}
            </div>
        </div>
    )
}

export default HomeCards