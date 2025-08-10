<script lang="ts">

    import type CardAction from "$lib/card/CardAction";
    import CommonCardActionBar from "$lib/card/CommonCardActionBar.svelte";


    export let style: string = "";
    export let title: string = null as unknown as string;
    export let actions: Array<CardAction> = [];
    export let variant: 'plain' | '3d' = 'plain';
    export let iconColor: string | null = null;
    export let data: any = null;

</script>

<div class="uniface-card" class:shadowBox={variant=='3d'}>
    <div {style}>
        {#if title}
            <div class="card-header simple">
                <span>{title}</span>
            </div>
        {:else if $$slots['header-bar']}
            <div class="card-header">
                <slot name="header-bar"/>
            </div>
        {/if}
        <div class="card-content">
            <slot/>
        </div>
        {#if actions && actions.length > 0}
            <CommonCardActionBar color={iconColor} {actions} {data}/>
        {:else }
            {#if $$slots['action-bar']}
                <div class="card-action-bar">
                    <slot name="action-bar"/>
                </div>
            {/if}
        {/if}
    </div>
</div>