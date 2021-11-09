<script>
    import user from "../stores/user";
    import { link } from "svelte-routing";
    // logout func
    import { logoutUser } from "../stores/user";
    import globalStore from "../stores/globalStore";
</script>

{#if $user.jwt}
    <a
        href="/"
        class="logout-btn"
        on:click={() => {
            logoutUser();
            globalStore.toggleItem("sidebar", false);
        }}>로그아웃</a
    >
{:else}
    <a
        href="/login"
        on:click={() => {
            globalStore.toggleItem("sidebar", false);
        }}>로그인</a
    >
{/if}
