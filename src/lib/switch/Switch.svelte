<script lang="ts">

    export let checkLabel: string = "On";
    export let uncheckLabel: string = "Off";
    export let readonly: boolean = false;
    export let disabled: boolean = false;

    export let value: boolean;

    const toggleSwitch = (e: MouseEvent) => {
        if (readonly || disabled) {
            //value = !value;
            e.stopPropagation();
            e.preventDefault();
        }
    }

</script>

<div class="switch-box">
    <label class="switch" class:readonly class:disabled aria-hidden="true" on:click={toggleSwitch}>
        <input type="checkbox" bind:checked={value}>
        <span class="slider"></span>
        <span class="text">{value ? uncheckLabel : checkLabel}</span>
    </label>
</div>

