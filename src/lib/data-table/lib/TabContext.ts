let debugEnable = false;

const isDebugEnable = (): boolean => debugEnable;

const setDebugEnable = (value: boolean): void => {debugEnable = value};

export default {isDebugEnable}