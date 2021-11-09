<script>
    import Hero from "../components/Hero.svelte";
    import { link } from "svelte-routing";

    // featured products
    import Featured from "../components/Products/Featured.svelte";
</script>

<Hero>
    <a href="/products" class="btn btn-primary btn-hero" use:link>제품구매</a>
</Hero>
<Featured title="상품 리스트" />
