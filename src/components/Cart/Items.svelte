<script>
    export let id;
    export let image;
    export let title;
    export let price;
    export let amount;

    // import cart method
    import {
        removeItem,
        increaseAmount,
        decreaseAmount,
    } from "../../stores/cart";

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
</script>

<!-- cart item -->
<div class="cart-item">
    <img src={image} alt={title} />
    <div>
        <h4>{title}</h4>
        <h5>${numberWithCommas(price)}</h5>
        <button
            class="cart-btn remove-btn"
            on:click={() => {
                removeItem(id);
            }}
        >
            삭제
        </button>
    </div>
    <div>
        <button
            class="cart-btn amount-btn"
            on:click={() => {
                increaseAmount(id);
            }}
        >
            <i class="fas fa-chevron-up" />
        </button>
        <p class="item-amount">{amount}</p>
        <button
            class="cart-btn amount-btn"
            on:click={() => {
                decreaseAmount(id, amount);
            }}
        >
            <i class="fas fa-chevron-down" />
        </button>
    </div>
</div>
