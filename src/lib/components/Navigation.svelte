
<script lang="ts">
    import { fly } from 'svelte/transition';

    let display = "flex";
    $: displayStyle = "display: " + display;

    
    function toggleMobileNav() {
        if (display === 'flex') {
            display = "none";
        } else {
            display = "flex";
        }
    }
    function reset() {
        display = 'flex';
    }
</script>

<nav>
    <!-- <ul style={displayStyle} transition:fly="{{ x: -200, duration: 1000 }}"> -->
    
    <ul>    
        <li>
           <a href="/">Home</a> 
        </li>
        <li>
           <a href="/Sync">Sync</a> 
        </li>
    </ul>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    
</nav>

<!-- <svelte:window on:resize={reset}/> -->

<style lang="scss">
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #333;
        color: #fff;
    }
    
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }
    
    li {
        margin: 0 20px;
    }
    
    a {
        color: #fff;
        text-decoration: none;
    }
    
    // .hamburger-menu {
    //     display: none;
    //     cursor: pointer;
    // }

    .line {
        width: 35px;
        height: 3px;
        margin: 6px 0;
        background-color: #fff;
    }
    
    // @media (max-width: 1000px) {
    //     ul {
    //         flex-direction: column;
    //         position: absolute;
    //         top: 60px;
    //         left: 0;
    //         right: 0;
    //         background-color: #333;
    //         height: calc(100% - 60px);
    //         display: none;
    //     }
        
        // li {
        //     margin: 20px;
        // }
        
        .hamburger-menu {
            display: block;
        }
    // }
    
    
</style>