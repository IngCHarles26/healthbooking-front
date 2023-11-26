import './style.scss';
import logoOscuro from "../../../assets/full-logo-black.svg";
import { useState } from 'react';

function AsideLeft(props) {
  let {menuData,handlePage} = props;

  return ( 
    <aside className="navigation-menu">
      <img className="site-logo" src={logoOscuro} alt="logoOscuro"/>

      <nav className="navigation-bar">
        {menuData.map((el,ix)=>
          <Navs key={'nav_'+ix}
            svg = {el.svg}
            text = {el.text}
            link = {el.link}
            handlePage = {handlePage}
          />)}
      </nav>

    </aside>
  );
}

export default AsideLeft;

function Navs(props) {
  let {svg,text,link,handlePage} = props
  return ( 
    <a onClick={()=>handlePage(link)}>
      <img src={svg} alt="altSvg" />
      {text}
    </a>
  );
}