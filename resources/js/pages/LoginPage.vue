<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="text" v-model="email" class="form-control" placeholder="Your Email"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" v-model="password" class="form-control" placeholder="Password"/>
                    </div>
                </div>
            </div>
            <br />
            <div class="form-group">
                <button class="btn btn-primary">Login</button>
            </div>
        </form>
    </div>
</template>

<script>

    export default {
        name: "LoginPage",
        data () {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            login: function () {
                let email = this.email;
                let password = this.password;
                this.$store.dispatch('login', { email, password })
                    .then(response => {
                        this.$router.push({name: 'movies'})
                    })
                    .catch(err => console.log(err))
                ;
            }
        }
    }
</script>
