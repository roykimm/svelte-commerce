<script>
    import { onMount, onDestroy } from "svelte";
    import products from "../../stores/defaultProducts";
    import Product from "./Product.svelte";
    import Loading from "../Loading.svelte";

    export let title = "";
    // let localProducts = $products;

    // console.log(products);
    // console.log($products);
    //let ubsubscribe;

    // onMount(() => {
    //     ubsubscribe = products.subscribe((value) => {
    //         console.log("subscribed");
    //         localProducts = value;
    //     });
    // });

    // onDestroy(() => {
    //     ubsubscribe();
    // });
</script>

<section class="section">
    <h2 class="section-title">{title}</h2>
    <div class="products-center">
        {#each $products as product (product.id)}
            <Product {product} />
        {:else}
            <Loading />
        {/each}
    </div>
</section>
