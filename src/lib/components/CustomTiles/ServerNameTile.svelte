<div id="container">
    <div id="title">
        <h4> Generic Server Nassync </h4>
    </div>
    <div id="image">
        <!-- @ts-ignore -->
        <!-- <IconHeart size={"100%"} id="bean"/> @ts-ignore -->
        <svg height={"75%"} width={"75%"} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"></path>
            <path d="M15 20h-9a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3h12"></path>
            <path d="M7 8v.01"></path>
            <path d="M7 16v.01"></path>
            <path d="M20 15l-2 3h3l-2 3"></path>
        </svg>
    </div>
    <div id="data"> 
        <p>Up: 3 days 17 hrs</p>
    </div>
</div>

<script lang="ts">

    // let d = 'M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572'

    
</script>

<style lang="scss">
    $borderColor: rgb(175, 175, 215);
    $backgroundColor: rgb(35, 35, 88);
    $titleColor: rgb(50, 50, 90);
    $titleTextColor: rgb(175, 175, 215);
    $tileColor: linear-gradient(rgb(87, 87, 95), rgb(49, 49, 74));

    $borderRadius: 5px;

    #container {
        display:inline-block;
        margin: 0 auto;
        // margin: 2%;
        background-color: $backgroundColor;
        border: 1px solid $borderColor;
        border-radius: $borderRadius;
        height: 20vh;
        width: 20vw;
        display: inline-block;
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