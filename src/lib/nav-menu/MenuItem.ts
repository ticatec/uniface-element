import type {TreeNode} from "$lib/lib";

export default interface MenuItem {
    [key: string]: any
}

export interface MenuNode extends TreeNode<MenuItem> {

}

export type OnMenuClick = (item: MenuItem) => void;