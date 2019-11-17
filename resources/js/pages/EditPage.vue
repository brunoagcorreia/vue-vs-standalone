<template>
    <div>
        <h1>Edit Movie</h1>
        <form @submit.prevent="update">

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Author:</label>
                        <select id="author_id" name="author_id" class="form-control" :required="true" v-model="movie.author_id">
                            <option
                                v-for="(val) in authors"
                                :value="val.id"
                                :selected="val.id === movie.author_id"
                            >{{ val.firstname }} {{ val.lastname }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Title:</label>
                        <input id="title" name="title" type="text" class="form-control" v-model="movie.title"/>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Price:</label>
                        <input id="price" name="price" type="text" class="form-control" v-model="movie.price"/>
                    </div>
                </div>
            </div>

            <br />
            <div class="form-group">
                <button class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {myMixin} from "../mixins/global-data";

    export default {
        name: "EditPage",
        mixins: [myMixin],
        data() {
            return {
                movie: {},
//                author: {},
                authors: [],
            }
        },
        mounted() {
            this.get()
        },
        methods: {
            get() {
                this.movie = this.$route.params.movie
            },
            update() {
                let token = localStorage.getItem('token');
                let headers = {
                    "Authorization": "Bearer " + token,
                };
                let uri = `/api/movie/${this.$route.params.movie.id}`;
                this.axios.put(uri, this.movie )
                    .then((response) => {
                        this.$router.push({name: 'movies'});
                    }).catch(err => {
                        console.error(err)
                    });
            }
        }
    }
</script>
