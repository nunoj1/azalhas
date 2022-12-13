import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { School, SportsSoccer, MusicNote, VolunteerActivism } from '@mui/icons-material';
import { trpc } from '../../utils/trpc';
import { Categories, MainEvents } from '@prisma/client';
import EventDetailsModal from '../Modals/EventDetails';
import { date } from 'zod';

function TimeLine() {

    const [timeLineData, setTimeLineData] = useState<(MainEvents & { category: Categories; })[]>();
    const [selectedEvent, setSelectedEvent] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const { data: itemsData, isLoading } = trpc.mainEvents.getTimeLineData.useQuery();

    useEffect(() => {
        if(selectedEvent > 0){
            setModalOpen(true);
        }else {
            setModalOpen(false);
        }
    }, [selectedEvent])

    useEffect(() => {
        if (itemsData != null && itemsData != undefined) {
            let newData: (MainEvents & { category: Categories; })[] = [];
            let index = 0;
            const current = new Date();
            const numberOfDaysToSubtract = 1;
            const prior = new Date().setDate(current.getDate() - numberOfDaysToSubtract);
            let foundToday = false;
            for (let i = 0; i < itemsData.length; i++) {
                if (itemsData[i]!.date < new Date(prior) && !foundToday) {
                    newData.push({ id: 0, title: "today", date: new Date(), categoryId: 0, gameId: null, category: {id: 0, name: 'today'} });
                    newData.push(itemsData[i]!);
                    foundToday = true;
                } else newData.push(itemsData[i]!);
            }

            setTimeLineData(newData);
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
    }, [timeLineData])

    const getMonthFromDate = (date: Date): string => {
        let monthList: string[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        return `${monthList[date.getMonth()]}`;
    }

    const getCategoryIcon = (category: string) => {
        if (category === "education") return <School className='school-icon' />
        else if (category === "futsal") return <SportsSoccer className='futsal-icon' />
        else if (category === "music") return <MusicNote className='music-icon' />
        else if (category === "charity") return <VolunteerActivism className='charity-icon' />
    }

    const getBorderColor = (category: string) => {
        let classList = "hide-tlitem p-1 hover:border rounded-xl hover:border-b-8 cursor-pointer ";
        if (category === "education") classList += "border-education"
        else if (category === "futsal") classList += "border-futsal"
        else if (category === "music") classList += "border-music"
        else if (category === "charity") classList += "border-charity"
        return classList;
    }

    if (isLoading) return (<div>Loading...</div>)
    return (

        <div>{modalOpen && <EventDetailsModal eventId={selectedEvent!} setSelectedEvent={setSelectedEvent}/>}
        <section className='timeline w-[96vw] absolute left-[60px]'>
            <ol>
                {timeLineData?.map((item, index) => {
                    if (item.id === 0) return <li className="today-li old-event" key={index} ><div className='today-item'>Dia Atual</div></li>

                    return <li key={index} className={item.date < new Date() ? 'old-event' : ''}>
                        
                        <div className={getBorderColor(item.category.name)} onClick={() => setSelectedEvent(item.id)}>
                            {getCategoryIcon(item.category.name)}
                            <br />
                            <span>
                                <Typography variant="h6" component="span">
                                    {item.title}
                                </Typography>
                                <br />
                            </span>
                            <span className='text-black flex flex-row justify-center align-middle items-center'> {item.date.toLocaleDateString()} </span>
                        </div>
                    </li>
                })}
            </ol>
        </section></div>
    )
}

export default TimeLine