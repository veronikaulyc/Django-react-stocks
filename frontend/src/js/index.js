
import React from 'react';
import { render } from 'react-dom'; //importing just one method instead of the whole package

import App from "./components/App";

const wrapper = document.querySelector("#main");

wrapper ? render(<App />, wrapper) : false;
