<script lang="ts">

    export let onClick: (event: MouseEvent) => void;
    export let months: Array<string>;
    export let value: any;

    const handleMonthClick = (m: number) => (e: MouseEvent) => {
        if (m != value) {
            value = m;
            onClick?.(e)
        } else {
            e.stopPropagation();
            e.preventDefault();
        }
    }

</script>
<div class="uniface-month-pickup-panel" on:click={onClick} aria-hidden="true">
    <div>
        <div style="display: grid; grid-template-columns: auto auto auto; overflow: hidden; width: 100%">
            {#each months as month, idx}
                <div class="month-block" class:selected={idx===value} aria-hidden="true"
                     on:click={handleMonthClick(idx)}>
                    <span>{month}</span>
                </div>
            {/each}
        </div>
    </div>
</div>