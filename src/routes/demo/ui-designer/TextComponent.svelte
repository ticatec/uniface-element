<script lang="ts">
    export let text: string;

</script>
<div style="width: 100%"  class="vertical-bottom">
    <span>{text}</span>
</div>


<style>
    .vertical-center {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .vertical-bottom {
        position: relative;
        top: 100%;
        transform: translateY(-100%);
    }

</style>