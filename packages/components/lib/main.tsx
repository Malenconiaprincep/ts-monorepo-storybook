import React from 'react';
import style from './style.scss'
import { Main2 } from '@sample/components2'

export interface MainProps {
  text: string;
}

export const Main: React.FunctionComponent<MainProps> = ({ text }) => (
  <div>
    <main className={style.text}>hello world! {text} </main>
    <Main2 text="component2" />
  </div>
);