<script lang="ts">

    import {MetaEditorType} from "$lib/property-editor/MetaEditorType";
    import type PropertyField from "$lib/property-editor/MetaEditorType";
    import {type PropertyEditor} from "$lib/property-editor/MetaEditorType";
    import PropertyDateTimePickup from "$lib/property-editor/component/PropertyDateTimePickup.svelte";
    import PropertyTextEditor from "$lib/property-editor/component/PropertyTextEditor.svelte";
    import PropertyDatePickup from "$lib/property-editor/component/PropertyDatePickup.svelte";
    import PropertyNumberEditor from "$lib/property-editor/component/PropertyNumberEditor.svelte";
    import PropertyOptionsSelector from "$lib/property-editor/component/PropertyOptionsSelector.svelte";
    import unifaceI18N from "$lib/unifaceI18N";

    export let fields: Array<PropertyField>;

    const booleanOptions = [
        {code: true, text: "true"},
        {code: false, text: "false"}
    ]

    let propertyFields: Array<PropertyEditor> = [];

    export let data: any;

    let nameLabel: string = unifaceI18N.propertyEditorNameLabel;
    let valueLabel: string = unifaceI18N.propertyEditorValueLabel;

    const getEditor = (property: PropertyField) => {
        switch (property.type) {
            case MetaEditorType.Text:
                return PropertyTextEditor
            case MetaEditorType.DateTime:
                return PropertyDateTimePickup
            case MetaEditorType.Date:
                return PropertyDatePickup
            case MetaEditorType.Number:
                return PropertyNumberEditor
            case MetaEditorType.Options:
                return PropertyOptionsSelector
            case MetaEditorType.Boolean:
                property.attrs = {...property.attrs, options: booleanOptions};
                return PropertyOptionsSelector

        }
    }

    $: propertyFields = fields.map(item => ({component: getEditor(item), ...item}));

</script>

<div class="uniface-property-editor">
    <div class="table-header">
        <div class="header_label">
            {nameLabel}
        </div>
        <div class="header_value">
            {valueLabel}
        </div>
    </div>
    <div class="table-content">
        <div>
            {#each propertyFields as property}
                <div class="property_label">
                    <span>{property.label}</span>
                </div>
                <div class="property_control">
                    {#if property.component}
                        <svelte:component this={property.component} attrs={property.attrs} field={property.name} {data}/>
                    {:else}
                        <span>Error type</span>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>