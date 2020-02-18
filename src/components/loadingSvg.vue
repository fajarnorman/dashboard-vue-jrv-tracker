<template>
    <div class="el-loading-mask" v-if="isLoading == true">
        <div class="el-loading-spinner">
            <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isLoading']
}
</script>
