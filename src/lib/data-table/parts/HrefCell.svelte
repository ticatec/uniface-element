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
        <button class="link-style" on:click|preventDefault={()=>item.action()}>{item.text}</button>
    {/each}
</div>

<style>
    button.link-style {
        background: none;
        border: none;
        color: blue;
        text-decoration: underline;
        cursor: pointer;
        font: inherit;
        padding: 0;
    }
    button.link-style:focus {
        outline: none;
    }

    button.link-style:active {
        /* 取消默认的active边框或者阴影 */
        outline: none;
        box-shadow: none;
    }
</style>