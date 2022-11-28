import React from 'react'
import { SportsSoccer, MusicNote, Info, VolunteerActivism, Settings, Login, Logout, Home } from '@mui/icons-material';


export const data: any = {
    menu: {
        menuItems: [
            {
                icon: <Home />,
                link: "/",
                titlePt: "Início",
                titleEn: "Home"
            },
            {
                icon: <SportsSoccer />,
                link: "/soccer",
                titlePt: "Futebol",
                titleEn: "Soccer"
            },
            {
                icon: <MusicNote />,
                link: "/music",
                titlePt: "Musica",
                titleEn: "Music"
            },

            {
                icon: <VolunteerActivism />,
                link: "/charity",
                titlePt: "Caridade",
                titleEn: "Charity"
            },
            {
                icon: <Info />,
                link: "/about",
                titlePt: "Sobre",
                titleEn: "About"
            }
        ],
        menuSettingsLoggedIn: [
            {
                icon: <Settings />,
                titlePt: "Opções",
                titleEn: "Settings"
            },
            {
                icon: <Logout />,
                titlePt: "Terminar Sessão",
                titleEn: "Logout"
            }
            
        ],
        menuSettingsLoggedOut: [
            {
                icon: <Login />,
                titlePt: "Inciar Sessão",
                titleEn: "Login"
            },
            {
                icon: <Settings />,
                titlePt: "Opções",
                titleEn: "Settings"
            }
        ]
    },
    home: {
        categories:[
            {
                icon: <SportsSoccer />,
                link: "/soccer",
                img: "/soccerCard.jpg",
                titlePt: "Futebol",
                titleEn: "Soccer"
            },
            {
                icon: <MusicNote />,
                link: "/music",
                img: "/rapCard.jpg",
                titlePt: "Musica",
                titleEn: "Music"
            },

            {
                icon: <VolunteerActivism />,
                link: "/charity",
                img: "/charityCard.jpg",
                titlePt: "Caridade",
                titleEn: "Charity"
            },
        ]
    }
}