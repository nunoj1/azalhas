import { Typography } from '@mui/material';
import { Link } from 'framer';
import React, { useEffect, useState } from 'react'

function TimeLine() {

    const [timeLineData, setTimeLineData] = useState<{ title: string, description1: string, description2: string, date: Date, category: string, eventLink: string }[]>([]);

    const data: { title: string, description1: string, description2: string, date: Date, category: string, eventLink: string }[] = [
        {
            title: "Immerse Global Summit",
            description1: "Miami",
            description2: "Evento de partilha das novas tecnologias que irão surgir pelo mundo",
            date: new Date(2022, 12 - 1, 5),
            category: "education",
            eventLink: "/education&event=4"
        },
        {
            title: "Hip Hop Sessions",
            description1: "Living room",
            description2: "Evento para os artirtas da ilha no mundo de hip hop",
            date: new Date(2022, 11 - 1, 30),
            category: "music",
            eventLink: "/music&event=6"
        },
        {
            title: "Azelhas - Ribeira Brava",
            description1: "Estádio da Ribeira Brava",
            description2: "Jogo intensivo de 5 para 4 recuado, terminado com a vitória inédita dos Azelha",
            date: new Date(2022, 11 - 1, 8),
            category: "futsal",
            eventLink: "/futsal&event=87"
        },
        {
            title: "Formação BlockChain",
            description1: "Escola Francisco Franco",
            description2: "Projeto de formação sobre x",
            date: new Date(2022, 11 - 1, 2),
            category: "education",
            eventLink: "/education&event=2"
        },
        {
            title: "Azelhas - Santana",
            description1: "Estádio da Choupana",
            description2: "Jogo intensivo de 6 para 3 recuado, onde o empate foi excelencia",
            date: new Date(2022, 10 - 1, 18),
            category: "futsal",
            eventLink: "/futsal&event=86"
        },
        {
            title: "Associação teste",
            description1: "Forum Madeira",
            description2: "Assistencia a jovens",
            date: new Date(2022, 10 - 1, 18),
            category: "charity",
            eventLink: "/charity&event=5"
        },
        {
            title: "Azelhas - Santana",
            description1: "Estádio da Choupana",
            description2: "Jogo intensivo de 6 para 3 recuado, onde o empate foi excelencia",
            date: new Date(2022, 10 - 1, 18),
            category: "futsal",
            eventLink: "/futsal&event=86"
        },
        {
            title: "Azelhas - Santana",
            description1: "Estádio da Choupana",
            description2: "Jogo intensivo de 6 para 3 recuado, onde o empate foi excelencia",
            date: new Date(2022, 10 - 1, 18),
            category: "futsal",
            eventLink: "/futsal&event=86"
        },
        {
            title: "Associação teste",
            description1: "Forum Madeira",
            description2: "Assistencia a jovens",
            date: new Date(2022, 10 - 1, 18),
            category: "charity",
            eventLink: "/charity&event=5"
        },
        {
            title: "Azelhas - Santana",
            description1: "Estádio da Choupana",
            description2: "Jogo intensivo de 6 para 3 recuado, onde o empate foi excelencia",
            date: new Date(2022, 10 - 1, 18),
            category: "futsal",
            eventLink: "/futsal&event=86"
        },
        {
            title: "Azelhas - Santana",
            description1: "Estádio da Choupana",
            description2: "Jogo intensivo de 6 para 3 recuado, onde o empate foi excelencia",
            date: new Date(2022, 10 - 1, 18),
            category: "futsal",
            eventLink: "/futsal&event=86"
        },
        {
            title: "Azelhas - Santana",
            description1: "Estádio da Choupana",
            description2: "Jogo intensivo de 6 para 3 recuado, onde o empate foi excelencia",
            date: new Date(2022, 10 - 1, 18),
            category: "futsal",
            eventLink: "/futsal&event=86"
        }
    ]

    useEffect(() => {
        let newData: { title: string, description1: string, description2: string, date: Date, category: string, eventLink: string }[] = [];
        let index = 0;
        const current = new Date();
        const numberOfDaysToSubtract = 1;
        const prior = new Date().setDate(current.getDate() - numberOfDaysToSubtract);
        let foundToday = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date < new Date(prior) && !foundToday) {
                newData.push({ title: "today", description1: "today", description2: "today", date: new Date(), category: "today", eventLink: "today" });
                newData.push(data[i]);
                foundToday = true;
            } else newData.push(data[i]);
        }

        setTimeLineData(newData);

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
    }, []);

    return (
        <section className='timeline w-[96vw] absolute left-[60px]'>
            <ol>
                {data.map((item, index) => {
                    return <li key={index} >
                        <div className="hide-tlitem">
                            <Link href={item.eventLink}>
                                <span>
                                    <time>{item.date.toLocaleDateString()}</time>
                                    <Typography variant="h6" component="span">
                                        {item.title}
                                    </Typography>
                                    <Typography color="text.secondary">{item.description1}</Typography>
                                    <Typography color="text.secondary">{item.description2}</Typography>
                                </span>
                            </Link>
                        </div>
                    </li>
                })}
            </ol>
        </section>
    )
}

export default TimeLine