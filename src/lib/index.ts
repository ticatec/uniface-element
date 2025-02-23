import {DateContext} from "./base-calendar";
import type CardAction from "./card/CardAction";
import type {DialogCloseConfirm, IDialog} from './dialog'
import {type IMessageBox, ModuleResult} from "./message-box";
import type {Toast} from "./toast";
import type {Indicator} from "./indicator"
import type {UnitOption} from "./unit-number-editor";
import {DisplayMode} from "./common/DisplayMode.js";
import type {FunFilter, LazyLoader, LoadResult} from "./list-box";
import type {ActionsColumn, FormatCell, CellHint, IndicatorColumn, RowAction, GetRowActions, ActionFunction, DataColumn} from "./data-table";
import type {ContextMenuItem, OnContextMenu, ActionCallback} from "./context-menu";
import type {MouseClickHandler} from "$lib/common/MouseClickHandler";

export {
    DateContext,
    ModuleResult,
    DisplayMode
};


declare global {
    interface Window {
        Indicator: Indicator;
        Toast: Toast;
        MessageBox: IMessageBox;
        Dialog: IDialog;
    }
}

export type {CardAction, IDialog, DialogCloseConfirm, IMessageBox, Toast, UnitOption};
export type {MouseClickHandler};
export type {LazyLoader, FunFilter, LoadResult};
export type {ActionsColumn, FormatCell, CellHint, IndicatorColumn, RowAction, GetRowActions, ActionFunction, DataColumn}
export type {ContextMenuItem, OnContextMenu, ActionCallback};