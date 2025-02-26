<script lang="ts">

    export let type: 'default' | 'primary' | 'secondary' | 'third' | 'forth' = 'default';
    export let disabled: boolean = false;
    export let size: 'big' | 'medium' | 'mini' = 'medium';
    export let style: string = '';
    export let icon: string = '';
    export let onClick: (event: MouseEvent) => void;


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

<div {style} class="uniface-button icon-button {size} {type}" aria-hidden="true" class:disabled on:click={handleClick}>
    <slot>
        <i class={icon}></i>
    </slot>
</div>
