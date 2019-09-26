import render from './render'
import {IVDOM} from './type'

const onChange = (event) => {
    console.log('event: ', event);
};

const element: IVDOM = {
    type: 'div',
    props: {
        id: 'container',
        children: [
            {
                type: 'div', props: {
                    children: [
                        {type: 'input', props: {value: 'foo', type: 'text', onChange}},
                    ]
                }
            },
            {type: 'a', props: {href: '/bar', children: 'Click me'}},
            {type: 'span', props: {}}
        ]
    }
};

const root = document.getElementById('root');



render(element, root);