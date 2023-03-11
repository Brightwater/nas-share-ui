<script lang="ts">
    import { env } from "$env/dynamic/public";
    import type { Event } from "$lib/models/Event";
    import { onMount } from "svelte";
    import { inview } from "svelte-inview/dist/index";
    import { authDataStore } from '$lib/stores';

    let events: Event[] = [];
    let offset = 0;
    const fetchData = async () => {
        if ($authDataStore.jwt) {
            console.log("getting events");

            const res = await fetch(`${env.PUBLIC_BACKEND_BASE_URL}/events/getAll?token=${$authDataStore.jwt}&offset=${offset}`);
            events = [...events, ...(await res.json())];
            offset = offset + 20;
        }
        
    };

    const handleChange = async (e: { detail: { inView: any } }) => {
        // And fetch more data
        if (e.detail.inView) {
            await fetchData();
        }
    };
    onMount(async () => {
        fetchData();
    });
    const getFormattedTs = (ts: string | number | Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        }).format(new Date(ts));
    }
</script>

<div id="top"></div>
{#if events.length > 0}
    <div id="container">
        <table>
            <thead>
                <tr>
                    <th>Time Stamp</th>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {#each events as event}
                    <tr>
                        <td>{getFormattedTs(event.ts)}</td>
                        <td>{event.name}</td>
                        <td>{event.status}</td>
                    </tr>
                {/each}
                <div use:inview={{}} on:change={handleChange} />
            </tbody>
        </table>
    </div>
{/if}

<style lang="scss">
    $rowColorA: rgba(25, 25, 65, 1);
    $rowColorB: rgba(15, 15, 55, 1);
    $textColor: rgba(175, 175, 215, 1);
    $theadColor: rgba(50, 50, 90, 1);
    $outlinecolor: rgb(35, 35, 76, 1);
    
    #top {
        padding-top: 20px;
    }
    #container {
        overflow: auto; /* Enable vertical scrolling */
        color: $textColor;
        border: 5px solid $outlinecolor;
        border-radius: 8px;
        width: 97vw; /* Make the table width 100% of the container */
        height: 88vh;
        margin: auto;
    }
    table {
        width: 100%; /* Make the table width 100% of the container */     
        
        thead {
            position: sticky;
            border-top: 2px solid $textColor;
            top: 0;
            background-color: $theadColor;
        }
        th,
        td {
            padding: 10px;
            text-align: left;
        }
        tbody {
            height: 100vh;
            overflow-y: scroll;
            tr:nth-child(even) {
                background-color: $rowColorA;
                // color: $columnTextColor2;
            }
            tr:nth-child(odd) {
                background-color: $rowColorB;
                // color: $columnTextColor2;
            }
        }
    }
    th,
    td {
        padding: 0.5rem; /* Add some padding to cells */
        text-align: left; /* Align text to the left */
    }
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        border-radius: 20px;
        padding-top: 50px;
    }
    ::-webkit-scrollbar-thumb {
        
        background-color: $theadColor;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
    }
    ::-webkit-scrollbar-corner {
        background-color: $rowColorA;
        border-radius: 20px;
    }
</style>
