<script lang="ts">
    export let title: string;
    export let style: string = '';
</script>

<div class="uniface-top-bar" {style}>
    {#if $$slots['home']}
        <div class="bar-home">
            <slot name="home">

            </slot>
        </div>
    {/if}
    <div class="main-content">
        <slot>
            <span>{title}</span>
        </slot>
    </div>
    <slot name="right">
    </slot>
</div>
