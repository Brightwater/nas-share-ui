<div id="container">
    <div id="title">
        <h4> Local usage for remote servers</h4>
    </div>
    <div id="image">
        <!-- @ts-ignore -->
        <!-- <IconHeart size={"100%"} id="bean"/> @ts-ignore -->
        <!-- <svg height={"75%"} width={"75%"} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
            <path d="M9 15l3 -3l3 3"></path>
            <path d="M12 12l0 9"></path>
        </svg> -->
        <svg height={"75%"} width={"75%"} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4"></path>
            <path d="M12 13l0 9"></path>
            <path d="M9 19l3 3l3 -3"></path>
        </svg>
        <!-- <svg height={"75%"} width={"75%"} viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M54 2H10a2 2 0 0 0-2 2v56a2 2 0 0 0 2 2h44a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM32 42a15.9 15.9 0 0 1-9.8-3.4l-4.1 4.1 17.9 8V56H14V44a.7.7 0 0 1 0-.1v-2.7l5.4-5.4A16 16 0 1 1 32 42z"></path>
            <path data-name="layer1" d="M24.6 30.6l-3.2 3.2a14.1 14.1 0 0 0 2.8 2.8l3.2-3.2a2 2 0 1 0-2.8-2.8z"></path>
        </svg> -->
    </div>
    <div id="data"> 
        <p>{data} Gb</p>
    </div>
</div>

<script lang="ts">
    export let data: number | undefined;
</script>

<style lang="scss">
    $borderColor: rgb(175, 175, 215);
    $backgroundColor: rgb(35, 35, 88);
    $titleColor: rgb(50, 50, 90);
    $titleTextColor: rgb(175, 175, 215);
    $tileColor: linear-gradient(rgb(87, 87, 95), rgb(49, 49, 74));

    $borderRadius: 5px;

    #container {
        background-color: $backgroundColor;
        border: 1px solid $borderColor;
        border-radius: $borderRadius;
        height: 20vh;
        width: 20vw;
        display: inline-block;
        margin: 0 auto;
        margin-right: 2%;
        margin-left: 2%;
        margin-top: 3%;
    }
    #image {
        // background-image: $tileColor;
        
        height: 90%;
        width: 50%;
        border-bottom-left-radius: $borderRadius;
        float: left;
    }
    svg {
        // background-image: url('$lib/assets/icons8-cloud-sync-50.png');
        // background-size: contain;
        // position: relative;
        padding-left: 10%;
        padding-top: 5%;
        // margin: 0 auto;
    }
    #data {
        // background-image: $tileColor;
        height: 88%;
        width: 50%;
        border-bottom-right-radius: $borderRadius;
        float: right;
    }
    #title {
        height: 15%;
        width: 100%;
        margin: 0;
        background-color: $titleColor;
        color: $titleTextColor;
        border-top-right-radius: $borderRadius;
        border-top-left-radius: $borderRadius;
    }
    h4 {
        margin: 0;
        padding-top: .3vh;
        padding-left: .5vw;
    }
    p {
        // margin: auto;
        height: 90%;
        margin: 0;
        text-align: center;
        font-size: x-large;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media only screen and (max-width: 1200px) {
        #container {
            height: 30vh;
            width: 90vw;
        }
    }
</style>