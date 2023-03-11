<div id="container">
    <div id="title">
        <h4> {title} </h4>
    </div>
    <div id="image">
        <!-- @ts-ignore -->
        <!-- <IconHeart size={"100%"} id="bean"/> @ts-ignore -->
        <svg height={"75%"} width={"75%"} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"></path>
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path d="M15 3v4"></path>
            <path d="M7 3v4"></path>
            <path d="M3 11h16"></path>
            <path d="M18 16.496v1.504l1 1"></path>
        </svg>
        <!-- <svg height={"75%"} width={"75%"} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
            <path d="M9 15l3 -3l3 3"></path>
            <path d="M12 12l0 9"></path>
        </svg> -->
        <!-- @ts-ignore -->
<!-- <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"  id="bean" class="tabler-icon tabler-icon-heart "><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg> -->
    </div>
    <div id="data"> 
        <p> {data} </p>
    </div>
</div>

<script lang="ts">

    export let title: string | null;
    export let data: string | null;
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
        background-color: $backgroundColor;
        border: 1px solid $borderColor;
        border-radius: $borderRadius;
        height: 20vh;
        width: 20vw;
        display: inline-block;
        margin: 0 auto;
        margin-right: 2%;
        margin-left: 2%;
        // margin: 2%;
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