<script lang="ts">
    import Icon from "$lib/icon";
    import type {PageAction} from "./PageAction";
    import {IconButton} from "$lib/button";

    export let title: string;
    export let comment: string = '';
    export let goBack: PageAction | null;
    export let reload: PageAction | null;

</script>
{#if goBack}
    <div style="padding-right: 12px;">
        <Icon name="icon_google_keyboard_backspace" onClick={goBack}></Icon>
    </div>
{:else if reload}
    <div style="padding-right: 12px;">
        <Icon name="icon_google_refresh" onClick={reload}></Icon>
    </div>
{/if}
<div class="page-topic">
    <span>{title}</span>
</div>
<div class="page-comment">
    {#if comment}
        <span>{comment}</span>
    {/if}
</div>
<slot></slot>
