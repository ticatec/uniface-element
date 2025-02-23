<script lang="ts">

    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";

    export let label: string = "";
    export let readonly: boolean = false;
    export let disabled: boolean = false;
    export let value: boolean = false;
    export let indeterminate: boolean = false;
    export let style: string = '';
    export let compact: boolean = false;
    export let onClick: ((event: MouseEvent) => void) | null = null;
    export let onChange: OnChangeHandler<boolean> = null as unknown as OnChangeHandler<boolean>;

    let oldValue = value;

    let checkbox: any;

    const handleClickEvent = (e: MouseEvent) => {
        if (readonly || disabled) {
            e.stopPropagation();
            e.preventDefault();
        } else {
            indeterminate = false;
            setTimeout(()=>{
                onClick?.(e);
            }, 50)
            e.stopPropagation();
        }
    }

    $: if (checkbox) {
        checkbox.indeterminate = indeterminate;
    }

    $: if (value != oldValue) {
        oldValue = value;
        onChange?.(value)
    }


</script>
<div class="uniface-checkbox" class:disabled class:compact {style}>
    <label on:click={handleClickEvent} aria-hidden="true" >
        <input bind:this={checkbox} type="checkbox" bind:checked={value} {readonly} {disabled}/>
        <span>{label}</span>
    </label>
</div>