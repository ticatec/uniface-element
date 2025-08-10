<script lang="ts">

    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import {tick} from "svelte";

    export let label: string | null = null;
    export let readonly: boolean = false;
    export let disabled: boolean = false;
    export let value: boolean = false;
    export let indeterminate: boolean = false;
    export let style: string = '';
    export let compact: boolean = false;
    export let onClick: ((event: MouseEvent) => void) | null = null;
    export let onChange: OnChangeHandler<boolean> = null as unknown as OnChangeHandler<boolean>;
    export let autoFocus: boolean = false;

    export const setFocus = () => {
        setTimeout(()=> {
            checkbox && checkbox.focus();
        }, 50);
    }

    let oldValue = value;

    let checkbox: any;
    let checked: boolean;


    const handleClickEvent = (e: MouseEvent) => {
        if (readonly || disabled) {
            e.stopPropagation();
            e.preventDefault();
        } else {
            indeterminate = false;
            setTimeout(async () => {
                onClick?.(e);
                await tick();
                if (checked != oldValue) {
                    value = checked;
                    onChange?.(value)
                }
            }, 50)
            e.stopPropagation();
        }
    }

    $: if (checkbox) {
        checkbox.indeterminate = indeterminate;
    }

    $: { //当value从外面发生变化的时候
        checked = value;
        oldValue = value;
    }

    $: if (checkbox && autoFocus) {
        checkbox.focus();
    }

</script>
<div class="uniface-checkbox" class:disabled class:compact {style}>
    <label aria-hidden="true" on:click={handleClickEvent}>
        <input bind:this={checkbox} type="checkbox" bind:checked={checked} {readonly} {disabled}/>
        {#if label}
            <span>{label}</span>
        {/if}
    </label>
</div>