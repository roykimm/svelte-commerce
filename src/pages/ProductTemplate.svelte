<script>
    export let id;
    export let location;

    import { addToCart } from "../stores/cart";

    // global store

    import products from "../stores/products";
    import Loading from "../components/Loading.svelte";
    import { link } from "svelte-routing";
    import globalStore from "../stores/globalStore";

    $: product = $products.find((item) => item.id === parseInt(id));

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
</script>

<svelte:head>
    <title>{product ? product.title : "single product"}</title>
</svelte:head>

{#if !product}
    <Loading />
{:else}
    <section class="single-product">
        <!-- back to products -->
        <a href="/products" class="btn btn-primary" use:link
            >제품으로 돌아가기</a
        >
        <!-- single product container-->
        <div class="single-product-container">
            <article class="single-product-image">
                <img src={product.image} alt={product.title} />
            </article>
            <article>
                <h1>{product.title}</h1>
                <h2>₩{numberWithCommas(product.price)}</h2>
                <p>{product.description}</p>
                <button
                    class="btn btn-primary btn-block"
                    on:click={() => {
                        addToCart(product);
                        globalStore.toggleItem("cart", true);
                    }}
                >
                    카트에 넣기</button
                >
            </article>
        </div>
    </section>
{/if}
