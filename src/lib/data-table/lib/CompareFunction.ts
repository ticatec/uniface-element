export type CompareFunction = (o1: any, o2: any) => number;

const compareObject:CompareFunction = (o1: any, o2:any) => o1 == o2 ? 0 : o1 < o2 ? -1 : 1;

export {compareObject}