<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card card-default">
                <div class="card-header">Show Movie</div>
                <div class="card-body">
                    <h3>{{ movie.title }}</h3>
                    <div v-if="movie.author">Author: {{ movie.author.firstname }} {{ movie.author.lastname }}</div>
                    <div>Price: {{ movie.price }} €</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShowPage",
        data() {
            return {
                movie: {}
            }
        },
        mounted() {
            console.log('Show Component mounted.');
            this.getMovie()
        },
        created() {
            console.log('Show Component created.')
        },
        methods: {
            getMovie() {
                this.movie = this.$route.params.movie
            }
        }
    }
</script>
