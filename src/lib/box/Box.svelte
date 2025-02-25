<script lang="ts">

    export let style: string = "";
    export let title: string = null as unknown as string;
    export let round: boolean = false;

    export let content$style: string = '';

</script>

<div {style} class="uniface-box" class:round>
    {#if title || $$slots['header']}
        <div class="box-title">
            <slot name="header">
                <div style="width: 100%; box-sizing: border-box; padding: 6px 12px; overflow: hidden; text-overflow: ellipsis">
                    <span>{title}</span>
                </div>
            </slot>
        </div>
    {/if}
    <div class="box-content" style={content$style}>
        <slot></slot>
    </div>
</div>
