<script lang="ts">


    // Define props with default values
    import i18n from "@ticatec/i18n";
    import langRes from "$lib/i18n_resources/uniface_en_resource";

    export let initialColor = "#ffffff";
    export let showHex = true;
    export let showRgb = false;
    export let swatches: Array<any> = [];

    let selectedColor = initialColor;
    let rgbValues = hexToRgb(initialColor);


    // Convert hex to RGB
    function hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    // Emit change event when color changes
    function handleColorChange(event: Event) {
        selectedColor = "0x000000"; //event.target?.value;
        rgbValues = hexToRgb(selectedColor);
        // dispatch('change', {
        //     hex: selectedColor,
        //     rgb: rgbValues
        // });
    }

    // Select a swatch
    function selectSwatch(color: any) {
        selectedColor = color;
        rgbValues = hexToRgb(selectedColor);
        // dispatch('change', {
        //     hex: selectedColor,
        //     rgb: rgbValues
        // });
    }
</script>

<div class="color-picker">
    <label for="color-input">
        {i18n.getText('uniface.pickupColor', langRes.uniface.colorPicker)}
    </label>

    <div class="color-input-group">
        <input
                id="color-input"
                type="color"
                bind:value={selectedColor}
                on:change={handleColorChange}
        />
        <div
                class="color-preview"
                style="background-color: {selectedColor};"
        ></div>
    </div>

    {#if showHex}
            <div class="color-value">
                <span>HEX:</span> {selectedColor}
            </div>
        {/if}

    {#if showRgb}
            <div class="color-value">
                <span>RGB:</span> rgb({rgbValues.r}, {rgbValues.g}, {rgbValues.b})
            </div>
        {/if}

    {#if swatches && swatches.length > 0}
            <div class="swatches">
                {#each swatches as swatch}
                        <button
                                class="swatch"
                                style="background-color: {swatch};"
                                on:click={() => selectSwatch(swatch)}
                                aria-label={`Select color ${swatch}`}
                                class:selected={selectedColor === swatch}
                        ></button>
                    {/each}
            </div>
        {/if}
</div>

<style>
    .color-picker {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 16px;
        border-radius: 8px;
        background-color: #f8f9fa;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 300px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #333;
    }

    .color-input-group {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
    }

    input[type="color"] {
        width: 40px;
        height: 40px;
        border: none;
        padding: 0;
        background: none;
        cursor: pointer;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .color-preview {
        width: 40px;
        height: 40px;
        margin-left: 12px;
        border-radius: 4px;
        border: 1px solid #ddd;
    }

    .color-value {
        margin-bottom: 8px;
        font-size: 14px;
    }

    .color-value span {
        font-weight: 600;
        margin-right: 4px;
    }

    .swatches {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
    }

    .swatch {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #ddd;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .swatch:hover {
        transform: scale(1.1);
    }

    .swatch.selected {
        border: 2px solid #333;
        box-shadow: 0 0 0 2px white inset;
    }
</style>