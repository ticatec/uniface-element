<script lang="ts">
    import type HrefLink from "../lib/HrefLink";
    import type {HrefBuilder} from "../lib/HrefLink";

    export let data;
    export let href: HrefBuilder;

    let list: Array<HrefLink> = [];


    $: {
        let h = href(data);
        list = Array.isArray(h) ? h : [h];
    }
</script>
<div style="display: flex; flex-direction: row; gap: 8px; justify-content: center">
    {#each list as item, idx}
        <a href="javascript:void(0)" on:click={()=>item.action()}>{item.text}</a>
    {/each}
</div>