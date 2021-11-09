<script>
    import loginUser from "../strapi/loginUser";
    import registerUser from "../strapi/registerUser";
    import { navigate } from "svelte-routing";
    import globalStore from "../stores/globalStore";

    let email = "";
    let password = "";
    let username = "default username";
    let isMember = true;

    // add alert
    $: isEmpty = !email || !password || !username || $globalStore.alert;

    //toggle member
    function toggleMember() {
        isMember = !isMember;
        if (!isMember) {
            username = "";
        } else {
            username = "default username";
        }
    }

    //handle submit
    async function handleSubmit() {
        // add alert
        globalStore.toggleItem(
            "alert",
            true,
            "데이터를 로딩중입니다. 잠시만 기다려 주세요."
        );

        let user;
        if (isMember) {
            user = await loginUser({ email, password });
        } else {
            user = await registerUser({ email, password, username });
        }

        if (user) {
            navigate("/products");
            globalStore.toggleItem("alert", true, "쇼핑을 시작하세요!");
            return;
        }
        globalStore.toggleItem(
            "alert",
            true,
            "아이디/패스워드를 확인해주세요.",
            true
        );
    }
</script>

<section class="form">
    <h2 class="section-title">
        {#if isMember}
            로그인
        {:else}
            회원가입
        {/if}
    </h2>
    <form class="login-form" on:submit|preventDefault={handleSubmit}>
        <!-- single input -->
        <div class="form-control">
            <label for="email">이메일</label>
            <input type="email" id="email" bind:value={email} />
        </div>
        <!-- end of single input -->
        <!-- single input -->
        <div class="form-control">
            <label for="password">패스워드</label>
            <input type="password" id="password" bind:value={password} />
        </div>
        <!-- end of single input -->
        {#if !isMember}
            <!-- single input -->
            <div class="form-control">
                <label for="username">성명</label>
                <input type="text" id="username" bind:value={username} />
            </div>
            <!-- end of single input -->
        {/if}
        {#if isEmpty}
            <p class="form-empty">모든 필드를 채워주세요.</p>
        {/if}
        <button
            type="submit"
            class="btn btn-block btn-primary"
            disable={isEmpty}
            class:disabled={isEmpty}>로그인</button
        >
        {#if isMember}
            <p class="register-link">
                회원가입은
                <button type="button" class="" on:click={toggleMember}
                    >여기를 클릭</button
                >
            </p>
        {:else}
            <p class="register-link">
                이미 회원이시면
                <button type="button" class="" on:click={toggleMember}
                    >여기를 클릭</button
                >
            </p>
        {/if}
    </form>
</section>
