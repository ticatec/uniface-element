<script lang="ts">

    import type {MouseClickHandler} from "$lib/common/MouseClickHandler";

    export let disabled: boolean = false;
    export let size: 'big' | 'medium' | 'mini' = 'medium';
    export let label: string = '';
    export let type: 'default' | 'primary' | 'secondary' | 'third' | 'forth' = 'default'; // 默认按钮类型
    export let onClick: MouseClickHandler;
    export let style: string = '';

    let enableClick: boolean = true;

    const handleClick = (e: MouseEvent) => {
        if (!disabled && enableClick) {
            enableClick = false;
            onClick?.(e)
            setTimeout(() => {
                enableClick = true
            }, 500);
        }
        e.stopPropagation();
        e.preventDefault();

    }

</script>
<div class="uniface-text-button {size} {type}" {style} class:disabled aria-hidden="true" on:click={handleClick}>
    <slot>
        {#if label != null && label.length > 0}
            <span>{label}</span>
        {/if}
    </slot>
</div>
