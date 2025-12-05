<template>
    <div class="login justify-center items-center h-screen flex">
        <div class="card w-96">
            <h2 class="text-2xl font-bold mb-4 text-center">登录</h2>
            <n-form>
                <n-form-item label="用户名 / 邮箱">
                    <n-input placeholder="请输入用户名或邮箱" />
                </n-form-item>
                <n-form-item label="密码">
                    <n-input type="password" placeholder="请输入密码" />
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" class="w-full">登 录</n-button>
                </n-form-item>
            </n-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
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