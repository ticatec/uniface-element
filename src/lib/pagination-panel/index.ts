import PaginationPanel from "./PaginationPanel.svelte";
import type {OnRowCountChanged} from "./OnRowCountChanged";
import type {OnPageChange} from "$lib/pagination/OnPageChange";
import type {GenerateTotalInfo} from "$lib/pagination-panel/GenerateTotalInfo";

export default PaginationPanel

export type {OnRowCountChanged, OnPageChange, GenerateTotalInfo}