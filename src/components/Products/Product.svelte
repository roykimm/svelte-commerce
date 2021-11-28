<script>
    export let product;
    const { title, image, price, id } = product;

    import { link } from "svelte-routing";

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
</script>

<article class="product">
    <div class="img-container">
        <img src={image} alt={title} />
        <a
            href={`/products/${id}`}
            class="btn btn-primary product-link"
            use:link>상세보기</a
        >
    </div>
    <div class="product-footer">
        <p class="product-title">{title}</p>
        <p class="product-price">₩{numberWithCommas(price)}</p>
    </div>
</article>
