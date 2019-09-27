import {IVDOM} from 'src/type'
import updateDomProperties from './updateDomProperties';

let rootInstance = null;

function index(element, container) {
	const prevInstance = rootInstance;
	const nextInstance = reconcile(container, prevInstance, element);
	rootInstance = nextInstance;
}

function reconcile(parentDom, instance, element) {
	const newInstance = instantiate(element);

	if (instance == null) {
		parentDom.appendChild(newInstance.dom);
	} else {
		parentDom.replaceChild(newInstance.dom, instance.dom);
	}

	return newInstance;
}

function instantiate(element) {
	const { type, props } = element;

	// Create DOM element
	const isTextElement = type === "TEXT ELEMENT";
	const dom = isTextElement
		? document.createTextNode("")
		: document.createElement(type);

	// Add event listeners
	const isListener = name => name.startsWith("on");
	Object.keys(props).filter(isListener).forEach(name => {
		const eventType = name.toLowerCase().substring(2);
		dom.addEventListener(eventType, props[name]);
	});

	// Set properties
	const isAttribute = name => !isListener(name) && name != "children";
	Object.keys(props).filter(isAttribute).forEach(name => {
		dom[name] = props[name];
	});

	updateDomProperties(dom, [], props);

	// Instantiate and append children
	const childElements = props.children || [];
	const childInstances = childElements.map(instantiate);
	const childDoms = childInstances.map(childInstance => childInstance.dom);
	childDoms.forEach(childDom => dom.appendChild(childDom));

	const instance = { dom, element, childInstances };
	return instance;
}

export default index;