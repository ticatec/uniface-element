<script lang="ts">
    export let text;
    export let action;
    export let style: string = '';

    let silent: boolean = false;

    const handleButtonClick = (e) => {
        if (!silent) {
            silent = true;
            setTimeout(()=>{silent=false}, 500);
            action();
        }
    }

</script>
<a {style} class="action-button" href="javascript:void(0)" on:click={handleButtonClick}>
    <span>{text}</span>
</a>