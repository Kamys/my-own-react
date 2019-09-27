import render from './render'
import {IVDOM} from './type'



const rootDom = document.getElementById("root");

let time = 1000;
let time2 = 1000;

function tick() {
    time = time - 1;
    time2 = time2 + 1;
    const clockElement: IVDOM = {
        type: 'div',
        props: {
            children: [
                {
                    type: 'input',
                    props: {
                        value: `Text ${time}`,
                        children: []
                    }
                },
                {
                    type: 'input',
                    props: {
                        value: `Text ${time2}`,
                        children: []
                    }
                },
            ]
        }
    };
    render(clockElement, rootDom);
}

tick();
setInterval(tick, 1000);