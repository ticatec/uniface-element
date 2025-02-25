<script lang="ts">

    import type {ButtonType} from "$lib/button/ButtonType";

    export let type: ButtonType = 'default'; // 默认按钮类型
    export let label: string = '';
    export let variant: 'plain' | 'round' | '' = '';
    export let disabled: boolean = false;
    export let style: string = '';
    export let size: 'big' | 'medium' | 'mini' = 'medium';
    export let onClick: (event: MouseEvent) => void;
    export let icon: string | null = null;

    let enableClick: boolean = true;

    const handleClick = (e: MouseEvent) => {
        if (!disabled && enableClick) {
            enableClick = false;
            onClick?.(e);
            setTimeout(() => {
                enableClick = true
            }, 500);
        }
        e.stopPropagation();
        e.preventDefault();
    }

</script>

<div {style} class="uniface-button uniface-common-button {variant} {size} {type}" aria-hidden="true" class:disabled
     on:click={handleClick}>
    {#if icon != null}
        <i style="margin-right: 6px" class={icon}></i>
    {/if}
    <slot>
        {#if label != null && label.length > 0}
            <span>{label}</span>
        {/if}
    </slot>
</div>

