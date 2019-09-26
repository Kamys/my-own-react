import {IVDOM} from 'src/type'

const isString = (value: any): value is string => {
	return typeof value === 'string' || value instanceof String
};

const isListener = (propsKey: string): boolean => {
	return propsKey.startsWith('on');
};

const render = (element: IVDOM, parent) => {
	const newElement = document.createElement(element.type);
	const {children, ...otherProps} = element.props;
	Object.entries(otherProps).forEach(([key, value]) => {
		if (isListener(key)) {
			const eventType = key.toLowerCase().substring(2);
			newElement.addEventListener(eventType, value)
		} else {
			newElement[key] = value;
		}
	});
	if (children) {
		if (isString(children)) {
			const textNode = document.createTextNode(children);
			newElement.appendChild(textNode);
		} else {
			children.forEach((child) => render(child, newElement))
		}
	}
	parent.appendChild(newElement);
};

export default render;