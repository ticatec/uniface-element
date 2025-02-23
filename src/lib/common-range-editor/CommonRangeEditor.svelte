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
    <div class="uniface-range-editor {variant}">
        <slot name="from"/>
        <div class="divider"></div>
        <slot name="to"/>
        <Icon name="uniface-icon-x" clickable class="uniface-editor-clean-icon {showActionIcon ? '' : 'hidden'}" onClick={clean}/>
        {#if $$slots['trailing-icon']}
            <div class="editor-embed-icon">
                <slot name="trailing-icon"/>
            </div>
        {/if}
    </div>
    <slot></slot>
</div>