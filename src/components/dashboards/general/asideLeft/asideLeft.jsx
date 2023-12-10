import './asideLeft.scss';

//_______________SVGS
import logoOscuro from "../../../assets/full-logo-black.svg";

//_______________COMPONENTS

//_______________REACT
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

//_______________ACTIONS
import { changePage } from '../../../../redux/slices/pageNav';
import { useSelector } from 'react-redux';



function AsideLeft(props) {
  let {menuData} = props;
  const navigate = useNavigate();

  return ( 
    <aside className="aside-left">
      <img className="site-logo" src={logoOscuro} alt="logoOscuro" onClick={()=>navigate('/')}/>

      <nav className="navigation-bar">
        {menuData.map((el,ix)=>
          <Navs key={'nav_'+ix}
            svg = {el.svg}
            text = {el.text}
            link = {el.link}
          />)}
      </nav>

    </aside>
  );
}

export default AsideLeft;

function Navs(props) {
  const page = useSelector(st=>st.pageNav);
  const dispatch = useDispatch();
  let {svg,text,link} = props
  return ( 
    <a className={link === page ? 'navSelected option-nav': 'option-nav'} 
      onClick={()=>{dispatch(changePage(link))}}>
      <img src={svg} alt="altSvg" className='img-option' />
      {text}
    </a>
  );
}