<template>
    <div class="auth flex app-theme flex-col h-screen w-screen items-center justify-center overflow-hidden">
        <div class="auth-header flex justify-around gap-4 items-center self-start pt-[15px] pr-[15px] xl:pt-[30px] xl:pr-[30px] mb-auto ml-auto">
            <color-picker class="color-picker "></color-picker>
            <theme-switch class="theme-switch "></theme-switch>
        </div>
        <div class="auth-container flex flex-row items-center justify-center mb-auto">
            <n-image class="auth-logo hidden max-h-[350px] xl:flex mr-15" :src="loginSvg" :preview-disabled="!0"></n-image>
            <transition name="fade-slide" mode="out-in">
                <!-- Login form -->
                <div class="login-form-d min-w-[650px]" v-if="isLogin">
                    <n-form class="login-form w-fit ml-auto mr-auto min-w-[var(--login-min-width)] xl:ml-0"
                        :style="{ '--login-min-width': windowWidth < 350 ? (windowWidth - 20) + 'px' : '350px' }">
                        <n-text class="text-2xl font-bold">Login</n-text>
                        <n-form-item label="Username / Email">
                            <n-input placeholder="please input username or email" />
                        </n-form-item>
                        <n-form-item label="Password">
                            <n-input type="password" placeholder="please input password" />
                        </n-form-item>
                        <n-form-item>
                            <n-button type="primary" class="w-full">Sign in</n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="info" class="w-full" @click="isLogin = !1">Go to Register →</n-button>
                        </n-form-item>
                    </n-form>
                </div>
                <!-- Register form -->
                <div class="register-form-d min-w-[650px]" v-else>
                    <n-form class="register-form w-fit ml-auto mr-auto min-w-[var(--register-min-width)] xl:ml-0"
                        :style="{ '--register-min-width': windowWidth < 350 ? (windowWidth - 20) + 'px' : '350px' }">
                        <n-text class="text-2xl font-bold mb-4 text-center">Register</n-text>
                        <n-form-item label="Username / Email">
                            <n-input placeholder="please input username or email" />
                        </n-form-item>
                        <n-form-item label="Password">
                            <n-input type="password" placeholder="please input password" />
                        </n-form-item>
                        <n-form-item>
                            <n-button type="primary" class="w-full">Sign up</n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="info" class="w-full" @click="isLogin = !0">Go to login →</n-button>
                        </n-form-item>
                    </n-form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import loginSvg from '@/assets/elements/dataOfWork.svg';
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import ColorPicker from '@/components/ColorPicker.vue';
import { computed, reactive, ref } from 'vue';
const windowWidth = computed(() => window.innerWidth)
const isLogin = ref(true)
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
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all .25s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(-75px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(75px);
}
</style>