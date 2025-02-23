<script lang="ts">
    export let title: string = 'My Header';
    export let style: string = '';
</script>

<div class="uniface-header" {style}>
    {#if $$slots['home']}
    <div class="bar-home" style="align-self: center">
        <slot name="home">

        </slot>
    </div>
    {/if}
    <div class="title">
        <slot>
            <span>{title}</span>
        </slot>
    </div>
    {#if $$slots['right']}
        <div class="bar-right">
        <slot name="right">
        </slot>
        </div>
    {/if}
</div>
