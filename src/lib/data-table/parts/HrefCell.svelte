<script lang="ts">
    import type {HrefBuilder} from "../lib/HrefLink";

    export let data;
    export let href: HrefBuilder;

    let text: string;
    let action: any;

    $: {
        let h = href(data);
        if (Array.isArray(h)) {

        } else {
            text = h.text;
            action = h.action;
        }
    }
</script>
<div>
    <a href="javascript:void(0)" on:click={()=>action(data)}>{text}</a>
</div>