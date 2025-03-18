<script lang="ts">

    export let item;

</script>
    <div style="width: 100%; padding: 4px 8px 4px 0; box-sizing: border-box; position: relative;">
        <div style="font-size: 1.2em"><span>{item.name}</span></div>
        <div style="font-size: 0.9em;padding-top: 8px; color: #9d9d9d"><span>{item.tel}</span></div>
        <div style="position: absolute; font-size: 0.9em; top: 4px; right: 8px; color: #9d9d9d"><span>{item.dept}</span></div>
    </div>
