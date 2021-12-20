import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss'
import { JournalApp } from './JournalApp';

const divRoot = document.querySelector('#root');
ReactDOM.render(<JournalApp />, divRoot )