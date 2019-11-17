<template>
    <div>
        <h1>You are Logged out!</h1>
    </div>
</template>

<script>

    export default {
        name: "LogoutPage",
        data () {
            return {
                email: '',
                password: '',
//                apiUrl: process.env.API_URL,
//                secret: process.env.PASSPORT_SECRET
            }
        },
        created() {
            this.logout();
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => this.$router.push({name: 'home'}))
                    .catch(err => console.log(err))
                ;
            }
        }
    }
</script>
