<script lang="ts">
    import menu from "./menu";
    import Box from "$lib/box";
    import NavigatorMenu, {type MenuItem} from "$lib/nav-menu";




</script>
<div style="padding: 12px; width: 100%; height: 100%; box-sizing: border-box">
    <Box style="width: 400px; height: 100%; box-sizing: border-box">
        <NavigatorMenu menuItems={menu} textField="text" onItemClick={(item: MenuItem)=>{console.log(item)}}/>

    </Box>
</div>