<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { RemoteMetadata } from "$lib/models/Remote";
    import { authDataStore } from '$lib/stores';
    import { onMount } from "svelte";
    import SVGInformation from "$lib/components/SVGInformation.svelte";
    
    let selected: RemoteMetadata | undefined = new RemoteMetadata();
    let addNew: RemoteMetadata | undefined = new RemoteMetadata(); // add new server
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


    function addServer(): any {
        remotes.push(new RemoteMetadata());
    }
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

            <hr />

            <form>
                <label for="nickname" class="fullWidthLabel">Remote name: </label>
                <!-- <input title="Read only" type="text" id="nickname" bind:value={selected.nickname} disabled={true}> -->
                <select bind:value={selected}>
                    {#each remotes as remote}
                        <option value={remote}>{remote.nickname}</option>
                    {/each}
                    <option value="" on:change={addServer}>Add New Server...</option>
                </select>
                
                <label for="address">Remote server address: 
                    <input type="text" id="address" bind:value={selected.address}>
                </label>

                <label for="port">Remote server port: 
                    <input type="text" id="port" bind:value={selected.port}>
                </label>

                <label for="key">Shared key: 
                    <input title="Read only" type="text" id="key" bind:value={selected.token} disabled={true}>
                </label>

                <label for="spaceUsed">Remote space used: 
                    <SVGInformation info="Space being used on the remote server"/>
                    <input title="Read only" type="text" id="spaceUsed" class="valueGb" bind:value={selected.used_space_in_gb} disabled={true}>
                    <div class="gb"> Gb </div>
                </label>

                <label for="spaceAvailable">Remote space available:
                    <SVGInformation info="Remaining storage you can use on the remote server"/>
                    <input title="Read only" type="text" id="spaceAvailable" class="valueGb" bind:value={selected.remaining_space_in_gb} disabled={true}>
                    <div class="gb"> Gb </div>
                </label>
            
                <label for="localSpaceUsed">Local space used:
                    <SVGInformation info="The amount of storage the remote server is using on your drives"/>
                    <input title="Read only" type="text" id="localSpaceUsed" class="valueGb" bind:value={selected.hosted_used_space_in_gb} disabled={true}>
                    <div class="gb"> Gb </div>
                </label>

                <label for="hostRem">Local space available for remote: 
                    <SVGInformation info="Remaining space the remote server is allowed to use on your drives"/>
                    <input type="text" id="hostRem" class="valueGb" bind:value={selected.hosted_remaining_space_in_gb} disabled={false}>
                    <div class="gb"> Gb </div>
                </label>
                
                <br />
                <!-- FOLDERS: ---------------------------------------------------------------------------------------------- -->

                <label for="folderSelect" class="fullWidthLabel"> Select Folder: </label>
                <select id="folderSelect" bind:value={selected}>
                    {#each remotes as remote}
                        <option value={remote}>{remote.nickname}</option>
                    {/each}
                    <option value="" on:change={addServer}>Add New Server...</option>
                </select>

                <label for="size"> Size:  
                    <SVGInformation info="Storage Size in Gb"/>  
                    <input type="text" id="size" class="valueGb" bind:value={selected} disabled={true}>
                    <div class="gb"> Gb </div>
                </label>

                <label for="status"> Status: 
                    <input type="text" id="size" bind:value={selected} disabled={true}>
                </label>
                

                <label for="path"> Path: 
                    <input type="text" id="path" bind:value={selected} disabled={true}>
                </label>
                

                <label for="metadataPreview" class="fullWidthLabel"> Metadata Preview: 
                    <textarea id="metadataPreview" bind:value={selected} disabled={true} />
                </label>
                

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
    $gbColor: rgba(100, 100, 100, .1);

    $borderRadius: 5px;

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

    hr {
        border: 1px solid $textColor;
        border-bottom: 0;
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
        border-radius: $borderRadius;
        min-width: 6vw;
        max-width: 100%;
        flex-basis: 100%;
        text-align: center;
        margin: 0;
        margin-bottom: 1em;
    }
    
    form {
        
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        label {
            margin: 10px 0;
            flex-basis: 33%;
        }

        .fullWidthLabel {
            flex-basis: 100%;
        }

        /* OLD INPUT: 
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
        
        NEW, smaller INPUT: (also changed form) */ 
         input {
            padding: 10px;
            border-radius: $borderRadius;
            border: 1px solid $outlinecolor;
            color: $textColor;
            background-color: $rowColorC;
            margin-bottom: 20px;
            width: 98%;
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

        input.valueGb { 
            width: 85%;
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        }
        div.gb {
            width: 13%;
            height: 1em;
            padding-top: 9px;
            padding-bottom: 10px;
            text-align: center;
            float: left;
            background-color:  $gbColor;
            border: 1px solid $outlinecolor;
            border-left: 0;
            border-bottom-right-radius: $borderRadius;
            border-top-right-radius: $borderRadius;
        }

        textarea {
            padding: 10px;
            border-radius: $borderRadius;
            border: 1px solid $outlinecolor;
            color: $textColor;
            background-color: $rowColorC;
            margin-bottom: 20px;
            height: 5em;
            max-width: 100%;
            width: 99%;
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
        
        /* changes textarea's "grabber" */
        ::-webkit-resizer {
            border: 3px solid rgba(0,0,0,0);
            border-bottom-color: rgba(255,255,255,.1);
            border-right-color: rgba(255,255,255,.1);
        }

        /* for textarea's scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            padding-top: 50px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: $theadColor;
        }
        ::-webkit-scrollbar-corner {
            background-color: $rowColorA;
        }
    }
    button {
        background-color: $rowColorC;
        color: $textColor;
        border: none;
        border-radius: $borderRadius;
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

    @media only screen and (max-width: 600px) {
        form {
            
            justify-content: left;
            label {
                flex-basis: 50%;
            }
            input {
                flex-basis: 50%;
            }

            button {
                flex-basis: 100%;
                width: 95%;
                max-width: 95%;
                margin: auto;
                margin-bottom: 5px;
            }
        }
    }
</style>
