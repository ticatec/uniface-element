<script lang="ts">

    import utils from "$lib/common/utils";

    export {className as class}
    export let label: string = "Label:"
    export let style: string = '';
    export let label$style: string | null = null;
    export let required: boolean = false;
    export let error: string = '';
    export let arrangement: 'vertical' | 'horizontal' = 'vertical';
    export let labelSuffix: string = ':';

    export let label$alignment: 'center' | 'top' = 'center'

    let className: string = '';

</script>
<div class="uniface-form-field {arrangement} {className}" {style}>
    <div class="form-content" style="width: 100%">
        <div class="field-label" style={label$style} class:vert-top={arrangement== 'horizontal' && label$alignment=='top'}>
            {#if required}
                <span class="required-indicator">*</span>
            {/if}
            <span>{label}{labelSuffix}</span>
        </div>
        <div class="field">
            <slot/>
        </div>
        {#if !utils.isEmpty(error)}
            <div class="empty-field"></div>
            <div class="field-hint"><span>{error}</span></div>
        {/if}
    </div>

</div>