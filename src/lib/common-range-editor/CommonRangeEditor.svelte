<script lang="ts">

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let showActionIcon: boolean = false;
    export let clean: () => void;

    let className: string = '';

</script>

<div class="uniface-common-editor uniface-range-editor uniface-common-picker {variant} {className}" class:compact tabindex="-1" {style}
     on:blur>
    <div style="flex: 1 1 auto; height: 100%; display: flex; flex-direction: row; gap: 2px; position: relative">
        <slot name="from"/>
        <div class="divider"></div>
        <slot name="to"/>
        <div class="uniface-editor-clean-icon {showActionIcon ? '' : 'hidden'}">
            <i class="icon_google_clear clickable" aria-hidden="true" on:click={clean}></i>
        </div>
    </div>
    <slot/>
</div>
