import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouteConfig from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div className='route'>
        {RouteConfig}
    </div>
    , document.getElementById('root')
);

registerServiceWorker();
