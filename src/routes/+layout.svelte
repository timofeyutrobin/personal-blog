<header>
    <a href="/">Main page</a>
    <a href="/about">About me</a>
</header>
<div>
    <slot/>
</div>

<style>
    header {
        position: fixed;
        top: 0;
        left: 0;

        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        height: 80px;
        padding: 0 20px;

        background-color: #eee;
    }

    div {
        margin-top: 80px;
    }
</style>
