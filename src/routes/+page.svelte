<script lang="ts">

    import "$lib/ticatec-uniface-web.scss"
    import "@ticatec/uniface-icons/feather-style.css"
    import "./app.css";
    import MainPage from "./demo/MainPage.svelte";

    import i18nContext, {unifaceZhCN, unifaceEnUS} from "$lib/i18n";

    console.log(unifaceZhCN)

    i18nContext.setResource(unifaceZhCN)

</script>

<MainPage/>








