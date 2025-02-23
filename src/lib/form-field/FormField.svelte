<script lang="ts">

    import utils from "$lib/common/utils";

    export {className as class}
    export let label: string = "Label:"
    export let style: string = '';
    export let label$style: string = '';
    export let required: boolean = false;
    export let error: string = '';
    export let arrangement: 'vertical' | 'horizontal' = 'vertical';
    export let labelSuffix: string = ':';

    let className: string = '';

</script>
<div class="uniface-form-field {arrangement} {className}" {style}>
    <div class="form-content" style="width: 100%">
        <div class="field-label" style="align-self: center; {label$style};">
            {#if required}
                <span class="required-indicator">*</span>
            {/if}
            <span>{label}{labelSuffix}</span>
        </div>
        <div class="field">
            <slot/>
        </div>
    </div>
    {#if !utils.isEmpty(error)}
        <div class="form-content" style="width: 100%">
            {#if arrangement == "horizontal"}
                <div class="field-label" style={label$style}>
                </div>
            {/if}
            <div class="field-hint"><span>{error}</span></div>
        </div>
    {/if}
</div>