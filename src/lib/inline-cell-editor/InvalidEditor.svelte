<script lang="ts">


    export let readonly: boolean = false;
    export let field: any;
    export let props: any;
    export let active: boolean;

    console.warn("Invalid type", readonly, props, active);

</script>
<div>
    <span>Invalid type on {field}</span>
</div>