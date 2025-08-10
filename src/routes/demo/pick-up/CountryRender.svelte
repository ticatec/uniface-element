<script lang="ts">
    import type {OnIconClick} from "./OnIconClick";

    export let item: any;
    export let onIconClick: OnIconClick;
</script>
<div style="display: flex; flex-direction: row; align-items: center; cursor: pointer; height: 56px; border-bottom: 1px solid #f0f0f0; gap: 8px; padding: 0 8px" aria-hidden="true"  on:click>
    <div style="flex: 0 0 auto; cursor: pointer">
        <i class="icon_google_next_week" aria-hidden="true" on:click|stopPropagation={onIconClick?.(item)}></i>
    </div>
    <div style="flex: 1 1 auto; text-align: right">
        {item.id}
    </div>
    <div style="flex: 0 0 auto;">
        {item.name}
    </div>
</div>
