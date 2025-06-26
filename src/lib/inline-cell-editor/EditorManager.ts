import InlineTextEditor from "$lib/inline-cell-editor/InlineTextEditor.svelte";
import InlineOptionsSelect from "$lib/inline-cell-editor/InlineOptionsSelect.svelte";
import InvalidEditor from "$lib/inline-cell-editor/InvalidEditor.svelte";
import InlineDatePicker from "$lib/inline-cell-editor/InlineDatePicker.svelte";
import InlineNumberEditor from "$lib/inline-cell-editor/InlineNumberEditor.svelte";
import InlineDateTimePicker from "$lib/inline-cell-editor/InlineDateTimePicker.svelte";
import InlineOptionsMultiSelect from "$lib/inline-cell-editor/InlineOptionsMultiSelect.svelte";
import InlineCheckbox from "$lib/inline-cell-editor/InlineCheckbox.svelte";

class EditorManager {

    private map: Map<string, any>;
    constructor() {
        this.map = new Map<string, any>();
    }


    getRender(type: string): any {
        return this.map.get(type) ?? InvalidEditor;
    }

    register(type: string, render: any) {
        this.map.set(type, render);
    }
}

const editorManager = new EditorManager();

editorManager.register('text', InlineTextEditor);
editorManager.register('number', InlineNumberEditor);
editorManager.register('date', InlineDatePicker);
editorManager.register('boolean', InlineCheckbox);
editorManager.register('date-time', InlineDateTimePicker);
editorManager.register('options-selector', InlineOptionsSelect);
editorManager.register('multi-select', InlineOptionsMultiSelect)

export default editorManager;