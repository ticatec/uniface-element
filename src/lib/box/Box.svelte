<script lang="ts">

    export let style: string = "";
    export let title: string = null as unknown as string;
    export let round: boolean = false;
    export let content$style: string | null = null;
    export let header$style: string | null = null;
    export let footer$style: string | null = null;
    export let showFooter: boolean = true;
    export {className as class};

    let className: string | null = null;


</script>

<div {style} class="uniface-box {className}" class:round>
    {#if title || $$slots['header']}
        <div class="box-header flex-container" style={header$style}>
            <slot name="header">
                <div class="title">
                    <span>{title}</span>
                </div>
            </slot>
        </div>
    {/if}
    <div class="box-content" style={content$style}>
        <slot></slot>
    </div>
    {#if $$slots['footer']}
        <div class="box-footer flex-container" style="{footer$style}; {showFooter ? '' : 'display: none' }">
            <slot name="footer">
            </slot>
        </div>
    {/if}
</div>
