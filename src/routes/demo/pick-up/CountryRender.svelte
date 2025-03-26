<script lang="ts">
    export let item: any;
    export let disabled: boolean;
    export let onIconClick: (data: any) => () => void;
</script>
<div style="display: flex; flex-direction: row; align-items: center; cursor: pointer; height: 56px; border-bottom: 1px solid #f0f0f0; gap: 8px; padding: 0 8px"  on:click>
    <div style="flex: 0 0 auto; cursor: pointer">
        <i class="icon_google_next_week" on:click|stopPropagation={onIconClick?.(item)}></i>
    </div>
    <div style="flex: 1 1 auto; text-align: right">
        {item.id}
    </div>
    <div style="flex: 0 0 auto;">
        {item.name}
    </div>
</div>
