<template>
    <div class="block-container my-2 pa-2">
        <p class="w-100 block-title" loading v-text="formattedId" />
        <p class="w-100 block-content" v-text="block.text" />
    </div>
</template>

<script>
export default {
    name: 'Block',
    props: {
        block: {
            id: String,
            text: String,
            loading: Boolean
        }
    },
    computed: {
        formattedId() {
            return this.block.id.padStart(3, '0');
        }
    }
}
</script>

<style lang="scss" scoped>
.block-container{
    background: rgba(0, 0, 0, 0.12);
    border-radius: 2px;

    p{
        margin: 0;
    }

    .block-title{
        margin-bottom: 5px;
        color: #304FFE;
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    .block-content{
        color: #263238;
        font-size: 14px;
        letter-spacing: 0.25px;
    }
}
</style>