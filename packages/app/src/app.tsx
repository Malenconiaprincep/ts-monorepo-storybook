import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Main } from '@sample/components'
import './style.scss'

  
const App = () => {
    return (
        <div style={{ margin: 20 }}>
    <div style={{ height: 100 }}/>
    <div>
      test
      <Main text="test" />
    </div>
  </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);