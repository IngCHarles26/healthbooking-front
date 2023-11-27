import './style.scss';
import logoOscuro from "../../../assets/full-logo-black.svg";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AsideLeft(props) {
  let {menuData,handlePage} = props;
  const navigate = useNavigate();

  return ( 
    <aside className="navigation-menu">
      <img className="site-logo" src={logoOscuro} alt="logoOscuro" onClick={()=>navigate('/')}/>

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