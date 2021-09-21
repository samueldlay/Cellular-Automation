import { render } from "react-dom";
import React, {useEffect, useState} from 'react';

import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);

// const Example = props => {
//   const [countdown, setCountdown] = React.useState(100);
//   React.useEffect(() => {
//       const timeout = setTimeout(() => {
//           setCountdown(countdown - 1);
//       }, 500);
//       // return () => {
//       //   console.log(timeout)
//       //   if (countdown < 1)
//       //     clearTimeout(timeout);
//       // }
//       if (countdown < 95) clearTimeout(timeout);
//   }, [countdown]);
  
//   return (<div>{countdown}</div>)
// }


// // Render it
// render(
//   <Example />,
//   document.getElementById("root")
// );
