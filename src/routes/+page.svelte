

<script lang="ts">
    import { authDataStore } from '$lib/stores';
    import { onMount } from "svelte";
    import { env } from "$env/dynamic/public";
    import { convertSyncTime, DashboardData } from '$lib/models/DashboardData';
    import NextSyncTile from '$lib/components/CustomTiles/NextSyncTile.svelte';
    import ServerNameTile from '$lib/components/CustomTiles/ServerNameTile.svelte';
    import MiniTile from '$lib/components/MiniTile.svelte';
    import RemSpaceUsedTile from '$lib/components/CustomTiles/RemSpaceUsedTile.svelte';
    import LocalSpaceUsedTile from '$lib/components/CustomTiles/LocalSpaceUsedTile.svelte';
    import DiskUsageTile from '$lib/components/CustomTiles/DiskUsageTile.svelte';
    import UptimeTile from '$lib/components/CustomTiles/UptimeTile.svelte';
    import RemoteStatusTile from '$lib/components/CustomTiles/RemServerStatus.svelte';

    let dashboardData: DashboardData = new DashboardData(null);
    $: fixedHrMin = convertSyncTime(dashboardData.nextSyncTime?.hour, dashboardData.nextSyncTime?.minute);
    
    const fetchData = async () => {
        console.log("getting in here")
        if ($authDataStore.jwt) {
            console.log("getting data for dashboard");
            // const options = {
            //     method: 'GET',
            //     headers: {'Access-Control-Allow-Origin': '*'},
            // };
            const res = await fetch(`${env.PUBLIC_BACKEND_BASE_URL}/dashboard/dashboardData?token=${$authDataStore.jwt}`);
            dashboardData = await res.json()
            console.log(dashboardData)
            
        }
        
    };
    onMount(async () => {
        fetchData();
    });
</script>
<!-- 
    Things needed to display
    Dashboard type thing
    
    Server name
    Uptime?
    Locally used storage for shares
    Remote used storage for shares
    Sync schedule
    Status of each "remote"

 -->
{#if dashboardData.remotesStatus != undefined}
    <div id="top">
        <div id="divider">
            <h2>Dashboard</h2>
        </div>
        
        <!-- <hr class="solid"> -->
        <div id="topinner">
            <NextSyncTile title={"Next scheduled sync"} data={fixedHrMin}></NextSyncTile>
            <ServerNameTile></ServerNameTile>
            <RemSpaceUsedTile data={dashboardData.totalRemoteSpaceUsedInGb}></RemSpaceUsedTile>
            <LocalSpaceUsedTile data = {dashboardData.totalLocalSpaceUsedInGb}></LocalSpaceUsedTile>
            <DiskUsageTile data={dashboardData}></DiskUsageTile>
            <UptimeTile data={dashboardData.runtime}></UptimeTile>
            {#each dashboardData.remotesStatus as data}
                <RemoteStatusTile data={data}></RemoteStatusTile>
            {/each}
        </div>
    </div>

    
    <!-- <br/>
    <br/> -->
    <!-- <MiniTile data={"Total local space used: " + dashboardData.totalLocalSpaceUsedInGb}></MiniTile>
    <MiniTile data={"Total remote space used: " + dashboardData.totalRemoteSpaceUsedInGb}></MiniTile>
    <MiniTile data={"Server uptime: 5 hrs, 32 minutes"}></MiniTile>
    <MiniTile data={"Remaining: " + dashboardData.diskSpaceRemaining + " GB"}></MiniTile>
    <MiniTile data={"Total: " + dashboardData.diskSpaceTotal + " GB"}></MiniTile> -->

    <!-- <div>
        <p>{dashboardData.runtime?.minutes}</p>
        <p>Ganon server Nassync</p>
        {#each dashboardData.remotesStatus as status}
            <p>Remote server: {status.remoteName} | {status.status}</p>
        {/each}

        <p>Total local space used: {dashboardData.totalLocalSpaceUsedInGb}</p>
        <p>Total remote space used: {dashboardData.totalRemoteSpaceUsedInGb}</p>

        {#if dashboardData.activeTask}
            <p>Current active task: {dashboardData.activeTask}</p>
        {/if}

        <p>Server uptime: 5 hrs, 32 minutes</p>
        <p>Next time to sync: {fixedHrMin}</p>
    </div> -->
{/if}


<style lang="scss">
    $textColor: rgba(175, 175, 215, 1);
    $rowColorA: rgba(25, 25, 65, 1);
    $rowColorB: rgba(15, 15, 55, 1);
    $theadColor: rgba(50, 50, 90, 1);

    div {
        color: $textColor;
        // height: 100%;
    }
    
    #top {
        width: 100%;
        height: 100%;
        text-align: center;
    }
    #divider {
        // display: inline-block;
        text-align: left;
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
        height: 6%;
        // padding-top: 1vh;
        background-color: rgba(31, 31, 72, 0.8);
        // box-shadow: 0 3px 10px -2px rgb(0, 0, 1) 215);
    }
    h2 {
        // margin: 0;
        padding-top: 1vh;
        padding-bottom: 1vh;
        margin: auto;
        margin-left: 1.5%;
    }
    // hr.solid {
    //     color: rgb(175, 175, 215) !important;
    //     border-top: 1px rgb(175, 175, 215);
    // }
    

    #topinner {
        margin-left: 3vw;
        margin-right: 3vw;
        height: 94%;
    }
</style>
