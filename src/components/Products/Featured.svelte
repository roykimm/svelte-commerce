<script>
    import products, { featuredStore } from "../../stores/products";
    import Product from "./Product.svelte";
    import Loading from "../Loading.svelte";

    // $: featured = $products.filter((item) => {
    //     return item.featured === true;
    // });

    export let title = "";
</script>

{#if $featuredStore.length === 0}
    <Loading />
{:else}
    <section class="section">
        <h2 class="section-title">{title}</h2>
        <div class="products-center">
            {#each $featuredStore as product (product.id)}
                <Product {product} />
            {/each}
        </div>
    </section>
{/if}
