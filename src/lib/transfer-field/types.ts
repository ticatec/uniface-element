export interface LoadResult {
    hasMore: boolean;
    list: Array<any>;
}
export type FunFilter = (item: any, text: string) => boolean;
export type LazyLoader = (text: string) => Promise<LoadResult>;