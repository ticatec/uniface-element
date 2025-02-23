<script lang="ts">

    import {NavItemStatus} from "./NavItemStatus";

    type ItemClickHandler = (item: any) => void;
    type RetrieveItemStatus = (item: any) => NavItemStatus;

    export let items: Array<any>;
    export let activeItem: any = null;
    export let style: string = "";
    export let itemClickHandler: ItemClickHandler;
    export let retrieveStatus: RetrieveItemStatus;

    const handleItemClick = (item: any) => (e: MouseEvent) => {
        activeItem = item;
        itemClickHandler?.(item);
    }

</script>

<div class="uniface-navigator-panel" {style}>
    <div class="navigator-content">
        {#each items as item}
            <div class="uniface-navigator-item {retrieveStatus?.(item)??NavItemStatus.Completed}" class:active={activeItem===item}
                 aria-hidden="true" on:click={handleItemClick(item)}>
                <span>{item.text}</span>
            </div>
        {/each}
    </div>
</div>

