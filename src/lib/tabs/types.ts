
export type TabActionHandler = (tab: any) => void;
export type TabCloseHandler = (tab: any) => Promise<boolean>;
export type TabRender = (tab: any) => any;