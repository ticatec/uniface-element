import {writable} from "svelte/store";

const initialDialogs: Array<any> = [];

function createDialogStore() {
    const {subscribe, set, update} = writable(initialDialogs);

    return {
        subscribe,

        showDialog(dialog: any) {
            update(dialogs => {
                const newDialog = {...dialog};
                return [...dialogs, newDialog];
            });
        },
        removeDialog(id: string) {
            update(dialogs => dialogs.filter(d => d.id !== id));
        },
        clear() {
            set([]);
        },
    }
}

export const dialogs = createDialogStore();