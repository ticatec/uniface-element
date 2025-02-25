<script lang="ts">
    export let data;

    console.debug('组织数据', data);
</script>
<div>
    {#if data.concat}
    <a href="./#/">{data.concat}</a>
    {/if}
</div>