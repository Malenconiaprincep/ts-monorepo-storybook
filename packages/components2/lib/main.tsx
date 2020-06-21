import React from 'react';
import style from './style.scss'

export interface MainProps {
  text: string;
}

export const Main2: React.FunctionComponent<MainProps> = ({ text }) => <main className={style.text}>hello world2! {text} </main>;