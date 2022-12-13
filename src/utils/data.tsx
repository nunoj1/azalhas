import React from 'react'
import { SportsSoccer, MusicNote, Info, VolunteerActivism, Settings, Login, Logout, Home, School } from '@mui/icons-material';


export const data: any = {
    sidebar: {
        menuItems: [
            {
                icon: <Home />,
                link: "/",
                titlePt: "Início",
                titleEn: "Home"
            },
            {
                icon: <SportsSoccer />,
                link: "/futsal",
                titlePt: "Futsal",
                titleEn: "Futsal"
            },
            {
                icon: <MusicNote />,
                link: "/music",
                titlePt: "Música",
                titleEn: "Music"
            },
            {
                icon: <School />,
                link: "/education",
                titlePt: "Educação",
                titleEn: "Education"
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
            // {
            //     icon: <Settings />,
            //     titlePt: "Opções",
            //     titleEn: "Settings"
            // },
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
            // {
            //     icon: <Settings />,
            //     titlePt: "Opções",
            //     titleEn: "Settings"
            // }
        ]
    },
    navbar:{
        futsal : [
            {
                textPt: "Futsal",
                textEn: "Futsal"
            },
            {
                textPt: "Estatisticas",
                textEn: "Statistics"
            },
            {
                textPt: "Torneios",
                textEn: "Tournaments"
            }
        ],
        music : [
            {
                textPt: "Música",
                textEn: "Music"
            }
        ],
        education : [
            {
                textPt: "Educação",
                textEn: "Education"
            }
        ],
        charity : [
            {
                textPt: "Caridade",
                textEn: "Charity"
            },
            {
                textPt: "Instituições",
                textEn: "Institutions"
            }
        ],
        about : [
            {
                textPt: "Sobre Nós",
                textEn: "About Us"
            },
            {
                textPt: "Contactos",
                textEn: "Contacts"
            },
            {
                textPt: "Parcerias",
                textEn: "Sponsorships"
            }
        ],
    },
    home: {
        categories:[
            {
                icon: <SportsSoccer />,
                link: "/futsal",
                titlePt: "Futsal",
                titleEn: "Futsal"
            },
            {
                icon: <MusicNote />,
                link: "/music",
                titlePt: "Música",
                titleEn: "Music"
            },
            {
                icon: <School />,
                link: "/education",
                titlePt: "Caridade",
                titleEn: "Charity"
            },
            {
                icon: <VolunteerActivism />,
                link: "/charity",
                titlePt: "Caridade",
                titleEn: "Charity"
            },
        ]
    }
}