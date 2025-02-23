<script lang="ts">

    import type {OnSelectHandler} from "$lib/common/OnSelectHandler";

    export let options: Array<any>;
    export let onSelect: OnSelectHandler<any>;
    export let selectedItem: any;
    export let keyField: string;
    export let textField: string;
    export let box$style: string;

    const handleItemClick = (item: any) => (e: MouseEvent) => {
        selectedItem = item;
        onSelect(item);
    }
</script>
<div class="cascade-column" style={box$style}>
    {#each options as op}
        <div class="option-item" class:selected={op[keyField]===(selectedItem??{})[keyField]}
             aria-hidden="true" on:click={handleItemClick(op)}>
            <span>{op[textField]}</span>
        </div>
    {/each}
</div>
