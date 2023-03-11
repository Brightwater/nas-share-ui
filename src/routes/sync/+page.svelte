<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { RemoteMetadata } from "$lib/models/Remote";
    import { authDataStore } from '$lib/stores';
    import { onMount } from "svelte";
    
    let selected: RemoteMetadata | undefined = new RemoteMetadata();
    let remotes: RemoteMetadata[] = [];
    // $: selectedRemUsed = selected?.used_space_in_gb + " Gb";
    // $: selectedRemRemaining = selected?.remaining_space_in_gb + " Gb";

    const fetchData = async () => {
        if ($authDataStore.jwt) {
            console.log("getting remotes");

            const res = await fetch(`${env.PUBLIC_BACKEND_BASE_URL}/syncs/remotes?token=${$authDataStore.jwt}`);
            remotes = await res.json();
            selected = remotes[0]
        }
    };

    const submit = async () => {
        if ($authDataStore.jwt) {
            console.log("submit button clickedd");

            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(selected)
            };

            const res = await fetch(`${env.PUBLIC_BACKEND_BASE_URL}/syncs/updateRemoteSettings?token=${$authDataStore.jwt}`, options);
            
            console.log(await res.json());
        }
    };

//     const options = {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: '{"used_space_in_gb":0,"nickname":"string","address":"string","token":"string","port":0,"remaining_space_in_gb":0,"hosted_remaining_space_in_gb":0,"hosted_used_space_in_gb":0}'
// };

// fetch('http://192.168.1.3:4304/syncs/updateRemoteSettings?token=string', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

    onMount(async () => {
        await fetchData();
    });

    async function updateSelected() {
        console.log("TEST")
    }


    // function focusedReadOnly(event: FocusEvent & { currentTarget: EventTarget & HTMLInputElement; }): any {
    //     console.log("TEST")
    // }
</script>

<div id="top">
    <!-- <div id="divider">
        <h2>Syncs</h2>
    </div> -->

    <!-- <hr class="solid"> -->
    {#if selected?.nickname != null}
        <div id="topinner">
            <label for="export">Export sync data</label>
            <button id="export">Download file</button>
            <form>
                <label for="nickname">Remote name: </label>
         
                <!-- <input title="Read only" type="text" id="nickname" bind:value={selected.nickname} disabled={true}> -->
                <select bind:value={selected}>
                    {#each remotes as remote}
                        <option value={remote}>{remote.nickname}</option>
                    {/each}
                </select>
                
                <label for="address">Remote server address: </label>
                <input type="text" id="address" bind:value={selected.address}>

                <label for="port">Remote server port: </label>
                <input type="text" id="port" bind:value={selected.port}>

                <label for="token">Shared key:</label>
                <input title="Read only" type="text" id="token" bind:value={selected.token} disabled={true}>

                <p>! Storage units are in Gb !</p>

                <label for="token">Remote space used: (this is the space you are using on the remote server)</label>
                <input title="Read only" type="text" id="token" bind:value={selected.used_space_in_gb} disabled={true}>

                <label for="token">Remote space available: (the remaining storage you can use on the remote server)</label>
                <input title="Read only" type="text" id="token" bind:value={selected.remaining_space_in_gb} disabled={true}>

                <label for="token">Local space used: (this is the amount of storage the remote server is using on your drives)</label>
                <input title="Read only" type="text" id="token" bind:value={selected.hosted_used_space_in_gb} disabled={true}>

                <label for="token">Local space available for remote: (the remaining space the remote server is allowed to use on your drives)</label>
                <input type="text" id="hostRem" bind:value={selected.hosted_remaining_space_in_gb} disabled={false}>
                <button on:click={submit}> Submit </button>
            </form>

            <!-- <p>{JSON.stringify(remotes)}</p> -->
        </div>
    {/if}
</div>

<style lang="scss">
    $textColor: rgba(175, 175, 215, 1);
    $textColorReadOnly: rgb(122, 122, 155);
    $outlinecolor: rgb(35, 35, 76, 1);
    $rowColorC: rgba(35, 35, 85, 1);
    $rowColorA: rgba(35, 35, 85, 1);
    $disabledColor: rgb(29, 29, 69);
    $rowColorB: rgba(15, 15, 55, 1);
    $theadColor: rgba(50, 50, 90, 1);

    div {
        color: $textColor;
        // height: 100%;
    }

    #top {
        width: 100%;
        height: 100%;
        text-align: left;
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

    #topinner {
        padding-top: 3vh;
        margin-left: auto;
        margin-right: auto;
        height: 94%;
        max-width: 1000px;
    }
    #hostRem.value::after {
        content: "gb";
    }
    select {
        appearance: none;
        background-color: $theadColor;
        border: none;
        padding: 0;
        padding-top: 1%;
        padding-bottom: 1%;
        font-size: large;
        color: $textColor;
        cursor: pointer;
        border-radius: 4px;
        min-width: 6vw;
        max-width: 100%;
        text-align: center;
        margin: 0;
    }
    
    form {
        
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        label {
            margin: 10px 0;
        }

        input {
            padding: 10px;
            border-radius: 5px;
            border: 1px solid $outlinecolor;
            color: $textColor;
            background-color: $rowColorC;
            margin-bottom: 20px;
            max-width: 100%;
            float: left;
            box-sizing: border-box;

            &:focus {
                outline: none;
                border-color: #007bff;
            }

            &:disabled {
                background-color: $disabledColor;
                border: 1px solid $disabledColor;
                color: $textColorReadOnly;
            }
        }

        

        
    }
    button {
        background-color: $rowColorC;
        color: $textColor;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
        max-width: 200px;

        &:hover {
            background-color: $outlinecolor;
        }

        &:focus {
            outline: none;
        }
    }

</style>
