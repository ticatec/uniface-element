<script lang="ts">

    import "$lib/ticatec-uniface-web.scss"
    import "@ticatec/uniface-icons/feather-style.css"
    import "./app.css";
    import MainPage from "./demo/MainPage.svelte";

    import {cn_resource} from "$lib/i18n_resources";
    import i18n from "@ticatec/i18n";


    i18n.languages = ['cn', 'en'];
    i18n.language = 'cn';
    i18n.setResource(cn_resource);
    console.log(i18n)
</script>

<MainPage/>








