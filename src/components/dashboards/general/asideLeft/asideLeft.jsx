import logoOscuro from "../../../assets/full-logo-black.svg";

function AsideLeft(props) {
  let {menuData} = props;
  return ( 
    <aside className="navigation-menu">
      <img className="site-logo" src={logoOscuro} alt="logoOscuro"/>

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
  let {svg,text,link} = props
  return ( 
    <a href={link}>
      <img src={svg} alt="altSvg" />
      {text}
    </a>
  );
}