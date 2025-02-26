<script lang="ts">
    import iconLoading from "../assets/loading.gif";
    import OptionsBox from "$lib/cascade-options-select/OptionsBox.svelte";
    import type {OnSelectHandler} from "$lib/common/OnSelectHandler";


    export let nodes: Array<Array<any>>;
    export let keyField: string;
    export let textField: string;
    export let box$style: string;
    export let onSelect: OnSelectHandler<any>;

    export let selectedItems:Array<any> = [];
    let busy: boolean = false;

    const selectOption = (level: number) => (item: any) => {
        if (level == 0) {
            selectedItems = [item];
            nodes = [nodes[0]];
        } else if (level == selectedItems.length - 1) {
            selectedItems.pop();
            selectedItems = [...selectedItems, item];
        } else if (level < selectedItems.length) {
            selectedItems.splice(level);
            nodes.splice(level+1);
            selectedItems = [...selectedItems, item];
        } else if (level == selectedItems.length) {
            selectedItems = [...selectedItems, item];
        }
        onSelect?.(item);
    }


</script>
<div style="width: 100%; height: 100%; position: relative">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: row; overflow: auto">
        {#each nodes as node, idx}
            <OptionsBox options={node} {keyField} {textField} {box$style} onSelect={selectOption(idx)}
                        selectedItem={selectedItems[idx]}/>
        {/each}
    </div>
    {#if busy}
    <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background-color: #e1e1e110;">
        <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center">
            <div style="width: 100px; margin: 0 auto; text-align: center; background-color: #f0f0f0; border-radius: 4px; padding: 8px 12px; box-sizing: border-box;">
                <img src={iconLoading} width="32" height="32"/>
            </div>
        </div>
    </div>
    {/if}

</div>