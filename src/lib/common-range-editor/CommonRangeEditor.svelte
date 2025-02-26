<script lang="ts">

    import Icon from "$lib/icon";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let showActionIcon: boolean = false;
    export let clean: () => void;

    let className: string = '';

</script>
<div class="uniface-range-wrapper {className}" tabindex="-1" class:compact {style} on:blur>
    <div class="uniface-range-editor uniface-common-picker {variant}">
        <slot name="from"/>
        <div class="divider"></div>
        <slot name="to"/>
        <div class="uniface-editor-clean-icon {showActionIcon ? '' : 'hidden'}">
            <i class="uniface-icon-x clickable" aria-hidden="true" on:click={clean}></i>
        </div>
        {#if $$slots['trailing-icon']}
            <div class="action-icon">
                <slot name="trailing-icon"/>
            </div>
        {/if}
    </div>
    <slot></slot>
</div>