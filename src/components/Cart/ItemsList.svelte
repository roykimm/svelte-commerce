<script>
    import Item from "./Items.svelte";
    import cart, { cartTotal, setStorageCart } from "../../stores/cart";
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { afterUpdate } from "svelte";

    afterUpdate(() => {
        setStorageCart($cart);
    });
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
</script>

<section class="cart-items">
    <article>
        {#each $cart as cartItem, index (cartItem.id)}
            <div
                in:fly={{ delay: (index + 1) * 500, x: 100 }}
                out:fly={{ x: -100 }}
                animate:flip
            >
                <Item {...cartItem} />
            </div>
        {:else}
            <h2 class="empty">선택된 품목이 없습니다.</h2>
        {/each}
    </article>
    <h3 class="cart-total">합계 : ₩{numberWithCommas($cartTotal)}</h3>
</section>
