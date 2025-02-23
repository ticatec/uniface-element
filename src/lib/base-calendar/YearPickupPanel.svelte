<script lang="ts">


    export let onClick: (event: MouseEvent) => void;
    export let year: number;
    export let maxYear: number;
    export let minYear: number;

    let offset = 6;
    let years = 12;

    const handleYearClick = (idx: number) => (e: MouseEvent) => {
        let y = year-offset+idx
        if (!isDisabled(y)) {
            year = y;
        } else {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    const showYears = (n: number) => (e: MouseEvent) => {
        offset = offset - n;
        e.stopPropagation();
        e.preventDefault();
    }

    const isDisabled = (y: number) => (maxYear!=null && y > maxYear) || (minYear!=null && y < minYear);

</script>
<div class="uniface-year-pickup-panel" on:click={onClick}>
    <div>
        <div>
            <div style="text-align: center">
                <div style="display: inline-block; width: 30px; height: 10px; padding: 6px 0">
                    <i class="uniface-icon-chevrons-up" on:click={showYears(-years)}></i>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: auto auto auto auto; width: 100%; overflow: hidden">
                {#each Array(years) as _, i}
                    <div class="year-block" on:click={handleYearClick(i)} class:disabled={isDisabled(year-offset+i)} class:selected={year===year-offset+i}>
                        <span>{year-offset+i}</span>
                    </div>
                {/each}
            </div>
            <div style="text-align: center">
                <div style="display: inline-block; width: 30px; height: 10px; padding: 6px 0">
                    <i class="uniface-icon-chevrons-down" on:click={showYears(years)}></i>
                </div>
            </div>
        </div>
    </div>
</div>