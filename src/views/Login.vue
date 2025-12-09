<template>
    <div class="login flex app-theme flex-col h-screen w-screen items-center justify-center overflow-hidden">
        <theme-switch class="theme-switch self-start pt-[15px] pr-[15px] xl:pt-[30px] xl:pr-[30px] mb-auto ml-auto"></theme-switch>
        <div class="login-container flex flex-row items-center justify-center mb-auto">
            <n-image class="login-logo hidden max-h-[350px] xl:flex mr-15" :src="loginSvg" :preview-disabled="!0"></n-image>
            <div class="login-form-d min-w-[650px]">
                <n-form class="login-form w-fit ml-auto mr-auto min-w-[var(--login-min-width)] xl:ml-0" :style="{'--login-min-width': windowWidth < 350 ? (windowWidth - 20) + 'px' : '350px'}">
                    <n-text class="text-2xl font-bold mb-4 text-center">Login</n-text>
                    <n-form-item label="Username / Email">
                        <n-input placeholder="please input username or email" />
                    </n-form-item>
                    <n-form-item label="Password">
                        <n-input type="password" placeholder="please input password" />
                    </n-form-item>
                    <n-form-item>
                        <n-button type="primary" class="w-full">Sign in</n-button>
                    </n-form-item>
                </n-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import loginSvg from '@/assets/elements/dataOfWork.svg';
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import { computed, reactive, ref } from 'vue';
const windowWidth = computed(() => window.innerWidth)
const rules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
    ]
}

const loading = ref(false)
const model = reactive({
    email: '',
    password: ''
})
</script>

<style lang="scss">
.login {}
</style>