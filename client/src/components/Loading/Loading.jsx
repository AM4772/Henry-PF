import React from 'react';

import spinner from '../../assets/e4cd0639b5a5c1e164aeff4370ed2365.gif';
import s from './Loading.module.sass';

function Loading(props) {
  return (
    <div id={s.background}>
      <div id={s.spinnerContainer}>
        <img src={spinner} alt=""></img>
      </div>
    </div>
  );
}
export default Loading;
