<script lang="ts">

    import CommonRangeEditor from "../common-range-editor";
    import NumberInput from "$lib/common-editor/NumberInput.svelte";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let min: number | null = null;
    export let max: number | null = null;
    export let fromValue: number = null as unknown as number;
    export let toValue: number = null as unknown as number;

    let className: string = '';
    let showActionIcon: boolean = true;
    let editor: NumberInput;

    const cleanValue = () => {
        fromValue = null as unknown as number;
        toValue = null as unknown as number;
        editor.setFocus();
    }

    $: showActionIcon = fromValue != null || toValue != null;

</script>
<CommonRangeEditor {compact} class="{className}" {style} {variant} {showActionIcon} clean={cleanValue}>
    <svelte:fragment slot="from">
        <NumberInput bind:this={editor} style="width: 100%; text-align: center" placeholder="" {min} max={toValue} bind:value={fromValue}/>
    </svelte:fragment>
    <svelte:fragment slot="to">
        <NumberInput style="width: 100%; text-align: center" placeholder="" {max} min={fromValue} bind:value={toValue}/>
    </svelte:fragment>
</CommonRangeEditor>
