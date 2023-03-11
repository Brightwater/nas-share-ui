<div id="container">
    <div id="data"> 
        <p> {data} </p>
    </div>
</div>

<script lang="ts">
    export let data: string | null;
</script>

<style lang="scss">
    $borderColor: rgb(175, 175, 215);
    $backgroundColor: rgb(50, 50, 90);
    $titleColor: rgb(50, 50, 90);
    $titleTextColor: rgb(175, 175, 215);
    $tileColor: linear-gradient(rgb(15, 15, 55), rgb(25, 25, 65));

    $borderRadius: 10px;

    #container {
        background-color: $backgroundColor;
        background-image: $tileColor;
        border: 1px solid $borderColor;
        border-radius: $borderRadius;
        height: 5vh;
        width: 15vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
    }
    p {
        margin: 0;
        padding: 3px;
    }

    @media only screen and (max-width: 600px) {
        #container {
            height: 5vh;
            width: 90vw;
        }
    }
</style>