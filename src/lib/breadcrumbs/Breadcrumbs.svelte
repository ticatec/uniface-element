<script lang="ts">
    // 定义组件属性
    import type Breadcrumb from "./Breadcrumb";

    export let items: Array<Breadcrumb> = []; //
    export let separator: string = "/"; // 分隔符
    export let onItemClick: (item: any) => (event: MouseEvent) => void;

    export let style: string = '';

</script>


<div class="uniface-breadcrumbs" {style}>
    {#each items as item, idx}
        <div>
            <span>{separator}</span>
            <span aria-hidden="true" class="breadcrumb" on:click={idx==items.length-1 ? null : onItemClick(item.data)}>{item.label}</span>
        </div>
    {/each}
</div>