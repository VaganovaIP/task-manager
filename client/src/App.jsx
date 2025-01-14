import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './components/index.css'

import {useEffect, useState} from "react";
import RoutesApp from "./routes/routes";

export default function App() {

  return (
      <div>
        <RoutesApp></RoutesApp>
      </div>

  )
}

