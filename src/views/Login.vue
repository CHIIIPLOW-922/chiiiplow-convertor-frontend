<template>
    <div class="login flex app-theme flex-col h-screen w-screen items-center justify-center overflow-hidden">
        <theme-switch class="theme-switch self-start pt-[15px] pr-[15px] xl:pt-[30px] xl:pr-[30px] mb-auto ml-auto"></theme-switch>
        <div class="login-container flex flex-row items-center justify-center mb-auto">
            <n-image class="login-logo hidden max-h-[350px] xl:flex mr-30" :src="loginSvg" :preview-disabled="!0"></n-image>
            <div class="login-form-d min-w-[650px]">
                <n-form class="login-form w-fit min-w-[400px] ml-auto mr-auto xl:ml-0">
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
import { ref, reactive } from 'vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import loginSvg from '@/assets/elements/dataOfWork.svg'
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