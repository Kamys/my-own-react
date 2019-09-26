export interface IVDOM {
	type: string;
	props: {
		children?: IVDOM[] | string;
		[key: string]: any
	}
}