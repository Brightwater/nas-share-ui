<script lang="ts">
    import Navigation2 from '$lib/components/Navigation2.svelte';
    import { LoginData, LoginParams, isRefreshTokenExpired, AuthData } from '$lib/models/LoginData';
    import { authDataStore } from '$lib/stores';
    import { env } from '$env/dynamic/public';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import jwt_decode from "jwt-decode";
    import type { JwtData } from '$lib/models/LoginData';


    let authData = authDataStore;
    $: subscribedLoginData = $authData.loginData;

    let loginParams = new LoginParams("", "");
    
    async function login() {
        console.log("logging in with username and password")
        if (loginParams.validate()) {
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify(loginParams),
            };

            const res = await fetch(`${env.PUBLIC_BACKEND_BASE_URL}/auth/login/`, options);
            let data: LoginData = await res.json()
            await authDataStore.set(new AuthData(data));
            await checkJwt()
        }
    }
    async function getJwt() {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({'username': subscribedLoginData.username, 'password': subscribedLoginData.refreshToken}),
        };

        const res = await fetch(`${env.PUBLIC_BACKEND_BASE_URL}/auth/login/token?tokenIndex=${$authData.loginData.tokenIndex}`, options);
        let data: any = await res.json()
        console.log(data)
        $authData.jwt = data['access_token']

        authDataStore.set($authData);
        
    }
    async function checkJwt() {
        if (!isRefreshTokenExpired(subscribedLoginData)) {
            let jwt = "";
            let expTime = 0;
            if ($authData.jwt) {
                jwt = $authData.jwt;
                let decoded: JwtData = jwt_decode(jwt);
                expTime = decoded.exp;
            }

            let timeDiff = 0;
            if (jwt !== "") {
                timeDiff = expTime - Math.floor(Date.now() / 1000);
            }
            
            if (timeDiff <= 0 || timeDiff <= 5*60) {
                console.log("Renewing JWT");
                getJwt()
            }
        }
    }

    onMount(async () => {
        await checkJwt();
        setInterval(async() => {
            await checkJwt();
        }, 5 * 60 * 1000); // 5 minutes
    });
</script>

<!-- 
    Home dashboard
    Sync page
    events/logs
    Restore data
 -->
{#if browser}
    <div>
        {#if isRefreshTokenExpired(subscribedLoginData)}
            <form>
                <label for="username"> Username: </label>
                    <input id="username" type="text" bind:value={loginParams.username}>
                <label for="password"> Password: </label>
                    <input id="password" type="password" bind:value={loginParams.password}>
                <button on:click={login}> Submit </button>
            </form>
        {:else if !$authData.jwt}    
            <p>LOADING DATA</p>
        {:else}

            <!-- Main pages once authenticated go here-->

            <Navigation2/>

            <main>
                <slot/>
            </main>
        {/if}
    </div>
{/if}

<style lang="scss">
    $textColor: rgba(175, 175, 215, 1);
    $rowColorA: rgba(35, 35, 85, 1);
    $outlinecolor: rgb(35, 35, 76, 1);
    $rowColorB: rgba(55, 55, 85, 1);
    $theadColor: rgba(50, 50, 90, 1);

    div {
        color: $textColor;
        height: 100%;
    }
    
    form {
        
        max-width: 500px;
        margin: 0 auto;
        margin-top: 100px;
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
            background-color: $rowColorA;
            margin-bottom: 20px;
            width: 100%;
            box-sizing: border-box;

            &:focus {
                outline: none;
                border-color: #007bff;
            }
        }

        button {
            background-color: $rowColorB;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;

            &:hover {
                background-color: $rowColorA;
            }

            &:focus {
                outline: none;
            }
        }
    }

    main {
        height: 93.75vh;
        overflow: auto;
    }
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
    
</style>