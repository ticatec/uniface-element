<script lang="ts">

    export let title: string;
    export let comment: string = '';

</script>
<div class="page-topic">
    <span>{title}</span>
</div>
<div class="page-comment">
    {#if comment}
        <span>{comment}</span>
    {/if}
</div>
<slot></slot>
