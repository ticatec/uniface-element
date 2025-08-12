<script lang="ts">


    import {onMount} from "svelte";
    import i18n, {i18nUtils} from "@ticatec/i18n";

    import IndicatorBoard from "$lib/indicator";
    import {DialogBoard} from "$lib/dialog";
    import ToastBoard from "$lib/toast";
    import MessageBoxBoard from "$lib/message-box";

    import HomePage from "./HomePage.svelte";
    import MainMenu from "./MainMenu.svelte";
    import type MenuItem from "../../lib/nav-menu/MenuItem";
    import PopupHint from "$lib/popup-hint/PopupHint.svelte";

    let initialized: boolean = false;

    onMount(() => {
        initialized = true;
        i18n.language = 'zh-CN';
        i18nUtils.loadResources('/assets/uniface.json');
    });

    let demoComponent: any;

    const handleItemClick = (item: any) => (event: MouseEvent) => {
        demoComponent = item.component;
    }

    let drawVisible: boolean = false;

    const onItemClick = (menu: MenuItem) => {
        demoComponent = menu.item.data;
        drawVisible = false
    }

</script>
<HomePage bind:drawVisible>
    <div style="width: 100%; height: 100%; overflow: auto">
        <svelte:component this={demoComponent}/>
    </div>
    <svelte:fragment slot="menu">
        <MainMenu {onItemClick}/>
    </svelte:fragment>
</HomePage>


<DialogBoard/>
<MessageBoxBoard/>
<PopupHint/>
<ToastBoard/>
<IndicatorBoard/>

<style>


</style>