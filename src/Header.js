import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <img className="logo" src="/img/Diving_Djursland_Logo.png" alt="Logo"/>
            <div className="header-right">
              <ul>
                <li>
                  <a className="active" href="#hjem">Hjem</a>
                </li>
                <li>
                  <a href="#shop">Shop</a>
                </li>
                <li>
                  <a href="#holdstart">Holdstart</a>
                </li>
                <li>
                  <a href="#Omscubafun">Om Scubafun</a>
                </li>
                <li>
                  <a href="#samarbejdspartnere">Samarbejdspartnere</a>
                </li>
                <li>
                  <a href="#vilkår">Vilkår</a>
                </li>
                <li>
                  <a href="#kontakt">Kontakt</a>
                </li>
                <li>
                  <input type="text" placeholder="Search.."></input>
                </li>
              </ul>
            </div>
    </div>
    
  );
}

export default Header;
