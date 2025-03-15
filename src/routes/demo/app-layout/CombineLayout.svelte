<script lang="ts">

import ColumnsLayout from "$lib/app-layout/ColumnsLayout.svelte";
import RowsLayout from "$lib/app-layout/RowsLayout.svelte";
</script>

<div style="width: 100%; height: 100%">

    <ColumnsLayout leftMin="300px" leftResize leftMax="800px" rightResize>
        <RowsLayout slot="left" topMax="800px" topMin="200px" topResize bottomResize>
            <div slot="top">
                top section
            </div>
            <div>
                main section

            </div>
            <div slot="bottom">
                main section

            </div>
        </RowsLayout>
        <div style="width: 100%; height: 100%">
            main content
        </div>
        <div slot="right">
            right content
        </div>
    </ColumnsLayout>

</div>