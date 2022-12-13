import { ClickAwayListener, Typography } from '@mui/material';
import { Categories, MainEvents, Posts } from '@prisma/client';
import { Dispatch, FC, useEffect, useState } from 'react'
import { trpc } from '../../utils/trpc';
import SingleGameInfoCard from '../Cards/GamesInfoCard_Single';
import PostsCard from '../Cards/PostsCard';

interface ItemModalProps {
    eventId: number;
    setSelectedEvent: Dispatch<React.SetStateAction<number>>;
}

const EventDetailsModal: FC<ItemModalProps> = ({ eventId, setSelectedEvent }: ItemModalProps) => {

    const [eventData, setEventData] = useState<MainEvents & { category: Categories; realtedPosts: Posts[]; }>();
    const { data: itemsData, isLoading } = trpc.mainEvents.getEventById.useQuery({ id: eventId });

    useEffect(() => {
        if (itemsData != null) {
            setEventData(itemsData);
        }
    }, [itemsData])

    const getBorderColor = (category: string) => {
        let classList = "w-[45%] max-h-[90%] bg-white p-8 text-center rounded-lg border-2 overflow-scroll ";
        if (category === "education") classList += "border-education"
        else if (category === "futsal") classList += "border-futsal"
        else if (category === "music") classList += "border-music"
        else if (category === "charity") classList += "border-charity"
        return classList;
    }

    const getTextColor = (classList: string, category: string) => {
        if (category === "education") classList += "text-education"
        else if (category === "futsal") classList += "text-futsal"
        else if (category === "music") classList += "text-music"
        else if (category === "charity") classList += "text-charity"
        return classList;
    }


    if (isLoading || eventData === undefined) return <div>Loading...</div>
    return <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-50">
        <ClickAwayListener onClickAway={() => setSelectedEvent(0)}>
            <div className={getBorderColor(eventData.category.name)}>
                <Typography className={getTextColor('text-2xl font-medium ', eventData.category.name)}>{eventData!.title}</Typography>
                <Typography className='text-l'>{eventData.date.toLocaleDateString()}</Typography>
                {eventData.category.name === "futsal" && eventData.gameId ? <SingleGameInfoCard gameId={eventData.gameId} /> : null}
                <PostsCard categoryId={eventData.categoryId} mainEventId={eventData.id} isHome={true}/>
            </div>
        </ClickAwayListener>
    </div>

}

export default EventDetailsModal