<script>
    import globalStore from "../../stores/globalStore";
    import { fly, fade, blur } from "svelte/transition";
    import { link } from "svelte-routing";
    import ItemsList from "./ItemsList.svelte";

    import user from "../../stores/user";
</script>

<div class="cart-overlay" transition:blur>
    <div class="cart-container" transition:fly={{ x: 100 }}>
        <div class="cart" transition:fade={{ delay: 400 }}>
            <!-- cart header -->
            <div class="cart-header">
                <button
                    class="btn-close"
                    on:click={() => {
                        globalStore.toggleItem("cart", false);
                    }}
                >
                    <i class="fas fa-window-close" />
                </button>
                <h2 class="cart-title">장바구니</h2>
                <span />
            </div>
            <!-- end cart header -->

            <!-- cart items -->
            <ItemsList />
            <!-- end cart items -->

            <!-- cart footer -->
            <div class="cart-footer">
                {#if $user.jwt}
                    <a
                        href="/checkout"
                        use:link
                        class="btn btn-primary btn-block"
                        on:click={() => {
                            globalStore.toggleItem("cart", false);
                        }}>결제하기</a
                    >
                {:else}
                    <p class="cart-login">
                        결제하시려면
                        <a
                            href="/login"
                            use:link
                            on:click={() => {
                                globalStore.toggleItem("cart", false);
                            }}>로그인</a
                        >
                        해주세요.
                    </p>
                {/if}
            </div>
            <!-- end of cart footer -->
        </div>
    </div>
</div>
