<script lang="ts">

    import {SidebarLayout} from "$lib/app-layout";

</script>

<div style="margin: 20px auto; width: 800px; height: 400px; position: relative; border: 1px solid #dddddd">
    <SidebarLayout sidebarResize={true} sidebarWidth="300px" sidebarMinWidth="150px" sidebarMaxWidth="400px">
        <div slot="sidebar">
            <span>Left sidebar</span>
        </div>
        <div slot="header" style="background-color: #F8FAFC; min-height: 48px">
            <span>Top header</span>
        </div>
        <div>
            <span>main content</span>
        </div>
    </SidebarLayout>
</div>


<div style="margin: 20px auto; width: 800px; height: 400px; position: relative; border: 1px solid #dddddd">
    <SidebarLayout sidebarResize={false} sidebarMaxWidth="400px">
        <div slot="sidebar">
            <span>Left sidebar</span>
        </div>
        <div slot="header" style="background-color: #F8FAFC; min-height: 48px">
            <span>Top header</span>
        </div>
        <div>
            <span>main content</span>
        </div>
    </SidebarLayout>
</div>