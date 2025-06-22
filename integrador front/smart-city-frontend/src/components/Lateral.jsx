import React from 'react';
import '../styles/Lateral.css';
import { IoLogOut } from "react-icons/io5";
import {
  IoMdHome,
  IoIosPin,
  IoMdListBox,
} from "react-icons/io";

import { IoAddCircleSharp,
          IoBusinessSharp ,
} from "react-icons/io5";

const Lateral = () => {
  return (
    <aside className="lateral">
      <nav>
        <ul>
          <li>
            <a href="/sensores" title="Home">
              <IoMdHome className="icon" />
            </a>
          </li>
          <li>
            <a href="/localizacao" title="Localização">
              <IoIosPin className="icon" />
            </a>
          </li>

          <li>
            <a href="/historico" title="Historico sensores">
              <IoMdListBox className="icon" />
            </a>
          </li>
          <li>
            <a href="/novosensor" title="Cria novo sensor">
              <IoAddCircleSharp className="icon" />
            </a>
          </li>
          <li>
            <a href="/ambientes" title="Ambientes">
              <IoBusinessSharp className="icon" />
            </a>
          </li>
          <li>
            <a href="/api/token" title="Login">
              <IoLogOut  className="icon" />
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Lateral;
