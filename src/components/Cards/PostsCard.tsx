import { Typography } from '@mui/material';
import { Categories, Posts } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { trpc } from '../../utils/trpc';

interface Props {
    categoryId: number,
    mainEventId: number,
    isHome: boolean
}



function PostsCard(props: Props) {

    const getData = (isHome:boolean) => {
        if(!isHome) return trpc.posts.getPostsForCategory.useQuery({ id: props.categoryId });
        else return trpc.posts.getEventPosts.useQuery({ id: props.mainEventId });
    }

    const [postsData, setPostsData] = useState<(Posts & { category: Categories; })[]>();
    const { data: itemsData, isLoading } = getData(props.isHome);

    useEffect(() => {
        if (itemsData != null) {
            setPostsData(itemsData);
        }
    }, [itemsData])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-tlitem');
                }
                else {
                    entry.target.classList.remove('show-tlitem');
                }
            });
        })

        const hiddenElements = document.querySelectorAll('.hide-tlitem');
        hiddenElements.forEach((el) => observer.observe(el));
        
    }, [postsData])

    if (isLoading || postsData === undefined) return <div>Loading...</div>
    return (
        <section className='w-full flex items-center flex-col '>
            <Typography className='hide-tlitem text-xl font-bold m-4'>Últimas Noticias:</Typography>
            {
                postsData.map((item, index) => {
                    return <div className='border w-2/3 text-left m-4 p-4 space-y-2 hide-tlitem' key={index}>
                        <Typography className='text-xl'>{item.title}</Typography>
                        <Typography className='text-md whitespace-pre-line'>{item.body}</Typography>
                        <div className='w-full flex justify-between'>
                            <Typography className='text-xs'>{item.date.toLocaleDateString()}</Typography>
                            <a href="" className='no-underline hover:underline hover:text-primary'><Typography className='text-xs hover:text-primary'>Continua a ler</Typography></a>
                        </div>
                    </div>
                })
            }
        </section>
    )
}

export default PostsCard