<script lang="ts">
    import {onMount} from "svelte";

    export let value: any;
    export let label: string;
    export let group: any;
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let compact: boolean = false;
    export let style: string = '';

    let roProps: any = {};

    onMount(()=>{

    })

    const handleClick = (e: MouseEvent) => {
        if (disabled || readonly) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    $: roProps = readonly ? {readonly} : {}

</script>

<label class="uniface-radio-button" {style} class:disabled class:compact>{label}
    <input type="radio" bind:group {disabled} {...roProps} on:click={handleClick} {value}>
    <span></span>
</label>