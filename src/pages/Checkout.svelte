<script>
    import { onMount } from "svelte";
    import { navigate, link } from "svelte-routing";
    import user from "../stores/user";
    import cart, { cartTotal } from "../stores/cart";
    import submitOrder from "../strapi/submitOrder";
    import globalStore from "../stores/globalStore";

    let name = "";
    // stripe vars
    let cardElement;
    let cardErrors;
    let card;
    let stripe;
    let elements;

    $: isEmpty = !name;

    onMount(() => {
        if (!$user.jwt) {
            navigate("/");
            return;
        }
        if ($cartTotal > 0) {
            stripe = Stripe(
                "pk_test_51JrQ5lEjlbZex5TQC77sTzytH6vTHANNgPoFQHh3cuFXj5IxYUIBiqUKZz5pkORL6yqeQ18k33CFpklDf59yhZkk00NMCadW4I"
            );
            elements = stripe.elements();
            card = elements.create("card");
            card.mount(cardElement);
            card.addEventListener("change", function (event) {
                if (event.error) {
                    cardErrors.textContent = event.error.message;
                } else {
                    cardErrors.textContent = "";
                }
            });
        }
    });

    async function handleSubmit() {
        globalStore.toggleItem(
            "alert",
            true,
            "submitting order... please wait!"
        );
        let response = await stripe
            .createToken(card)
            .catch((error) => console.log(error));

        const { token } = response;
        if (token) {
            const { id } = token;
            //submit the order
            let order = await submitOrder({
                name,
                total: $cartTotal,
                items: $cart,
                stripeTokenId: id,
                userToken: $user.jwt,
            });

            if (order) {
                globalStore.toggleItem(
                    "alert",
                    true,
                    "주문이 완료되었습니다.!"
                );
                cart.set([]);
                localStorage.setItem("cart", JSON.stringify([]));
                navigate("/");
                return;
            } else {
                globalStore.toggleItem(
                    "alert",
                    true,
                    "주문중 에러가 발생하였습니다. 다시 시도해주세요.",
                    true
                );
            }
        } else {
            //console.log(response);
        }
    }
</script>

{#if $cartTotal > 0}
    <section class="form">
        <h2 class="section-title">결재</h2>
        <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
            <h3>총 주문금액 : {$cartTotal}</h3>
            <!-- single input-->
            <div class="form-control">
                <label for="name">your name</label>
                <input type="text" id="name" bind:value={name} />
            </div>
            <!-- single input-->

            <!-- stripe stuff-->
            <div class="stripe-input">
                <!-- info -->
                <label for="card-element">신용카드</label>
                <p class="stripe-info">
                    테스트용 카드 번호: <span>4242 4242 4242 4242</span>
                    <br />
                    5자리 zip코드를 입력해주세요
                    <br />
                    3자리의 cvc 번호를 입력하세요
                </p>
                <div id="card-element" bind:this={cardElement}>
                    <!-- stripe -->
                </div>
                <div id="card-errors" bind:this={cardErrors} role="alert" />
            </div>

            <!-- end of stripe stuff-->

            <!-- error message -->
            {#if isEmpty}
                <p class="form-empty">모든 입력 필드를 채워주세요</p>
            {/if}
            <!-- submit button -->
            <button
                type="submit"
                class="btn btn-block btn-primary"
                disabled={isEmpty}
                class:disabled={isEmpty}>결재</button
            >
        </form>
    </section>
{:else}
    <div class="checkout-empty">
        <h2>장바구니에 항목이 없습니다.</h2>
        <a href="/products" use:link class="btn btn-primary">제품 선택하기</a>
    </div>
{/if}
