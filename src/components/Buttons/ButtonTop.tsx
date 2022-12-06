import React, {  useState } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


function ButtonTop() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        scrolled != 0 ? setVisible(true) : setVisible(false);
    };

    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
          /* you can also use 'auto' behaviour
             in place of 'smooth' */
        });
      };

      if (typeof window !== "undefined") {
        window.addEventListener('scroll', toggleVisible);
      }

    return (
        <button className={`topBtn`} hidden={!visible} onClick={scrollToTop}><ExpandLessIcon sx={{ fontSize: "30px" }} /></button>
    )
}

export default ButtonTop