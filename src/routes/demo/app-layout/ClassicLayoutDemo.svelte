<script>
    import ClassicLayout from "$lib/app-layout/ClassicLayout.svelte";
</script>

<ClassicLayout sidebarResize={true} rightBarResize={true}>
    <div slot="header" style="background-color: #298DEF; height: 100%; color: #FFFFFF"> 顶部导航栏 </div>
    <div slot="sidebar"> 侧边栏内容 </div>
    <div> 主内容区域 </div>
    <div slot="right-sidebar"> 右侧边栏内容 </div>
    <div slot="bottom" style="background-color: #e1e1e1; height: 100%"> 底部状态栏 </div>
</ClassicLayout>