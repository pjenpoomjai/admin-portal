export interface IMasterConfig {
	number: number
	name: string
	value: string
	path: string
}

export enum LOOK_UP_PATH {
	CHANNEL = 'channel',
	INSTRUCTION_TYPE = 'instruction-type',
	SERVICE = 'service',
	TIMEOUT_TYPE = 'timeout-type',
}
