<script lang="ts">

    export {className as class }
    export let label: string = "Label"
    export let style: string = '';
    export let label$style: string = '';
    export let arrangement: 'vertical' | 'horizontal' = 'vertical' ;
    export let size: '' | 'x15' | 'x20' | 'x25' | 'x30' | 'x35' | 'x40' = '';
    export let labelSuffix: string = ':';

    let className: string = '';

</script>
<div class="uniface-filter-field {size} {arrangement} {className}" {style} >
    <div class="field-container">
        <div class="field-label" style={label$style}>
            <span>{label}{labelSuffix}</span>
        </div>
        <div class="field">
            <slot/>
        </div>
    </div>
</div>