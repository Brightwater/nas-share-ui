<nav>
    <ul>
        <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
            <a href="/">Home</a>
        </li>
        <li aria-current={$page.url.pathname === '/sync' ? 'page' : undefined}>
            <a href="/sync">Manage Syncs</a>
        </li>
        <li aria-current={$page.url.pathname === '/events' ? 'page' : undefined}>
            <a href="/events">Events</a>
        </li>
        <li aria-current={$page.url.pathname === '/restore' ? 'page' : undefined}>
            <a href="/restore">Restore data</a>
        </li>
        <div class="navright">
            <li>
                <a id="logout" href="/" on:click={handleLogout}>Logout</a>
            </li>
        </div>
    </ul>
</nav>

<script>
    import { page } from '$app/stores';
    import { authDataStore } from '$lib/stores';
    import { AuthData, LoginData } from '$lib/models/LoginData';
 
    function handleLogout() {
        authDataStore.set(new AuthData(new LoginData()))
    }
</script>

<style lang="scss">
    $navText: rgb(210, 210, 210);
    $navHoverText: rgb(185, 185, 185);
    $navLight: rgb(30, 30, 70);
    $navOriginal: rgb(21, 21, 69);
    $navDark: rgb(0, 0, 40);

    a {
        color: $navText;
        // padding: 0.2em;
        text-decoration: none;
    }
    a:link, a:visited,
        ul a:hover {
        color: $navText;
    }
    nav {
         height: 6.25vh;
        width: 100%;
        background-color: $navOriginal;
        position: sticky;
        top: 0;
        z-index: 1;
        // padding-bottom: .1%;
        box-shadow: 0 3px 10px -2px rgb(0, 0, 0);
    }
    nav ul {
        list-style-type: none;
        margin: auto;
        padding: 0;
        overflow: hidden;
    }   
    nav li {
        float: left;
    }
    nav li a {
        display: block;
        text-align: center;
        padding: 2vh;
        margin-right: 0.25vw;
        text-decoration: none;
    }
    nav li a:hover {
        color: $navHoverText;
        background-color: $navLight;
        // border-bottom: 1px solid $navHoverText;
    }
    li[aria-current='page'] {
        border-bottom: 2px solid $navText;
        background-color: $navLight;
    }
    .navright {
        float: right;
    }
    
</style>