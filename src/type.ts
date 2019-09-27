export interface IVDOM {
	type: string;
	props: IProps;
}

export interface IProps {
	children?: IVDOM[] | string;
	[key: string]: any;
}