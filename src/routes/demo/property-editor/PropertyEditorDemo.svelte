<script lang="ts">
    import Navigator, {NavItemStatus} from "$lib/navigator";
    import Box from "$lib/box";
    import PropertyEditor from "$lib/property-editor/PropertyEditor.svelte";
    import type PropertyField from "$lib/property-editor/MetaEditorType";
    import { MetaEditorType } from "\$lib/property-editor/MetaEditorType";
    import {onMount} from "svelte";


    onMount(async() => {

    })


    let data: any = {};

    const fieldTypeOptions = [
        {
            code: "text",
            text: '文本'
        },
        {
            code: "number",
            text: '数值'
        },
        {
            code: "unitNumber",
            text: '带单位数值'
        },
        {
            code: "options",
            text: '字典'
        }

    ]

    let fields:Array<PropertyField> = [
        {
            name: 'fieldName',
            label: '字段名称',
            type: MetaEditorType.Text,
            attrs: {
                input$maxLength: 40
            }
        },
        {
            name: 'keyCode',
            label: '统一字段编码',
            type: MetaEditorType.Text,
            attrs: {
                input$maxLength: 40
            }
        },
        {
            name: 'fieldType',
            label: '类型',
            type: MetaEditorType.Options,
            attrs: {
                options: fieldTypeOptions
            }
        },
        {
            name: 'visible',
            label: '是否显示',
            type: MetaEditorType.CommonText,
            attrs: {
                words:['True', 'False']
            }
        },
        {
            name: 'readonly',
            label: '只读',
            type: MetaEditorType.Text
        }
    ]


    $: console.log("属性值", data);

</script>

<div style="padding: 30px; height: 100%; overflow: hidden; box-sizing: border-box;">

    <Box style="width: 400px; height: 100%" title="字段属性">
        <PropertyEditor {fields} bind:data>

        </PropertyEditor>
    </Box>
</div>