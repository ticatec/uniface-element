<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import CommonEditor from "../common-editor/CommonEditor.svelte";
    import {onMount} from "svelte";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import Popover from "$lib/common/Popover.svelte";
    import type UnitOption from "$lib/unit-number-editor/UnitOption";
    import NumberInput from "$lib/common-editor/NumberInput.svelte";


    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let value: number | null;
    export let prefix: string = '';
    export let allowNegative: boolean = false;
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let removable: boolean = true;
    export let unitCode: string = null as unknown as string;
    export let onChange: OnChangeHandler<number | null> = null as unknown as OnChangeHandler<number | null>;
    export let units: Array<UnitOption>;
    export let menu$height: number = 0;
    export let placeholder: string = '';


    let className: string = '';
    let editor: any;
    let unit: UnitOption = null as unknown as UnitOption;
    let standardUnit: UnitOption | undefined;

    let unitValue: number | null = value;

    let showPopup: boolean = false;
    let divPanel: any;
    let mh;

    $: mh = `height: ${menu$height > 0 ? menu$height + 'px' : 'auto'}`;

    const openPopup = () => {
        showPopup = true;
    }

    const handleValueChange = (uv: number | null) => {
        if (uv == null) {
            value = null;
        } else if (standardUnit) {
            value = uv / (unit.ratio ?? 1)
        } else {
            value = uv;
        }
        onChange?.()
    }

    const handleUnitClick = (item: any) => (e: MouseEvent) => {
        unit = item;
        unitCode = unit.code;
        if (standardUnit == null) {
            onChange?.(value);
        }
        showPopup = false;
        calculateUnitValue();
        e.stopPropagation();
        e.preventDefault();
    }

    const calculateUnitValue = () => {
        if (standardUnit) {
            unitValue = value == null ? null : value * (unit.ratio ?? 1)
        } else {
            unitValue = value
        }
    }
    const clean = () => {
        value = null;
        unitValue = null;
        editor.setFocus();
    }


    onMount(async () => {
        unit = units.find(item => item.code == unitCode) ?? units[0];
        standardUnit = units.find(item => item.ratio == 1);
        calculateUnitValue();
    })

    const determineValueChangeFormOutside = (uc: string, v: number | null) => {
        unit = units.find(item => item.code == uc) ?? units[0];
        calculateUnitValue();
    }

    $: determineValueChangeFormOutside(unitCode, value);

</script>

<div bind:this={divPanel}>
    <CommonEditor {displayMode} {style} {value} {prefix} suffix={unit?.text??unit?.code} {readonly} {variant} {compact} class={className}
                  hasLeadingIcon={$$slots['leading-icon']}
                  showActionIcon={removable && !readonly && !disabled && value != null} {clean}>
        <svelte:fragment slot="leading-icon">
            {#if $$slots['leading-icon']}
                <div class="editor-embed-icon">
                    <slot name="leading-icon"/>
                </div>
            {/if}
        </svelte:fragment>
        <NumberInput bind:this={editor} style="flex: 1 1 auto" {disabled} {placeholder} bind:value={unitValue} precision={unit?.precision}
                     {allowNegative}
                     max={unit?.max} min={unit?.min} {readonly} onChange={handleValueChange}/>
        <div class="editor-embed-icon" slot="trailing-icon">
            {#if !disabled && !readonly}
                <i class="option-dropdown uniface-icon-chevron-down" aria-hidden="true" on:click={openPopup}></i>
            {/if}
        </div>
    </CommonEditor>

    {#if showPopup}
        <Popover target={divPanel} autoFit={false} align="right" on:close={()=>{showPopup=false}}>
            <div class="options-popover" style="min-width: 90px; box-sizing: border-box; text-align: center; {mh}" >
                {#each units as op}
                    <div style="padding-left: 12px; padding-right: 12px" on:click={handleUnitClick(op)} aria-hidden="true">
                        <span>{op.text ?? op.code}</span>
                    </div>
                {/each}
            </div>
        </Popover>
    {/if}
</div>